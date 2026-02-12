import dotenv from "dotenv";

// proje ayağa kaldırılırken belirlenen NODE_ENV değerine göre hangi .env dosyasının yükleniceğini belirle
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

// yukarı belirlenen .env dosyasını yükle yükle
dotenv.config({ path: envFile });

// eğer yukarıdaki komut  prod veya dev env'lerini yüklemeyezse bu kod satıtı çalışır ve .env'i yükler
dotenv.config();

// değişkenli tiplerini varsayılan değerlerini tanımla
export const config = {
  // enviroment
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || "3000",

  // database
  DB_URL: process.env.DB_URL,

  // auth
  API_SECRET: process.env.JWT_SECRET,
  API_EXP: process.env.JWT_EXPIRES,

  // cloudinary
  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUD_API_KEY: process.env.CLOUD_API_KEY,
  CLOUD_API_SECRET: process.env.CLOUD_SECRET,

  // frontend
  CROSS_ORIGIN: process.env.CROSS_ORIGIN || "http://localhost:5173",
};

export const isDevelopment = config.NODE_ENV === "development";
export const isProduction = config.NODE_ENV === "production";
