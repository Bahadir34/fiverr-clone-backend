import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env.development" });
  dotenv.config();
} else {
  dotenv.config({ path: ".env.production" });
  dotenv.config();
}

export const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.DB_URL,
  API_SECRET_KEY: process.env.API_SECRET_KEY,
  API_EXP: process.env.API_EXP || "14d",
  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUD_API_KEY: process.env.CLOUD_API_KEY,
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
  CROSS_ORIGIN: process.env.CROSS_ORIGIN || "http://localhost:5173",
};

export const isDevelopment = config.NODE_ENV === "development";
export const isProduction = config.NODE_ENV === "production";
