const Favorite = require("../models/Favorite.model");

const createFavorite = (req, res) => {
  const { image, title, showId, originalTitle } = req.body;
  Favorite.create({
    image,
    title,
    showId,
    originalTitle,
    owner: req.payload._id,
  })
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
