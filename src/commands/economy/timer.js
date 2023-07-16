module.exports = {
    name: 'timer',
    description: 'Start a timer',
    options: [
      {
        name: 'duration',
        description: 'Duration of the timer in minutes',
        type: 4,
        required: true,
      },
    ],
    callback: async (client, interaction) => {
      const durationInMinutes = interaction.options.getInteger('duration');
      const durationInSeconds = durationInMinutes * 60;
  
      await interaction.reply(`Timer started: ${durationInMinutes} minute(s)`);
      let remainingTime = durationInSeconds;
  
      const intervalId = setInterval(async () => {
        remainingTime--;
  
        if (remainingTime > 0) {
          const remainingMinutes = Math.floor(remainingTime / 60);
          const remainingSeconds = remainingTime % 60;
          const formattedTime = `${remainingMinutes} minute(s) ${remainingSeconds} second(s)`;
          await interaction.editReply(`Timer: ${formattedTime}`);
        } else {
          clearInterval(intervalId);
          await interaction.editReply('Timer completed!');
        }
      }, 1000);
    },
  };
  