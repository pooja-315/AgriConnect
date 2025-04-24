const mongoose = require('mongoose');

const seedSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  amt: { type: String, required: true },  // Price stored as a string
  pic: { type: String }
});

module.exports = mongoose.model('Seed', seedSchema);
