class SocketWorker{
    constructor(server){
        const io = require('socket.io')(server)
        io.on('connection',socket=>{
            socket.username = 'guest'
            socket.on('set_name',(data)=>{
                socket.username = data.username
                io.sockets.emit('new_user', {username:socket.username});
            })
            socket.on('change_name',(data)=>{
                const oldUsername =  socket.username
                socket.username = data.username
                io.sockets.emit('change_name', {username:socket.username,oldname:oldUsername});
            })
            socket.on('send_message',(data)=>{
                const mess = data.message
                io.sockets.emit('getMessage', {username:socket.username,message:mess});
            })
        })
    }
}

module.exports = SocketWorker