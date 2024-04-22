import "dotenv/config";

/* managing all env here */

export const env = {
  PORT: process.env.PORT || 7000,
  HOST: process.env.HOST || "localhost",
  MONGO_DB_URL: process.env.MONGO_DB_URL || "/auth-db",
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "JWT_SECRET_KEY",
  EMAIL: process.env.EMAIL || "",
  PASSWORD: process.env.PASSWORD || "",
  X_API_KEY: process.env.X_API_KEY || "",
};
