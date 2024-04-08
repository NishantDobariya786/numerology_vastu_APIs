import mongoose, { Document, Schema } from "mongoose";

interface UserDocument extends Document {
  username: string;
  email: string;
  password?: string;
  session?: string;
  createdAt: Date;
  updatedAt: Date;
  authStrategy?: String;
  age: Number;
  profilePicture?: String;
  role: string;
}

enum AuthEnum {
  GOOGLE = "google",
  FACEBOOK = "facebook",
  LOCAL = "local",
}

enum UserRoleEnum {
  ADMIN = "admin",
  USER = "user",
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: [true, "UserName is required"],
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: false,
    },
    authStrategy: {
      type: String,
      required: false,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    session: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      default: UserRoleEnum.USER,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export { UserModel, UserDocument, AuthEnum, UserRoleEnum };
