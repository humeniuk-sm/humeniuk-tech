const settings = require('./settings')
const express = require('express')
const path = require('path')
const exphbs = require("express-handlebars");

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

app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/',homeRouter)

app.listen(settings.PORT);