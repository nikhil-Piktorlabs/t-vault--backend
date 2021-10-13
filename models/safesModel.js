const mongoose = require("mongoose");

const SafesSchema = mongoose.Schema({
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
  secrets: [{ name: String, added: { type: Date, default: Date.now } }],
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Safes", SafesSchema);
