import { ReqRefDefaults, Request, ResponseToolkit } from "@hapi/hapi";
import { sendOtpEmail } from "../../email/service/email.service";
import { generateOTP } from "../../../helpers/generateOTP";
import { updateUserOTP } from "../services/user_otp_verify.service";
import Boom from "@hapi/boom";
import { getUser, verifyPassword } from "../services/user.service";
import { error } from "../../../config/errors";
import { TemplateNum } from "../../email/config/const";

async function sendUserSignupOTPEmailController(
  request: Request<ReqRefDefaults>,
  response: ResponseToolkit<ReqRefDefaults>
) {
  const { email } = request.payload as any;

  const user = await getUser(email);

  if (user) {
    throw Boom.conflict(error.USER_ALREADY_EXIST);
  }

  const { otp, secret } = generateOTP();

  const newOtpDocument = await updateUserOTP(
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

async function sendUserForgetPasswordOTPEmailController(
  request: Request<ReqRefDefaults>,
  response: ResponseToolkit<ReqRefDefaults>
) {
  const { email } = request.payload as any;

  const user = await getUser(email);

  if (!user) {
    throw Boom.notFound(error.USER_NOT_EXIST);
  }

  const { otp, secret } = generateOTP();

  const newOtpDocument = await updateUserOTP(
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

async function sendUserChangeEmailOTPEmailController(
  request: Request<ReqRefDefaults>,
  response: ResponseToolkit<ReqRefDefaults>
) {
  const { email, password } = request.payload as any;

  const { credentials: user } = request.auth as any;

  const isUserExist = await getUser(email);

  if (isUserExist) {
    throw Boom.conflict(error.USER_ALREADY_EXIST);
  }

  const isPasswordValid = await verifyPassword(password, user.password);

  if (!isPasswordValid) {
    throw Boom.conflict(error.INVALID_CREDENSTIALS);
  }

  const { otp, secret } = generateOTP();

  const newOtpDocument = await updateUserOTP(
    email,
    secret,
    TemplateNum.CHANGE_EMAIL_OTP_TEMPLATE
  );

  if (!newOtpDocument) {
    throw Boom.internal("Something Went Wrong While generating OTP");
  }

  await sendOtpEmail(email, otp, TemplateNum.CHANGE_EMAIL_OTP_TEMPLATE);

  return response
    .response({
      statusCode: 200,
      responseMsg: "OTP email sent successFully",
    })
    .code(200);
}

export {
  sendUserSignupOTPEmailController,
  sendUserForgetPasswordOTPEmailController,
  sendUserChangeEmailOTPEmailController,
};
