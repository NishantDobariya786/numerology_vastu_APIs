import { OTPModel } from "../models/otp.model";
import { verifyOTP } from "../../../helpers/generateOTP";

function updateUserOTP(email: string, secret: Object, type: string) {
  return OTPModel.findOneAndUpdate(
    {
      email: email,
    },
    { $set: { secret: secret, ...(type && { type: type }) } },
    { upsert: true, new: true }
  ).lean();
}

async function verifyUserOtp(email: string, otp: string) {
  const otpObj = await OTPModel.findOne({
    email: email,
  }).lean();

  if (!otpObj) {
    return false;
  }

  return verifyOTP(otpObj.secret, otp);
}

function markOtpVerified(email: string) {
  return OTPModel.updateOne(
    {
      email: email,
    },
    {
      $set: {
        isOtpVerified: true,
      },
    }
  ).lean();
}

async function checkOtpVerified(email: string) {
  const otpObj = await OTPModel.findOne({
    email: email,
  }).lean();

  if (!otpObj) {
    return false;
  }

  return otpObj.isOtpVerified;
}

function deleteOtp(email: string) {
  return OTPModel.deleteOne({
    email: email,
  }).lean();
}

export {
  updateUserOTP,
  verifyUserOtp,
  checkOtpVerified,
  markOtpVerified,
  deleteOtp,
};
