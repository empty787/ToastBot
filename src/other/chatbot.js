const { Configuration, OpenAIApi } = require('openai');
const context = require('./context');

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const msgLengthLimit = 2000;

async function generateReply(message, client) {
  try {
    if (message.author.bot) return;
    if (message.channel.id !== process.env.CHAT_BOT_CHANNEL) return;
    if (message.content.startsWith('!')) return;

    await message.channel.sendTyping();

    if (message.content.length > msgLengthLimit) {
      message.reply("Whoa now, I'm not going to read all that. Maybe summarize?");
      return;
    }

    // Rest of the code (message processing, conversation log, and OpenAI interaction)...
    const prevMessages = await message.channel.messages.fetch({ limit: 15 });
    const prevMessagesArray = Array.from(prevMessages.values()); // Convert to an array

    let conversationLog = [{ role: 'system', content: context }];

    for (const msg of prevMessagesArray.reverse()) {
      if (msg.content.startsWith('!')) continue;
      if (msg.content.length > msgLengthLimit) continue;
      if (msg.author.id !== client.user.id && msg.author.bot) continue;

      if (msg.author.id === client.user.id) {
        conversationLog.push({
          role: 'assistant',
          content: `${msg.content}`,
        });
      } else {
        if (msg.author.id !== message.author.id) continue;

        conversationLog.push({
          role: 'user',
          content: `${msg.content}`,
        });
      }
    }

    const res = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: conversationLog,
    });

    let reply = res.data.choices[0].message?.content;

    if (reply?.length > 2000) {
      const buffer = Buffer.from(reply, 'utf8');
      const txtFile = new AttachmentBuilder(buffer, { name: `${message.author.tag}_response.txt` });

      message.reply({ files: [txtFile] }).catch(() => {
        message.channel.send({ content: `${message.author}`, files: [txtFile] });
      });
    } else {
      message.reply(reply).catch(() => {
        message.channel.send(`${message.author} ${reply}`);
      });
    }

    return reply;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
}

module.exports = { generateReply };
