import { server } from './server.js'



const form = document.querySelector('#form')
const input = document.querySelector('#url')
const content = document.querySelector('#content')

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    content.classList.add('placeholder')
    const videoURL = input.value
    
    if (!videoURL.includes('shorts')) {
        return content.textContent = 'Please enter a valid YouTube shorts URL.'
    }

    const videoID = videoURL.split('/shorts/')[1].split('?si')[0]
    content.textContent = 'Extracting video content...'

    const transription = await server.get("/summary/" + videoID)

    content.textContent = 'Summarizing video content...'

    const summary = await server.post('/summary', {
        text : transription.data.result
    })

    content.textContent = summary.data.result
    content.classList.remove('placeholder')

})