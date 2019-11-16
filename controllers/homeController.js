const path = require('path')

exports.homePage = function (request, response){
    response.sendFile(path.join(__dirname,'..','public','index.html'));
    //response.render(path.join(__dirname,'..','views','index'))
}
exports.projects = function (request, response){
    response.sendFile(path.join(__dirname,'..','views','project.html'));
}

