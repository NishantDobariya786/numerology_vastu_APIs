import Boom from "@hapi/boom";
import { MonthEnum } from "../constants/months.constant";
import { GenderEnum } from "../../users/models/user.model";
import { MapType } from "../constants/types";

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

  return sumNumbersOfString(numString);
}

function calculateCountOfDateNumber(dateString: string) {
  const map: MapType = {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
  };

  for (const number of dateString) {
    if (map.hasOwnProperty(number)) {
      map[number] = map[number] + 1;
    }
  }
  return map;
}

function calculateConductorNumber(date: Date) {
  const fullDate = dateToStringOfNumbers(date);
  return sumNumbersOfString(fullDate);
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
  return number;
}

function calculateLoshuGridNumbers(date: Date) {
  const fullDate = dateToStringOfNumbers(date);
  return calculateCountOfDateNumber(fullDate);
}

export {
  calculateKuaNumber,
  calculateConductorNumber,
  calculateDriverNumber,
  calculateLoshuGridNumbers,
};
