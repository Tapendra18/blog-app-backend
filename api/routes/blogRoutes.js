const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  userBlogController,
} = require("../controllers/blogController");
const app = express();

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname)); //Appending .jpg
  },
});

const upload = multer({ storage: storage });

//router
const router = express.Router();

//routes || all blogs
router.get("/all-blog", getAllBlogsController);

//Post || create blog
router.post(
  "/create-blog",
  upload.fields([{ name: "image", maxCount: 1 }]),
  createBlogController
);

//Put || Update blog
router.put("/update-blog/:id", updateBlogController);

//Get || single Blog Details
router.get("/get-blog/:id", getBlogByIdController);

//delete || delete Blog
router.delete("/delete-blog/:id", deleteBlogController);

// user blog
router.get("/user-blog/:id", userBlogController);
module.exports = router;
