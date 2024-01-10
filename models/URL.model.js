const mongoose = require('mongoose');

const URLSchema = mongoose.Schema({
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

module.exports = mongoose.model('urls', URLSchema);
