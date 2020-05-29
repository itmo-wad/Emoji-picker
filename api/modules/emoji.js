'use strict';
const emoji = require('discord-emoji');
const database = require("./emoji.json");

exports.parser = function (input) {
  const reg = new RegExp(/\:\w+\:/ig);
  const words = [...input.matchAll(reg)];

  return words;
};

exports.transform = function (word) {
  let needle = word.slice(1, -1);

  loop_key: for (let key in emoji) {
    loop_sub: for (let sub_key in emoji[key]) {
      if (sub_key === needle && key !== 'emoji') {
        needle = emoji[key][sub_key];
        break loop_key;
      } else if (sub_key === needle && key === 'emoji') {
        needle = emoji[key][sub_key];
        continue loop_key;
      };
    };
  };
  return (needle === word.slice(1, -1) ? word : needle);
};

exports.local_database = function () {
  let db = {};

  for (let index in database)
    db[`${database[index].aliases}`] = `${database[index].emoji}`;
  return db;
}

exports.list = function () {
  let emojis = '';

  for (let key in emoji) {
    if (key !== 'emoji') {
      emojis += Object.keys(emoji[key]).join(' ').replace(/(\w+)/g, match => `:${match}:`);
    };
  };
  emojis += Object.keys(emoji['emoji']).join(' ');
  return emojis;
};
