module.exports = function(application, socketIoServer){
	application.get('/:path', function(req, res){
		application.mvc.controllers.room.room(application, req, res);
	});
}