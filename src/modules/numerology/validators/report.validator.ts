import Boom from "@hapi/boom";
import { UserDocument } from "../../users/models/user.model";
import { reportsValidationError } from "../constants/reports.errors";

function reportValidator(user: Partial<UserDocument>) {
  if (!user.driverNumber) {
    throw Boom.badData(reportsValidationError.DRIVER_NUMBER_IS_REQURED);
  }
  if (!user.conductorNumber) {
    throw Boom.badData(reportsValidationError.CONDUCTOR_NUMBER_IS_REQURED);
  }
  if (!user.mobileNumber) {
    throw Boom.badData(reportsValidationError.MOBILE_NUMBER_REQURED);
  }
  if (!user.countryCode) {
    throw Boom.badData(reportsValidationError.COUNTRY_CODE_REQURED);
  }
}

export { reportValidator };
