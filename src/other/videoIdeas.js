const cooldown = new Set();

async function handleVideoIdea(message) {
  // Check if the message was sent in the specific guild channel (replace 'YOUR_GUILD_ID' with the actual guild ID)
  if (message.guild && message.guild.id === process.env.GUILD_ID && message.channel.id === process.env.VIDEO_IDEAS) {
    // Check if the message author is the bot itself
    if (message.author.bot) {
      return;
    }

     // Check if the message author is on cooldown
     if (cooldown.has(message.author.id)) {
        // Send a message indicating cooldown
        try {
          await message.reply('You are on cooldown. Please wait before suggesting another video idea. 5 SECONDS LLLLLL');
        } catch (error) {
          console.error('Error replying to the message:', error);
        }
        return;
      }

    // Add the message author to the cooldown set for 5 seconds
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000); // 5 seconds cooldown

    // Create and send the original message as an embed
    const ideaEmbed = {
      color: 0xff0000,
      title: 'New Video Idea',
      description: message.content,
      footer: {
        text: `Suggested by ${message.author.tag}`,
      },
      timestamp: new Date(),
    };

    try {
      const sentMessage = await message.channel.send({ embeds: [ideaEmbed] });

      // React to the sent message with thumbs up and thumbs down emojis
      await sentMessage.react('👍');
      await sentMessage.react('👎');
    } catch (error) {
      console.error('Error sending the message:', error);
    }
  }
}

module.exports = { handleVideoIdea };
