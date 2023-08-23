// const express = require('express');
// const router = express.Router();
// const BotService = require('./bot.service');
// const PrismaService = require('./prisma.service');

// // Create instances of your services
// const botService = new BotService(prisma);

// // Create an instance of Express router
// const guildRouter = express.Router();

// // Define route handlers for GuildController methods
// guildRouter.get('/:guild', async (req, res) => {
//   const guild = req.params.guild;
//   const data = botService.bot.guilds.cache.get(guild);
//   if (data == null) return res.status(404).json('null');

//   const enabledFeatures = await botService.getEnabledFeatures(guild);

//   res.json({
//     id: data.id,
//     name: data.name,
//     icon: data.icon,
//     enabledFeatures,
//   });
// });

// guildRouter.get('/:guild/feature', async (req, res) => {
//   const guild = req.params.guild;
//   const data = await prisma.welcomeMessage.findUnique({
//     where: {
//       id: guild,
//     },
//   });

//   if (data == null) return res.status(404).json(null);

//   res.json({
//     message: data.message,
//     channel: data.channel,
//   });
// });

// guildRouter.post('/:guild/feature', async (req, res) => {
//   const guild = req.params.guild;
//   await botService.bot.checkPermissions(req.session, guild);

//   try {
//     await prisma.welcomeMessage.upsert({
//       create: {
//         id: guild,
//       },
//       update: {},
//       where: {
//         id: guild,
//       },
//     });

//     res.json('Success');
//   } catch (error) {
//     res.status(500).json('Error');
//   }
// });

// guildRouter.put('/:guild/feature', async (req, res) => {
//   const guild = req.params.guild;
//   const body = req.body;
//   await botService.bot.checkPermissions(req.session, guild);

//   try {
//     const updated = await prisma.welcomeMessage.update({
//       where: {
//         id: guild,
//       },
//       data: {
//         ...body,
//         id: undefined,
//       },
//     });

//     res.json(updated);
//   } catch (error) {
//     res.status(500).json('Error');
//   }
// });

// guildRouter.delete('/:guild/feature', async (req, res) => {
//   const guild = req.params.guild;
//   await botService.bot.checkPermissions(req.session, guild);

//   try {
//     await prisma.welcomeMessage.delete({
//       where: {
//         id: guild,
//       },
//     });

//     res.json('Success');
//   } catch (error) {
//     res.status(500).json('Error');
//   }
// });

// guildRouter.get('/:guild/channels', async (req, res) => {
//   const guild = req.params.guild;
//   const channels = await botService.bot.guilds.cache.get(guild)?.channels.fetch();
//   if (channels == null) return res.status(404).json(null);

//   res.json([...channels.values()]);
// });

// guildRouter.get('/:guild/roles', async (req, res) => {
//   const guild = req.params.guild;
//   const roles = await botService.bot.guilds.cache.get(guild)?.roles.fetch();
//   if (roles == null) return res.status(404).json(null);

//   res.json([...roles.values()]);
// });

// // Export the router
// module.exports = guildRouter;
