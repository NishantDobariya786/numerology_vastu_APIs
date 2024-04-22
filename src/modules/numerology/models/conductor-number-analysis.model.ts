import mongoose, { Schema } from "mongoose";

interface ConductorNumberAnalysisDocument extends Document {
  conductorNumber: Number;
  title: string;
  mainContent: Array<String>;
  subContent: Array<String>;
  subTitle: string;
  mainTitle: string;
  language: String;
}

const conductorNumberAnalysisSchema =
  new Schema<ConductorNumberAnalysisDocument>(
    {
      conductorNumber: {
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
      subTitle: {
        type: String,
        required: true,
      },
      mainContent: {
        type: [String],
        required: true,
      },
      subContent: {
        type: [String],
        required: true,
      },
    },
    { timestamps: true }
  );

conductorNumberAnalysisSchema.index(
  { language: 1, conductorNumber: 1 },
  { unique: true }
);

const ConductorNumberAnalysisModel =
  mongoose.model<ConductorNumberAnalysisDocument>(
    "conductorNumberAnalysis",
    conductorNumberAnalysisSchema
  );

export { ConductorNumberAnalysisModel, ConductorNumberAnalysisDocument };
