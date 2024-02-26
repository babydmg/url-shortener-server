const mongoose = require('mongoose');

const URLModel = new mongoose.Schema({
  full_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('urls', URLModel);
