import mongoose, { Schema } from "mongoose";

interface MissingNumberAnalysisDocument extends Document {
  missingNumber: number;
  title: string;
  mainContent: Array<string>;
  subContent: Array<string>;
  subTitle: string;
  mainTitle: string;
  language: string;
}

const missingNumberAnalysisSchema = new Schema<MissingNumberAnalysisDocument>(
  {
    missingNumber: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    mainTitle: {
      type: String,
      required: true,
    },
    mainContent: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

missingNumberAnalysisSchema.index(
  { language: 1, missingNumber: 1 },
  { unique: true }
);

const MissingNumberAnalysisModel =
  mongoose.model<MissingNumberAnalysisDocument>(
    "missingNumberAnalysis",
    missingNumberAnalysisSchema
  );

export { MissingNumberAnalysisModel, MissingNumberAnalysisDocument };
