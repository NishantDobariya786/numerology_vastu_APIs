import mongoose, { Schema } from "mongoose";

interface DriverNumberAnalysisDocument extends Document {
  driverNumber: Number;
  title: string;
  mainContent: Array<String>;
  subContent: Array<String>;
  subTitle: string;
  mainTitle: string;
  language: string;
}

const driverNumberAnalysisSchema = new Schema<DriverNumberAnalysisDocument>(
  {
    driverNumber: {
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

driverNumberAnalysisSchema.index(
  { language: 1, driverNumber: 1 },
  { unique: true }
);

const DriverNumberAnalysisModel = mongoose.model<DriverNumberAnalysisDocument>(
  "driverNumberAnalysis",
  driverNumberAnalysisSchema
);

export { DriverNumberAnalysisModel, DriverNumberAnalysisDocument };
