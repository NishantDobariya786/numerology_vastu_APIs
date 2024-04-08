import { Plugin, Server, ServerRoute } from "@hapi/hapi";
import {
  loginSchema,
  signupSchema,
  userProfileValidation,
} from "../validators/auth.validator";
import {
  getUserProfileController,
  userLoginController,
  userSignupController,
} from "../controllers/user.controller";

const basePath = "/api/user";

const userRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: `${basePath}/signup`,
    options: {
      validate: {
        payload: signupSchema,
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
        payload: loginSchema,
      },
      auth: false,
    },
    handler: userLoginController,
  },
  {
    method: "GET",
    path: `${basePath}/profile/`,
    options: {
      validate: {
        query: userProfileValidation,
      },
    },
    handler: getUserProfileController,
  },
];

const userRouterPlugin: Plugin<any> = {
  name: "user-routes",
  register: async (server: Server) => {
    server.route(userRoutes);
  },
};

export default userRouterPlugin;
