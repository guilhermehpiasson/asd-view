module.exports = function(app){
	app.get('/', function(req,res){
		res.render("../app/views/home/index");
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
