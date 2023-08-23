module.exports = {
    name: 'avatar',
    description: 'Get the avatar of a mentioned user.',
  
    execute(message, args) {
        const user = message.mentions.users.first();
        if (user) {
            message.reply(`${user.username}'s avatar: ${user.displayAvatarURL({ format: 'png', dynamic: true })}`);
        } else {
            message.reply('Please mention a user to get their avatar.');
        }
    },
};
