import express from "express";
import authRouter from "./routes/authRoute.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import gigRoute from "./routes/gigRoute.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import errorHandler from "./middlewares/errorHandler.js";
import "./config/environment.js";
import { config, isDevelopment } from "./config/environment.js";

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
      {
        url: `http://localhost:3000/api/v1`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Path to your API docs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cookieParser());
app.use(express.json());

if (isDevelopment) {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}
app.use(
  cors({
    origin: config.CROSS_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

// todo : CORS hatalarini engellemek icin gereken ayarlamalari yap

mongoose
  .connect(config.DB_URL)
  .then(() =>
    console.log("Database connection is successful! " + config.DB_URL),
  )
  .catch((e) => {
    if (isDevelopment) {
      console.log("Database connection is fail!", e, config.DB_URL);
    }
  });

app.get("/api/v1/test", (req, res, next) => {
  res.status(200).json({
    status: 200,
    message: "Server is healthy.",
  });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/gigs", gigRoute);

// Hata yonetimi icin middleware
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`App is running on ${config.PORT}`);
});
