const express = require("express");
const Safe = require("../models/safe");

const router = express.Router();

router.get("/", async (req, res) => {
  const safes = await Safe.find();

  res.send(safes);
});

router.post("/", async (req, res) => {
  const safe = new Safe({
    name: req.body.name,
    owner: req.body.owner,
    type: req.body.type,
    description: req.body.description,
  });

  const savedSafe = await safe.save();
  res.send(savedSafe);
});

router.delete("/:safeId", async (req, res) => {
  const removedSafe = await Safe.findByIdAndRemove(req.params.safeId);

  res.send(removedSafe);
});

router.patch("/:safeId", async (req, res) => {
  const updatedSafe = await Safe.findByIdAndUpdate(
    req.params.safeId,
    {
      name: req.body.name,
      owner: req.body.owner,
      type: req.body.type,
      description: req.body.description,
      secrets: req.body.secrets,
      updated: Date.now(),
    },
    { new: true, runValidators: true, context: "query" }
  );

  res.send(updatedSafe);
});

router.patch("/:safeId/secrets", async (req, res) => {
  const secret = await Safe.find({
    _id: req.params.safeId,
    secrets: { $elemMatch: { name: req.body.name } },
  });
  if (secret.length > 0)
    return res.status(400).send("Secret with same name already exists!");

  const secretAdded = await Safe.findByIdAndUpdate(
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
  const secretDeleted = await Safe.findByIdAndUpdate(
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
