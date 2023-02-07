const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  deleteUser,
  getUserInfo,
  editUser,
} = require("../controllers/auth.controller");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/verify", isAuthenticated, getUserInfo);
router.post("/signup", signup);
router.post("/login", login);
router.delete("/delete-user/:id", isAuthenticated, deleteUser);
router.put("/edit-user", isAuthenticated, editUser);

module.exports = router;
