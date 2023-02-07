const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replySchema = new Schema({
  reply: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    required: true,
  },
});

const Reply = mongoose.model("Reply", replySchema);
module.exports = Reply;
