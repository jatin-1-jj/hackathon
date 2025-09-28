const bcrypt = require("bcryptjs");
const Alumni = require("../models/Alumni");
const Admin = require("../models/Admin");
const Faculty = require("../models/Faculty");
const { generateToken } = require("../lib/utils");

const check = (req, res) => {
  try {
    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log("error in check authController : ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "internal server error in check" });
  }
};


const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if ((!username, !email, !password)) {
      return res.status(200).json({
        success: false,
        message: "Name, email and password required",
      });
    }
      const existing1 = await Admin.findOne({ email });
      const existing2 = await Alumni.findOne({ email });
      const existing3 = await Faculty.findOne({ email });

    if (existing1||existing2||existing3) {
      return res
        .status(200)
        .json({ success: false, message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    let user;
    if (role === "admin") {
      user = new Admin({
        username,
        email,
        password: hashed,
        role: role,
      });
    } else if (role === "alumni") {
      user = new Alumni({
        username,
        email,
        password: hashed,
        role: role,
      });
    } else if (role == "faculty") {
      user = new Faculty({
        username,
        email,
        password: hashed,
        role: role,
      });
    }

    await user.save();

    const token = generateToken(user._id,role, res);

    return res.status(201).json({
      token,
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        verified: user.verified,
      },
      message: "Registered successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(200).json({
        success: false,
        message: "Email and password required",
      });
    }

    let user;
    if (role === "admin") {
      user = await Admin.findOne({ email });
    } else if (role === "alumni") {
      user = await Alumni.findOne({ email });
    } else if (role == "faculty") {
      user = await Faculty.findOne({ email });
    }

    console.log("yes it", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const valid = await bcrypt.compare(password, user.password);
    console.log("yes", valid);

    if (!valid) {
      return res.status(200).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id,role, res);
    return res.status(200).json({
      token,
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        verified: user.verified,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwtToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res
      .status(200)
      .json({ success: true, message: "logged out successfully" });
  } catch (error) {
    console.log("error in authcontroller logout", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { check, register, login, logout };
