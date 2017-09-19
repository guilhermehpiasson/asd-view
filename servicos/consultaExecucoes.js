/*
 * Arquivo: consultaExecucoes.js
 * Author: Guilherme Henrique Piasson
 * Description: Arquivo com implementação de um Client REST, que consome uma operação do modulo de asdDescarte.
 * Data: 19/09/2017
 */
var restify = require('restify');
var clients = require('restify-clients');

function ExecucoesClient(){
  this._cliente = clients.createJsonClient({
    url:'https://asd-descarte.herokuapp.com'
  });
}

ExecucoesClient.prototype.listaExecucoes = function(callback){
  this._cliente.post('/descarte/listaExecucoes', callback);
}

module.exports = function(){
  return ExecucoesClient;
}
