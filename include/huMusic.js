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
    parseTrack(title){
        const iDelimiter = title.indexOf('-')
        const track = {
        }
        if(iDelimiter)
        {
            const temp_authors = title.substring(0,iDelimiter).trim().split(',')
            const authors = temp_authors.forEach(function(el,index,arr){
                arr[index] = el.trim()
            })
            const song_title = title.substring(iDelimiter+1).trim()
            track.authors = temp_authors
            track.title = song_title
        }
        return track
    }
    async addTrack(track){
        console.log(track.title)

        const uMusic = new mysqlDb('uMusic')
        const vars = await uMusic.makeQuery(`SELECT * FROM tracks WHERE title like '%`+track.title+`%'`)
        console.log(vars)
        if(!vars.length)
        {
            //додаємо трек
            const resultTrack = await uMusic.makeQuery(`INSERT INTO tracks(title,year) VALUES ('`+track.title+`',0000)`)
            console.log(resultTrack)
        }
        console.log(vars)
        //шукаємо трек по назві, якщо немає додаємо всю інформацію
        //якщо назва співпадає переглядаємо співпадіння авторів, якщо хоча б 1 з авторів співпадає робимо посилання на трек
    }
    async getUpdates(){
        const trackFullTitle = 'Andy Panda - Rude Mantras / Грубые Мантры'
        const potential = this.parseTrack(trackFullTitle)
        this.addTrack(potential)
        // result.forEach((itemDb)=>{
        //     const params = {
        //         part:'snippet',
        //         channelId:itemDb.chanel_id,
        //         maxResults:10,
        //         order:'date'
        //     }
        //     this.youtube.search.list(params).then((content)=>{
        //         content.data.items.forEach((item)=>{
        //             if(item.id.videoId != itemDb.last_id && item.id.kind == 'youtube#video')
        //             {
        //                 //перевірити трек за назвою на співпадіння
        //                 if(!this.isTrackAdded(item.snippet.title,allTracks))
        //                 {
        //                     const item_date = new Date(item.snippet.publishedAt).toISOString().slice(0, 19).replace('T', ' ')
        //                     huMusic.insertTo('h_track',{
        //                         chanel_id:itemDb.id,
        //                         title:`'${item.snippet.title}'`,
        //                         track_id:`'${item.id.videoId}'`,
        //                         added_at:`'${item_date}'`,
        //                         is_published:0
        //                     })
        //                 }
        //             }
        //         })
        //     })
        // })
    }
}
module.exports = HuMusic