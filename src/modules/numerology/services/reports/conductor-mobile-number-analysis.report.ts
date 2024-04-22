import { LanguageKey } from "../../../../language/constants/language.numbers";
import { translateNumbers } from "../../../../language/numbers.translate";
import { sumNumbersOfString } from "../numerology.service";

function getMobileNumberAnalysis(
  mobileNumber: number | string,
  countryCode: string,
  language: LanguageKey
) {
  let mobileNumberAnalysisNumber: number | string = sumNumbersOfString(
    mobileNumber.toString()
  );

  const [
    translatedAnalysisNumber,
    translatedMobileNumber,
    translatedCountryCode,
  ] = translateNumbers(
    [
      mobileNumberAnalysisNumber.toString(),
      mobileNumber.toString(),
      countryCode.toString(),
    ],
    language
  );

  return {
    mobileNumberAnalysisNumber: translatedAnalysisNumber,
    mobileNumber: translatedMobileNumber,
    countryCode: translatedCountryCode,
  };
}

export { getMobileNumberAnalysis };
