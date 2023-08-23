// const { Client, GatewayIntentBits } = require('discord.js');
// const { PrismaService } = require('./prisma.service');
// const { getUserID, UserSession } = require('./discord');

// class BotService extends Client {
//   constructor(prisma) {
//     super({ intents: [GatewayIntentBits.Guilds] });
//     this.prisma = prisma;
//   }

//   async onModuleInit() {
//     // Initialize the Discord client here if needed
//     this.initBot();
//   }

//   initBot() {
//     this.on('ready', () => {
//       if (this.user != null) {
//         console.log(`Logged in as ${this.user.tag}!`);
//       }
//     });

//     // Login using the bot token
//     this.login(process.env.TOKEN); // Replace 'YOUR_BOT_TOKEN' with your actual bot token
//   }

//   async getEnabledFeatures(guild) {
//     const features = [];
//     const welcomeMessage = await this.prisma.welcomeMessage.count({
//       where: {
//         id: guild,
//       },
//     });

//     if (welcomeMessage !== 0) {
//       features.push('welcome-message');
//     }

//     return features;
//   }

//   async checkPermissions(user, guildID) {
//     const guild = this.guilds.cache.get(guildID);
//     if (guild == null) {
//       throw new HttpException('Guild Not found', HttpStatus.NOT_FOUND);
//     }

//     const userID = await getUserID(user.access_token);
//     const member = await guild?.members.fetch(userID);

//     if (
//       !member?.permissions.has('Administrator') &&
//       guild.ownerId !== member.id
//     ) {
//       throw new HttpException('Missing permissions', HttpStatus.BAD_REQUEST);
//     }
//   }
// }

// module.exports = { BotService };
