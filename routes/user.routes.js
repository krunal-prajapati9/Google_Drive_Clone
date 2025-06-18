const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const token = require("jsonwebtoken");
router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("email").trim().isEmail().isLength({ min: 10 }),
  body("username").isLength({ min: 3 }).trim(),
  body("password").isLength({ min: 5 }).trim(),
  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res
        .status(400)
        .json({ errors: error.array(), message: "invalid data" });
    }

    const { username, email, password } = req.body;

    const hashpassword = await bcrypt.hash(password, 10);
    const newuser = await userModel.create({
      username,
      email,
      password: hashpassword,
    });

    res.redirect("/user/login");
  }
);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  body("username").trim().isLength({ min: 3 }),
  body("password").trim().isLength({ min: 5 }),

  async (req, res) => {
    const error = validationResult(req);
    console.log("Login route hit", req.body);

    if (!error.isEmpty()) {
      return res.status(400).json({
        errors: error.array(),
        message: "invalid data",
      });
    }
    const { username, password } = req.body;

    const user = await userModel.findOne({
      username: new RegExp(`^${username}$`, "i"),
    });

    if (!user) {
      return res.status(400).json({
        errors: error.array(),
        message: "username or password is incorrect",
      });
    }

    const passwordmatch = await bcrypt.compare(password, user.password);

    if (!passwordmatch) {
      return res.status(400).json({
        errors: error.array(),
        message: "username or password is incorrect",
      });
    }

    const jwt = token.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET
    );

    res.cookie("jsontoken", jwt);
    res.redirect("/home");
    
  }
);

module.exports = router;
