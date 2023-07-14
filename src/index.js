require('dotenv').config();
const { Client, IntentsBitField, ActivityType } = require('discord.js');
const mongoose = require('mongoose');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

let status = [
  {
    name: 'Sub to DolphinNotFound',
    type: ActivityType.Streaming,
    url: 'https://www.youtube.com/watch?v=opwWUaUadH0&ab_channel=DolphinNotFound',
  },
  {
    name: 'Sub to DolphinNotFound for 10000000 DolphinBucks and 40000000 DolphCoins!!!',
    type: ActivityType.Streaming,
    url: 'https://www.youtube.com/watch?v=opwWUaUadH0&ab_channel=DolphinNotFound',
  },
  {
    name: 'DolphWorld Economy',
    type: ActivityType.Competing,
  },
  {
    name: 'DolphinNotFound',
    type: ActivityType.Watching,
  },
  {
    name: '/ping | /level | /work | /spinwheel',
    type: ActivityType.Playing,
  },
  {
    name: 'Join DolphWorld! https://discord.gg/K65AYbuDeF',
    type: ActivityType.Playing,
  },
  {
    name: 'SUB 2 DOLPHINNOTFOUND',
    type: ActivityType.Listening
  },
];

client.on('ready', (c) => {
  console.log(`✅ ${c.user.tag} is online.`);

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 10000);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) {
    return;
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