const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');

// Define the card values
const cardValues = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  J: 10,
  Q: 10,
  K: 10,
  A: 11,
};

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply('You can only run this command inside a server.');
      return;
    }

    await interaction.deferReply();

    try {
      // Create a deck of cards
      const deck = createDeck();
      // Shuffle the deck
      shuffleDeck(deck);

      // Draw initial cards for the player and the dealer
      const playerHand = [drawCard(deck), drawCard(deck)];
      const dealerHand = [drawCard(deck)];

      // Calculate the initial hand values
      const playerHandValue = calculateHandValue(playerHand);
      const dealerHandValue = calculateHandValue(dealerHand);

      // Check for player blackjack
      if (playerHandValue === 21) {
        interaction.editReply('You got a Blackjack! You win!');
        return;
      }

      // Display the initial hands
      const playerCards = formatCards(playerHand);
      const dealerCards = formatCards(dealerHand.slice(1)); // Hide the dealer's first card
      interaction.editReply(
        `**Your Hand:** ${playerCards}\n**Dealer's Hand:** ||${dealerCards}, ??||\nType '/hit' to draw another card or '/stand' to stay.`
      );

      // Add the Blackjack interaction collector
      const filter = (i) =>
        i.user.id === interaction.user.id && ['/hit', '/stand'].includes(i.commandName);
      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

      // Handle the player's actions
      collector.on('collect', async (i) => {
        if (i.commandName === '/hit') {
          // Player draws another card
          const newCard = drawCard(deck);
          playerHand.push(newCard);
          const newHandValue = calculateHandValue(playerHand);

          // Check for player bust
          if (newHandValue > 21) {
            collector.stop();
            const playerCards = formatCards(playerHand);
            interaction.editReply(
              `**Your Hand:** ${playerCards}\n**Dealer's Hand:** ${formatCards(dealerHand)}\nBust! You lose!`
            );
            return;
          }

          // Continue the game
          const playerCards = formatCards(playerHand);
          interaction.editReply(
            `**Your Hand:** ${playerCards}\n**Dealer's Hand:** ||${dealerCards}, ??||\nType '/hit' to draw another card or '/stand' to stay.`
          );
        } else if (i.commandName === '/stand') {
          // Player stands, dealer plays
          collector.stop();
          const dealerCards = formatCards(dealerHand);
          interaction.editReply(
            `**Your Hand:** ${formatCards(playerHand)}\n**Dealer's Hand:** ${dealerCards}`
          );

          // Dealer draws cards until hand value reaches 17 or greater
          while (dealerHandValue < 17) {
            dealerHand.push(drawCard(deck));
            dealerHandValue = calculateHandValue(dealerHand);
          }

          // Check for dealer bust
          if (dealerHandValue > 21) {
            interaction.channel.send('Dealer busts! You win!');
          } else {
            // Compare the hands and determine the winner
            if (playerHandValue > dealerHandValue) {
              interaction.channel.send('You win!');
            } else if (playerHandValue < dealerHandValue) {
              interaction.channel.send('Dealer wins!');
            } else {
              interaction.channel.send("It's a tie!");
            }
          }
        }
      });

      collector.on('end', () => {
        interaction.channel.send('The game has ended.');
      });
    } catch (error) {
      console.error('Error running blackjack command:', error);
      interaction.editReply('An error occurred while running the command.');
    }
  },

  name: 'blackjack',
  description: 'Play a game of Blackjack.',
};

// Helper function to create a deck of cards
function createDeck() {
  const suits = ['♠️', '♥️', '♦️', '♣️'];
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  const deck = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ rank, suit });
    }
  }

  return deck;
}

// Helper function to shuffle the deck using the Fisher-Yates algorithm
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Helper function to draw a card from the deck
function drawCard(deck) {
  return deck.pop();
}

// Helper function to calculate the value of a hand
function calculateHandValue(hand) {
  let handValue = 0;
  let numAces = 0;

  for (const card of hand) {
    const value = cardValues[card.rank];
    handValue += value;

    if (card.rank === 'A') {
      numAces++;
    }

    // Adjust the value of Aces if needed
    while (handValue > 21 && numAces > 0) {
      handValue -= 10;
      numAces--;
    }
  }

  return handValue;
}

// Helper function to format the cards in a hand as a string
function formatCards(hand) {
  return hand.map((card) => `${card.rank}${card.suit}`).join(', ');
}
