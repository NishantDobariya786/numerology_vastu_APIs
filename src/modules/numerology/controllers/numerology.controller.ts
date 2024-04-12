import { ReqRefDefaults, Request, ResponseToolkit } from "@hapi/hapi";
import { AnalysisEnum } from "../constants/months.constant";
import {
  getUserById,
  updateUserProfile,
} from "../../users/services/user.service";
import Boom from "@hapi/boom";
import { error } from "../../../config/errors";
import {
  calculateConductorNumber,
  calculateDriverNumber,
  calculateKuaNumber,
  calculateLoshuGridNumbers,
} from "../services/numerology.service";

async function getAnalysisController(
  request: Request<ReqRefDefaults>,
  response: ResponseToolkit<ReqRefDefaults>
) {
  const { analysis } = request.params;

  switch (analysis) {
    case AnalysisEnum.DRIVER_NUMBER:
      break;

    default:
      break;
  }

  return response
    .response({
      statusCode: 200,
      responseMsg: "OTP Email Sent SuccessFully",
    })
    .code(200);
}

async function getLoshuGridDataController(
  request: Request<ReqRefDefaults>,
  response: ResponseToolkit<ReqRefDefaults>
) {
  const { credentials: user } = request.auth as any;

  const loshuGrid = calculateLoshuGridNumbers(user.dateOfBirth);

  const driverNumber = calculateDriverNumber(user.dateOfBirth);

  const conductorNumber = calculateConductorNumber(user.dateOfBirth);

  const kuaNumber = calculateKuaNumber(user.dateOfBirth, user.gender);

  await updateUserProfile(user._id, {
    loshuGrid,
    driverNumber,
    conductorNumber,
    kuaNumber,
  });

  return response
    .response({
      statusCode: 200,
      responseMsg:
        "driverNumber, conductorNumber, kuaNumber and LoshuGrid calculated SuccessFully",
      data: {
        loshuGrid,
        driverNumber,
        conductorNumber,
        kuaNumber,
      },
    })
    .code(200);
}
export { getAnalysisController, getLoshuGridDataController };
