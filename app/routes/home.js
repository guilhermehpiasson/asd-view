module.exports = function(app){
	app.get('/', function(req,res){
		res.render("../app/views/home/index");
		console.log('essou');
	});
	app.get('/descarte/solicitacoesefetuadas', function(req,res){

		var clienteErrosDeExecucao = new app.servicos.consultaErrosDeExecucao();
		var objetoView = new Object();

    clienteErrosDeExecucao.consulta(function(exception, request, response, retorno){
          if(exception){
            console.log(exception);
            // res.status(400).send(exception);
            return;
          }
					objetoView.ERROS_EXECUCAO = retorno;

					var clienteExecucoes = new app.servicos.consultaExecucoes();

					clienteExecucoes.listaExecucoes(function(exception, request, response, retorno){
								if(exception){
			            console.log(exception);
			            // res.status(400).send(exception);
			            return;
			          }

								objetoView.EXECUCOES = retorno;

								var clienteNotificacoes = new app.servicos.consultaNotificacoes();

								clienteNotificacoes.listaNotificacoes(function(exception, request, response, retorno){
											if(exception){
												console.log(exception);
												// res.status(400).send(exception);
												return;
											}
											var notificacoes = new Array();
											for (var i = 0; i < retorno.length; i++) {
												var notificacao = new Object();
												notificacao.NOTIFICACAO_ID = retorno[i].NOTIFICACAO_ID;
												notificacao.EXECUCOES_ID = retorno[i].EXECUCOES_ID;
												notificacao.NOTIFICACAO_JSON_VALORES = JSON.parse(retorno[i].NOTIFICACAO_JSON_VALORES);
												notificacao.NOTIFICACAO_POSTADA = retorno[i].NOTIFICACAO_POSTADA;
												notificacoes.push(notificacao);
											}

											objetoView.NOTIFICACOES = notificacoes;

											res.render("../app/views/home/descarte", {listas:objetoView});

								});
			    });
    });

	});
}
/*
NOTIFICACOES:
   [ { NOTIFICACAO_ID: 35,
       EXECUCOES_ID: 113,
       NOTIFICACAO_JSON_VALORES: '{"COMPRA_PRODUTO_ID":4,"DATA_COMPRA":"2015-08-01T03:00:00.000Z","LOTE":"LOTESEC3424","PRODUTO_ID":3,"PRODUTO_NOME":"SECANTE SECATUDO","FORNECEDOR_ID":1,"QNT_DISPONIVEL":100}',
       NOTIFICACAO_POSTADA: 'S' },
     { NOTIFICACAO_ID: 36,
       EXECUCOES_ID: 114,
       NOTIFICACAO_JSON_VALORES: '{"COMPRA_PRODUTO_ID":4,"DATA_COMPRA":"2015-08-01T03:00:00.000Z","LOTE":"LOTESEC3424","PRODUTO_ID":3,"PRODUTO_NOME":"SECANTE SECATUDO","FORNECEDOR_ID":1,"QNT_DISPONIVEL":100}',
       NOTIFICACAO_POSTADA: 'S' } ] }*/
