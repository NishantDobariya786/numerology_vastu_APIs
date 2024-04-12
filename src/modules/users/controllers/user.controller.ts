import Boom from "@hapi/boom";
import { ReqRefDefaults, Request, ResponseToolkit } from "@hapi/hapi";
import { error } from "../../../config/errors";
import {
  createUser,
  generateUserAccessToken,
  getUser,
  sanitizeUser,
  updateSessionOfUser,
  updateUserProfile,
  verifyPassword,
} from "../services/user.service";
import { AuthEnum } from "../models/user.model";
import {
  checkOtpVerified,
  deleteOtp,
  markOtpVerified,
  verifyUserOtp,
} from "../services/user_otp_verify.service";

// async function userSignupController(
//   request: Request<ReqRefDefaults>,
//   response: ResponseToolkit<ReqRefDefaults>
// ) {
//   const { username, email, password, gender, mobileNumber, dateOfBirth, otp } =
//     request.payload as any;

//   const user = await getUser(email);

//   if (user) {
//     throw Boom.conflict(error.USER_ALREADY_EXIST);
//   }

//   const isValidOtp = await verifyUserOtp(email, otp);

//   if (!isValidOtp) {
//     throw Boom.conflict(error.OTP_NOT_VALID);
//   }

//   await createUser({
//     email,
//     username,
//     password,
//     gender,
//     mobileNumber,
//     dateOfBirth: new Date(dateOfBirth),
//     authStrategy: AuthEnum.LOCAL,
//   });

//   return response
//     .response({ responseMsg: "User Created SuccessFully Please Login" })
//     .code(200);
// }

async function userSignupController(
  request: Request<ReqRefDefaults>,
  response: ResponseToolkit<ReqRefDefaults>
) {
  const { email, password } = request.payload as any;

  const user = await getUser(email);

  if (user) {
    throw Boom.conflict(error.USER_ALREADY_EXIST);
  }

  const isOtpVerified = await checkOtpVerified(email);

  if (!isOtpVerified) {
    throw Boom.conflict(error.OTP_NOT_VERIFIED);
  }

  await Promise.all([
    createUser({
      email,
      password,
      authStrategy: AuthEnum.LOCAL,
    }),
    deleteOtp(email),
  ]);

  return response
    .response({
      statusCode: 200,
      responseMsg: "User created successfully please login",
    })
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

  //@ts-ignore
  senitizedUser.token = token;

  response.state("authorization", token);

  return response
    .response({
      statusCode: 200,
      responseMsg: "User loggedin successfully",
      data: senitizedUser,
    })
    .code(200);
}

async function userChangePasswoedController(
  request: Request<ReqRefDefaults>,
  response: ResponseToolkit<ReqRefDefaults>
) {
  const { email, password } = request.payload as any;

  const user = await getUser(email);

  if (!user || !user.password) {
    throw Boom.unauthorized(error.UNAUTHORIZED_USER);
  }

  const isOptVerified = await checkOtpVerified(email);

  if (!isOptVerified) {
    throw Boom.conflict(error.OTP_NOT_VERIFIED);
  }

  const [updatedUser] = await Promise.all([
    updateUserProfile(user._id, { password: password }),
    deleteOtp(email),
  ]);

  const senitizedUser = sanitizeUser(updatedUser as any);

  return response
    .response({
      statusCode: 200,
      responseMsg: "User password changed successfully",
      data: senitizedUser,
    })
    .code(200);
}

async function userLogoutController(
  request: Request<ReqRefDefaults>,
  response: ResponseToolkit<ReqRefDefaults>
) {
  const { credentials: user } = request.auth;

  if (!user) {
    throw Boom.unauthorized(error.UNAUTHORIZED_USER);
  }
  //@ts-ignore
  await updateSessionOfUser(user._id);

  response.state("authorization", "");

  return response
    .response({
      statusCode: 200,
      responseMsg: "User logged out successfully",
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
      statusCode: 200,
      data: senitizedUser,
    })
    .code(200);
}

async function verifyUserSignupOTPController(
  request: Request<ReqRefDefaults>,
  response: ResponseToolkit<ReqRefDefaults>
) {
  const { email, otp } = request.payload as any;

  const user = await getUser(email);

  if (user) {
    throw Boom.conflict(error.USER_ALREADY_EXIST);
  }

  const isValidOtp = await verifyUserOtp(email, otp);

  if (!isValidOtp) {
    throw Boom.conflict(error.OTP_NOT_VALID);
  }

  await markOtpVerified(email);

  return response
    .response({
      statusCode: 200,
      responseMsg: "OTP verified successFully",
    })
    .code(200);
}

async function verifyUserForgetPasswordOTPController(
  request: Request<ReqRefDefaults>,
  response: ResponseToolkit<ReqRefDefaults>
) {
  const { email, otp } = request.payload as any;

  const user = await getUser(email);

  if (!user) {
    throw Boom.unauthorized(error.UNAUTHORIZED_USER);
  }

  const isValidOtp = await verifyUserOtp(email, otp);

  if (!isValidOtp) {
    throw Boom.conflict(error.OTP_NOT_VALID);
  }

  await markOtpVerified(email);

  return response
    .response({
      statusCode: 200,
      responseMsg: "OTP verified successfully",
    })
    .code(200);
}

async function userProfileUpdateController(
  request: Request<ReqRefDefaults>,
  response: ResponseToolkit<ReqRefDefaults>
) {
  const { username, email, password, gender, mobileNumber, dateOfBirth } =
    request.payload as any;

  const user = await getUser(email);

  if (!user) {
    throw Boom.unauthorized(error.UNAUTHORIZED_USER);
  }

  await updateUserProfile(user._id, {
    username,
    password,
    gender,
    mobileNumber,
    dateOfBirth,
  });

  return response
    .response({
      statusCode: 200,
      responseMsg: "User profile updated successfully",
    })
    .code(200);
}

export {
  userSignupController,
  userLoginController,
  getUserProfileController,
  userLogoutController,
  userProfileUpdateController,
  userChangePasswoedController,
  verifyUserSignupOTPController,
  verifyUserForgetPasswordOTPController,
};
