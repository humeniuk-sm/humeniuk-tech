const {google} = require('googleapis')
const settings = require('../settings')
const mysqlDb = require('../include/dbMysql')

class HuMusic{
    constructor(){
        this.youtube = google.youtube({
            version:'v3',
            auth:settings.YOUTUBE_KEY
        })
    }
    isTrackAdded(track,dbTracks){
        let flag = false
        dbTracks.forEach((item)=>{
            if(item.title==track)
            {
                flag = true
            }
        })
        return flag
    }
    async sendTrack(){
        let flag = false
        const huMusic = new mysqlDb('huMusic')
        const allTracks = await huMusic.getAll('h_track')
        await allTracks.forEach(item => {
            if(!item.is_published && !flag)
            {
                flag = item
            }
        });
        await huMusic.update('h_track','id',flag.id)
        return flag.track_id
    }
    async getUpdates(){
        const huMusic = new mysqlDb('huMusic')
        const result = await huMusic.getAll('h_chanels')
        const allTracks = await huMusic.getAll('h_track')

        result.forEach((itemDb)=>{
            const params = {
                part:'snippet',
                channelId:itemDb.chanel_id,
                maxResults:50,
                order:'date'
            }
            this.youtube.search.list(params).then((content)=>{
                content.data.items.forEach((item)=>{
                    if(item.id.videoId != itemDb.last_id && item.id.kind == 'youtube#video')
                    {
                        //перевірити трек за назвою на співпадіння
                        if(!this.isTrackAdded(item.snippet.title,allTracks))
                        {
                            const item_date = new Date(item.snippet.publishedAt).toISOString().slice(0, 19).replace('T', ' ')
                            huMusic.insertTo('h_track',{
                                chanel_id:itemDb.id,
                                title:`'${item.snippet.title}'`,
                                track_id:`'${item.id.videoId}'`,
                                added_at:`'${item_date}'`,
                                is_published:0
                            })
                        }
                    }
                })
            })
        })
    }
}
module.exports = HuMusic