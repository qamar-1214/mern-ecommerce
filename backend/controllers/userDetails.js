import { User } from "../models/user.model.js";

export const userDetailsController = async (req, res) => {
  try {
    console.log("user id", req.userId);
    const user = await User.findById(req.userId);
    console.log(user);
    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "user details",
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
