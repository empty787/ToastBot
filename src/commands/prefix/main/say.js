module.exports = {
    name: 'say',
    description: 'Make the bot say something.',
    execute(message, args) {
      const textToSay = args.join(' ');
      message.channel.send(textToSay);
    },
  };
  