/*
 * Arquivo: consultaNotificacoes.js
 * Author: Guilherme Henrique Piasson
 * Description: Arquivo com implementação de um Client REST, que consome uma operação do modulo de asdDescarte.
 * Data: 19/09/2017
 */
var restify = require('restify');
var clients = require('restify-clients');

function NotificacoesClient(){
  this._cliente = clients.createJsonClient({
    url:'https://asd-descarte.herokuapp.com'
  });
}

NotificacoesClient.prototype.listaNotificacoes = function(callback){
  this._cliente.post('/descarte/listaNotificacoes', callback);
}

module.exports = function(){
  return NotificacoesClient;
}
