const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { check } = require("../controller/authController");
const { register } = require("../controller/authController");
const { login } = require("../controller/authController");
const { logout } = require("../controller/authController");
const { checkUniqueUsername } = require("../controller/checkUsenameUnique");
const authRouter = express.Router();

authRouter.post("/check-unique-username",checkUniqueUsername)
authRouter.get("/check", protect, check);
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/log-out", logout);

module.exports =  authRouter ;
