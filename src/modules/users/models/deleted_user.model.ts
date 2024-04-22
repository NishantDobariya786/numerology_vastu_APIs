import mongoose, { Schema } from "mongoose";

interface DeletedUserDocument extends Document {
  data: Object;
  email: string;
  reason: String;
}

const deletedUserSchema = new Schema<DeletedUserDocument>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    reason: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

deletedUserSchema.index({ session: 1 }, { expireAfterSeconds: 60 });

const DeletedUserModel = mongoose.model<DeletedUserDocument>(
  "DeletedUser",
  deletedUserSchema
);

export { DeletedUserModel, DeletedUserDocument };
