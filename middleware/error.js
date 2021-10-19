module.exports = function (err, req, res, next) {
  if (err.name === "ValidationError")
    return res.status(400).send(Object.values(err.errors)[0].message);

  console.log(err);
  res.status(500).send(err);
};
