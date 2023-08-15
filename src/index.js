require('dotenv').config();
const { Client, IntentsBitField, ActivityType, WebhookClient } = require('discord.js');
const messageCommandHandler = require('./other/messageCmdHandler');
const { logJoin, logLeave } = require('./other/logger');
const { generateWelcomeCard } = require('./other/welcome');
const status = require('./other/status');
const { handleCommands } = require('./other/messageCmdHandler');
const { handleVideoIdea } = require('./other/videoIdeas');
const { generateReply } = require('./other/chatbot');
const { createCanvas, loadImage } = require('canvas');
const mongoose = require('mongoose');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions,
  ],
});

function setBotStatus() {
  const chosenStatus = status[Math.floor(Math.random() * status.length)]; // Choose a random status from the array
  client.user.setActivity(chosenStatus.name, { type: chosenStatus.type, url: chosenStatus.url });
}

client.on('ready', (c) => {
  console.log(`✅ ${c.user.tag} is online.`);

  client.user.setPresence({ activities: [{ name: 'with yarn🧶 meow' }], status: `idle` });

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 50 * 1000);
});

client.on('guildMemberAdd', async (member) => {
  try {
    await generateWelcomeCard(member); // Generate the welcome card using the function
  } catch (error) {
    console.error('Failed to send the welcome card:', error);
  }
});

client.on('messageCreate', async (message) => {
  try {
    const reply = await generateReply(message, client);

    // Handle the reply if needed...
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

// Message commands
client.on('messageCreate', (message) => {
handleCommands(message, client);
});

// handle video ideas
client.on('messageCreate', (message) => {
  handleVideoIdea(message);
});

// join server
client.on('guildCreate', async (guild) => {
  logJoin(client, guild);
});

// Event: When the bot leaves a server (guild)
client.on('guildDelete', async (guild) => {
  logLeave(client, guild);
});

// Message Command Handler
client.on('message', (message) => {
  // Call the handleCommands function from messageCommandHandler
  messageCommandHandler.handleCommands(message, client);
});

(async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URL, { keepAlive: true });
    console.log('Connected to DB.');

    eventHandler(client);

    client.login(process.env.TOKEN);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();