const mongoose = require('mongoose');

const fertilizerSchema = new mongoose.Schema({
  name: String,
  amt: Number,
  pic: String
});

module.exports = mongoose.model('Fertilizer', fertilizerSchema);
