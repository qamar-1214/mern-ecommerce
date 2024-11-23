import jwt from "jsonwebtoken";
export const authToken = async (req, res, next) => {
  try {
    console.log("Cookies: ", req.cookies);
    console.log("Headers: ", req.headers);
    const token = req.cookies?.token || req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, encoded) => {
      console.log(err);
      console.log("encoded", encoded);
      if (err) {
        console.log("error auth", err);
      }
      req.userId = encoded?.id;
    });
    console.log("token      -", token);

    // Proceed with the next middleware or validation here
    next();
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      data: [],
      error: true,
      success: false,
    });
  }
};
