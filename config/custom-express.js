/*
 * Arquivo: custom-express.js
 * Author: Guilherme Henrique Piasson
 * Description: Arquivo que carrega o express.
 *              Além disso o mesmo define porta, redirecionamento para HTTPS, entre outras configurações.
 * Data: 19/09/2017
 */
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var ejs = require('ejs');
var morgan = require('morgan');
var logger = require('../servicos/logger.js');
var sslRedirect = require('heroku-ssl-redirect');

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

  app.configure('production', function(){
    app.use(sslRedirect());
  });

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
