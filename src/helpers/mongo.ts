import mongoose from "mongoose";
import { error } from "../config/errors";

function getObjectId(id: string) {
  if (!mongoose.isValidObjectId(id)) {
    throw Error(error.INVALID_OBJECT_ID);
  }
  return new mongoose.Types.ObjectId(id);
}

function validateObjectId(value: any, helpers: any) {
  if (!mongoose.isValidObjectId(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}

export { getObjectId, validateObjectId };
