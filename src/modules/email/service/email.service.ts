import { MailOptions } from "nodemailer/lib/json-transport";
import { env } from "../../../config";
import { emailTransporter } from "../config/email-transporter";
import {
  getChangeEmailTemplate,
  getSignupOtpTemplate,
  getVerifyPasswordTemplate,
} from "../email-templates/otp-template";
import { TemplateNum } from "../config/const";

function sendEmail(mailOptions: MailOptions) {
  return emailTransporter.sendMail(mailOptions);
}

function sendOtpEmail(email: string, otp: string, template: string) {
  let mailOptions: MailOptions = {
    from: env.EMAIL,
    to: email,
    text: "Type your OTP in mobile APP",
  };

  switch (template) {
    case TemplateNum.FORGET_PASSWORD_OTP_TEMPLATE:
      mailOptions.html = getVerifyPasswordTemplate(otp);
      mailOptions.subject = "Verify your OTP to change password";
      break;
    case TemplateNum.CHANGE_EMAIL_OTP_TEMPLATE:
      mailOptions.html = getChangeEmailTemplate(otp);
      mailOptions.subject = "Verify your OTP to change email";
      break;
    default:
      mailOptions.html = getSignupOtpTemplate(otp);
      mailOptions.subject = "Confirm your Email address with OTP";
      break;
  }

  return sendEmail(mailOptions);
}

export { sendOtpEmail };
