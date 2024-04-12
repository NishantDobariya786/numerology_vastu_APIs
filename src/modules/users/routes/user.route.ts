import { Plugin, Server, ServerRoute } from "@hapi/hapi";
import {
  loginSchemaValidation,
  signupSchemaValidation,
  getUserSignupOtpValidation,
  verifyOtpForUserSignupValidation,
  verifyForgetPasswordOtpValidation,
  changePasswordValidation,
  getForgetPasswordOtpValidation,
  updateUserProfileValidation,
} from "../validators/auth.validator";
import {
  getUserProfileController,
  userChangePasswoedController,
  userLoginController,
  userLogoutController,
  userProfileUpdateController,
  userSignupController,
  verifyUserForgetPasswordOTPController,
  verifyUserSignupOTPController,
} from "../controllers/user.controller";
import {
  sendUserForgetPasswordOTPController,
  sendUserSignupOTPController,
} from "../controllers/user_email.controller";

const basePath = "/api/user";

const userRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: `${basePath}/get-signup-opt`,
    options: {
      validate: {
        payload: getUserSignupOtpValidation,
      },
      auth: false,
    },
    handler: sendUserSignupOTPController,
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
    path: `${basePath}/signup`,
    options: {
      validate: {
        payload: signupSchemaValidation,
      },
      auth: false,
    },
    handler: userSignupController,
  },
  {
    method: "POST",
    path: `${basePath}/login`,
    options: {
      validate: {
        payload: loginSchemaValidation,
      },
      auth: false,
    },
    handler: userLoginController,
  },
  {
    method: "POST",
    path: `${basePath}/get-forgetpassword-opt`,
    options: {
      validate: {
        payload: getForgetPasswordOtpValidation,
      },
      auth: false,
    },
    handler: sendUserForgetPasswordOTPController,
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
    path: `${basePath}/changePassword`,
    options: {
      validate: {
        payload: changePasswordValidation,
      },
      auth: false,
    },
    handler: userChangePasswoedController,
  },
  {
    method: "GET",
    path: `${basePath}/logout`,
    handler: userLogoutController,
  },
  {
    method: "GET",
    path: `${basePath}/profile`,
    handler: getUserProfileController,
  },
  {
    method: "PUT",
    path: `${basePath}/update-profile`,
    options: {
      validate: {
        payload: updateUserProfileValidation,
      },
    },
    handler: userProfileUpdateController,
  },
];

const userRouterPlugin: Plugin<any> = {
  name: "user-routes",
  register: async (server: Server) => {
    server.route(userRoutes);
  },
};

export default userRouterPlugin;
