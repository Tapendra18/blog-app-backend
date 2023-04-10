const express = require("express");
const {
  getComment,
  createComment,
} = require("../controllers/commentController");

const router = express.Router();

//get All comment
router.get("/all-comment", getComment);

//creating comment
router.post("/create-comment", createComment);
module.exports = router;
