module.exports = function(application){
	application.get('/', function(req, res){
		application.mvc.controllers.index.entrar(application, req, res);
	});
}