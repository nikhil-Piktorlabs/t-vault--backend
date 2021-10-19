const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const secretSchema = require("./secret");

const safeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1,
  },
  owner: { type: String, required: true, trim: true, minlength: 1 },
  type: { type: String, required: true, enum: ["personal", "other"] },
  description: { type: String, trim: true, minlength: 10 },
  secrets: [secretSchema],
  updated: { type: Date, default: Date.now },
});

safeSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Safe", safeSchema);
