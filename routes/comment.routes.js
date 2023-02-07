const express = require("express");
const router = express.Router();
const {
  createComment,
  getComments,
  deleteComment,
  editComment,
} = require("../controllers/comment.controller");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/create-comment", isAuthenticated, createComment);
router.get("/all-comments", getComments);
router.delete("/delete-comment/:id", isAuthenticated, deleteComment);
router.put("/edit-comment/:id", isAuthenticated, editComment);

module.exports = router;
