import Boom from "@hapi/boom";
import { reportsError } from "../../constants/reports.errors";
import {
  driverNumberConductorNumberValidation,
  subtractArrays,
  unionArrays,
} from "../../../../helpers/util";
import { LuckyAndUnluckyColorsAnalysisModel } from "../../models/lucky-and-unlucky-color-analysis.model";

function getLuckyUnluckyColors(
  driverNumber: number,
  conductorNumber: number,
  language: string
) {
  return LuckyAndUnluckyColorsAnalysisModel.find({
    language: language,
    luckNumber: { $in: [driverNumber, conductorNumber] },
  }).lean();
}

async function getLuckyUnluckyColorsAnalysis(
  driverNumber: number,
  conductorNumber: number,
  language: string
) {
  driverNumberConductorNumberValidation(driverNumber, conductorNumber);

  const luckyUnluckyColors = await getLuckyUnluckyColors(
    driverNumber,
    conductorNumber,
    language
  );

  if (luckyUnluckyColors.length !== 2) {
    throw Boom.badData(reportsError.DRIVER_NUMBER_AND_CONDUCTOR_NUMBER_REQURED);
  }

  const document1 = luckyUnluckyColors[0];
  const document2 = luckyUnluckyColors[1];

  const luckyColors = unionArrays(document1.luckyColors, document2.luckyColors);

  const unLuckyColors = unionArrays(
    document1.unLuckyColors,
    document2.unLuckyColors
  );

  const finalLuckyNumbers = subtractArrays(luckyColors, unLuckyColors);

  return { luckyColors: finalLuckyNumbers, unLuckyColors: unLuckyColors };
}

export { getLuckyUnluckyColorsAnalysis };
