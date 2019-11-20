const settings = require('./settings')
const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const favicon = require('serve-favicon')
const cronWorker = require('./include/cronWorker')
const socketWorker = require('./include/socketWorker')

async function start()
{
    try {
        const cron = new cronWorker().startAll()
        const server = app.listen(settings.PORT)
        const socket = new socketWorker(server)
    } catch (error) {
        console.log(error)
    }
}

//створення додатку
const app = express();

//налаштування шаблонізатору
const hbs = exphbs.create({
    defaultLayout:'main',
    extname:'hbs'
})
app.engine('hbs',hbs.engine)
app.set('view engine','hbs')
app.set('views','views')

//роутери
const homeRouter = require('./routes/homeRouter')
const shopRouter = require('./routes/shopRouter')
const chatRouter = require('./routes/chatRouter')
const blogRouter = require('./routes/blogRouter')

app.use(express.urlencoded({extended:true}))

//встановлення favicon
app.use(favicon(path.join(__dirname,'public','favicon.ico')))

//встановлення статичної папки
app.use('/static',express.static(path.join(__dirname,'public')))

app.use('/',homeRouter)
app.use('/shop/',shopRouter)
app.use('/chat/',chatRouter)
app.use('/blog/',blogRouter)
start()