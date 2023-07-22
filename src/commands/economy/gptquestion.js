const { Client, Interaction } = require('discord.js');

const prompts = {
  'What is the meaning of life?': 'What is the meaning of life?',
  'Tell me a joke!': 'Tell me a joke!',
  'Describe the color blue.': 'Describe the color blue.',
  'What are the benefits of exercise?': 'What are the benefits of exercise?',
  'If you could have any superpower, what would it be?': 'If you could have any superpower, what would it be?',
  'Cooking Recipe: Pancakes': 'Cooking Recipe: Pancakes',
  'Cooking Recipe: Spaghetti Carbonara': 'Cooking Recipe: Spaghetti Carbonara',
  'Cooking Recipe: Chicken Curry': 'Cooking Recipe: Chicken Curry',
  'Interesting Fact: Elephants': 'Interesting Fact: Elephants',
  'Interesting Fact: Space': 'Interesting Fact: Space',
  'Interesting Fact: Human Brain': 'Interesting Fact: Human Brain',
  'Technology Prompt: Artificial Intelligence': 'Technology Prompt: Artificial Intelligence',
  'Technology Prompt: Virtual Reality': 'Technology Prompt: Virtual Reality',
  // Add more prompts as needed...
};

module.exports = {
  name: 'gptquestion',
  description: 'Ask GPT-3 a question and get an answer!',
  options: [
    {
      name: 'question',
      description: 'Ask your question:',
      type: 3,
      required: true,
      choices: Object.keys(prompts).map((key) => ({
        name: key,
        value: key,
      })),
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    try {
      await interaction.deferReply();

      const question = interaction.options.getString('question');

      const response = generateGPT3Response(question);

      // Send the response as a code block using three backticks
      const codeBlockResponse = `\`\`\`${response}\`\`\``;
      interaction.editReply(codeBlockResponse);
    } catch (error) {
      console.error('Error with /gptquestion:', error);
      interaction.editReply('An error occurred while processing your question.');
    }
  },
};

/**
 * Generate a response from GPT-3 using the provided question.
 * @param {string} question - The user's question.
 * @returns {string} - The generated response from GPT-3.
 */
function generateGPT3Response(question) {
  // Replace this with your GPT-3 generation logic
  // For demonstration purposes, we are returning a placeholder response.

  const promptKey = question;
  const prompt = prompts[promptKey];

  switch (promptKey) {
    case 'What is the meaning of life?':
      return `The meaning of life is 42.`;

    case 'Tell me a joke!':
      return `Why did the chicken cross the road? To get to the other side!`;

    case 'Describe the color blue.':
      return `The color blue is often associated with the sky and the sea.`;

    case 'What are the benefits of exercise?':
      return `The benefits of exercise include improved cardiovascular health, increased strength and flexibility, and enhanced mood.`;

    case 'If you could have any superpower, what would it be?':
      return `If I could have any superpower, I would choose the ability to fly!`;

    case 'Cooking Recipe: Pancakes':
      return `Here's a simple recipe for delicious pancakes:
        Ingredients:
        - 1 cup all-purpose flour
        - 2 tablespoons granulated sugar
        - 2 teaspoons baking powder
        - 1/2 teaspoon salt
        - 3/4 cup milk
        - 1 large egg
        - 2 tablespoons unsalted butter, melted
        Instructions:
        1. In a large bowl, whisk together the flour, sugar, baking powder, and salt.
        2. In a separate bowl, whisk together the milk, egg, and melted butter.
        3. Pour the wet ingredients into the dry ingredients and stir until just combined.
        4. Heat a non-stick skillet or griddle over medium heat.
        5. Pour 1/4 cup of the pancake batter onto the skillet and cook until bubbles form on the surface, then flip and cook the other side until golden brown.
        6. Serve the pancakes warm with your favorite toppings, such as maple syrup, fresh berries, or whipped cream.
        Enjoy your delicious homemade pancakes!`;

    case 'Cooking Recipe: Spaghetti Carbonara':
      return `Spaghetti Carbonara is a classic Italian pasta dish. Here's a traditional recipe:
        Ingredients:
        - 14 ounces spaghetti
        - 4 ounces pancetta or guanciale, diced
        - 2 large eggs
        - 1 cup Pecorino Romano cheese, grated
        - 1 clove garlic, minced
        - Freshly ground black pepper
        - Salt
        Instructions:
        1. Cook the spaghetti in a large pot of boiling salted water until al dente.
        2. In a separate pan, sauté the diced pancetta or guanciale until crispy.
        3. In a bowl, whisk together the eggs, grated Pecorino Romano cheese, minced garlic, and a generous amount of freshly ground black pepper.
        4. Drain the cooked spaghetti and immediately add it to the pan with the pancetta or guanciale. Toss to coat the pasta with the rendered fat.
        5. Remove the pan from the heat and quickly stir in the egg and cheese mixture, making sure the spaghetti is evenly coated.
        6. The heat from the pasta will cook the eggs and create a creamy sauce.
        7. Season with salt and more black pepper if needed.
        8. Serve the Spaghetti Carbonara immediately with extra grated Pecorino Romano cheese on top.
        Buon appetito!`;

    case 'Cooking Recipe: Chicken Curry':
      return `Chicken Curry is a flavorful Indian dish. Here's a simple recipe:
        Ingredients:
        - 1 pound boneless, skinless chicken breasts, cut into bite-sized pieces
        - 1 large onion, finely chopped
        - 2 cloves garlic, minced
        - 1-inch piece of fresh ginger, grated
        - 1 can (14 ounces) coconut milk
        - 2 tablespoons curry powder
        - 1 teaspoon ground cumin
        - 1 teaspoon ground coriander
        - 1/2 teaspoon turmeric
        - 1/4 teaspoon cayenne pepper (optional, for heat)
        - Salt and pepper to taste
        - Fresh cilantro, chopped (for garnish)
        - Cooked rice, for serving
        Instructions:
        1. In a large skillet or saucepan, heat some oil over medium-high heat.
        2. Add the chopped onion and cook until softened and translucent.
        3. Add the minced garlic and grated ginger, and cook for another minute until fragrant.
        4. Add the curry powder, ground cumin, ground coriander, turmeric, and cayenne pepper (if using). Stir to coat the onions, garlic, and ginger with the spices.
        5. Add the bite-sized chicken pieces to the pan and cook until browned on all sides.
        6. Pour in the coconut milk and bring the mixture to a simmer.
        7. Lower the heat and let the chicken simmer in the coconut milk for about 15-20 minutes, or until fully cooked and tender.
        8. Season the curry with salt and pepper to taste.
        9. Serve the Chicken Curry over cooked rice and garnish with fresh chopped cilantro.
        Enjoy your delicious homemade Chicken Curry!`;

    case 'Interesting Fact: Elephants':
      return `Did you know that elephants are the largest land animals on Earth? They are known for their impressive size, long trunks, and large ears. Elephants are highly intelligent and social creatures, with complex communication systems and emotional bonds within their herds. They play a crucial role in maintaining the ecosystems they inhabit, and they have a significant cultural and historical importance in various societies around the world.`;

    case 'Interesting Fact: Space':
      return `Space, also known as outer space, is the vast, seemingly infinite expanse that exists beyond Earth's atmosphere. It is an almost perfect vacuum, devoid of matter and air. Space is home to stars, galaxies, planets, moons, asteroids, comets, and other celestial bodies. The study of space, astronomy, has provided us with fascinating insights into the universe, its origins, and its evolution.`;

    case 'Interesting Fact: Human Brain':
      return `The human brain is an incredibly complex and powerful organ. It controls our thoughts, emotions, actions, and bodily functions. It weighs about 3 pounds and is made up of billions of neurons that transmit electrical and chemical signals. The human brain has remarkable plasticity, allowing it to change and adapt throughout life. It plays a central role in shaping who we are as individuals and how we perceive and interact with the world around us.`;

    case 'Technology Prompt: Artificial Intelligence':
      return `Artificial Intelligence (AI) is a branch of computer science that aims to create machines that can perform tasks that typically require human intelligence. AI systems can learn from experience, recognize patterns, make decisions, and solve complex problems. AI is being used in various industries, including healthcare, finance, transportation, and entertainment, to improve efficiency and provide innovative solutions.`;

    case 'Technology Prompt: Virtual Reality':
      return `Virtual Reality (VR) is a technology that creates a computer-generated simulation of a three-dimensional environment, which users can interact with using special electronic devices, such as VR headsets and motion controllers. VR provides a highly immersive and interactive experience, making users feel as if they are part of the virtual world. It is used in gaming, training, education, and other fields to create realistic and engaging experiences.`;

    default:
      return `This is the generated response for the question: "${question}"`;
  }
}
