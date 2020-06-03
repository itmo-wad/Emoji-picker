'use strict';
const port = 5000,
      app = require('express')(),
      bodyParser = require('body-parser'),
      session = require('express-session');

app.use(bodyParser.json());
app.use(require("cookie-parser")());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  resave: true,
  saveUninitialized: true,
  name: 'ITMO-WAD/Emoji-picker',
  secret: 'My secret is ITMO WAD'
}));

const routes = require('./api/routes/routes');

routes(app);

app.listen(port);

console.log('Emoji-picker REST API started on:' + port);

const TelegramBot = require('./api/api/telegram');  
