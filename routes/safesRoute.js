const express = require("express");
const Safes = require("../models/safesModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const safes = await Safes.find();

    res.send(safes);
  } catch (e) {
    console.log(e.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const safe = new Safes({
      name: req.body.name,
      owner: req.body.owner,
      type: req.body.type,
      description: req.body.description,
    });

    const savedSafe = await safe.save();
    res.send(savedSafe);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
