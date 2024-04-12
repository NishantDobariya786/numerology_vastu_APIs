import mongoose, { Document, Schema } from "mongoose";

interface OTPDocument extends Document {
  email: string;
  secret: string;
  isRePassVerify: boolean;
  isOtpVerified: boolean;
  type: string;
  expiresAt?: Date;
}

enum OTPenum {
  REGISTER_OTP = "registerOtp",
  RESET_PASSWORD_OTP = "resetPasswordOtp",
}

const optSchema = new Schema<OTPDocument>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    secret: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: OTPenum.REGISTER_OTP,
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      default: Date.now,
      expires: 500,
    },
  },
  { timestamps: true }
);

const OTPModel = mongoose.model<OTPDocument>("VerifyOTP", optSchema);

export { OTPModel, OTPDocument };
