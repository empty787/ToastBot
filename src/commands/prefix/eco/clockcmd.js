module.exports = {
    name: 'clock',
    description: 'Send the Lenny face.',
  
    execute(message, args) {
        const currentTime = new Date().toLocaleTimeString();
      message.reply(`The current time is ${currentTime}`);
    },
  };
  