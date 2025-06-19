require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//SIGN IN
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashpassword = bcrypt.hashSync(password);
    const user = await User({ email, username, password: hashpassword });
    await user.save();
    res.status(200).json({ message: "User Registered" });
  } catch (error) {
    res.status(200).json({ message: " user already exist" });
  }
});

//Log In
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).json({ message: "Please register first" });
    }
    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res.status(200).json({ message: "Invalid password" });
    }
    const payload = { id: user._id, email: user.email };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });

    user.refreshToken = refreshToken;
    await user.save();

    const { password,refreshToken: rt, ...others } = user._doc;
     res.status(200).json({
      message: "Login successful",
      user: others,
      accessToken,
      refreshToken
    });
  } catch (error) {
    res.status(200).json({ message: " user already exist" });
  }
});

//refresh token ki api
router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: "No refresh token provided" });

  try {
    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(403).json({ message: "Invalid refresh token" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Token expired or invalid" });

      const payload = { id: user._id, email: user.email };
      const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

      res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});


// LOGOUT
router.post("/logout", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const user = await User.findOne({ refreshToken });

    if (!user) return res.status(403).json({ message: "Invalid refresh token" });

    user.refreshToken = null;
    await user.save();
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Logout failed", error: err.message });
  }
});


module.exports = router;
