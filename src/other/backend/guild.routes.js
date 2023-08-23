// const express = require('express');
// const router = express.Router();
// const { GuildController } = require('./guild.controller');
// const { PrismaService } = require('./prisma.service');
// const { BotService } = require('./bot.service'); // Import the BotService correctly

// // Create an instance of PrismaService
// // const prisma = new PrismaService();

// // Create an instance of BotService and initialize it
// const botService = new BotService(prisma);
// botService.on('ready', () => {
//   if (botService.user != null) {
//     console.log(`Logged in as ${botService.user.tag}!`);
//   }
// });

// // Create an instance of GuildController
// const guildController = new GuildController(botService, prisma);

// // Define your routes using the GuildController methods
// router.get('/:guild', (req, res) => guildController.getGuild(req, res));
// router.get('/:guild/feature', (req, res) => guildController.getFeature(req, res));
// router.post('/:guild/feature', (req, res) => guildController.enableFeature(req, res));
// router.put('/:guild/feature', (req, res) => guildController.updateFeature(req, res));
// router.delete('/:guild/feature', (req, res) => guildController.disableFeature(req, res));
// router.get('/:guild/channels', (req, res) => guildController.getChannels(req, res));
// router.get('/:guild/roles', (req, res) => guildController.getRoles(req, res));

// module.exports = router;