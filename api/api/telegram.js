'use strict';
process.env.NTBA_FIX_319 = 1;
const emoji_db = require('../modules/emoji.js');
const TelegramBot = require('node-telegram-bot-api');

{
  const token = '1219145096:AAG9WWHVSrXUOM41hD6wOSBaVgPVrCORrMM';
  const bot = new TelegramBot(token, {polling: true});

  bot.onText(/\/transform/, (message) => {
    bot.sendMessage(message.chat.id, emojiser(`"${message.text.substr(11)}"`));
  });
  bot.onText(/\/list/, (message) => {
    bot.sendMessage(message.chat.id, "sah", {
    "reply_markup": {
        "keyboard": [["Sample text", "Second sample"],   ["Keyboard"], ["I'm robot"]]
        }
    });
    test()
    //bot.sendMessage(message.chat.id, "fuck"/*emoji_db.list())*/);
  });
  bot.onText(/\/test/, (message) => {
    bot.sendPhoto(message.chat.id, "https://risibank.fr/cache/stickers/d899/89948-full.png");
  });
}

function emojiser(input) {
  let prev = 0;
  let emoji = "";

  emoji_db.parser(input).forEach(word => {
    const tmp = input.length;

    emoji = `${emoji_db.transform(word[0])}`;
    input = input.substring(0, word.index - prev) + emoji + input.substring(word.index - prev + word[0].length);
    prev += tmp - input.length;
  });
  return input.slice(1, -1)
}

function test(){
  const e = require('discord-emoji');
  for (let k in e)
    console.log(Object.keys(e[k]))
}
