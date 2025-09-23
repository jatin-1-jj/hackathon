const express = require("express");
const router = express.Router();
const { getMessages, sendMessage } = require("../controller/messageController");
const { protect } = require("../middlewares/authMessage.js");


router.get("/", protect, getMessages);
router.post("/", protect, sendMessage);

module.exports = router;