const path = require('path')
const settings = require('../settings')
const telBot = require('../include/telegramBot')
const huMusic = require('../include/huMusic')

exports.index = (request,response)=>{
    const bot = new telBot()
    bot.sendMessage('Hello world')
    response.render(path.join('ymusic','index'))
}
exports.search = async(request,response)=>{
    const music = new huMusic()
    const links = await music.getSearch(request.body.video_name)
    const bot = new telBot()
    const shareUrl = `https://youtu.be/${links[3].id}`
    bot.sendMessage(shareUrl)
    response.render(path.join('ymusic','result'),{videos:links})
}