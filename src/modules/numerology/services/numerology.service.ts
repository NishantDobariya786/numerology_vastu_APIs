import Boom from "@hapi/boom";
import { MonthEnum } from "../constants/months.constant";
import { GenderEnum } from "../../users/models/user.model";
import { MapTypeString } from "../constants/types";
import {
  getNumbersLanguageObj,
  LanguageKey,
} from "../../../language/constants/language.numbers";

function sumNumbersOfString(numString: string) {
  let sum = 0;
  for (const num of numString) {
    sum += parseInt(num);
  }
  if (sum.toString().length > 1) {
    sum = sumNumbersOfString(sum.toString());
  }
  return sum;
}

function dateToStringOfNumbers(date: Date) {
  const day = date.getDate().toString();
  const month = date.toLocaleString("default", { month: "short" });
  const monthNumber = MonthEnum[month] as string;
  const year = date.getFullYear().toString();
  return day + monthNumber + year;
}

function getMaleKuaNumber(number: number) {
  return 11 - number;
}

function getFemaleKuaNumber(number: number) {
  return 4 + number;
}

function calculateDriverNumber(date: Date) {
  const day = date.getDate();
  var numString = day.toString();

  return sumNumbersOfString(numString).toString();
}

function calculateConductorNumber(date: Date) {
  const fullDate = dateToStringOfNumbers(date);
  return sumNumbersOfString(fullDate).toString();
}

function calculateKuaNumber(date: Date, gender: String) {
  const year = date.getFullYear().toString();
  let number = sumNumbersOfString(year);
  switch (gender) {
    case GenderEnum.MALE:
      number = getMaleKuaNumber(number);
      break;
    case GenderEnum.FEMALE:
      number = getFemaleKuaNumber(number);
      break;
    default:
      throw Boom.badData("gender not valid");
  }
  return number.toString();
}

function calculateLoshuGridNumbers(date: Date, language: LanguageKey) {
  const fullDate = dateToStringOfNumbers(date);

  const map: MapTypeString = {
    "1": "",
    "2": "",
    "3": "",
    "4": "",
    "5": "",
    "6": "",
    "7": "",
    "8": "",
    "9": "",
  };

  const languageObj = getNumbersLanguageObj[language];

  for (const number of fullDate) {
    if (map.hasOwnProperty(number)) {
      //@ts-ignore
      map[number] =
        (map[number] ? map[number].toString() : "") +
        languageObj[number.toString()];
    }
  }
  return map;
}

export {
  calculateKuaNumber,
  calculateConductorNumber,
  calculateDriverNumber,
  calculateLoshuGridNumbers,
  sumNumbersOfString,
};
