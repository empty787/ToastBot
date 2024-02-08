module.exports = {
    name: 'roll',
    description: 'Roll a random number between 1 and 100.',
    execute(message, args) {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      message.reply(`You rolled a ${randomNumber}!`);
    },
  };
  