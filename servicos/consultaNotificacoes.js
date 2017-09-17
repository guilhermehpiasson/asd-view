var restify = require('restify');
var clients = require('restify-clients');

function NotificacoesClient(){
  this._cliente = clients.createJsonClient({
    url:'http://localhost:3001'
  });
}

NotificacoesClient.prototype.listaNotificacoes = function(callback){
  this._cliente.post('/descarte/listaNotificacoes', callback);
}

module.exports = function(){
  return NotificacoesClient;
}
