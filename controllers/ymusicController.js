const {google} = require('googleapis')
const path = require('path')
const settings = require('../settings')


exports.index = (request,response)=>{
    response.render(path.join('ymusic','index'))
}
exports.search = (request,response)=>{
    const youtube = google.youtube({
        version:'v3',
        auth:settings.YOUTUBE_KEY
    })
    const params = {
        part:'snippet',
        q:request.body.video_name
    }
    const result = youtube.search.list(params).then((content)=>{
        const link = content.data.items[0].id.videoId
        response.render(path.join('ymusic','result'),{videoId:link})
    })
}