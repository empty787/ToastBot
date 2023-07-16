const { Schema, model } = require('mongoose');

const welcomeChannelSchema = new Schema({
  channelID: {
    type: String,
    required: true,
  },
});

module.exports = model('WelcomeChannel', welcomeChannelSchema);
