import mongoose, { Schema } from "mongoose";

interface LuckyAndUnluckyDaysAnalysisDocument extends Document {
  luckNumber: Number;
  day: string;
  language: string;
}

const luckyAndUnluckyDaysAnalysisSchema =
  new Schema<LuckyAndUnluckyDaysAnalysisDocument>(
    {
      luckNumber: {
        type: Number,
        required: true,
      },
      language: {
        type: String,
        required: true,
      },
      day: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

luckyAndUnluckyDaysAnalysisSchema.index(
  { language: 1, luckNumber: 1 },
  { unique: true }
);

const LuckyAndUnluckyDaysAnalysisModel =
  mongoose.model<LuckyAndUnluckyDaysAnalysisDocument>(
    "luckyAndUnluckyDaysAnalysis",
    luckyAndUnluckyDaysAnalysisSchema
  );

export {
  LuckyAndUnluckyDaysAnalysisModel,
  LuckyAndUnluckyDaysAnalysisDocument,
};
