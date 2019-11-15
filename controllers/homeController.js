const path = require('path')

exports.homePage = function (request, response){
    response.sendFile(path.join(__dirname,'..','views','index.html'));
}
exports.projects = function (request, response){
    response.sendFile(path.join(__dirname,'..','views','project.html'));
}

