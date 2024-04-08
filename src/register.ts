import Hapi from "@hapi/hapi";
import { env } from "./config";
import userRouterPlugin from "./modules/users/routes/user.route";
import { ValidationError } from "joi";
import Boom from "@hapi/boom";
import { authStrategyPlugin } from "./modules/users/auth-strategy/user.authstrategy";
import hapiAuthJwt2 from "hapi-auth-jwt2";

const routes = [hapiAuthJwt2, authStrategyPlugin, userRouterPlugin];

export const registerPlugins = async () => {
  const server = Hapi.server({
    port: env.PORT,
    host: env.HOST,
    routes: {
      validate: {
        failAction: async (request, h, err) => {
          if (err && err instanceof ValidationError) {
            throw Boom.boomify(err, {
              statusCode: 400,
            });
          }
        },
      },
    },
  });

  server.state("data", {
    ttl: null,
    isSecure: true,
    isHttpOnly: true,
    encoding: "base64json",
    clearInvalid: true,
    strictHeader: true,
  });

  //   server.ext("onPreResponse", (request, h) => {
  //     const response = request.response;

  //     if (!(response instanceof Error)) {
  //       return h.continue;
  //     }

  //     if (response instanceof ValidationError) {
  //       return h
  //         .response({
  //           statusCode: 400,
  //           error: "Validation Error",
  //           message: response.details.map((d) => d.message).join(", "),
  //         })
  //         .code(400);
  //     }

  //     switch (response.message) {
  //       case error.NOT_FOUND:
  //         return h
  //           .response({
  //             error: "Route not found",
  //           })
  //           .code(404);

  //       case error.USER_ALREADY_EXIST:
  //         return h
  //           .response({
  //             error: "User`s email or username is already in use",
  //           })
  //           .code(401);

  //       case error.INVALID_CREDENSTIALS:
  //         return h
  //           .response({
  //             error: "provided credentials are not valid",
  //           })
  //           .code(401);

  //       case error.UNAUTHORIZED_USER:
  //         return h
  //           .response({
  //             error: "Unauthorized User",
  //           })
  //           .code(401);

  //       case error.FORBIDDEN:
  //         return h
  //           .response({
  //             error: "User not have permission to access this route",
  //           })
  //           .code(403);

  //       case error.INVALID_OBJECT_ID:
  //         return h
  //           .response({
  //             error: "Provided ObjectId Not Valid",
  //           })
  //           .code(400);

  //       default:
  //         console.error(response.message);
  //         return h
  //           .response({
  //             error: "Internal Server Error",
  //             message: "An internal server error occurred",
  //           })
  //           .code(500);
  //     }
  //   });

  for (const route of routes) {
    await server.register(route);
  }

  return server;
};
