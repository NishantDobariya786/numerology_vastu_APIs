import { ReqRefDefaults, Request, ResponseToolkit } from "@hapi/hapi";
import { sendOtpEmail } from "../../email/service/email.service";
import { generateOTP } from "../../../helpers/generateOTP";
import {
  markOtpVerified,
  updateOtpForUser,
  verifyUserOtp,
} from "../services/user_otp_verify.service";
import Boom from "@hapi/boom";
import { getUser } from "../services/user.service";
import { error } from "../../../config/errors";
import { TemplateNum } from "../../email/config/const";

async function sendUserSignupOTPController(
  request: Request<ReqRefDefaults>,
  response: ResponseToolkit<ReqRefDefaults>
) {
  const { email } = request.payload as any;

  const user = await getUser(email);

  if (user) {
    throw Boom.conflict(error.USER_ALREADY_EXIST);
  }

  const { otp, secret } = generateOTP();

  const newOtpDocument = await updateOtpForUser(
    email,
    secret,
    TemplateNum.REGISTER_USER_OTP
  );

  if (!newOtpDocument) {
    throw Boom.internal("Something Went Wrong While generating OTP");
  }

  await sendOtpEmail(newOtpDocument.email, otp, TemplateNum.REGISTER_USER_OTP);

  return response
    .response({
      statusCode: 200,
      responseMsg: "OTP Email Sent SuccessFully",
    })
    .code(200);
}

async function sendUserForgetPasswordOTPController(
  request: Request<ReqRefDefaults>,
  response: ResponseToolkit<ReqRefDefaults>
) {
  const { email } = request.payload as any;

  const user = await getUser(email);

  if (!user) {
    throw Boom.unauthorized(error.UNAUTHORIZED_USER);
  }

  const { otp, secret } = generateOTP();

  const newOtpDocument = await updateOtpForUser(
    email,
    secret,
    TemplateNum.FORGET_PASSWORD_OTP_TEMPLATE
  );

  if (!newOtpDocument) {
    throw Boom.internal("Something Went Wrong While generating OTP");
  }

  await sendOtpEmail(
    newOtpDocument.email,
    otp,
    TemplateNum.FORGET_PASSWORD_OTP_TEMPLATE
  );

  return response
    .response({
      statusCode: 200,
      responseMsg: "OTP Email Sent SuccessFully",
    })
    .code(200);
}

export { sendUserSignupOTPController, sendUserForgetPasswordOTPController };
