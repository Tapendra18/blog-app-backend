const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    image: {
      type: String,
      required: [true, "image is require"],
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    categories: {
      type: String,
      required: [true, "categories is req"],
    },
  },
  { timestamps: true }
);

const blogmodel = mongoose.model("blog", blogSchema);
module.exports = blogmodel;
