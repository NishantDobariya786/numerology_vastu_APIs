import { MapType } from "./types";

const MonthEnum: any = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sept: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

const NameNumerologyEnum: MapType = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 8,
  G: 3,
  H: 5,
  I: 1,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 7,
  P: 8,
  Q: 1,
  R: 2,
  S: 3,
  T: 4,
  U: 6,
  V: 6,
  W: 6,
  X: 5,
  Y: 1,
  Z: 7,
} as const;

const AnalysisEnum = {
  NAME: "name_analysis",
  DRIVER_NUMBER: "driver_number_analysis",
  MOBILE_NUMBER: "mobile_number_analysis",
  MISSING_NUMBER: "missing_number_analysis",
  CONDUCTOR_NUMBER: "conductor_number_analysis",
  LUCKY_UNLUCKY_NUMBERS: "lucky_unlucky_number_analysis",
  LUCKY_UNLUCKY_COLORS: "lucky_unlucky_color_analysis",
  LUCKY_UNLUCKY_PROFESSION: "lucky_unlucky_profession_analysis",
  LUCKY_UNLUCKY_DAYS: "lucky_unlucky_days_analysis",
};

export { MonthEnum, AnalysisEnum, NameNumerologyEnum };
