const prompts = [
  "Write a short story about a mysterious package.",
  "Describe a character who can communicate with animals.",
  "Imagine a world where everyone has a superpower of their choice.",
  "Write a poem inspired by the ocean at sunset.",
  "Tell a story from the perspective of an inanimate object.",
  "Create a dialogue between two unlikely friends.",
  "Describe a futuristic cityscape with advanced technology.",
  "Write about a life-changing adventure in a foreign land.",
  "Imagine a world without any form of technology.",
  "Tell a story that begins with the sentence: 'The door creaked open, revealing a hidden secret.'"
];

module.exports = {
  name: 'randomprompt',
  description: 'Generate a random writing prompt',
  callback: (client, interaction) => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    const randomPrompt = prompts[randomIndex];

    interaction.reply(`Random Writing Prompt: ${randomPrompt}`);
  },
};