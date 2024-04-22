import { ReqRefDefaults, Request, ResponseToolkit } from "@hapi/hapi";
import { AnalysisEnum } from "../constants/months.constant";
import { updateUserProfile } from "../../users/services/user.service";
import {
  calculateConductorNumber,
  calculateDriverNumber,
  calculateKuaNumber,
  calculateLoshuGridNumbers,
} from "../services/numerology.service";
import { nameAnalysis } from "../services/reports/name-analysis.report";
import { getDriverNumberAnalysis } from "../services/reports/driver-number-analysis.report";
import { getConductorNumberAnalysis } from "../services/reports/conductor-number-analysis.report";
import Boom from "@hapi/boom";
import { reportsError } from "../constants/reports.errors";
import { getLuckyUnluckyNumbersAnalysis } from "../services/reports/lucky-unlucky-number-analysis.report";
import { getLuckyUnluckyColorsAnalysis } from "../services/reports/lucky-unlucky-color-analysis.report";
import { getLuckyUnluckyProfessionAnalysis } from "../services/reports/lucky-unlucky-profession-analysis.report";
import { getLuckyUnluckyDaysAnalysis } from "../services/reports/lucky-unlucky-days-analysis.report";
import { getMobileNumberAnalysis } from "../services/reports/conductor-mobile-number-analysis.report";
import { getMissingNumberAnalysis } from "../services/reports/missing-number-analysis.report";
import { translateNumbers } from "../../../language/numbers.translate";
import { reportValidator } from "../validators/report.validator";

async function getLoshuGridDataController(
  request: Request<ReqRefDefaults>,
  response: ResponseToolkit<ReqRefDefaults>
) {
  const { credentials: user } = request.auth as any;

  const loshuGrid = calculateLoshuGridNumbers(user.dateOfBirth, user.language);

  const driverNumber = calculateDriverNumber(user.dateOfBirth);

  const conductorNumber = calculateConductorNumber(user.dateOfBirth);

  const kuaNumber = calculateKuaNumber(user.dateOfBirth, user.gender);

  await updateUserProfile(user._id, {
    loshuGrid,
    driverNumber,
    conductorNumber,
    kuaNumber,
  });

  const [
    translatedDriverNumber,
    translatedDonductorNumber,
    translatedKuaNumber,
  ] = translateNumbers(
    [driverNumber.toString(), conductorNumber.toString(), kuaNumber.toString()],
    user.language
  );

  return response
    .response({
      statusCode: 200,
      responseMsg:
        "driverNumber, conductorNumber, kuaNumber and LoshuGrid calculated SuccessFully",
      data: {
        loshuGrid,
        driverNumber: translatedDriverNumber,
        conductorNumber: translatedDonductorNumber,
        kuaNumber: translatedKuaNumber,
      },
    })
    .code(200);
}

async function getReportsAnalysisController(
  request: Request<ReqRefDefaults>,
  response: ResponseToolkit<ReqRefDefaults>
) {
  const { reportType } = request.params;
  const { credentials: user } = request.auth as any;

  reportValidator(user);

  const driverNumber = parseInt(user?.driverNumber);
  const conductorNumber = parseInt(user?.conductorNumber);

  let data: any;
  switch (reportType) {
    case AnalysisEnum.NAME:
      data = nameAnalysis(user?.username, user?.language);
      break;
    case AnalysisEnum.DRIVER_NUMBER:
      data = await getDriverNumberAnalysis(driverNumber, user?.language);
      break;
    case AnalysisEnum.CONDUCTOR_NUMBER:
      data = await getConductorNumberAnalysis(conductorNumber, user?.language);
      break;
    case AnalysisEnum.MISSING_NUMBER:
      data = await getMissingNumberAnalysis(user?.loshuGrid, user?.language);
      break;
    case AnalysisEnum.LUCKY_UNLUCKY_NUMBERS:
      data = await getLuckyUnluckyNumbersAnalysis(
        driverNumber,
        conductorNumber,
        user?.language
      );
      break;
    case AnalysisEnum.LUCKY_UNLUCKY_COLORS:
      data = await getLuckyUnluckyColorsAnalysis(
        driverNumber,
        conductorNumber,
        user?.language
      );
      break;
    case AnalysisEnum.LUCKY_UNLUCKY_PROFESSION:
      data = await getLuckyUnluckyProfessionAnalysis(
        driverNumber,
        conductorNumber,
        user?.language
      );
      break;
    case AnalysisEnum.LUCKY_UNLUCKY_DAYS:
      data = await getLuckyUnluckyDaysAnalysis(
        driverNumber,
        conductorNumber,
        user?.language
      );
      break;
    case AnalysisEnum.MOBILE_NUMBER:
      data = getMobileNumberAnalysis(
        user?.mobileNumber,
        user?.countryCode,
        user?.language
      );
      break;
    default:
      throw Boom.badData(reportsError.NOT_VALID_REPORT_TYPE);
  }

  return response
    .response({
      statusCode: 200,
      responseMsg: `${reportType} report generated successFully`,
      data: data,
    })
    .code(200);
}

export { getReportsAnalysisController, getLoshuGridDataController };
