import {
  getNumbersLanguageObj,
  LanguageKey,
} from "../../../../language/constants/language.numbers";
import { translateNumbers } from "../../../../language/numbers.translate";
import {
  reducingToSingleDegitTemplate,
  sumOfValues,
  yourNumerologyNumberSumTemplate,
  yourNumerologyNumberTemplate,
} from "../../../../language/static.translate";
import { NameNumerologyEnum } from "../../constants/months.constant";

function senitizeUsername(username: string) {
  return username.toUpperCase().replace(/\s/g, "");
}

function sumNumerologyNumberOfString(
  numString: string,
  array: Array<string>,
  language: LanguageKey
) {
  let sum = 0;
  for (const num of numString) {
    sum += parseInt(num);
  }
  if (sum.toString().length == 2 && numString.length > 2) {
    array.push(sumOfValues(sum, language));
    return sumNumerologyNumberOfString(sum.toString(), array, language);
  }
  if (sum.toString().length == 2 && numString.length == 2) {
    array.push(
      reducingToSingleDegitTemplate(
        numString.toString()[0],
        numString.toString()[1],
        sum,
        language
      )
    );
    return sumNumerologyNumberOfString(sum.toString(), array, language);
  }
  if (sum.toString().length == 1 && numString.length == 2) {
    array.push(
      yourNumerologyNumberTemplate(numString[0], numString[1], sum, language)
    );
    return sum;
  }
  if (sum.toString().length == 1) {
    array.push(yourNumerologyNumberSumTemplate(sum, language));
    return sum;
  }
  return sum;
}

function calculateNumerologyNumberAndContent(
  numerologyArray: Array<number>,
  language: LanguageKey
) {
  const stringNumbers = numerologyArray.join("");
  const contentArray: Array<string> = [];

  const numerologyNumber = sumNumerologyNumberOfString(
    stringNumbers,
    contentArray,
    language
  );

  const [translateNumerologyNumber] = translateNumbers(
    [numerologyNumber.toString()],
    language
  );

  return { numerologyNumber: translateNumerologyNumber, contentArray };
}

function calculateNumerologyArray(userName: string, language: LanguageKey) {
  const numerologyTableArray: Array<any> = [];
  const numerologyNumbersArray: Array<number> = [];
  const languageObj = getNumbersLanguageObj[language];
  for (const character of userName) {
    numerologyTableArray.push({
      [character]: languageObj[NameNumerologyEnum[character]],
    });
    numerologyNumbersArray.push(NameNumerologyEnum[character]);
  }
  return { numerologyNumbersArray, numerologyTableArray };
}

function nameAnalysis(username: string, language: LanguageKey) {
  const userName = senitizeUsername(username);

  const { numerologyNumbersArray, numerologyTableArray } =
    calculateNumerologyArray(userName, language);

  const { numerologyNumber, contentArray } =
    calculateNumerologyNumberAndContent(numerologyNumbersArray, language);

  return { numerologyNumber, numerologyTableArray, contentArray };
}

export { nameAnalysis };
