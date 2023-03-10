import { Client, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';

import { processTwitterLink } from './fxtwitter';
import { isTwitterLink } from './utils';

config();

const intents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.GuildMessageReactions,
];

const client = new Client({ intents });

client.on('ready', () => {
  console.log(`ready`);
});

// https://discord.js.org/#/docs/discord.js/main/general/welcome
client.on('messageCreate', message => {
  if (!message.author.bot) {
    if (isTwitterLink(message.content)) {
      processTwitterLink(message);
    }
  }
});

client.login(process.env.DISCORD_API_TOKEN);
