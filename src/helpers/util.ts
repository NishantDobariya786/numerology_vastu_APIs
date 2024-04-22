import Boom from "@hapi/boom";
import { reportsError } from "../modules/numerology/constants/reports.errors";
import { LanguageEnum } from "../modules/users/models/user.model";
import { gujaratiNumerals } from "../constants/numbers";

function isBoolean(value: any): boolean {
  return typeof value === "boolean";
}

function unionArrays<T>(array1: Array<T>, array2: Array<T>) {
  return Array.from(new Set([...array1, ...array2]));
}

function subtractArrays<T>(array1: Array<T>, array2: Array<T>) {
  return array1.filter((item) => !array2.includes(item));
}

function driverNumberConductorNumberValidation(
  driverNumber: number,
  conductorNumber: number
) {
  if (!driverNumber || driverNumber > 9 || driverNumber < 1) {
    throw Boom.badRequest(reportsError.DRIVER_NUMBER_REQURED);
  }

  if (!conductorNumber || conductorNumber > 9 || conductorNumber < 1) {
    throw Boom.badRequest(reportsError.CONDUCTOR_NUMBER_REQURED);
  }
}

function gujaratiToEnligshNumbers(numbers: Array<string>) {
  const newNumbers: Array<string> = [];
  for (const number of numbers) {
    //@ts-ignore
    newNumbers.push(gujaratiNumerals[number]);
  }
  return newNumbers;
}

function convertNumbersToEnglishLanugage(
  numbers: Array<string>,
  language: string
) {
  switch (language) {
    case LanguageEnum.GUJARATI:
      return gujaratiToEnligshNumbers(numbers);
    case LanguageEnum.HINDI:
      return gujaratiToEnligshNumbers(numbers);
    default:
      return numbers;
  }
}

export {
  isBoolean,
  unionArrays,
  subtractArrays,
  convertNumbersToEnglishLanugage,
  driverNumberConductorNumberValidation,
};
