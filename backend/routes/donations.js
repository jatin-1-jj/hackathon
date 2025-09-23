const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authDonations");
const {
  getDonations,
  createDonation,
} = require("../controller/donationsController");

 
router.get("/", protect, getDonations);


router.post("/", protect, createDonation);

module.exports = router;