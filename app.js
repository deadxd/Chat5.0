var app = require('./config');
var io = require('./config');

const Usuarios = [];
const Sockets = [];

io.on('connection', function (socket) { 
    
    //chat

    socket.on('usuariosOnline', function (data) {
       /* if (Usuarios.indexOf(data.usuario) !== -1) {
            return socket.emit('Atualizar', false);
        }*/
        socket.username = data.usuario;
        Usuarios.push(data.usuario);
        Sockets.push(socket);
        io.sockets.emit('Atualizar', Usuarios);

    });

    socket.on('disconnect', function () {
        const comparar = Usuarios.indexOf(socket.username);
        if (comparar !== -1) {
            Usuarios.splice(comparar, 1);
            Sockets.splice(comparar, 1);
            io.sockets.emit('Removendo', socket.username); // io usa .sockets agora
        }
    });

    socket.on('enviarMensagem', function (data) {

        socket.emit(
            'minhaPage',
            { usuario: data.usuario, mensagem: data.mensagem }
        );

        socket.broadcast.emit(
            'outrosPage',
            { usuario: data.usuario, mensagem: data.mensagem }
        );
    });

    socket.on('mensagemUnica', function (data) {
        const index = Sockets.findIndex(e => e.username === data.destino);

        socket.emit(
            'minhaPage',
            { usuario: data.usuario, mensagem: data.mensagem }
        );

        io.sockets.socket(Sockets[index].id).emit(
            'usuarioPageDestino',
            { usuario: data.usuario, mensagem: data.mensagem }
        );
    });

    socket.on('enviarArquivo', function (data) {
        socket.emit(
            'linkMinhaPage',
            { usuario: data.usuario, arquivo: data.arquivo }
        );

        socket.broadcast.emit(
            'linkOutrosPage',
            { usuario: data.usuario, arquivo: data.arquivo }
        );
    });

    //videochamada
    
    function log(){
        var array = [">>> Mensagem para o Servidor: "];
        for (var i = 0; i < arguments.length; i++) {
	  	    array.push(arguments[i]);
        }
	    socket.emit('log', array);
	}

	socket.on('message', function (message) {
		log('Got message: ', message);
        socket.broadcast.to(socket.room).emit('message', message);
	});
    
	socket.on('criarSala', function (message) {
        var room = message.room;
        socket.room = room;
        var participantID = message.from;
        configNameSpaceChannel(participantID);
        
		var qntUsuarios = io.sockets.clients(room).length;

		log('criarSala room:', room);

		if (qntUsuarios == 0){
			socket.join(room);
			socket.emit('salaCriada', room);
		} else {
			io.sockets.in(room).emit('entrarNaSala', room);
			socket.join(room);
			socket.emit('entrou', room);
		}
	});
    
    function configNameSpaceChannel(participantID) {
        var socketNamespace = io.of('/'+participantID);
        
        socketNamespace.on('connection', function (socket){
            socket.on('message', function (message) {
                socket.broadcast.emit('message', message);
            });
        });
    }
    
});