const express = require("express");
const Safes = require("../models/safesModel");

const router = express.Router();

router.get("/", async (req, res) => {
  const safes = await Safes.find();

  res.send(safes);
});

router.post("/", async (req, res) => {
  const safe = new Safes({
    name: req.body.name,
    owner: req.body.owner,
    type: req.body.type,
    description: req.body.description,
  });

  const savedSafe = await safe.save();
  res.send(savedSafe);
});

router.delete("/:safeId", async (req, res) => {
  const removedSafe = await Safes.findByIdAndRemove(req.params.safeId);

  res.send(removedSafe);
});

router.patch("/:safeId", async (req, res) => {
  const updatedSafe = await Safes.findByIdAndUpdate(
    req.params.safeId,
    {
      $set: req.body,
      updated: Date.now(),
    },
    { new: true }
  );

  res.send(updatedSafe);
});

router.patch("/:safeId/secrets", async (req, res) => {
  const secretAdded = await Safes.findByIdAndUpdate(
    req.params.safeId,
    {
      $push: { secrets: { name: req.body.name } },
      updated: Date.now(),
    },
    { new: true }
  );

  res.send(secretAdded);
});

router.delete("/:safeId/secrets/:secretId", async (req, res) => {
  const secretDeleted = await Safes.findByIdAndUpdate(
    req.params.safeId,
    {
      $pull: { secrets: { _id: req.params.secretId } },
      updated: Date.now(),
    },
    { new: true }
  );

  res.send(secretDeleted);
});

module.exports = router;
