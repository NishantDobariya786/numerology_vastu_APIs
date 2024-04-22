import { LanguageEnum } from "../modules/users/models/user.model";
import {
  getNumbersLanguageObj,
  LanguageKey,
} from "./constants/language.numbers";
import { translateNumbers } from "./numbers.translate";

function sumOfValues(sum: number | string, language: LanguageKey) {
  const [translatedSum] = translateNumbers([sum.toString()], language);
  switch (language) {
    case LanguageEnum.HINDI:
      return `मूल्यों का योग = ${translatedSum}`;
    case LanguageEnum.GUJARATI:
      return `મૂલ્યોનો સરવાળો = ${translatedSum}`;
    default:
      return `Sum of values = ${translatedSum}`;
  }
}

function reducingToSingleDegitTemplate(
  firstValue: number | string,
  secondValue: number | string,
  sum: number | string,
  language: LanguageKey
) {
  const [translatedFirstValue, translatedSecondValue, translatedSum] =
    translateNumbers(
      [firstValue.toString(), secondValue.toString(), sum.toString()],
      language
    );

  switch (language) {
    case LanguageEnum.HINDI:
      return `एकल अंक तक कम करना ${translatedFirstValue} + ${translatedSecondValue} = ${translatedSum}`;
    case LanguageEnum.GUJARATI:
      return `એક અંક સુધી ઘટાડવું ${translatedFirstValue} + ${translatedSecondValue} = ${translatedSum}`;
    default:
      return `Reducing to Single digit ${translatedFirstValue} + ${translatedSecondValue} = ${translatedSum}`;
  }
}

function yourNumerologyNumberTemplate(
  firstValue: number | string,
  secondValue: number | string,
  sum: number | string,
  language: LanguageKey
) {
  const [translatedFirstValue, translatedSecondValue, translatedSum] =
    translateNumbers(
      [firstValue.toString(), secondValue.toString(), sum.toString()],
      language
    );

  switch (language) {
    case LanguageEnum.HINDI:
      return `आपके नाम का मूलांक ${translatedFirstValue} + ${translatedSecondValue} = ${translatedSum} है|`;
    case LanguageEnum.GUJARATI:
      return `તમારા નામનો અંકશાસ્ત્ર નંબર ${translatedFirstValue} + ${translatedSecondValue} = ${translatedSum} છે.`;
    default:
      return `Your name\`s numerology number is = ${translatedFirstValue} + ${translatedSecondValue} = ${translatedSum}`;
  }
}

function yourNumerologyNumberSumTemplate(
  sum: number | string,
  language: LanguageKey
) {
  const [translatedSum] = translateNumbers([sum.toString()], language);

  switch (language) {
    case LanguageEnum.HINDI:
      return `आपके नाम का मूलांक = ${translatedSum} है|`;
    case LanguageEnum.GUJARATI:
      return `તમારા નામનો અંકશાસ્ત્ર નંબર = ${translatedSum} છે.`;
    default:
      return `Your name\`s numerology number is = ${translatedSum}`;
  }
}

export {
  sumOfValues,
  reducingToSingleDegitTemplate,
  yourNumerologyNumberTemplate,
  yourNumerologyNumberSumTemplate,
};
