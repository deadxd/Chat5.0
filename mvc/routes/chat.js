module.exports = function(application, socketIoServer){
	application.post('/chat', function(req, res){
		application.mvc.controllers.chat.chat(application, req, res);
	});

	application.get('/chat', function(req, res){
		application.mvc.controllers.chat.chat(application, req, res);
	});

	application.post('/api/photo', function(req, res){
		application.mvc.controllers.chat.uploaded(application, req, res);
	});

	application.get('/download', function(req, res){
		application.mvc.controllers.chat.download(application, req, res);
	});
}