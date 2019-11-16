const path = require('path')

exports.index = (request,response)=>{
    response.render(path.join('chat','index'),{layout:'chat.hbs'})
}