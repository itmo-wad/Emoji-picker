'use strict';
const Database = require("./emoji.json"),
      Discordmoji = require('discord-emoji'),
      Unicode = require('./emoji_unicode_13.0.json'),
      Abbreviation = {
        "boy": "b",
        "man": "m",
        "girl": "g",
        "bald": "bl",
        "woman": "w",
        "red hair": "rh",
        "blond hair": "bh",
        "curly hair": "ch",
        "white hair": "wh",
        "dark skin tone": "dst",
        "light skin tone": "lst",
        "medium skin tone": "mst",
        "medium-dark skin tone": "medst",
        "medium-light skin tone": "melst"
      };

const local_database = (function (local_database = {}) {
  Object.assign(local_database, Unicode);
  Object.keys(Database).forEach(key => Object.assign(local_database, Object.fromEntries([[Database[key].aliases, Database[key].emoji]])));
  Object.keys(Discordmoji).forEach(key => Object.assign(local_database, Discordmoji[key !== 'emoji' && key]));
  return local_database;
}());

exports.parser = function (input) {
  const reg = new RegExp(/\:\w+\:/ig);

  return [...input.matchAll(reg)];
};

exports.local_database = function () {
  return local_database;
};

const util = require('util')

exports.generate_keyboard = function (p) {
  let page0 = [],
      page1 = [],
      page2 = [],
      page3 = [],
      page4 = [],
      page5 = [],
      page6 = [],
      skin_color = "",
      emoji_keyboard = [];

  Object.keys(local_database).forEach(key => {
    if (key.lastIndexOf('_') !== -1)
      skin_color = key.slice(key.lastIndexOf('_')).replace(/m(?!e|s)|w|b|g|bl/gi, '');
    skin_color = (skin_color.search(/_me/gi) !== -1 ? skin_color.slice(1, 6) : (skin_color.search(/_d|_l|_m/gi) !== -1 ? skin_color.slice(1, 4) : skin_color));
    if (key.startsWith('flag')) {
      page6.push(local_database[key])
    } else {
      switch (skin_color) {
        case 'lst':
          page1.push(local_database[key]);
          break;
        case 'melst':
          page2.push(local_database[key]);
          break;
        case 'mst':
          page3.push(local_database[key]);
          break;
        case 'medst':
          page4.push(local_database[key]);
          break;
        case 'dst':
          page5.push(local_database[key]);
          break;
        default:
          page0.push(local_database[key]);
      };
    };
  });
  for (let i = 0; i !== 7; i++) {
    let index = [['prev', 'next']];
    for (let j = 0; j < eval(`page${i}`).length; j += 11) {
      if (index.length < 27) {
        index.push(eval(`page${i}`).slice(j, j + 11));
      } else {
        emoji_keyboard.push(index);
        index = [['prev', 'next']];
        index.push(eval(`page${i}`).slice(j, j + 11));
      };
    }
    if (index.length > 2)
      emoji_keyboard.push(index);
  };
  return emoji_keyboard;
};

exports.unicode_to_json = function (path) {
  let json = {};

  require('fs').readFile(path, function(err, data) {
    let array = data.toString().split("\n");
    if (err) {
      throw err;
    } else {
      array.forEach(row => {
        if (!row.startsWith('#') && row !== "") {
          let options = "";
          let key = row.slice(row.lastIndexOf(';') + 2, (row.indexOf(':') === -1 && row.indexOf('#') || row.indexOf(':'))).replace(/ /gi, '_')
          if (row.indexOf(':') !== -1) {
            options = "_"
            row.slice(row.indexOf(':') + 2, row.indexOf('#')).split(', ').forEach(word => {
              word = word.match(/( ?((\w+-?)+))*/g)[0];
              options += `${Abbreviation[word] || word}`;
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
