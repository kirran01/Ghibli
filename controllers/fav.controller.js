const Favorite = require("../models/Favorite.model");

const createFavorite = (req, res) => {
  Favorite.findOne({ showId: req.params.id, owner: req.payload._id })
    .then((foundShow) => {
      if (foundShow) {
        return Promise.reject("Already favorited");
      }
      const { image, title, showId, original_title } = req.body;
      return Favorite.create({
        image,
        title,
        showId,
        original_title,
        owner: req.payload._id,
      });
    })
    .populate('owner')
    .then((createdFav) => {
      res.send(createdFav);
    })
    .catch((err) => {
      res.send(err);
    });
};
const deleteFavorite = (req, res) => {
  Favorite.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send("deleted");
    })
    .catch((err) => {
      res.send(err);
    });
};
const getFavorites = (req, res) => {
  Favorite.find()
    .then((favs) => {
      res.send(favs);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = { createFavorite, deleteFavorite, getFavorites };
