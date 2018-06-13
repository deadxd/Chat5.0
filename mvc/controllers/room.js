module.exports.room = function (application, req, res) {
	var path = req.params.path;
	var socketIoServer = '127.0.0.1';
        res.render('room', {"hostAddress":socketIoServer});
}