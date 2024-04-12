import { Plugin, Server, ServerRoute } from "@hapi/hapi";
import {
  getAnalysisController,
  getLoshuGridDataController,
} from "../controllers/numerology.controller";

const basePath = "/api/analysis";

const numerologyRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: `${basePath}`,
    handler: getLoshuGridDataController,
  },
];

const numerologyRouterPlugin: Plugin<any> = {
  name: "numerology-routes",
  register: async (server: Server) => {
    server.route(numerologyRoutes);
  },
};

export default numerologyRouterPlugin;
