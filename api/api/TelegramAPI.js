'use strict';
const axios = require('../modules/requests');
const emoji = require('telegram-emoji-map');



exports.SendMessage = function (msg, chat_id) {
    let token = '1159910308:AAGE-LC3GhmpJXPNL7P9WSIDxNd6_k1CuuU';
    //Need a place to store the token
    let url = 'https://api.telegram.org/bot' + token + '/sendMessage' + '?chat_id=' + chat_id + '&text=' + msg;
    //console.log("Inside SendMessage: " + msg);
    axios.request(url, '', 'POST');
};

/*
//token = bot Token from Telegram BotFather
exports.SetWebHook = function(token, EmojiUrl) {
    let url = 'https://api/telegram.org/bot' + token + '/setWebhook?url=' + EmojiUrl + '/Telegram'; //Can be change for a different route
    axios.request(url, '', 'POST');
}
*/