const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Comment = require("../models/Comment.model");

const signup = (req, res) => {
  const { email, password, username, profileImage } = req.body;
  if (!req.body.email || !req.body.password || !req.body.username) {
    return res.status(400).json({
      message: "field(s) are missing",
    });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Please provide a valid email address." });
    return;
  }
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
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
const login = (req, res) => {
  const { username, password } = req.body;
  if (!req.body.username || !req.body.password) {
    return res.json({
      error: {
        message: "fields are blank",
      },
    });
  }
  let theUser;
  User.findOne({
    username,
  })
    .then((foundUser) => {
      if (!foundUser) {
        return Promise.reject("invalid credentials");
      }
      theUser = foundUser;
      console.log(foundUser);
      return bcryptjs.compare(password, foundUser.password);
    })
    .then((isValidPassword) => {
      if (!isValidPassword) {
        return Promise.reject("invalid credentials");
      }
      const payload = {
        _id: theUser._id,
      };
      console.log(payload, "<---payload");
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "72h",
      });
      res.json({
        authToken: authToken,
        hi: "hello",
      });
    })
    .catch((err) => {
      res.send(err);
    });
};
const deleteUser = async (req, res) => {
  try {
    const userToDel = await User.findByIdAndDelete(req.params.id);
    if (userToDel) {
      await Comment.deleteMany({ owner: req.params.id });
      res.send(userToDel);
    }
  } catch (err) {
    res.send(err);
  }
};
const getUserInfo = (req, res) => {
  const payloadId = req.payload._id;
  User.findById(payloadId)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
};
const editUser = (req, res) => {
  User.findByIdAndUpdate(req.payload._id, req.body, { new: true })
    .then((updatedUser) => {
      res.send({ updatedUser });
    })
    .catch((err) => {
      res.send(err);
    });
};
const getAnotherUser = async (req, res) => {
  try {
    const otherUser = await User.findById(req.params.id);
    if (otherUser) {
      res.send(otherUser);
    } else {
      res.send("no user");
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  signup,
  login,
  deleteUser,
  getUserInfo,
  editUser,
  getAnotherUser,
};
