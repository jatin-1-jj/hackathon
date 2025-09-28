const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { check,register,login,logout,otp,verifyOtp } = require("../controller/authController");
const { checkUniqueUsername } = require("../controller/checkUsenameUnique");


const authRouter = express.Router();

authRouter.post("/check-unique-username",checkUniqueUsername)
authRouter.get("/check", protect, check);
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/log-out", logout);
authRouter.post("/otp",otp)
authRouter.post("/check-otp",verifyOtp)


module.exports =  authRouter ;
