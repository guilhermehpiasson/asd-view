var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var ejs = require('ejs');
var morgan = require('morgan');
var logger = require('../servicos/logger.js');

module.exports = function(){
  var app = express();

  app.use(morgan("common", {
    stream: {
      write: function(mensagem){
          logger.info(mensagem);
      }
    }
  }));

  app.set('view engine', 'ejs');
  app.set('port', process.env.PORT || 3004);

  app.use((req, res, next) => {
    if (req.header["x-forwarded-proto"] !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })

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
