const Donation = require("../models/Donation");

 
const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate("user", "name email");
    res.json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


const createDonation = async (req, res) => {
  try {
    const { amount, message } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const donation = new Donation({
      user: req.user._id,
      amount,
      message,
    });

    await donation.save();
    await donation.populate("user", "name email");

    res.status(201).json(donation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getDonations, createDonation };