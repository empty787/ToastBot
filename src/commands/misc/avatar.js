module.exports = {
  name: 'avatar',
  description: 'Get the avatar of a user!',
  
  callback: (client, interaction) => {
    // Get the avatar URL of the interaction user
    const avatarURL = interaction.user.displayAvatarURL({ dynamic: true });

    // Reply with the avatar URL
    interaction.reply(avatarURL);
  }
};
