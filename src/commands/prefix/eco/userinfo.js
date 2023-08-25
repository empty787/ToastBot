const { Client, Intents, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'userinfo', // The name of the command
    description: 'Check the bot\'s ping.', // The description of the command (optional)
  
    // The main function that gets executed when the command is run
    execute(message, args) {
            if (args.length !== 2) {
                message.reply('Please provide a valid user ID.');
                return;
            }
    
            const userId = args[1];
            const user = message.guild.members.fetch(userId);
    
            if (!user) {
                message.reply('User not found.');
                return;
            }
    
            const userEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('User Information')
                .addField('Username', user.user.tag, true)
                .addField('User ID', user.id, true)
                .addField('Joined Discord', user.user.createdAt.toDateString(), true)
                .addField('Joined Server', user.joinedAt.toDateString(), true)
                .addField('Badges', user.user.flags.toArray().join(', ') || 'None');
    
            message.channel.send({ embeds: [userEmbed] });
        }
    };
  