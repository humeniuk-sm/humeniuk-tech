const settings = require('./settings')
const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const favicon = require('serve-favicon')
const cron = require('cron')
const huMusic = require('./include/huMusic')
const tbot = require('./include/telegramBot')

async function start()
{
    try {
        const cronWorker = new cron.CronJob('* */5 * * *',function(){
            const music = new huMusic()
            music.getUpdates()
        })
        const cronSender = new cron.CronJob('*/20 * * * *',async function(){
            const music = new huMusic()
            const link = await music.sendTrack()
            const shareUrl = `https://youtu.be/${link}`
            const bot = new tbot()
            bot.sendMessage(shareUrl)
        })
        cronWorker.start()
        cronSender.start()
        // await mongoose.connect(settings.MONGO_DB_CONNECTION,{useNewUrlParser:true,
        //     useUnifiedTopology: true})
        const server = app.listen(settings.PORT)
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
    } catch (error) {
        console.log(error)
    }
}

// создаем объект приложения
const app = express();
const hbs = exphbs.create({
    defaultLayout:'main',
    extname:'hbs'
})

app.engine('hbs',hbs.engine)
app.set('view engine','hbs')
app.set('views','views')

const homeRouter = require('./routes/homeRouter')
const shopRouter = require('./routes/shopRouter')
const chatRouter = require('./routes/chatRouter')
const blogRouter = require('./routes/blogRouter')
const ymusicRouter = require('./routes/ymusicRouter')

app.use(express.urlencoded({extended:true}))
app.use(favicon(path.join(__dirname,'public','favicon.ico')))
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/',homeRouter)
app.use('/shop/',shopRouter)
app.use('/chat/',chatRouter)
app.use('/blog/',blogRouter)
app.use('/ymusic/',ymusicRouter)

start()