import {
  Plugin,
  Request,
  ResponseToolkit,
  Server,
  ServerApplicationState,
} from "@hapi/hapi";
import { env } from "../../../config";
import { getUser } from "../services/user.service";

const authStrategyPlugin: Plugin<any> = {
  name: "auth-strategy",
  register: async (server: Server<ServerApplicationState>) => {
    server.auth.strategy("jwt", "jwt", {
      key: env.JWT_SECRET_KEY,
      validate: async (decoded: any, request: Request, h: ResponseToolkit) => {
        const user = await getUser(decoded?.email);

        if (
          !user ||
          //@ts-ignore
          user?.session !== request?.auth?.token
        ) {
          return { isValid: false };
        }

        //@ts-ignore
        if (request?.route?.settings?.auth?.access?.[0]?.scope?.selection) {
          const scope = //@ts-ignore
            request?.route?.settings?.auth?.access[0]?.scope?.selection;
          if (Array.isArray(scope) && !scope.includes(user.role)) {
            return { isValid: false };
          }
        }

        return { isValid: true, credentials: user };
      },
    });
    server.auth.default("jwt");
  },
};

export { authStrategyPlugin };
