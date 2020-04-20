'use strict';
const requests = require('../modules/axios.js');

exports.hello = function (req, res) {
    res.send(`You just get an hello. ${JSON.stringify(req.query)}`);
};

exports.world = function (req, res) {
    res.send('Now you post to the world');
};
