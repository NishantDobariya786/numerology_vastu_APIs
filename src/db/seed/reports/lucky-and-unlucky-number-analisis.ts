import { LuckyAndUnluckyNumberAnalysisModel } from "../../../modules/numerology/models/lucky-and-unlucky-number-analysis.model";

export function LuckyAndUnLuckyNumberAnalysisDataInsert() {
  return LuckyAndUnluckyNumberAnalysisModel.insertMany([
    {
      luckNumber: 1,
      language: "en",
      luckyNumbers: ["9", "2", "5", "3", "6", "1"],
      unLuckyNumbers: ["8"],
    },
    {
      luckNumber: 1,
      language: "hi",
      luckyNumbers: ["९", "२", "५", "३", "६", "१"],
      unLuckyNumbers: ["८"],
    },
    {
      luckNumber: 1,
      language: "gu",
      luckyNumbers: ["૯", "૨", "૫", "૩", "૬", "૧"],
      unLuckyNumbers: ["૮"],
    },
    {
      luckNumber: 2,
      language: "en",
      luckyNumbers: ["1", "5", "3", "2"],
      unLuckyNumbers: ["8", "4", "9"],
    },
    {
      luckNumber: 2,
      language: "hi",
      luckyNumbers: ["१", "५", "३", "२"],
      unLuckyNumbers: ["८", "४", "९"],
    },
    {
      luckNumber: 2,
      language: "gu",
      luckyNumbers: ["૧", "૫", "૩", "૨"],
      unLuckyNumbers: ["૮", "૪", "૯"],
    },
    {
      luckNumber: 3,
      language: "en",
      luckyNumbers: ["1", "5", "3", "2"],
      unLuckyNumbers: ["6"],
    },
    {
      luckNumber: 3,
      language: "hi",
      luckyNumbers: ["१", "५", "३", "२"],
      unLuckyNumbers: ["६"],
    },
    {
      luckNumber: 3,
      language: "gu",
      luckyNumbers: ["૧", "૫", "૩", "૨"],
      unLuckyNumbers: ["૬"],
    },
    {
      luckNumber: 4,
      language: "en",
      luckyNumbers: ["7", "1", "5", "6"],
      unLuckyNumbers: ["4", "8", "2", "9"],
    },
    {
      luckNumber: 4,
      language: "hi",
      luckyNumbers: ["७", "१", "५", "६"],
      unLuckyNumbers: ["४", "८", "२", "९"],
    },
    {
      luckNumber: 4,
      language: "gu",
      luckyNumbers: ["૭", "૧", "૫", "૬"],
      unLuckyNumbers: ["૪", "૮", "૨", "૯"],
    },
    {
      luckNumber: 5,
      language: "en",
      luckyNumbers: ["1", "2", "3", "6", "5"],
      unLuckyNumbers: [],
    },
    {
      luckNumber: 5,
      language: "hi",
      luckyNumbers: ["१", "२", "३", "६", "५"],
      unLuckyNumbers: [],
    },
    {
      luckNumber: 5,
      language: "gu",
      luckyNumbers: ["૧", "૨", "૩", "૬", "૫"],
      unLuckyNumbers: [],
    },
    {
      luckNumber: 6,
      language: "en",
      luckyNumbers: ["1", "5", "7", "6"],
      unLuckyNumbers: ["3"],
    },
    {
      luckNumber: 6,
      language: "hi",
      luckyNumbers: ["१", "५", "७", "६"],
      unLuckyNumbers: ["३"],
    },
    {
      luckNumber: 6,
      language: "gu",
      luckyNumbers: ["૧", "૫", "૭", "૬"],
      unLuckyNumbers: ["૩"],
    },
    {
      luckNumber: 7,
      language: "en",
      luckyNumbers: ["4", "6", "1", "3", "5"],
      unLuckyNumbers: [],
    },
    {
      luckNumber: 7,
      language: "hi",
      luckyNumbers: ["४", "६", "१", "३", "५"],
      unLuckyNumbers: [],
    },
    {
      luckNumber: 7,
      language: "gu",
      luckyNumbers: ["૪", "૬", "૧", "૩", "૫"],
      unLuckyNumbers: [],
    },
    {
      luckNumber: 8,
      language: "en",
      luckyNumbers: ["5", "6", "3", "7"],
      unLuckyNumbers: ["1", "2", "4", "8"],
    },
    {
      luckNumber: 8,
      language: "hi",
      luckyNumbers: ["५", "६", "३", "७"],
      unLuckyNumbers: ["१", "२", "४", "८"],
    },
    {
      luckNumber: 8,
      language: "gu",
      luckyNumbers: ["૫", "૬", "૩", "૭"],
      unLuckyNumbers: ["૧", "૨", "૪", "૮"],
    },
    {
      luckNumber: 9,
      language: "en",
      luckyNumbers: ["1", "5", "3"],
      unLuckyNumbers: ["4", "2"],
    },
    {
      luckNumber: 9,
      language: "hi",
      luckyNumbers: ["१", "५", "३"],
      unLuckyNumbers: ["४", "२"],
    },
    {
      luckNumber: 9,
      language: "gu",
      luckyNumbers: ["૧", "૫", "૩"],
      unLuckyNumbers: ["૪", "૨"],
    },
  ]);
}
