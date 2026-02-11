import express from "express";
import { login, logout, register } from "../controller/authController.js";

const authRouter = express.Router();

authRouter
  .post("/register", register)
  .post("/login", login)
  .post("/logout", logout);
export default authRouter;
