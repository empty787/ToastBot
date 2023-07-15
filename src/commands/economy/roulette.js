const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const Level = require('../../models/Level');

module.exports = {
  /**
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    await interaction.deferReply();

    try {
      const param = interaction.options.get('param').value;

      // Generate a random number between 1 and 6 to simulate the roulette bullets
      const bulletPosition = Math.floor(Math.random() * 6) + 1;

      let earnings = 0;
      let message;

      if (param === 'pull') {
        const userId = interaction.user.id;
        const guildId = interaction.guild.id;

        // Check if the user already has a level entry in the database
        let userLevel = await Level.findOne({ userId, guildId });

        // If user level entry doesn't exist, create a new one
        if (!userLevel) {
          userLevel = new Level({ userId, guildId });
        }

        // Check if the user has already pulled the trigger
        if (userLevel.hasPulledTrigger) {
          await interaction.editReply(`You've already pulled the trigger!`);
          return;
        }

        // Set the pulled trigger flag to true
        userLevel.hasPulledTrigger = true;

        // Calculate the earnings based on the bullet position
        if (bulletPosition === 6) {
          earnings = 4 * userLevel.round; // Earnings increase based on the round reached
          userLevel.round++;
          message = `You pulled the trigger and survived! You gained ${earnings} credits. Your round: ${userLevel.round}`;

          // Gain XP based on earnings
          userLevel.xp += 5; // Modify this line to adjust the XP gained

        } else {
          message = `You pulled the trigger and lost! Better luck next time.`;
        }

        await userLevel.save();
      } else {
        message = `To play, use the /roulette pull command.`;
      }

      await interaction.channel.send(message);

    } catch (error) {
      console.error('Error running roulette command:', error);
      await interaction.editReply('An error occurred while running the command.');
    }
  },

  name: 'roulette',
  description: 'Survive the roulette game and win credits.',
  options: [
    {
      name: 'param',
      description: 'Parameter: pull to play.',
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        { name: 'Pull', value: 'pull' },
      ],
    },
  ],
};
