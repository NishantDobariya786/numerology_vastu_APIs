import Boom from "@hapi/boom";
import { ReqRefDefaults, Request, ResponseToolkit } from "@hapi/hapi";
import { error } from "../../../config/errors";
import {
  createUser,
  generateUserAccessToken,
  getUser,
  sanitizeUser,
  updateSessionOfUser,
  verifyPassword,
} from "../services/user.service";
import { AuthEnum } from "../models/user.model";

async function userSignupController(
  request: Request<ReqRefDefaults>,
  response: ResponseToolkit<ReqRefDefaults>
) {
  const { username, email, password } = request.payload as any;

  const user = await getUser(email);

  if (user) {
    throw Boom.conflict(error.USER_ALREADY_EXIST);
  }

  await createUser({
    email,
    username,
    password,
    authStrategy: AuthEnum.LOCAL,
  });

  return response
    .response({ message: "User Created SuccessFully Please Login" })
    .code(200);
}

async function userLoginController(
  request: Request<ReqRefDefaults>,
  response: ResponseToolkit<ReqRefDefaults>
) {
  const { email, password } = request.payload as any;

  const user = await getUser(email);

  if (!user || !user.password) {
    throw Boom.badData(error.INVALID_CREDENSTIALS);
  }

  const isPasswordValid = await verifyPassword(password, user.password);

  if (!isPasswordValid) {
    throw Boom.badData(error.INVALID_CREDENSTIALS);
  }

  const token = generateUserAccessToken(
    user.username,
    user.email,
    AuthEnum.LOCAL,
    undefined,
    user._id
  );

  const updatedUser = await updateSessionOfUser(
    user._id,
    token,
    AuthEnum.LOCAL
  );

  const senitizedUser = sanitizeUser(updatedUser as any);

  response.state("authorization", token);

  return response
    .response({
      message: "User LoggedIn SuccessFully",
      authorization: token,
      user: senitizedUser,
    })
    .code(200);
}

async function getUserProfileController(
  request: Request<ReqRefDefaults>,
  response: ResponseToolkit<ReqRefDefaults>
) {
  const { credentials: user } = request.auth;

  if (!user) {
    throw Boom.badData(error.INVALID_OBJECT_ID);
  }

  const senitizedUser = sanitizeUser(user as any);

  return response
    .response({
      user: senitizedUser,
    })
    .code(200);
}

export { userSignupController, userLoginController, getUserProfileController };
