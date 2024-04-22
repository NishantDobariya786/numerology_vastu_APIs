import { Plugin, Server, ServerRoute } from "@hapi/hapi";
import {
  getReportsAnalysisController,
  getLoshuGridDataController,
} from "../controllers/numerology.controller";

const basePath = "/api/analysis";

const numerologyRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: `${basePath}`,
    handler: getLoshuGridDataController,
  },
  {
    method: "GET",
    path: `${basePath}/{reportType}`,
    handler: getReportsAnalysisController,
  },
];

const numerologyRouterPlugin: Plugin<any> = {
  name: "numerology-routes",
  register: async (server: Server) => {
    server.route(numerologyRoutes);
  },
};

export default numerologyRouterPlugin;
