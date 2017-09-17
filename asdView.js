/*
 * Arquivo: app.js
 * Author: Guilherme Henrique Piasson
 * Description: Arquivo principal e responsável por executar a nossa aplicação.
 * Data: 02/09/2017
 */

var app = require('./config/custom-express')();
// var rotasHome = require('./app/routes/home')(app);
// var rotasErro = require('./app/routes/erros')(app);

var port = process.env.port || 3000;

app.listen(port);
