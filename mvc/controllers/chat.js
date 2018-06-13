module.exports.chat = function (application, req, res) {

	var data = req.body;

	req.assert('usuario', 'Digite um nome').notEmpty();

	var erros = req.validationErrors();
	if (erros) {
		res.render("index", { erros: erros })
		return;
	}

	res.render("chat", { data: data });
}

module.exports.uploaded = function (application, req, res) {
	var multer = require('multer');

	var storage = multer.diskStorage({
		destination: function (req, file, callback) {
			callback(null, './mvc/public/uploads');
		},
		filename: function (req, file, callback) {
			callback(null, file.originalname);
		}
	});
	var upload = multer({ storage: storage }).single('userPhoto');

	upload(req, res, function (err) {
		if (err) {
			return res.end("Error ao enviar arquivo.");
		}
		res.end("Arquivo enviado");
	});
}