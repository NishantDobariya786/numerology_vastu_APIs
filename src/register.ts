import Hapi from "@hapi/hapi";
import { env } from "./config";
import userRouterPlugin from "./modules/users/routes/user.routes";
import { ValidationError } from "joi";
import Boom from "@hapi/boom";
import { authStrategyPlugin } from "./modules/users/auth-strategy/user.authstrategy";
import hapiAuthJwt2 from "hapi-auth-jwt2";
import numerologyRouterPlugin from "./modules/numerology/routes/numerology.route";
import { error } from "./config/errors";
import userOtpRouterPlugin from "./modules/users/routes/otp.routes";

const routes = [
  hapiAuthJwt2,
  authStrategyPlugin,
  userRouterPlugin,
  userOtpRouterPlugin,
  numerologyRouterPlugin,
];

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

  server.ext("onRequest", (request, h) => {
    const apiKey = request.headers["x-api-key"];
    //@ts-ignore
    if (!apiKey || apiKey !== env.X_API_KEY) {
      throw Boom.notAcceptable(error.NOT_VALID_CLIENT);
    }

    return h.continue;
  });

  server.ext("onPreResponse", (request, h) => {
    const response = request.response;
    //@ts-ignore
    if (response?.isBoom) {
      return (
        h
          .response({
            //@ts-ignore
            statusCode: response?.output?.statusCode,
            responseMsg: response.message,
          })
          //@ts-ignore
          .code(response?.output?.statusCode)
      );
    }
    return h.continue;
  });

  for (const route of routes) {
    await server.register(route);
  }

  return server;
};
