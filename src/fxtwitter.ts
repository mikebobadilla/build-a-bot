import { ChannelType, Message } from 'discord.js';

export function processTwitterLink(message: Message) {
  const channel = message.channel;
  const parsedURL = new URL(message.content);

  parsedURL.hostname = "fxtwitter.com";

  if (channel.type === ChannelType.GuildText) {
    message.delete();
    channel.send(`From ${message.author} | ${parsedURL.href}`);
  }
}
