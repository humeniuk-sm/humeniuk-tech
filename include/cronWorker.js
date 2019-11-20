const cron = require('cron')
const huMusic = require('../include/huMusic')
const tbot = require('../include/telegramBot')

class CronWorker{
    constructor(){
        this.cronStatus = new cron.CronJob('* * * * *',function(){
            console.log('Every minutes')
        })
        this.cronMusicUpdate = new cron.CronJob('* */5 * * *',function(){
            const music = new huMusic()
            music.getUpdates()
        })
        this.cronMusicSender = new cron.CronJob('*/20 * * * *',async function(){
            const music = new huMusic()
            const link = await music.sendTrack()
            const shareUrl = `https://youtu.be/${link}`
            const bot = new tbot()
            bot.sendMessage(shareUrl)
        })
    }
    startAll(){
        // this.cronStatus.start()
        this.cronMusicUpdate.start()
        this.cronMusicSender.start()
    }
}
module.exports = CronWorker