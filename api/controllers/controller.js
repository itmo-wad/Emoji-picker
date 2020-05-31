'use strict';
const Emojis = require('../modules/emoji.js');

String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

exports.request = function (req, res, next) {
  let input = (req.query.input || undefined);

  if (input === undefined || input === `""` || input[0] !== '"') {
    res.status(400).send(`Missing parameter '?input=""'`);
  } else {
    Emojis.parser(input).forEach(word => input = input.replace(word[0], (Emojis.local_database()[word[0].slice(1, -1)] || word[0])));
    res.status(200).send(`${input.slice(1, -1)}`);
  }
};

exports.search = function (req, res, next) {
  let word = (req.query.word || undefined);

  if (word === undefined || word === `""` || word[0] !== '"') {
    res.status(400).send(`Missing parameter '?word=""'`);
  } else {
    res.status(200).send((Emojis.local_database()[word.slice(1, -1)] || word.slice(1, -1)));
  };
};

exports.list = function (req, res, next) {
  res.status(200).json(Emojis.local_database());
};

/*
exports.synonym = function (req, res, next) {
  let param = req.query;

  if (param.db === undefined || param.word === undefined) {
    let err = undefined;

    if (param.db === undefined && param.word === undefined) {
      err = '?word=&db=';
    } else if (param.db === undefined) {
      err = 'db=';
    } else {
      err = 'word=';
    };
    res.status(400).send(`Missing parameter '${err}`);
  };
  res.status(200).send(`${JSON.stringify(param.word)} & ${JSON.stringify(param.db)}`);
};
*/
