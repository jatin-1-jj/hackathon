const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  username: { type: String, require: true },
  name: { type: String,default: function () {
      return this.username;
    }, },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: "faculty",
  },
  company: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  linkedin: { type: String, required: false },
  bio: {
    type: String,
  },
  qualifications: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  verified: { type: Boolean, default: false },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
});

module.exports = mongoose.model("Faculty", facultySchema);
