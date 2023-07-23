require('dotenv').config();
const { Client, IntentsBitField, ActivityType } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
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
    name: 'to DolphTunes',
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

// dolphworld welcome canvas

client.on('guildMemberAdd', async (member) => {
  const welcomeChannel = member.guild.channels.cache.find((channel) => channel.name.toLowerCase().includes('welcome'));

  if (welcomeChannel) {
    const canvas = createCanvas(800, 200);
    const ctx = canvas.getContext('2d');

    // Load the background image
    const backgroundImage = await loadImage('https://i.imgur.com/FMXo96r_d.jpg?maxwidth=520&shape=thumb&fidelity=high');

    // Draw the background image
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Set the text properties
    ctx.font = '33px Arial';
    ctx.fillStyle = '#964B00';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw the welcome message
    ctx.fillText(`Welcome ${member.displayName} to ${member.guild.name}!`, canvas.width / 2, canvas.height / 2);

    // Add some decorations
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 5;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    // Convert the canvas to a buffer
    const buffer = canvas.toBuffer('image/png');

    // Send the welcome message with the canvas as an attachment
    welcomeChannel.send({
      content: `Welcome ${member} to ${member.guild.name}! Enjoy your stay.`,
      files: [{
        attachment: buffer,
        name: 'welcome.png',
      }],
    });
  } else {
    const serverOwner = member.guild.owner;
    if (serverOwner) {
      const randomChatChannel = member.guild.channels.cache.random();
      randomChatChannel.send(`Hey ${serverOwner}, please create a welcome channel in your server (${member.guild.name}) to enable the welcome message.`);
    }
  }
});


// code ending

client.on('messageCreate', (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content === '!ping') {
    message.reply('Pong! 🏓');
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