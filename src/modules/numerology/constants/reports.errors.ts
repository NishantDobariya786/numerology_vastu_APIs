const reportsError = {
  NOT_VALID_REPORT_TYPE: "please give valid report type",
  DRIVER_NUMBER_REQURED: "driverNumber is not valid or not calculated",
  CONDUCTOR_NUMBER_REQURED: "conductorNumber is not valid or not calculated",
  DRIVER_NUMBER_AND_CONDUCTOR_NUMBER_REQURED:
    "conductorNumber and driverNumber both are required",
};

const reportsValidationError = {
  DRIVER_NUMBER_IS_REQURED: "please calculate driver number first",
  CONDUCTOR_NUMBER_IS_REQURED: "please calculate conductor number first",
  MOBILE_NUMBER_REQURED: "mobile number is not added in profile",
  COUNTRY_CODE_REQURED: "country codeis not added in profile",
};
export { reportsError, reportsValidationError };
