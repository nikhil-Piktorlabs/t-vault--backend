const express = require("express");
const safesRoute = require("./routes/safesRoute");

const router = express.Router();
router.use("/safes", safesRoute);

module.exports = router;
