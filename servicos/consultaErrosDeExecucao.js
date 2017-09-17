var restify = require('restify');
var clients = require('restify-clients');

function ErrosDeExecucaoClient(){
  this._cliente = clients.createJsonClient({
    url:'http://localhost:3001'
  });
}

ErrosDeExecucaoClient.prototype.consulta = function(callback){
  this._cliente.post('/descarte/consultaErrosDeExecucao', callback);
}

module.exports = function(){
  return ErrosDeExecucaoClient;
}
