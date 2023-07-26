const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  bankBalance: { 
    type: Number,
    default: 0,
  },
  lastDaily: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
});

module.exports = model('User', userSchema);
