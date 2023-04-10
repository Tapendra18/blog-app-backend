const mongoose = require("mongoose");
const commentModel = require("../models/CommentModel");

exports.getComment = async (req, res) => {
  try {
    const comment = await commentModel.find({});
    if (!comment) {
      return res.status(200).send({
        success: false,
        message: "No comment Found",
      });
    }
    return res.status(200).send({
      success: true,
      commentCount: comment.length,
      message: "Comment found",
      comment,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error While Getting Comments",
      err,
    });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).send({
        success: false,
        message: "Please provide All fields",
      });
    }
    const comment = new commentModel(req.body);
    await comment.save();
    return res.status(201).send({
      success: true,
      message: "comment Created",
      comment,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      success: false,
      message: "Error While creating comment",
      err,
    });
  }
};
