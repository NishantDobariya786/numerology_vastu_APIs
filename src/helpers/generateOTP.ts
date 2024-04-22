import speakeasy from "speakeasy";

function generateOTP() {
  const secret = speakeasy.generateSecret({ length: 20 });

  const otp = speakeasy.totp({
    secret: secret.base32,
    digits: 4,
    encoding: "base32",
    step: 500,
  });

  return { otp, secret: secret.base32 };
}

function verifyOTP(secret: string, otpFromUser: string) {
  return speakeasy.totp.verify({
    secret: secret,
    encoding: "base32",
    token: otpFromUser,
    step: 500,
    digits: 4,
  });
}

export { generateOTP, verifyOTP };
