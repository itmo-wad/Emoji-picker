'use strict';
const emoji_db = require('../modules/emoji.js');

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

exports.request = function (req, res) {
    let emoji = "";
    let input = "";
    let prev = 0;
    let param = req.query;

    if (param.input === undefined) {
	res.status(400).send(`Missing parameter "?input="`);
    } else {
	input = param.input;
	emoji_db.parser(input).forEach(word => {
	    const tmp = input.length;

	    emoji = `${emoji_db.transform(word[0])}`;
	    input = input.substring(0, word.index - prev) + emoji + input.substring(word.index - prev + word[0].length);
	    prev += tmp - input.length;
	});
	res.status(200).send(`${input.slice(1, -1)}`);
    }
};

exports.search = function (req, res) {
    let param = req.query;

    if (param.word === undefined) {
	res.status(400).send(`Missing parameter '?word='`);
    } else {
	res.status(200).send(emoji_db.transform(param.word));
    };
};

exports.list = function (req, res) {
    res.status(200).send(emoji_db.list());    
};

exports.synonym = function (req, res) {
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
