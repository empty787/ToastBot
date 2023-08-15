const { Schema, model, models } = require('mongoose');

const achievementSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  achievements: [
    {
      name: {
        type: String,
        required: true,
      },
      unlocked: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

// Check if the model already exists before compiling
const Achievement = models.Achievement || model('Achievement', achievementSchema);

module.exports = Achievement;
