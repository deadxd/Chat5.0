var socket = io.connect(); // io usa .connect agora

$('document').ready(() => {
    socket.emit(
        'usuariosOnline',
        {
            usuario: $('#usuario').val()
        }
    );

    socket.on('Atualizar', arrUsuario => {
        $(`#pessoas`).empty();
        $(`#listaUsuarios`).empty();
        $('#listaUsuarios').append(`<option id="todos">todos</option>`);
        if (arrUsuario) {
            arrUsuario.forEach(e => {
                $('#pessoas').append(`<li id="${e}">${e}</li>`);
                $('#listaUsuarios').append(`<option id="${e}">${e}</option>`);
            });
        }
    });

    socket.on('Removendo', data => {
        $(`#${data}`).remove();
        $(`#${data}`).remove();

    });

    $('#enviar_mensagem').click(function () {
        if ($('#mensagem').val() == '') {
            alert('Digite uma mensagem');
        }
        else {

            if($('select[name=listaUsuarios]').val() === 'todos') {

                socket.emit(
                    'enviarMensagem',
                    {
                        usuario: $('#usuario').val(),
                        mensagem: $('#mensagem').val(),
                    }
                );
                $('#mensagem').val("");

            }

            else {

                socket.emit(
                    'mensagemUnica',
                    {
                        destino: $('select[name=listaUsuarios]').val(),
                        usuario: $('#usuario').val(),
                        mensagem: $('#mensagem').val(),
                    }
                );
                $('#mensagem').val("");

            }         
        }
    });
    
    socket.on('minhaPage', function (data) {
        var append = '';
        append += '<div class="dialogo">';
        append += '<h4>' + data.usuario + '</h4>';
        append += '<p>' + data.mensagem + '</p>';
        append += '</div>';
    
        $('#dialogos').append(append);
        window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('outrosPage', function (data) {
        var append = '';
        append += '<div class="participante">';
        append += '<h4>' + data.usuario + '</h4>';
        append += '<p>' + data.mensagem + '</p>';
        append += '</div>';
    
        $('#dialogos').append(append);
        window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('usuarioPageDestino', function (data) {
        var append = '';
        append += '<div class="participante">';
        append += '<h4>' + data.usuario + '</h4>';
        append += '<p>' + data.mensagem + '</p>';
        append += '</div>';
    
        $('#dialogos').append(append);
        window.scrollTo(0, document.body.scrollHeight);
    });

    $('#uploadForm').submit(function () {
        if ($('#arquivo').get(0).files.length === 0) {
            alert('Adicione um arquivo para upload');
        }
        else {
            $("#status").empty().text("Arquivo está em uploading...");

            $(this).ajaxSubmit({
                error: function (xhr) {
                    status('Error: ' + xhr.status);
                },
                success: function (response) {
                    $("#status").empty().text(response);

                    socket.emit(
                        'enviarArquivo',
                        {
                            usuario: $('#usuario').val(),
                            arquivo: $('#arquivo').val().replace(/C:\\fakepath\\/i, ''),
                        }
                    );
                    $('#arquivo').val("");
                }
            });
        }
        return false;
    });
    
    socket.on('linkMinhaPage', function (data) {
        var append = '';
        append += '<div class="dialogo">';
        append += '<h4>' + data.usuario + '</h4>';
        append += '<a href="/uploads/' + data.arquivo + '" download="' + data.arquivo + '" target="_blank">' + data.arquivo + '</a>';
        append += '</div>';
    
        $('#dialogos').append(append);
        window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('linkOutrosPage', function (data) {
        var append = '';
        append += '<div class="participante">';
        append += '<h4>' + data.usuario + '</h4>';
        append += '<a href="/uploads/' + data.arquivo + '" download="' + data.arquivo + '" target="_blank">' + data.arquivo + '</a>';
        append += '</div>';
    
        $('#dialogos').append(append);
        window.scrollTo(0, document.body.scrollHeight);
    });
});