module.exports = {
    name: 'computer',
    description: 'random cmd i made',
    callback: async (client, interaction) => {
      await interaction.reply('Loading...').then(async (loadingMessage) => {
        const spinner = ['◜', '◠', '◝', '◞', '◡', '◟'];
        let index = 0;
  
        const updateLoader = (progress) => {
          const progressBar = `\`${'■'.repeat(Math.floor(progress / 10))} ${' '.repeat(10 - Math.floor(progress / 10))}\``;
          const updatedMessage = `Sending a virtual hug (っ◔◡◔)っ ♥ ${progress}% ${progressBar} ${spinner[index]}`;
          loadingMessage.edit(updatedMessage);
          index = (index + 1) % spinner.length;
        };
  
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          if (progress <= 100) {
            updateLoader(progress);
          } else {
            clearInterval(interval);
  
            const embed = {
              title: 'Loading Complete',
              description: '(っ◔◡◔)っ ♥ ♥ ♥ ♥ ✤✤✤✤ [eeeeee - Never Gonna Give You Up](https://www.youtube.com/watch?v=dQw4w9WgXcQ)',
              color: 0x44a3e3,
              thumbnail: {
                url: 'https://i.imgur.com/CQiKstK.jpg',
              },
              footer: {
                text: `Requested by ${interaction.user.username}`,
                icon_url: 'https://i.imgur.com/CQiKstK.jpg',
              },
              timestamp: new Date(),
            };
  
            const resultMessage = `Loading complete! Enjoy! Here is your secret surprise: [Rick Astley - Never Gonna Give You Up](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`;
            interaction.editReply({ content: resultMessage, embeds: [embed] });
          }
        }, 500);
      });
    },
  };


  function formatUptime(uptime) {
    const totalSeconds = Math.floor(uptime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  }