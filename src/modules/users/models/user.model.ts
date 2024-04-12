import mongoose, { Document, Schema } from "mongoose";
import { MapType } from "../../numerology/constants/types";

interface UserDocument extends Document {
  username: string;
  email: string;
  password?: string;
  dateOfBirth: Date;
  session?: string;
  createdAt: Date;
  updatedAt: Date;
  gender: String;
  mobileNumber: Number;
  authStrategy?: String;
  age: Number;
  profilePicture?: String;
  role: string;
  driverNumber: number;
  conductorNumber: number;
  kuaNumber: number;
  loshuGrid: MapType;
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

enum GenderEnum {
  MALE = "male",
  FEMALE = "female",
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: false,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    mobileNumber: {
      type: Number,
      required: false,
    },
    loshuGrid: {
      type: Object,
      required: false,
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
    driverNumber: {
      type: Number,
      required: false,
    },
    conductorNumber: {
      type: Number,
      required: false,
    },
    kuaNumber: {
      type: Number,
      required: false,
    },
    role: {
      type: String,
      default: UserRoleEnum.USER,
    },
  },
  { timestamps: true }
);

userSchema.index({ session: 1 }, { expireAfterSeconds: 60 });

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export { UserModel, UserDocument, AuthEnum, UserRoleEnum, GenderEnum };
