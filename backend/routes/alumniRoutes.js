const express2 = require("express");
const Alumni = require("../models/Alumni");
const User2 = require("../models/User");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { fetchAlumni } = require("../controller/alumniController");
const { protect } = require("../middlewares/authMessage");

const alumniRouter = express2.Router();

//ANCHOR - set middleware

alumniRouter.get("/get-alumni",protect,fetchAlumni);

alumniRouter.post("/profile", authMiddleware, async (req, res) => {
  try {
    const payload = req.body;
    payload.userId = req.user._id;

    const alumni = await Alumni.findOneAndUpdate(
      { userId: req.user._id },
      payload,
      { new: true, upsert: true }
    );

    if (req.user.role === "candidate") {
      await User2.findByIdAndUpdate(req.user._id, { role: "alumni" });
    }
    res.json(alumni);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
alumniRouter.get("/me", authMiddleware, async (req, res) => {
  try {
    const alumni = await Alumni.findOne({ userId: req.user._id }).populate(
      "userId",
      "-password"
    );
    res.json(alumni);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
alumniRouter.get("/search", authMiddleware, async (req, res) => {
  try {
    const { keyword, batch, skill, company, location } = req.query;
    const filters = {};
    if (batch) filters.batch = batch;
    if (company) filters.company = new RegExp(company, "i");
    if (location) filters.location = new RegExp(location, "i");
    if (skill) filters.skills = { $in: [new RegExp(skill, "i")] };

    if (keyword) {
      filters.$or = [
        { profession: new RegExp(keyword, "i") },
        { company: new RegExp(keyword, "i") },
        { location: new RegExp(keyword, "i") },
        { bio: new RegExp(keyword, "i") },
      ];
    }
    const results = await Alumni.find(filters).populate("userId", "-password");
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = alumniRouter;
