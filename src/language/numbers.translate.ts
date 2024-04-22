import { LanguageEnum } from "../modules/users/models/user.model";
import {
  getNumbersLanguageObj,
  LanguageKey,
} from "./constants/language.numbers";

function translateNumbers(arrayNumbers: Array<string>, language: LanguageKey) {
  const array: Array<string> = [];
  const languageObj = getNumbersLanguageObj[language];
  if (!languageObj) return arrayNumbers;
  for (let index = 0; index < arrayNumbers.length; index++) {
    for (const number of arrayNumbers[index]) {
      if (languageObj[number]) {
        array[index] = (array[index] ? array[index] : "") + languageObj[number];
        continue;
      }
      array[index] = (array[index] ? array[index] : "") + number;
    }
  }

  return array;
}

function translateLatters(arrayString: Array<string>, language: LanguageKey) {
  const array: Array<string> = [];
  const languageObj = getNumbersLanguageObj[language];
  for (let index = 0; index < arrayString.length; index++) {
    for (const latter of arrayString[index]) {
      if (languageObj[latter]) {
        array[index] = (array[index] ? array[index] : "") + languageObj[latter];
        continue;
      }
      array[index] = (array[index] ? array[index] : "") + latter;
    }
  }

  return array;
}

export { translateNumbers };
