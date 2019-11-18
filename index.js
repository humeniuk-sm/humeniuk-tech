const settings = require('./settings')
const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const favicon = require('serve-favicon')
const {google} = require('googleapis')


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

app.listen(settings.PORT);