import Boom from "@hapi/boom";
import { getLuckyUnluckyNumbers } from "./lucky-unlucky-number-analysis.report";
import { reportsError } from "../../constants/reports.errors";
import { unionArrays } from "../../../../helpers/util";
import { LanguageEnum } from "../../../users/models/user.model";
import { LuckyAndUnluckyDaysAnalysisModel } from "../../models/lucky-and-unlucky-day-analysis.model";
import { daysArrayFormate } from "../../helpers/utils";

function getUnLuckyDays(luckNumbers: Array<string>, language: string) {
  return LuckyAndUnluckyDaysAnalysisModel.find({
    language: language,
    luckNumber: { $in: luckNumbers },
  }).lean();
}

function getLuckyDays(driverNumber: number, language: string) {
  return LuckyAndUnluckyDaysAnalysisModel.find({
    language: language,
    luckNumber: driverNumber,
  }).lean();
}

async function getLuckyUnluckyDaysAnalysis(
  driverNumber: number,
  conductorNumber: number,
  language: string
) {
  const luckyUnluckyNumbers = await getLuckyUnluckyNumbers(
    driverNumber,
    conductorNumber,
    LanguageEnum.ENGLISH
  );

  if (luckyUnluckyNumbers.length !== 2) {
    throw Boom.badData(reportsError.DRIVER_NUMBER_AND_CONDUCTOR_NUMBER_REQURED);
  }

  const document1 = luckyUnluckyNumbers[0];
  const document2 = luckyUnluckyNumbers[1];

  const unLuckyNumbers = unionArrays(
    document1.unLuckyNumbers,
    document2.unLuckyNumbers
  );

  const [luckyDays, unLuckyDays] = await Promise.all([
    getLuckyDays(driverNumber, language),
    getUnLuckyDays(unLuckyNumbers, language),
  ]);

  const luckyDaysArray = daysArrayFormate(luckyDays);
  const unLuckyDaysArray = daysArrayFormate(unLuckyDays);

  return { luckyDays: luckyDaysArray, unLuckyDays: unLuckyDaysArray };
}

export { getLuckyUnluckyDaysAnalysis, getLuckyUnluckyNumbers };
