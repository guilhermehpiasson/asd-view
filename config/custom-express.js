var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var ejs = require('ejs');

module.exports = function(){
  var app = express();

  app.set('view engine', 'ejs');
  app.set('port', process.env.PORT || 3004);

  app.use(express.static(path.join(__dirname, '../public')));

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(bodyParser.text());
  app.use(bodyParser.json({ type: 'application/json' }));

  app.use(expressValidator());

  consign()
   .include('app/routes')
   .then('servicos')
   .into(app);

  return app;
}
