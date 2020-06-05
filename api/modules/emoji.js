'use strict';
const Database = require("./emoji.json"),
      Discordmoji = require('discord-emoji'),
      Unicode = require('./emoji_unicode_13.0.json');

const local_database = (function (local_database = {}) {
  Object.assign(local_database, Unicode);
  Object.keys(Database).forEach(index => Object.assign(local_database, Object.fromEntries([[Database[index].aliases, Database[index].emoji]])));
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
};

exports.generate_keyboard = function () {
  let emoji_keyboard = [];

  for (let i = 0; i < Object.values(local_database).length; i+=11)
    emoji_keyboard.push(Object.values(local_database).slice(i, i+11));
  return emoji_keyboard;
};

exports.unicode_to_json = function (path) {
  let json = {};
  const abbreviation = {
    "boy": "b",
    "man": "m",
    "girl": "g",
    "bald": "bl",
    "woman": "w",
    "red hair": "rh",
    "white hair": "wh",
    "curly hair": "ch",
    "dark skin tone": "dst",
    "light skin tone": "lst",
    "medium skin tone": "mst",
    "medium-dark skin tone": "mdst",
    "medium-light skin tone": "mlst"
  };

  require('fs').readFile(path, function(err, data) {
    let array = data.toString().split("\n");
    if (err) {
      throw err;
    } else {
      array.forEach(row => {
        if (row.startsWith('#') && row !== "") {
          let options = "";
          let key = row.slice(row.lastIndexOf(';') + 2, (row.indexOf(':') === -1 && row.indexOf('#') || row.indexOf(':'))).replace(/ /gi, '_')
          if (row.indexOf(':') !== -1) {
            options = "_"
            row.slice(row.indexOf(':') + 2, row.indexOf('#')).split(', ').forEach(word => {
              word = word.match(/( ?((\w+-?)+))*/g)[0];
              options += `${abbreviation[word] || word}`;
            });
          } else {
            key = key.match(/(_?([a-zA-Z]+))+/gm);
          }
          Object.assign(json, Object.fromEntries([[`${key}${options}`, row.slice(row.indexOf('(') + 1, -1)]]));
        };
      });
      require('fs').writeFileSync(`${path.slice(0, -3)}json`, JSON.stringify(json));
      return json;
    };
  });
};
