const settings = require('./settings')
const express = require('express')
const path = require('path')

// создаем объект приложения
const app = express();

const homeRouter = require('./routes/homeRouter')

app.use('/static',express.static(path.join(__dirname,'public')))

app.use('/',homeRouter)

app.listen(settings.PORT);