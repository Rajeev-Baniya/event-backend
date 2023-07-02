import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    const token = await newUser.generateAuthToken();
    res.status(201).json({ status: "success", data: newUser, token });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.stack,
    });
  }
};

export const login = async (req, res) => {
  try {
    // const user = await User.findByCredentials(
    //   req.body.email,
    //   req.body.password
    // );
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "fail",
        message: "Username and password donot match",
      });
    }

    const token = await user.generateAuthToken();
    return res.status(200).json({
      status: "success",
      data: {
        id: user._id,
        email: user.email,
        name: user.username,
        isAdmin: user.isAdmin,
      },
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.json({
      status: "success",
      data: {
        message: "User logged out successfully",
      },
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.stack,
    });
  }
};
