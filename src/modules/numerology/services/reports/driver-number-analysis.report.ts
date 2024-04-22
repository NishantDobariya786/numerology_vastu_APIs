import Boom from "@hapi/boom";
import { DriverNumberAnalysisModel } from "../../models/driver-number-analysis.model";
import { reportsError } from "../../constants/reports.errors";

function getDriverNumberAnalysis(driverNumber: number, language: string) {
  if (!driverNumber || driverNumber > 9 || driverNumber < 1) {
    throw Boom.badRequest(reportsError.DRIVER_NUMBER_REQURED);
  }
  return DriverNumberAnalysisModel.findOne({ language, driverNumber });
}

export { getDriverNumberAnalysis };
