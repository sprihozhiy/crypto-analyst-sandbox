const { Telegraf } = require('telegraf');
require('dotenv').config();

const token = process.env.TELEGRAM_API;

// Listen for any kind of message. There are different kinds of
// messages.
const bot = new Telegraf(token);
bot.start((ctx) => {
  const urlToken = 'https://google.com';
  const addressToken = '0xmifrf3345fdfdcdcd';
  const platformToken = 'BSC';
  const tokenName = "Token Name";
  const symbolToken = 'TN';

  const message = `  
  <b>-[${symbolToken}]-</b><i> ${tokenName}</i>
  <i> </i>
  <b>Name: </b><i> ${tokenName}</i>
  <b>Platform: </b><i>${platformToken}</i>
  <b>Contract: </b><code>${addressToken}</code>
  <b> </b>
  <i>*Click Contract Address to copy</i>
  <i> </i>
  <a href="${urlToken}">Listing URL</a>
  `;
  ctx.reply(message, {parse_mode: 'HTML'})

});
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();