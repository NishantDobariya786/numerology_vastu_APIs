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

async function disConnectDB() {
  try {
    await mongoose.disconnect();
    console.log("mongodb Disconnected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

export { connectDB, disConnectDB };
