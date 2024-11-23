import express from "express";
import { userSignupController } from "../controllers/userSignUp.js";
import { userSignInController } from "../controllers/userSignIn.js";
import { authToken } from "../middlewares/authToken.js";
import { userDetailsController } from "../controllers/userDetails.js";
import upload from "../middlewares/multerConfig.js";
import { userLogout } from "../controllers/userLogout.js";

const router = express.Router();

//routes
router.post("/signup", upload.single("profile_pic"), userSignupController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.post("/userLogout", userLogout);

export default router;
