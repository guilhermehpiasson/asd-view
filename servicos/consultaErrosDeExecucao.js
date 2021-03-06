/*
 * Arquivo: consultaErroDeExecucao.js
 * Author: Guilherme Henrique Piasson
 * Description: Arquivo com implementação de um Client REST, que consome uma operação do modulo de asdDescarte.
 * Data: 19/09/2017
 */
var restify = require('restify');
var clients = require('restify-clients');

function ErrosDeExecucaoClient(){
  this._cliente = clients.createJsonClient({
    url:'https://asd-descarte.herokuapp.com/'
  });
}

ErrosDeExecucaoClient.prototype.consulta = function(callback){
  this._cliente.post('/descarte/consultaErrosDeExecucao', callback);
}

module.exports = function(){
  return ErrosDeExecucaoClient;
}
