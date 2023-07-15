const cooldowns = new Map();

module.exports = {
  name: 'suggestion',
  description: 'Make a suggestion for DolphinNotBot! (Response will be sent to DolphWorld!)',
  options: [
    {
      name: 'suggestion',
      description: 'Make a suggestion for the bot!',
      type: 3,
      required: true,
    },
    {
      name: 'topic',
      description: 'The topic of the suggestion',
      type: 3,
      required: false,
      choices: [
        {
          name: 'General',
          value: 'general',
        },
        {
          name: 'Slash Commands',
          value: 'slash_commands',
        },
        {
          name: 'Profile',
          value: 'profile',
        },
        {
          name: 'Other',
          value: 'other',
        },
      ],
    },
  ],

  callback: async (client, interaction) => {
    try {
      const userId = interaction.user.id;
      const cooldownDuration = 60 * 60 * 1000; // 1 hour in milliseconds

      if (cooldowns.has(userId)) {
        const cooldown = cooldowns.get(userId);
        const remainingTime = cooldown + cooldownDuration - Date.now();

        if (remainingTime > 0) {
          await interaction.reply(`You can only make a suggestion once per hour. Please wait ${formatDuration(remainingTime)}.`);
          return;
        }
      }

      const message = interaction.options.getString('suggestion');
      const topic = interaction.options.getString('topic') || 'General';

      const embed = {
        title: `Said by ${interaction.user.username} <@${targetUserId}>`,
        description: `**Topic:** ${topic}\n\n${message}`,
        color: 0x964B00,
        thumbnail: {
          url: 'https://i.imgur.com/CQiKstK.jpg',
        },
        footer: {
          text: 'DolphinNotBot - Created by DolphinNotFound',
          icon_url: 'https://i.imgur.com/CQiKstK.jpg',
        },
        timestamp: new Date(),
      };

      const guildId = '923718188183728188';
      const channelId = '1129575069086138460';

      const guild = client.guilds.cache.get(guildId);
      if (!guild) return console.log('Invalid guild ID');

      const channel = guild.channels.cache.get(channelId);
      if (!channel) return console.log('Invalid channel ID');

      await interaction.reply('YAYAYAYAYAYAY! EEEEE Your suggestion has been sent to DolphWorld!');
      await channel.send({ embeds: [embed] });

      cooldowns.set(userId, Date.now());
      setTimeout(() => cooldowns.delete(userId), cooldownDuration); // Remove cooldown after the specified duration
    } catch (error) {
      console.error(error);
      await interaction.reply('An error occurred while processing your suggestion.');
    }
  },
};

function formatDuration(duration) {
  const hours = Math.floor(duration / 3600000);
  const minutes = Math.floor((duration % 3600000) / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);

  const formattedDuration = [];
  if (hours > 0) formattedDuration.push(`${hours}h`);
  if (minutes > 0) formattedDuration.push(`${minutes}m`);
  if (seconds > 0) formattedDuration.push(`${seconds}s`);

  return formattedDuration.join(' ');
}
