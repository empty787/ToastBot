const { Schema, model, models } = require('mongoose');

const levelSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  xp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 0,
  },
});

// Check if the model already exists before compiling
const Level = models.Level || model('Level', levelSchema);

module.exports = Level;