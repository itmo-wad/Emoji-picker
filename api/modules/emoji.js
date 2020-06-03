'use strict';
const database = require("./emoji.json");
const Discordmoji = require('discord-emoji');

const local_database = (function (local_database = {}) {
  Object.keys(database).forEach(index => Object.assign(local_database, Object.fromEntries([[database[index].aliases, database[index].emoji]])));
  Object.keys(Discordmoji).forEach(index => Object.assign(local_database, Discordmoji[index !== 'emoji' && index]));
  return local_database;
}());

exports.parser = function (input) {
  const reg = new RegExp(/\:\w+\:/ig);

  return [...input.matchAll(reg)];
};

exports.local_database = function () {
  //Discordmojis += Object.keys(Discordmoji['emoji']).join(' ');
  return local_database;
}

exports.generate_keyboard = function () {
  let emoji_keyboard = [];

  for (let i = 0; i < Object.values(local_database).length; i+=11)
    emoji_keyboard.push(Object.values(local_database).slice(i, i+11));
  return emoji_keyboard;
}
