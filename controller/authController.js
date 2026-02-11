import bcrypt from "bcrypt";
import User from "../model/userModel.js";
import { createAndSaveToken } from "../utils/authUtils.js";
import c from "../utils/catchAsync.js";
import e from "../utils/error.js";

export const register = c(async (req, res) => {
  const user = req.body;
  const createdUser = await User.create(user);

  createdUser.password = undefined;

  res.status(201).json({
    success: true,
    message: "Register successful",
    createdUser,
  });

  res.status(500).json({
    success: false,
    message: "Server error while registering user!",
  });
});

export const login = c(async (req, res, next) => {
  const { email, password } = req.body;

  const selectedUSer = await User.findOne({ email });
  if (!selectedUSer) {
    return next(e(404, "User could not find"));
  }
  const isPasswordValid = bcrypt.compareSync(password, selectedUSer.password);

  if (!isPasswordValid) {
    return next(e(401, "Wrong Password!"));
  }
  const token = createAndSaveToken(
    selectedUSer._id,
    selectedUSer.isSeller,
    res
  );
  selectedUSer.password = undefined;
  selectedUSer.__v = undefined;
  res.status(200).json({
    success: true,
    message: "Login successful",
    user: selectedUSer,
    token,
  });

  return res.status(500).json({
    success: false,
    message: "Some error occured while trying to log in!",
  });
});

export const logout = c((req, res) => {
  res.clearCookie("JWT").status(200).json({
    success: true,
    message: "Log out successful!",
  });
});


