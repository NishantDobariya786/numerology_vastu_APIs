import { LuckyAndUnluckyColorsAnalysisModel } from "../../../modules/numerology/models/lucky-and-unlucky-color-analysis.model";

export function LuckyAndUnLuckyColorsAnalysisDataInsert() {
  return LuckyAndUnluckyColorsAnalysisModel.insertMany([
    {
      luckNumber: 1,
      language: "en",
      luckyColors: ["red", "green", "White", "Yellow"],
      unLuckyColors: ["Black"],
    },
    {
      luckNumber: 2,
      language: "en",
      luckyColors: ["White", "Red", "Green"],
      unLuckyColors: ["Black"],
    },
    {
      luckNumber: 3,
      language: "en",
      luckyColors: ["Yellow", "Red", "Green"],
      unLuckyColors: ["White"],
    },
    {
      luckNumber: 4,
      language: "en",
      luckyColors: ["White", "Red", "Green"],
      unLuckyColors: [],
    },
    {
      luckNumber: 5,
      language: "en",
      luckyColors: ["Green", "White", "Red"],
      unLuckyColors: [],
    },
    {
      luckNumber: 6,
      language: "en",
      luckyColors: ["White", "Red", "Green"],
      unLuckyColors: ["Yellow"],
    },
    {
      luckNumber: 7,
      language: "en",
      luckyColors: ["White", "Red", "Green"],
      unLuckyColors: [],
    },
    {
      luckNumber: 8,
      language: "en",
      luckyColors: ["Green", "White", "Grey"],
      unLuckyColors: ["Red"],
    },
    {
      luckNumber: 9,
      language: "en",
      luckyColors: ["Red", "Yellow", "Green"],
      unLuckyColors: ["White"],
    },
    {
      luckNumber: 1,
      language: "gu",
      luckyColors: ["લાલ", "લીલું", "સફેદ", "પીળું"],
      unLuckyColors: ["કાળું"],
    },
    {
      luckNumber: 2,
      language: "gu",
      luckyColors: ["સફેદ", "લાલ", "લીલું"],
      unLuckyColors: ["કાળું"],
    },
    {
      luckNumber: 3,
      language: "gu",
      luckyColors: ["પીળું", "લાલ", "લીલું"],
      unLuckyColors: ["સફેદ"],
    },
    {
      luckNumber: 4,
      language: "gu",
      luckyColors: ["સફેદ", "લાલ", "લીલું"],
      unLuckyColors: [],
    },
    {
      luckNumber: 5,
      language: "gu",
      luckyColors: ["લીલું", "સફેદ", "લાલ"],
      unLuckyColors: [],
    },
    {
      luckNumber: 6,
      language: "gu",
      luckyColors: ["સફેદ", "લાલ", "લીલું"],
      unLuckyColors: ["પીળું"],
    },
    {
      luckNumber: 7,
      language: "gu",
      luckyColors: ["સફેદ", "લાલ", "લીલું"],
      unLuckyColors: [],
    },
    {
      luckNumber: 8,
      language: "gu",
      luckyColors: ["લીલું", "સફેદ", "ધૂસર"],
      unLuckyColors: ["લાલ"],
    },
    {
      luckNumber: 9,
      language: "gu",
      luckyColors: ["લાલ", "પીળું", "લીલું"],
      unLuckyColors: ["સફેદ"],
    },
    {
      luckNumber: 1,
      language: "hi",
      luckyColors: ["लाल", "हरा", "सफेद", "पीला"],
      unLuckyColors: ["काला"],
    },
    {
      luckNumber: 2,
      language: "hi",
      luckyColors: ["सफेद", "लाल", "हरा"],
      unLuckyColors: ["काला"],
    },
    {
      luckNumber: 3,
      language: "hi",
      luckyColors: ["पीला", "लाल", "हरा"],
      unLuckyColors: ["सफेद"],
    },
    {
      luckNumber: 4,
      language: "hi",
      luckyColors: ["सफेद", "लाल", "हरा"],
      unLuckyColors: [],
    },
    {
      luckNumber: 5,
      language: "hi",
      luckyColors: ["हरा", "सफेद", "लाल"],
      unLuckyColors: [],
    },
    {
      luckNumber: 6,
      language: "hi",
      luckyColors: ["सफेद", "लाल", "हरा"],
      unLuckyColors: ["पीला"],
    },
    {
      luckNumber: 7,
      language: "hi",
      luckyColors: ["सफेद", "लाल", "हरा"],
      unLuckyColors: [],
    },
    {
      luckNumber: 8,
      language: "hi",
      luckyColors: ["हरा", "सफेद", "धूसर"],
      unLuckyColors: ["लाल"],
    },
    {
      luckNumber: 9,
      language: "hi",
      luckyColors: ["लाल", "पीला", "हरा"],
      unLuckyColors: ["सफेद"],
    },
  ]);
}
