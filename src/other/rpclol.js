const rpc = require("discord-rpc");
const client = new rpc.Client({ transport: 'ipc' });

client.on('ready', () => {
  console.log('Discord RPC is ready.');

  const activity = {
    details: "🚀 Coding with Visual Studio Code",
    state: "im just coding discord bots and websites",
    assets: {
      large_image: "vscode_icon",
      large_text: "Visual Studio Code",
      small_image: "a",
      small_text: "im just coding discord bots and websites",
    },
    buttons: [
      { label: "Join rpc's Discord Server", url: "https://server.steals-code.tk/someones" },
      { label: "Visit rpc's Website", url: "https://noice.link/bio" }
    ],
  };

  client.request('SET_ACTIVITY', {
    pid: process.pid,
    activity
  });
});

client.login({ clientId: "1125530042915631159" }).catch(console.error);

module.exports = client;