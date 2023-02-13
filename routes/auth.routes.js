const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  deleteUser,
  getUserInfo,
  editUser,
  getAnotherUser
} = require("../controllers/auth.controller");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/verify", isAuthenticated, getUserInfo);
router.get('/get-another-user/:id',getAnotherUser)
router.post("/signup", signup);
router.post("/login", login);
router.delete("/delete-user/:id", isAuthenticated, deleteUser);
router.put("/edit-user", isAuthenticated, editUser);

module.exports = router;
