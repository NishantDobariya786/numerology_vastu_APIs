import mongoose, { Schema } from "mongoose";

interface LuckyAndUnluckyNumbersAnalysisDocument extends Document {
  luckNumber: Number;
  luckyNumbers: Array<string>;
  unLuckyNumbers: Array<string>;
  language: string;
}

const luckyAndUnluckyNumbersAnalysisSchema =
  new Schema<LuckyAndUnluckyNumbersAnalysisDocument>(
    {
      luckNumber: {
        type: Number,
        required: true,
      },
      language: {
        type: String,
        required: true,
      },
      luckyNumbers: {
        type: [String],
        required: true,
      },
      unLuckyNumbers: {
        type: [String],
        required: true,
      },
    },
    { timestamps: true }
  );

luckyAndUnluckyNumbersAnalysisSchema.index(
  { language: 1, luckNumber: 1 },
  { unique: true }
);

const LuckyAndUnluckyNumberAnalysisModel =
  mongoose.model<LuckyAndUnluckyNumbersAnalysisDocument>(
    "luckyAndUnluckyNumbersAnalysis",
    luckyAndUnluckyNumbersAnalysisSchema
  );

export {
  LuckyAndUnluckyNumberAnalysisModel,
  LuckyAndUnluckyNumbersAnalysisDocument,
};
