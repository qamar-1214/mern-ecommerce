export const userLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({
      message: "Logged out successfully.",
      error: false,
      success: true,
      data: [],
    });
  } catch (error) {
    res.json({
      message: error.message || "Server error",
      error: true,
      success: false,
    });
  }
};
