const fs = require('fs');
const request = require('request');
const puppeteer = require('puppeteer');
import { TextChannel, Message } from 'discord.js';

async function downloadVideoFromInstagram(url: string, filename: string) {
  const browser = await puppeteer.launch({
    Headless: true,
    args: [
      "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
        "--no-sandbox",
    ],
  });
  const page = await browser.newPage();

  // Set the user agent to a desktop browser
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');

  // Navigate to the Instagram post page
  await page.goto(url);

  // Wait for the video to load
  await page.waitForSelector('video[src]');

  // Get the video URL
  const videoUrl = await page.$eval('video[src]', (video: any) => video.src);

  const stream = request(videoUrl).pipe(fs.createWriteStream(filename));

  // Wait for the download to finish
  console.log('Downloading file')
  await new Promise(resolve => stream.on('finish', resolve));
  console.log('Done downloading file')

  // Close the browser
  await browser.close();

  console.log(`Video saved to ${filename}`);
}

export async function processInstagamLink(message: Message){
  const channel: any = message.channel;
  const parsedURL = new URL(message.content);
  const filename = 'video.mp4';

  await downloadVideoFromInstagram(parsedURL.href, filename)

  await channel.send({
    content: `From ${message.author} | ${message.content}`,
    files: [{
      attachment: filename,
      name: filename,
      description: 'a file',
    }],
  });
}
