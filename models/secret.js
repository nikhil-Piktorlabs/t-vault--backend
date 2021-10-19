const mongoose = require("mongoose");

const secretSchema = mongoose.Schema({
  name: { type: String, required: true },
  added: { type: Date, default: Date.now },
});

module.exports = secretSchema;
