const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./router");
require("dotenv/config");

const app = new express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.log(e));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
