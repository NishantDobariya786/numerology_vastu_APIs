type LanguageKey = "gu" | "hi" | "en";

type LanguageObject = {
  [key in LanguageKey]: {
    [key: string]: string;
  };
};
const getNumbersLanguageObj: LanguageObject = {
  gu: {
    0: "૦",
    1: "૧",
    2: "૨",
    3: "૩",
    4: "૪",
    5: "૫",
    6: "૬",
    7: "૭",
    8: "૮",
    9: "૯",
  },
  hi: {
    0: "૦",
    1: "१",
    2: "२",
    3: "३",
    4: "४",
    5: "५",
    6: "६",
    7: "७",
    8: "८",
    9: "९",
  },
  en: {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
  },
};

export { getNumbersLanguageObj, LanguageKey };
