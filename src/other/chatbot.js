const { OpenAIApi, Configuration } = require("openai");

const config = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(config);

// Function to handle the AI chat functionality
async function handleChatGpt(message, client) {
  if (message.author.bot) return;
  if (message.channel.id !== "your_chatbot_channel") return;

  message.channel.sendTyping();

  let messages = Array.from(
    await message.channel.messages.fetch({
      limit: 5,
      before: message.id,
    })
  );
  messages = messages.map((m) => m[1]);
  messages.unshift(message);

  let users = [
    ...new Set([...messages.map((m) => m.member.displayName), client.user.username]),
  ];
  let lastUser = users.pop();

  let prompt = `The following is a conversation between ${users.join(", ")}, and ${lastUser}. \n\n`;

  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    prompt += `${m.member.displayName}: ${m.content}\n`;
  }
  prompt += `${client.user.username}:`;

  const response = await openai.createCompletion({
    prompt,
    model: "text-davinci-003",
    max_tokens: 500,
    stop: ["\n"],
  });

  await message.channel.send(response.data.choices[0].text);
}

module.exports = { handleChatGpt };

