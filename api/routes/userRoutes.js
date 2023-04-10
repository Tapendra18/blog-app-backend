const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
} = require("../controllers/userControllers");

const router = express.Router();

// GET ALL USERS \\
router.get("/all-users", getAllUsers);

//create User \\ POST
router.post("/register", registerController);

//LOGIN \\ POST
router.post("/login", loginController);

module.exports = router;
