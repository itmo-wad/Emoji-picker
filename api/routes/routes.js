'use strict';
const Controller = require('../controllers/controller');

module.exports = function (app) {
  app.route('/').get(Controller.request);
  app.route('/list').get(Controller.list);
  app.route('/search').get(Controller.search);
  /*app.route('/synonym').get(Controller.synonym);*/
};
