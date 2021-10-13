const express = require("express");
const mongoose = require("mongoose");
const router = require("./router");
require("dotenv/config");

const app = new express();

app.use(express.json());
app.use("/api", router);

const port = process.env.PORT || 4000;

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.log(e));

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
