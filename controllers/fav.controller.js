const Favorite = require("../models/Favorite.model");

const createFavorite = async (req, res) => {
  try {
    const foundShow = await Favorite.findOne({
      showId: req.params.id,
      owner: req.payload._id,
    });
    if (foundShow) {
      return Promise.reject("Already favorited");
    }
    const { image, title, showId, original_title } = req.body;
    const createdFav = await Favorite.create({
      image,
      title,
      showId,
      original_title,
      owner: req.payload._id,
    });
    let createdFavWithOwner = await createdFav.populate("owner")
    res.send(createdFavWithOwner);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
// const createFavorite = (req, res) => {
//     Favorite.findOne({ showId: req.params.id, owner: req.payload._id })
//       .then((foundShow) => {
//         if (foundShow) {
//           return Promise.reject("Already favorited");
//         }
//         const { image, title, showId, original_title } = req.body;
//         return Favorite.create({
//           image,
//           title,
//           showId,
//           original_title,
//           owner: req.payload._id,
//         });
//       })
//       .populate('owner')
//       .then((createdFav) => {
//         res.send(createdFav);
//       })
//       .catch((err) => {
//         res.send(err);
//       });
//   };
const deleteFavorite = (req, res) => {
  Favorite.deleteOne({ showId: req.params.id, owner: req.payload._id })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.send("deleted");
      } else {
        res.send("favorite not found");
      }
    })
    .catch((err) => {
      res.send(err);
    });
};
const getFavorites = (req, res) => { 
  Favorite.find()
  .populate('owner')
    .then((favs) => {
      res.send(favs);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = { createFavorite, deleteFavorite, getFavorites };
