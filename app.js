const app = require('./config/server')

const server = app.listen(80, () => {
    console.log("server running")
})

const io = require('socket.io').listen(server)

app.set('io', io)

io.on('connection', (socket) => {
    console.log('Usuario conectado')

    socket.on('disconnect', () => {
        console.log("Usuario desconectado")
    })

    socket.on('msgParaServidor', (data) => {

        // dialogo
        socket.emit(
            'msgParaCliente',
            {
                apelido: data.apelido,
                mensagem: data.mensagem
            })

        socket.broadcast.emit(
            'msgParaCliente',
            {
                apelido: data.apelido,
                mensagem: data.mensagem
            })

        //participantes
        if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {


            socket.emit(
                'participanteParaCliente',
                {
                    apelido: data.apelido
                })

            socket.broadcast.emit(
                'participanteParaCliente',
                {
                    apelido: data.apelido
                })
        }
    })
})