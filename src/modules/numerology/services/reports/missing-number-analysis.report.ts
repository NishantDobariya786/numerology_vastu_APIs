import Boom from "@hapi/boom";
import { MapTypeString } from "../../constants/types";
import { MissingNumberAnalysisModel } from "../../models/missing-number-analysis.model";

function getMissingNumbers(missingNumbers: Array<number>, language: string) {
  return MissingNumberAnalysisModel.find({
    missingNumber: { $in: missingNumbers },
    language: language,
  }).lean();
}

async function getMissingNumberAnalysis(
  loshuGrid: MapTypeString,
  language: string
) {
  if (!loshuGrid) {
    throw Boom.badRequest("LoshuGrid is not calculated do that first!!");
  }
  const missingNumbers = Object.keys(loshuGrid)
    .filter((key) => loshuGrid[key] === "")
    .map((key) => parseInt(key, 10));

  const missingNumberAnalysis = await getMissingNumbers(
    missingNumbers,
    language
  );

  return { missingNumberAnalysis, loshuGrid };
}

export { getMissingNumberAnalysis };
