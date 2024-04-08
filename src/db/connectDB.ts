import mongoose from "mongoose";
import { env } from "../config";

async function connectDB() {
  try {
    await mongoose.connect(env.MONGO_DB_URL);
    console.log("mongodb cennected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

export { connectDB };
