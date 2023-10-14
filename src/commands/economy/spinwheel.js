const Level = require('../../models/Level');

// Array of random prompts
const prompts = [
  'Spin the wheel and see what you win!',
  'Get ready to spin for a surprise!',
  'Take a chance and spin the wheel!',
  'What will the wheel reveal?',
  'No pain no gain',
  'A',
  'bruh',
  'among us',
  'Sub to Coffee for 10000000 CoffeeBucks and 40000000 DolphCoins!!!',
];

module.exports = {
  name: 'spinwheel',
  description: 'Spin the wheel for a surprise! EEEEEE Spinning wheel of death',
  callback: async (client, interaction) => {
    await interaction.reply('Loading...').then(async (loadingMessage) => {
      const spinner = ['◜', '◠', '◝', '◞', '◡', '◟'];
      let index = 0;

      const updateLoader = (progress) => {
        const progressBar = `\`${'■'.repeat(Math.floor(progress / 10))} ${' '.repeat(10 - Math.floor(progress / 10))}\``;
        const updatedMessage = `Loading... -_- ${progress}% ${progressBar} ${spinner[index]}`;
        loadingMessage.edit(updatedMessage);
        index = (index + 1) % spinner.length;
      };

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 100) {
          updateLoader(progress);
        } else {
          clearInterval(interval);

          // Generate a random amount of XP between 10 and 50
          const xpEarned = Math.floor(Math.random() * 41) + 10;

          // Get the user's ID from the interaction
          const userId = interaction.user.id;

          // Update the user's XP in the database
          Level.findOneAndUpdate({ userId }, { $inc: { xp: xpEarned } }, { upsert: true })
            .then(() => {
              const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
              const resultMessage = `EEEEE\nYou earned ||${xpEarned} XP!||\n\n${randomPrompt}`;
              interaction.editReply(resultMessage);
            })
            .catch((error) => {
              console.error(error);
              interaction.editReply('An error occurred while updating XP.');
            });
        }
      }, 500);
    });
  },
};
