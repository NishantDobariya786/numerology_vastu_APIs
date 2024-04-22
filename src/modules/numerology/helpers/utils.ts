import { FlattenMaps } from "mongoose";
import { LuckyAndUnluckyProfessionsAnalysisDocument } from "../models/lucky-and-unlucky-profession-analysis.model";
import { LuckyAndUnluckyDaysAnalysisDocument } from "../models/lucky-and-unlucky-day-analysis.model";

function profassionArrayFormate(
  array: Array<FlattenMaps<LuckyAndUnluckyProfessionsAnalysisDocument>>
) {
  return array.map((obj) => obj.profession);
}

function daysArrayFormate(
  array: Array<FlattenMaps<LuckyAndUnluckyDaysAnalysisDocument>>
) {
  return array.map((obj) => obj.day);
}

export { profassionArrayFormate, daysArrayFormate };
