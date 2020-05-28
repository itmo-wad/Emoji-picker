'use strict';
const controller = require('../controllers/controller');
const Telegram = require('../modules/functionTelegram')

module.exports = function (app) {
    app.route('/').get(controller.request);
    app.route('/list').get(controller.list);
    app.route('/search').get(controller.search);
    app.route('/synonym').get(controller.synonym);

    app.route('/Telegram').post(Telegram.Telegram);
};
