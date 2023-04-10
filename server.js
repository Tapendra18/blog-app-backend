const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { bgCyan } = require("colors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//env config
dotenv.config();

//routes
const userRoutes = require("./api/routes/userRoutes");
const blogRoutes = require("./api/routes/blogRoutes");
const commentRoutes = require("./api/routes/commentRoutes");
const Url = process.env.DATABASE;
//connect database
mongoose.connect(Url, { useNewUrlParser: true, useUnifiedTopology: true });

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/comment", commentRoutes);

//port
const PORT = process.env.PORT || 8030;

//listen
app.listen(PORT, () => {
  console.log(
    `server Running on ${process.env.DEV_MODE} port no ${PORT}`.bgCyan.white
  );
});
