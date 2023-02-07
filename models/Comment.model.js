const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reply",
    },
  ],
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
