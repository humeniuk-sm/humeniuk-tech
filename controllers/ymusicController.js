const path = require('path')
const settings = require('../settings')
const telBot = require('../include/telegramBot')
const huMusic = require('../include/huMusic')

exports.index = async(request,response)=>{
    response.render(path.join('ymusic','index'))
}
exports.search = async(request,response)=>{
    response.render(path.join('ymusic','index'))
}