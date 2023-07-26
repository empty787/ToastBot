module.exports = {
    handleCommands: (message, client) => {
      if (message.author.bot) {
        return;
      }
  
      if (message.content === '!ping') {
        message.reply('Pong! 🏓');
      }

      if (message.content === '!date') {
        const currentDate = new Date().toLocaleDateString();
        message.reply(`Today's date is ${currentDate}`);
      }
      
      if (message.content === '!roll') {
        const randomNum = Math.floor(Math.random() * 6) + 1;
        message.reply(`You rolled a ${randomNum}`);
      }   
      
      const catFacts = [
        "Cats sleep for about 70% of their lives.",
        "A group of cats is called a 'clowder'.",
        "Cats have whiskers on the backs of their front legs too.",
        "Cats have a special reflective layer behind their retinas, which helps them see better in low light.",
      ];
      
      if (message.content === '!catfact') {
        const randomFact = catFacts[Math.floor(Math.random() * catFacts.length)];
        message.reply(`Here's a cat fact: ${randomFact}`);
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
  