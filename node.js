'use strict';
const port = 5000,
      app = require('express')(),
      bodyParser = require('body-parser'),
      session = require('express-session');

app.use(bodyParser.json());
app.use(require("cookie-parser")());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: 'My secret is ITMO WAD',
  name: 'ITMO-WAD/Emoji-picker',
  resave: true,
  saveUninitialized: true
}));

const routes = require('./api/routes/routes'),
      telegramBot = require('./api/api/telegram');

routes(app);

app.listen(port);

console.log('Emoji-picker REST API started on:' + port);
