import mongoose, { Schema } from "mongoose";

interface LuckyAndUnluckyProfessionsAnalysisDocument extends Document {
  luckNumber: Number;
  profession: string;
  language: string;
}

const luckyAndUnluckyProfessionsAnalysisSchema =
  new Schema<LuckyAndUnluckyProfessionsAnalysisDocument>(
    {
      luckNumber: {
        type: Number,
        required: true,
      },
      language: {
        type: String,
        required: true,
      },
      profession: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

luckyAndUnluckyProfessionsAnalysisSchema.index(
  { language: 1, luckNumber: 1 },
  { unique: true }
);

const LuckyAndUnluckyProfessionsAnalysisModel =
  mongoose.model<LuckyAndUnluckyProfessionsAnalysisDocument>(
    "luckyAndUnluckyProfessionsAnalysis",
    luckyAndUnluckyProfessionsAnalysisSchema
  );

export {
  LuckyAndUnluckyProfessionsAnalysisModel,
  LuckyAndUnluckyProfessionsAnalysisDocument,
};
