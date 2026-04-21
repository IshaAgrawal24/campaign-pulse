const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userModel = require("../models/auth.model");
const sessionModel = require("../models/session.model");

async function register(req, res) {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({
        return_message: "All fields are required",
      });
    }

    const isUserAlreadyExist = await userModel.findOne({
      $or: [{ userName }, { email }],
    });

    if (isUserAlreadyExist) {
      return res.status(409).json({
        status_code: 409,
        return_message: "User has already exist.",
      });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = await userModel.create({
      userName: userName,
      email: email,
      password: passwordHash,
    });

    res.status(200).json({
      success: true,
      message: "User created successfully.",
      user: {
        user_name: newUser.userName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("Auth controller error:", error);
    return res.status(500).json({
      return_message: "Internal Server Error",
    });
  }
}

async function login(req, res) {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const userExist = await userModel.findOne({
      $or: [{ userName: identifier }, { email: identifier }],
    });

    if (!userExist) {
      return res.status(401).json({
        return_message: "Invalid Credentials",
      });
    }

    const userData = userExist;

    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      return res.status(401).json({
        return_message: "Invalid Credentials",
      });
    }

    // Create Refresh Token
    const refreshToken = jwt.sign(
      { id: userData._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    // Hash Refresh Token
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const session = await sessionModel.create({
      user: userData._id,
      refreshTokenHash,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    const accessToken = jwt.sign(
      {
        id: userData._id,
        sessionId: session._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      status: true,
      message: "User logged in successfully.",
      user: {
        id: userData._id,
        email: userData.email,
        user_name: userData.userName,
        accessToken,
      },
    });
  } catch (error) {
    console.log("Login Controller Error:", error);
    return res.status(500).json({
      return_message: "Internal Server Error",
    });
  }
}

module.exports = { register, login };
