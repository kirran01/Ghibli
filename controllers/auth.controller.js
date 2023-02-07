const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = (req, res) => {
  const { email, password, username, profileImage } = req.body;
  if (!req.body.email || !req.body.password || !req.body.username) {
    return res.status(400).json({
      message: "field(s) are missing",
    });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res
      .status(400)
      .json({
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      });
    return;
  }
  bcryptjs.hash(password, 10).then((hashedPassword) => {
    return User.create({
      email,
      password: hashedPassword,
      username,
      profileImage,
    })
      .then((createdUser) => {
        res.send(createdUser);
      })
      .catch((err) => {
        res.send(err);
      });
  });
};

module.exports = { signup };
