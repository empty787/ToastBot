const { createCanvas, loadImage } = require('canvas');

module.exports = {
  name: 'farm',
  description: 'Show your farm with buttons',

  callback: async (client, interaction) => {
    try {
      // Defer the initial response
      await interaction.deferReply({ ephemeral: false });

      const canvas = createCanvas(400, 400);
      const ctx = canvas.getContext('2d');

      const background = await loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYddixLhmTFjlk-ikR5NRHpMJf3up2PnVOJMiBTGM2ueH_UJ6s');
      const cropImage = await loadImage('https://png.pngtree.com/png-clipart/20210907/ourmid/pngtree-golden-crop-wheat-ears-png-image_3869557.jpg');
      const animalImage = await loadImage('https://www.imageshine.in/uploads/gallery/Elephant-HD-PNG.png');

      // Initial draw
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      drawCropsInColumn(ctx, cropImage, 100, 300, 50, 50); // Draw crops in a column
      ctx.drawImage(animalImage, 200, 200, 80, 80);

      const buffer = canvas.toBuffer();

      const buttons = [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 1,
              custom_id: 'use_hoe',
              label: 'Use Hoe',
            },
            {
              type: 2,
              style: 1,
              custom_id: 'harvest',
              label: 'Harvest',
            },
            {
              type: 2,
              style: 1, // Change style to 1 for a primary button
              custom_id: 'replant', // Add a replant button
              label: 'Replant',
            },
            {
              type: 2,
              style: 2,
              custom_id: 'refresh',
              label: 'Refresh',
            },
            {
              type: 2,
              style: 2,
              custom_id: 'camera',
              label: 'Take a Picture',
            },
          ],
        },
      ];

      const reply = await interaction.editReply({
        content: 'Here is your farm:',
        embeds: [
          {
            title: 'Farm',
            color: 0x00ff00,
            image: { url: 'attachment://farm.png' },
          },
        ],
        files: [
          {
            name: 'farm.png',
            attachment: buffer,
          },
        ],
        components: buttons,
      });

      const collector = interaction.channel.createMessageComponentCollector({
        time: 15000,
        filter: (buttonInteraction) => buttonInteraction.user.id === interaction.user.id,
      });

      collector.on('collect', async (buttonInteraction) => {
        if (buttonInteraction.customId === 'use_hoe') {
          // Simulate using a hoe to harvest and fertilize the farm
          ctx.clearRect(100, 300, 50, 50); // Remove the crop
          ctx.clearRect(200, 200, 80, 80); // Remove the animal
          ctx.drawImage(background, 0, 0, canvas.width, canvas.height); // Redraw the background
          await updateCanvasAndSend(buffer, buttonInteraction, canvas);
        } else if (buttonInteraction.customId === 'harvest') {
          // Simulate harvesting the farm
          ctx.clearRect(100, 300, 50, 50); // Remove the crop
          ctx.drawImage(background, 0, 0, canvas.width, canvas.height); // Redraw the background
          await updateCanvasAndSend(buffer, buttonInteraction, canvas);
        } else if (buttonInteraction.customId === 'replant') {
          // Simulate replanting crops in a column
          ctx.clearRect(100, 0, 50, 400); // Clear entire crop column
          drawCropsInColumn(ctx, cropImage, 100, 300, 50, 50); // Draw crops in a column
          await updateCanvasAndSend(buffer, buttonInteraction, canvas);
        } else if (buttonInteraction.customId === 'refresh') {
          await buttonInteraction.update({ content: 'Refreshing your farm...' });
        } else if (buttonInteraction.customId === 'camera') {
          await buttonInteraction.update({ content: 'Taking a picture of your farm...' });
        }
      });

      collector.on('end', async (collected, reason) => {
        try {
          // Set all buttons to disabled
          for (const button of buttons[0].components) {
            button.disabled = true;
          }

          // Update the reply with disabled buttons
          await reply.edit({ components: buttons });

          // Clear the collector to prevent further interactions
          collector.stop();

          setTimeout(async () => {
            // Edit the reply to indicate the command is disabled
            await reply.edit({
              content: 'This command is now disabled.',
              // components: [], unused lol
            });
          }, 3000); // Delay in milliseconds before disabling the command
        } catch (error) {
          console.error(error);
        }
      });
    } catch (error) {
      console.error(error);
    }
  },
};

async function updateCanvasAndSend(buffer, buttonInteraction, canvas) {
  const updatedBuffer = canvas.toBuffer();
  await buttonInteraction.update({
    content: 'Updated farm:',
    embeds: [
      {
        title: 'Farm',
        color: 0x00ff00,
        image: { url: 'attachment://updated_farm.png' },
      },
    ],
    files: [
      {
        name: 'updated_farm.png',
        attachment: updatedBuffer,
      },
    ],
  });
}

function drawCropsInColumn(ctx, cropImage, x, y, width, height) {
  const numRows = 4; // Number of crops in a column
  const spacing = 10; // Spacing between crops

  for (let i = 0; i < numRows; i++) {
    const yPos = y - i * (height + spacing);
    ctx.drawImage(cropImage, x, yPos, width, height);
  }
}
