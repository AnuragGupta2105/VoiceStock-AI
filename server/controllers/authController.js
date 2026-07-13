const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================

const register = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const exists = await User.findOne({
      email,
    });

    if (exists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashed = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({

      name,
      email,
      password: hashed,

    });

    res.status(201).json({
      message: "Registration successful",
      user,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

// ================= LOGIN =================

const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {

      return res.status(400).json({
        message: "Invalid email",
      });

    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {

      return res.status(400).json({
        message: "Invalid password",
      });

    }

    const token = jwt.sign(

      {
        id: user._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }

    );

    res.json({

      token,

      user: {

        _id: user._id,

        name: user.name,

        email: user.email,

        mobile: user.mobile,

      },

    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

// ================= UPDATE PROFILE =================

const updateProfile = async (req, res) => {

  try {

    const { name, mobile } = req.body;

    const user = await User.findByIdAndUpdate(

      req.user.id,

      {

        name,

        mobile,

      },

     {
  returnDocument: "after"
}
    ).select("-password");

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    res.json(user);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });

  }

};

// ================= CHANGE PASSWORD =================

const changePassword = async (req, res) => {

  try {

    const {

      currentPassword,

      newPassword,

    } = req.body;

    const user = await User.findById(
      req.user.id
    );

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    const match = await bcrypt.compare(

      currentPassword,

      user.password

    );

    if (!match) {

      return res.status(400).json({
        message: "Current password incorrect",
      });

    }

    user.password = await bcrypt.hash(
      newPassword,
      10
    );

    await user.save();

    res.json({
      message: "Password updated",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });

  }

};

module.exports = {

  register,

  login,

  updateProfile,

  changePassword,

};