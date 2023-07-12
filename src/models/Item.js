const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // Add any additional fields you need for an item
});

module.exports = mongoose.model('Item', itemSchema);
