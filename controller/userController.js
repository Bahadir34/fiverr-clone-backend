import User from "../model/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -__v ");

    return res.status(200).json({
      success: true,
      message: "Fetching users is successful",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occured while fetching users~",
    });
  }
};
