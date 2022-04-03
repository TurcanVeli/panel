require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

console.log("Connecting to database...");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database" + err);
    console.log("Exiting...");
    process.exit(1);
  });

app.use("/api/auth", userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
