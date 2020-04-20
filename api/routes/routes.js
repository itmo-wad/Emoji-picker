'use strict';
const controller = require('../controllers/controller');

module.exports = function (app) {
    app.route('/')
        .get(controller.hello)
	.post(controller.world);
};
