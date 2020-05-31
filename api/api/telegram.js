'use strict';
process.env.NTBA_FIX_319 = 1;

const Emojis = require('../modules/emoji.js'),
      TelegramBot = require('node-telegram-bot-api'),
      url = "https://risibank.fr/cache/stickers/d899/89948-full.png";

function emojiser(input = undefined) {
  Emojis.parser(input).forEach(word => input = input.replace(word[0], (local_database[word[0].slice(1, -1)] || word[0])));
  return input.slice(1, -1)
}

(function () {
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
    //bot.sendMessage(message.chat.id, "fuck"/*emojis.local_database())*/);
  });

  bot.onText(/\/test/, (message) => {
    bot.sendPhoto(message.chat.id, url);
  });
}());
