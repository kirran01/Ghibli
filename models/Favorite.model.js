const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: String,
  title: String,
  showId: String,
  original_title: String,
});

const Favorite = mongoose.model("Favorite", favoriteSchema);
module.exports = Favorite;
