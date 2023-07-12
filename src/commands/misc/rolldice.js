module.exports = {
    name: 'roll',
    description: 'Roll a dice',
    options: [
      {
        name: 'sides',
        description: 'Number of sides on the dice',
        type: 'INTEGER',
        required: true,
      },
    ],
    callback: (client, interaction) => {
      const sides = interaction.options.getInteger('sides');
      const result = Math.floor(Math.random() * sides) + 1;
      interaction.reply(`You rolled a ${result} on a ${sides}-sided dice.`);
    },
  };  