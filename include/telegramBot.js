const settings = require('../settings')
const http = require('https')
class TelegramBot{
    constructor(){
        this.token = settings.TELEGRAM_TOKEN
    }
    sendMessage(message){
        const chat_id = 640155402
        const URL = `https://api.telegram.org/bot${this.token}/sendMessage?chat_id=${chat_id}&text=${message}`

        const get = http.get(URL,(response)=>{
            console.log('send message to telegram')
        })
    }
}

module.exports = TelegramBot