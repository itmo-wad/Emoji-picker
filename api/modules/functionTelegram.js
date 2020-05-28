'use strict';
const emoji_db = require('../modules/emoji.js');
const TelegramAPI = require('../api/TelegramAPI.js');
const emoji_Tg = require('telegram-emoji-map');

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

exports.Telegram = function (req, res) {
    let emoji = "";
    let input = "";
    let prev = 0;
	let param = req.body;

	console.log(param);
    
    /*
    if (param.message.text === '') {
        //Theoricaly impossible
        TelegramAPI.SendMessage('You sent an empty message', param.message.chat.id);
        res.status(200).send(`ok`);
        } else {
        input = param.message.text;
        emoji_db.parser(input).forEach(word => {
            const tmp = input.length;
            emoji = `${emoji_db.transform(word[0])}`;
            input = input.substring(0, word.index - prev) + emoji + input.substring(word.index - prev + word[0].length);
            prev += tmp - input.length;
        });*/
        TelegramAPI.SendMessage('You sent "' + param.message.text + '"', param.message.chat.id);
        //let my_emoji = "\u{1f600}"; 
        //my_emoji = "\xf0\x9F\x98\x82" - Invalid ?
        //TelegramAPI.SendMessage("Test emoji ", param.message.chat.id); 
        res.status(200).send('{"ok":true}');
};