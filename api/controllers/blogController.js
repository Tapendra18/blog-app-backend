const mongoose = require("mongoose");
const blogmodel = require("../models/blogModel");
const userModel = require("../models/userModel");

//Get All Blogs
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogmodel.find({}).populate("user");
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "No Blogs Found",
      });
    }
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "No Blogs Found",
      blogs,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error While Getting Blogs",
      err,
    });
  }
};

//Create Blog
exports.createBlogController = async (req, res) => {
  try {
    // const { title, description, image, user, categories } = req.body;
    //validate
    // if (!title || !description || !categories) {
    //   return res.status(400).send({
    //     success: false,
    //     message: "Please Provide All fields",
    //   });
    // }
    // const existingUser = await userModel.findById(user);
    // if (!existingUser) {
    //   return res.status(404).send({
    //     success: false,
    //     message: "unable to find user",
    //   });
    // }

    if (req.files.image) {
      req.body.image = req.files.image[0].path;

      const newBlog = await new blogmodel(req.body);
      // const session = await mongoose.startSession();
      // session.startTransaction();
      // await newBlog.save({ session });
      // existingUser.blogs.push(newBlog);
      // await existingUser.save({ session });
      // await session.commitTransaction();
      await newBlog.save();
      return res.status(201).send({
        success: true,
        message: "Blog Created",
        newBlog,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      success: false,
      message: "Error While Creating blog",
      err,
    });
  }
};

//Update Blog
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogmodel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Blog Updated",
      blog,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      success: false,
      message: "Error while updating Blog",
      err,
    });
  }
};

//Single Blog
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogmodel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "blog not find",
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetch single blog",
      blog,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      success: false,
      message: "error while getting single blog",
      err,
    });
  }
};

//Delete Blog
exports.deleteBlogController = async (req, res) => {
  try {
    await blogmodel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "BLog Deleted",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      success: false,
      message: "Error While Deleting Blog",
      err,
    });
  }
};

exports.userBlogController = async (req, res) => {
  try {
    let userBlog = await userModel.findById(req.params.id).populate("blogs");
    console.log(userBlog, "userrr");
    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "blogs not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user blogs",
      userBlog,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      success: false,
      message: "error in user blog",
      err,
    });
  }
};
