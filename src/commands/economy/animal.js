module.exports = {
  name: 'animal',
  description: 'Fetch a random animal image',
  options: [
    {
      name: 'animal',
      description: 'The type of animal to view',
      type: 3, // String option type
      required: true,
      choices: [
        {
          name: 'Dog',
          value: 'dog',
        },
        {
          name: 'Cat',
          value: 'cat',
        },
        {
          name: 'Fox',
          value: 'fox',
        },
        {
          name: 'Panda',
          value: 'panda',
        },
        {
          name: 'Red Panda',
          value: 'red_panda',
        },
        {
          name: 'Koala',
          value: 'koala',
        },
      ],
    },
  ],

  callback: async (client, interaction) => {
    try {
      const chosenAnimal = interaction.options.getString('animal');
      const animalImage = await fetchAnimalImage(chosenAnimal);

      const embed = {
        color: 0x00ff00,
        title: `Random ${chosenAnimal.charAt(0).toUpperCase() + chosenAnimal.slice(1)} Image`,
        image: { url: animalImage},
      };

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.reply('An error occurred while fetching the animal image.');
    }
  },
};

async function fetchAnimalImage(animalType) {
  const response = await fetch(`https://some-random-api.ml/img/${animalType}`);
  const data = await response.json();
  return data.link;
}
