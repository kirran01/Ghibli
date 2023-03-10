const Comment = require("../models/Comment.model");
const { castObject } = require("../models/User.model");

const createComment = (req, res) => {
  const { day, comment, owner, postId } = req.body;
  Comment.create({
    day: Date.now(),
    comment,
    postId,
    owner: req.payload._id,
  })
    .then((createdComment) => {
      return Comment.findById(createdComment._id).populate("owner");
    })
    .then((populatedComment) => {
      res.send(populatedComment);
    })
    .catch((err) => {
      res.send(err);
    });
};
const getComments = (req, res) => {
  Comment.find()
    .populate("owner")
    .then((foundComments) => {
      res.send(foundComments);
    })
    .catch((err) => {
      res.send(err);
    });
};
const deleteComment = async (req, res) => {
  try {
    const deleteComment = await Comment.findOneAndDelete({
      _id: req.params.id,
      owner: req.payload._id,
    });
    if (deleteComment) {
      res.send(deleteComment);
    } else {
      res.status(404).send({ message: "Comment not found" });
    }
  } catch (err) {
    res.send(err);
  }
};
const editComment = (req, res) => {
  const { comment, day } = req.body;
  Comment.findByIdAndUpdate(
    req.params.id,
    {
      comment,
      day: Date.now(),
    },
    { new: true }
  )
    .populate("owner")
    .then((editedComment) => {
      res.send(editedComment);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = { createComment, getComments, deleteComment, editComment };
