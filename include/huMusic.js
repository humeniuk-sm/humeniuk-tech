const {google} = require('googleapis')
const settings = require('../settings')


class HuMusic{
    constructor(){
        this.youtube = google.youtube({
            version:'v3',
            auth:settings.YOUTUBE_KEY
        })
    }
    async getSearch(query){
        const links = []
        const params = {
            part:'snippet',
            q:query,
            maxResults:5
        }
        await this.youtube.search.list(params).then((content)=>{
            content.data.items.forEach((item)=>{
                links.push({id:item.id.videoId,title:item.snippet.title})
            })
        })
        return links
    }
    getUpdates(){

    }
}
module.exports = HuMusic