module.exports = {
    name: 'coinflip',
    description: 'Flip a coin and get heads or tails.',
    execute(message, args) {
      const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
      message.reply(`The coin landed on ${result}!`);
    },
  };
  