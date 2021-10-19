const express = require("express");
const safesRoute = require("./routes/safe");

const router = express.Router();
router.use("/safes", safesRoute);

module.exports = router;
