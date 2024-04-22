import Boom from "@hapi/boom";
import { reportsError } from "../../constants/reports.errors";
import { LuckyAndUnluckyNumberAnalysisModel } from "../../models/lucky-and-unlucky-number-analysis.model";
import {
  driverNumberConductorNumberValidation,
  subtractArrays,
  unionArrays,
} from "../../../../helpers/util";

function getLuckyUnluckyNumbers(
  driverNumber: number,
  conductorNumber: number,
  language: string
) {
  return LuckyAndUnluckyNumberAnalysisModel.find({
    language: language,
    luckNumber: { $in: [driverNumber, conductorNumber] },
  }).lean();
}

async function getLuckyUnluckyNumbersAnalysis(
  driverNumber: number,
  conductorNumber: number,
  language: string
) {
  driverNumberConductorNumberValidation(driverNumber, conductorNumber);

  const luckyUnluckyNumbers = await getLuckyUnluckyNumbers(
    driverNumber,
    conductorNumber,
    language
  );

  if (luckyUnluckyNumbers.length !== 2) {
    throw Boom.badData(reportsError.DRIVER_NUMBER_AND_CONDUCTOR_NUMBER_REQURED);
  }

  const document1 = luckyUnluckyNumbers[0];
  const document2 = luckyUnluckyNumbers[1];

  const luckyNumbers = unionArrays(
    document1.luckyNumbers,
    document2.luckyNumbers
  );

  const unLuckyNumbers = unionArrays(
    document1.unLuckyNumbers,
    document2.unLuckyNumbers
  );

  const finalLuckyNumbers = subtractArrays(luckyNumbers, unLuckyNumbers);

  return { luckyNumbers: finalLuckyNumbers, unLuckyNumbers };
}

export { getLuckyUnluckyNumbersAnalysis, getLuckyUnluckyNumbers };
