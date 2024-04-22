import { driverNumberConductorNumberValidation } from "../../../../helpers/util";
import { LanguageEnum } from "../../../users/models/user.model";
import { profassionArrayFormate } from "../../helpers/utils";
import { LuckyAndUnluckyProfessionsAnalysisModel } from "../../models/lucky-and-unlucky-profession-analysis.model";
import { getLuckyUnluckyNumbersAnalysis } from "./lucky-unlucky-number-analysis.report";

function getLuckyUnluckyProfession(
  luckNumbers: Array<string>,
  language: string
) {
  return LuckyAndUnluckyProfessionsAnalysisModel.find({
    language: language,
    luckNumber: { $in: luckNumbers },
  }).lean();
}

async function getLuckyUnluckyProfessionAnalysis(
  driverNumber: number,
  conductorNumber: number,
  language: string
) {
  driverNumberConductorNumberValidation(driverNumber, conductorNumber);

  const { luckyNumbers, unLuckyNumbers } = await getLuckyUnluckyNumbersAnalysis(
    driverNumber,
    conductorNumber,
    LanguageEnum.ENGLISH
  );

  const [luckyProfession, unluckyProfession] = await Promise.all([
    getLuckyUnluckyProfession(luckyNumbers, language),
    getLuckyUnluckyProfession(unLuckyNumbers, language),
  ]);

  const luckyProfessionArray = profassionArrayFormate(luckyProfession);
  const unLuckyProfessionArray = profassionArrayFormate(unluckyProfession);

  return {
    luckyProfession: luckyProfessionArray,
    unLuckyProfession: unLuckyProfessionArray,
  };
}

export { getLuckyUnluckyProfessionAnalysis };
