import ytdl from 'ytdl-core'
import fs from 'fs'

export const download = (videoId) => new Promise((resolve, reject) => { 
    const url = 'https://www.youtube.com/shorts/' + videoId
    console.log(url)
    ytdl(url, { quality: 'lowestaudio', filter: 'audioonly' })
    .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000
        if (seconds > 60) {
            throw new Error('Video is too long')
        }
        console.log('Downloading video...')
    })
    .on("end", () => {
        console.log('Download finished')
        resolve()
    })
    .on("error", (error) => {
        console.log(error)
        reject(error)
    })
    .pipe(fs.createWriteStream('./tmp/audio.mp4'))
})
