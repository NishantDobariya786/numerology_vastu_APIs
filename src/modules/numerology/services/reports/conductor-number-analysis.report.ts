import Boom from "@hapi/boom";
import { reportsError } from "../../constants/reports.errors";
import { ConductorNumberAnalysisModel } from "../../models/conductor-number-analysis.model";

function getConductorNumberAnalysis(conductorNumber: number, language: string) {
  if (!conductorNumber || conductorNumber > 9 || conductorNumber < 1) {
    throw Boom.badRequest(reportsError.CONDUCTOR_NUMBER_REQURED);
  }
  return ConductorNumberAnalysisModel.findOne({ language, conductorNumber });
}

export { getConductorNumberAnalysis };
