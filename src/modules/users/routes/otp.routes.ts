import { Plugin, Server, ServerRoute } from "@hapi/hapi";
import {
  verifyChangeEmailOTPController,
  verifyUserForgetPasswordOTPController,
  verifyUserSignupOTPController,
} from "../controllers/user.controller";
import {
  sendUserChangeEmailOTPEmailController,
  sendUserForgetPasswordOTPEmailController,
  sendUserSignupOTPEmailController,
} from "../controllers/user_email.controller";
import {
  getChangeEmailOtpValidation,
  getForgetPasswordOtpValidation,
  getUserSignupOtpValidation,
  verifyChangeEmailOtpValidation,
  verifyForgetPasswordOtpValidation,
  verifyOtpForUserSignupValidation,
} from "../validators/otp.validator";

const basePath = "/api/user";

const userOtpRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: `${basePath}/send-signup-opt`,
    options: {
      validate: {
        payload: getUserSignupOtpValidation,
      },
      auth: false,
    },
    handler: sendUserSignupOTPEmailController,
  },
  {
    method: "POST",
    path: `${basePath}/verify-signup-opt`,
    options: {
      validate: {
        payload: verifyOtpForUserSignupValidation,
      },
      auth: false,
    },
    handler: verifyUserSignupOTPController,
  },
  {
    method: "POST",
    path: `${basePath}/send-forgetpassword-opt`,
    options: {
      validate: {
        payload: getForgetPasswordOtpValidation,
      },
      auth: false,
    },
    handler: sendUserForgetPasswordOTPEmailController,
  },
  {
    method: "POST",
    path: `${basePath}/verify-forgetpassword-opt`,
    options: {
      validate: {
        payload: verifyForgetPasswordOtpValidation,
      },
      auth: false,
    },
    handler: verifyUserForgetPasswordOTPController,
  },
  {
    method: "POST",
    path: `${basePath}/send-emailchange-opt`,
    options: {
      validate: {
        payload: getChangeEmailOtpValidation,
      },
    },
    handler: sendUserChangeEmailOTPEmailController,
  },
  {
    method: "POST",
    path: `${basePath}/verify-emailchange-opt`,
    options: {
      validate: {
        payload: verifyChangeEmailOtpValidation,
      },
    },
    handler: verifyChangeEmailOTPController,
  },
];

const userOtpRouterPlugin: Plugin<any> = {
  name: "user-otp-routes",
  register: async (server: Server) => {
    server.route(userOtpRoutes);
  },
};

export default userOtpRouterPlugin;
