const express = require("express");
const { checkUniqueUsername } = require("../controller/checkUsenameUnique");

const uniqueUsernameRouter = express.Router();


uniqueUsernameRouter.get("/check-unique-username",checkUniqueUsername)

module.exports = uniqueUsernameRouter;