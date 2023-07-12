const prompts = [
  "Explore the unsettling depths of Level 1 in the Backrooms.",
  "Describe the eerie buzzing sound that echoes through the halls of Level 3.",
  "Write about a lost traveler navigating the endless maze of Level 4.",
  "Encounter a group of entities known as the Faceless Watchers on Level 6.",
  "Imagine the strange phenomena that occur on Level 8, where reality becomes distorted.",
  "Tell the story of a survivor's encounter with a mysterious entity lurking in Level 9.",
  "Describe the unsettling emptiness and darkness of Level 10.",
  "Write about the whispers and distorted voices that echo through the rooms of Level 11.",
  "Explore the bizarre architecture and shifting walls of Level 15.",
  "Encounter a fellow wanderer who has been trapped in the Backrooms for years.",
];

module.exports = {
  name: 'urban',
  description: 'backrooms lores',
  callback: (client, interaction) => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    const randomPrompt = prompts[randomIndex];

    interaction.reply(`Random Writing Prompt: ${randomPrompt}`);
  },
};