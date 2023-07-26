module.exports = {
    handleCommands: (message, client) => {
      if (message.author.bot) {
        return;
      }
  
      if (message.content === '!ping') {
        message.reply('Pong! 🏓');
      }
  
      if (message.mentions.users.has(client.user.id)) {
        const content = message.content.replace(`<@!${client.user.id}>`, '').trim();
        message.reply("Hey! I am Dolphin's bot :) How can I help you today?");
      }
  
      if (message.content === '!lenny') {
        message.reply('( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°)');
      }
  
      if (message.content === '!clock') {
        const currentTime = new Date().toLocaleTimeString();
        message.reply(`The current time is ${currentTime}`);
      }
  
      if (message.content === 'hello') {
        message.reply('hello');
      }
      if (message.content === 'test') {
        message.reply('hello');
      }
    },
  };
  