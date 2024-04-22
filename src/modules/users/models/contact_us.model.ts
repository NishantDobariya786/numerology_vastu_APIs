import mongoose, { Document, Schema } from "mongoose";
import { MapTypeString } from "../../numerology/constants/types";

interface ContactUsDocument extends Document {
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  message: MapTypeString;
  subject: string;
}

const contactUsSchema = new Schema<ContactUsDocument>(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ContactUsModel = mongoose.model<ContactUsDocument>(
  "Contact_US",
  contactUsSchema
);

export { ContactUsModel, ContactUsDocument };
