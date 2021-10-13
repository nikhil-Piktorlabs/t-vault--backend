const express = require("express");
const mongoose = require("mongoose");
const Safes = require("../models/safesModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const safes = await Safes.find();

    res.send(safes);
  } catch (e) {
    console.log(e);
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
    console.log(e);
  }
});

router.delete("/:safeId", async (req, res) => {
  try {
    const removedSafe = await Safes.findByIdAndRemove(req.params.safeId);

    res.send(removedSafe);
  } catch (e) {
    console.log(e);
  }
});

router.patch("/:safeId", async (req, res) => {
  try {
    const updatedSafe = await Safes.findByIdAndUpdate(
      req.params.safeId,
      {
        $set: req.body,
        updated: Date.now(),
      },
      { new: true }
    );

    res.send(updatedSafe);
  } catch (e) {
    console.log(e);
  }
});

router.patch("/:safeId/secrets/:secretId", async (req, res) => {
  try {
    const secretDeleted = await Safes.findByIdAndUpdate(req.params.safeId, {
      $pull: { secrets: { _id: mongoose.Types.ObjectId(req.params.secretId) } },
    });
    console.log("yo");

    res.send(secretDeleted);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
