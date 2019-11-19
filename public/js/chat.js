$(function(){
    const socket = io.connect('http://localhost:3000')

    const chat = $("#chat_messages")
    const chat_users = $("#chat_users")

    const name = 'guest'+Math.random()
    const username  = $("#username")
    const mess  = $("#message")
    const chatSend = $("#chat_send")
    const change_name = $("#change_name")
    const chat_username = $("#chat_username")
    username.text(name)
    
    socket.emit('set_name',{username:name})

    change_name.click((e)=>{
        e.preventDefault()
        socket.emit('change_name',{username:chat_username.val()})
    })
    chatSend.click((e)=>{
        e.preventDefault()
        socket.emit('send_message',{message:mess.val()})
    })


    socket.on('change_name',(data)=>{
        if(username.text()==data.oldname)
        {
            username.text(data.username)
        }
        console.log(data.username)
    })
    socket.on('new_user',(data)=>{
        chat_users.append("<a href='#!' class='collection-item h_chat_user'>"+data.username+"</a>")
    })
    socket.on('getMessage',(data)=>{
        chat.append("<li class='collection-item'>"+data.username +' : '+data.message+"</li>")
    })
})