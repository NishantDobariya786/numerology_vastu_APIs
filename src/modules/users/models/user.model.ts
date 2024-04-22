import mongoose, { Document, Schema } from "mongoose";
import { MapTypeString } from "../../numerology/constants/types";

interface UserDocument extends Document {
  username: string;
  email: string;
  password?: string;
  dateOfBirth: Date;
  session?: string;
  createdAt: Date;
  updatedAt: Date;
  gender: String;
  mobileNumber: string;
  authStrategy?: String;
  age: Number;
  profilePicture?: String;
  role: string;
  countryCode?: string;
  driverNumber: string;
  conductorNumber: string;
  kuaNumber: string;
  loshuGrid: MapTypeString;
  language: string;
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

enum LanguageEnum {
  ENGLISH = "en",
  HINDI = "hi",
  GUJARATI = "gu",
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: false,
      lowercase: true,
      trim: true,
    },
    countryCode: {
      type: String,
      required: false,
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
      type: String,
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
      type: String,
      required: false,
    },
    conductorNumber: {
      type: String,
      required: false,
    },
    kuaNumber: {
      type: String,
      required: false,
    },
    language: {
      type: String,
      required: true,
      default: LanguageEnum.ENGLISH,
    },
    role: {
      type: String,
      default: UserRoleEnum.USER,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export {
  UserModel,
  UserDocument,
  AuthEnum,
  UserRoleEnum,
  GenderEnum,
  LanguageEnum,
};
