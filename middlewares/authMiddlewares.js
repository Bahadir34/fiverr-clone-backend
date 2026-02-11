import jsonwebtoken from "jsonwebtoken";
import e from "../utils/error.js";
import { config } from "../config/environment.js";

export const authorize = (req, res, next) => {
  try {
    const token =
      req?.headers?.authorization?.split(" ")[1] || req?.cookies?.JWT;
    console.log("cookie :", req.cookies.JWT);
    if (!token) {
      return next(
        e(401, "There is no token! Please send a valid json web token!")
      );
    }

    const tokenIsValid = jsonwebtoken.verify(token, config.API_SECRET_KEY);
    req.userId = tokenIsValid.id;
    req.isSeller = tokenIsValid.isSeller;

    if (!tokenIsValid) {
      return next(e(401, "Unauthorized!"));
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occured while authorizing user!",
    });
  }

  console.log("hey");

  next();
};
