const express = require('express')
const homeController =  require('../controllers/homeController')
const homeRouter = express.Router()

homeRouter.get('/',homeController.homePage)
homeRouter.get('/project',homeController.projects)



module.exports = homeRouter