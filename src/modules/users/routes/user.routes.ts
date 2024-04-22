import { Plugin, Server, ServerRoute } from "@hapi/hapi";
import {
  loginSchemaValidation,
  signupSchemaValidation,
  changePasswordValidation,
  updateUserProfileValidation,
  changeEmailValidation,
  verifyContactUsValidation,
} from "../validators/auth.validator";
import {
  getUserProfileController,
  userChangePasswoedController,
  userLoginController,
  userLogoutController,
  userProfileDeleteController,
  userProfileUpdateController,
  userSignupController,
} from "../controllers/user.controller";
import { contactUsController } from "../controllers/contact_us.controller";

const basePath = "/api/user";

const userRoutes: ServerRoute[] = [
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
    method: "PATCH",
    path: `${basePath}/logout`,
    handler: userLogoutController,
  },
  {
    method: "GET",
    path: `${basePath}`,
    handler: getUserProfileController,
  },
  {
    method: "PUT",
    path: `${basePath}`,
    options: {
      validate: {
        payload: updateUserProfileValidation,
      },
    },
    handler: userProfileUpdateController,
  },
  {
    method: "DELETE",
    path: `${basePath}`,
    handler: userProfileDeleteController,
  },
  {
    method: "POST",
    path: `${basePath}/contact-us`,
    options: {
      validate: {
        payload: verifyContactUsValidation,
      },
    },
    handler: contactUsController,
  },
];

const userRouterPlugin: Plugin<any> = {
  name: "user-routes",
  register: async (server: Server) => {
    server.route(userRoutes);
  },
};

export default userRouterPlugin;
