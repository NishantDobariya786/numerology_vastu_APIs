import { sign } from "jsonwebtoken";
import { UserDocument, UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import { env } from "../../../config";
import { getObjectId } from "../../../helpers/mongo";

async function hashPassword(password: string) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}

function getUser(email: string) {
  return UserModel.findOne({ email }).lean();
}

function getUserById(id: string) {
  const _id = getObjectId(id);
  return UserModel.findOne({ _id: _id }).lean();
}

function updateSessionOfUser(
  userId: string,
  token?: String,
  authStrategy?: String
) {
  if (!token) {
    token = "";
    authStrategy = "";
  }
  return UserModel.findOneAndUpdate(
    {
      _id: getObjectId(userId),
    },
    { $set: { authStrategy: authStrategy, session: token } },
    { new: true }
  ).lean();
}

function sanitizeUser(user: UserDocument) {
  //@ts-ignore
  delete user.password;
  //@ts-ignore
  delete user.createdAt;
  //@ts-ignore
  delete user.updatedAt;
  //@ts-ignore
  delete user.session;

  delete user.authStrategy;

  return user;
}

function generateUserAccessToken(
  username: String,
  email: String,
  authStrategy: String,
  oAuthToken?: String,
  _id?: String
) {
  const payload = {
    username: username,
    email: email,
    authStrategy: authStrategy,
    ...(oAuthToken && { oAuthToken: oAuthToken }),
    ...(_id && { _id: _id }),
  };

  const accessToken = sign(payload, env.JWT_SECRET_KEY, {
    expiresIn: "10d",
  });

  return accessToken;
}

async function createUser(user: Partial<UserDocument>) {
  if (user?.password) {
    user.password = await hashPassword(user.password);
  }

  return UserModel.create(user);
}

async function updateUserProfile(
  userId: string,
  update: Partial<UserDocument>
) {
  if (update?.password) {
    update.password = await hashPassword(update.password);
  }
  if (update?.dateOfBirth) {
    update.dateOfBirth = new Date(update.dateOfBirth);
  }
  return UserModel.findOneAndUpdate(
    {
      _id: getObjectId(userId),
    },
    { $set: update },
    { new: true }
  ).lean();
}

function deleteUserProfile(_id: string) {
  return UserModel.deleteOne({
    _id: getObjectId(_id),
  }).lean();
}

export {
  getUser,
  createUser,
  verifyPassword,
  generateUserAccessToken,
  sanitizeUser,
  updateSessionOfUser,
  getUserById,
  deleteUserProfile,
  updateUserProfile,
};
