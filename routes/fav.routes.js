const express = require("express");
const router = express.Router();
const {
  createFavorite,
  deleteFavorite,
  getFavorites,
} = require("../controllers/fav.controller");

const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/create-favorite", isAuthenticated, createFavorite);
router.delete("/delete-favorite/:id", isAuthenticated, deleteFavorite);
router.get("/get-favorites", getFavorites);

module.exports = router;
