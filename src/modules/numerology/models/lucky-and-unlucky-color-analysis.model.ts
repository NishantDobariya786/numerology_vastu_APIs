import mongoose, { Schema } from "mongoose";

interface LuckyAndUnluckyColorsAnalysisDocument extends Document {
  luckNumber: Number;
  language: string;
  luckyColors: Array<string>;
  unLuckyColors: Array<string>;
}

const luckyAndUnluckyColorsAnalysisSchema =
  new Schema<LuckyAndUnluckyColorsAnalysisDocument>(
    {
      luckNumber: {
        type: Number,
        required: true,
      },
      language: {
        type: String,
        required: true,
      },
      luckyColors: {
        type: [String],
        required: true,
      },
      unLuckyColors: {
        type: [String],
        required: true,
      },
    },
    { timestamps: true }
  );

luckyAndUnluckyColorsAnalysisSchema.index(
  { language: 1, luckNumber: 1 },
  { unique: true }
);

const LuckyAndUnluckyColorsAnalysisModel =
  mongoose.model<LuckyAndUnluckyColorsAnalysisDocument>(
    "luckyAndUnluckyColorsAnalysis",
    luckyAndUnluckyColorsAnalysisSchema
  );

export {
  LuckyAndUnluckyColorsAnalysisModel,
  LuckyAndUnluckyColorsAnalysisDocument,
};
