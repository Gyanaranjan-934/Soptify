console.log("Welcome to spotify")

let songIndex = 0
let audioElement = new Audio('songs/1.mp3')
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let songItems = Array.from(document.getElementsByClassName('songItem'))
let masterSongName = document.getElementById('masterSongName')
let songs = [
    {songName:"Salam-e-ishq",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    {songName:"man-meri jaan",filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
    {songName:"pathan",filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
    {songName:"hi hi hi",filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
    {songName:"you are my love",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
    {songName:"hi ho nrn wr",filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},
    {songName:"lorem fren fssn",filePath:"songs/7.mp3",coverPath:"covers/7.jpg"},
    {songName:"nfd fr eon",filePath:"songs/8.mp3",coverPath:"covers/8.jpg"},
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

// Handle play pause events
masterPlay.addEventListener('click',()=>{
    if (audioElement.paused || audioElement.currentTime <=0) {
        audioElement.play()
        masterPlay.classList.remove('fa-play')
        masterPlay.classList.add('fa-pause')
        gif.style.opacity = 1
        
    }else{
        audioElement.pause()
        masterPlay.classList.remove('fa-pause')
        masterPlay.classList.add('fa-play')
        gif.style.opacity = 0
    }
}) 

// listen to events 
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate')
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause')
        element.classList.add('fa-play')
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        // console.log(e.target)
        songIndex = parseInt(e.target.id)
        makeAllPlays()
        e.target.classList.remove('fa-play')
        e.target.classList.add('fa-pause')
        masterSongName.innerText=songs[songIndex].songName
        audioElement.src = `songs/${songIndex+1}.mp3`
        audioElement.currentTime = 0
        audioElement.play()
        gif.style.opacity =1
        masterPlay.classList.remove('fa-play')
        masterPlay.classList.add('fa-pause')
    })
}) 

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >= 8){
        songIndex = 0
    }else{
        songIndex += 1
    }
    masterSongName.innerText=songs[songIndex].songName
    audioElement.src = `songs/${songIndex+1}.mp3`
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove('fa-play')
    masterPlay.classList.add('fa-pause')
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <= 0){
        songIndex = 8
    }else{
        songIndex -= 1
    }
    masterSongName.innerText=songs[songIndex].songName
    audioElement.src = `songs/${songIndex-1}.mp3`
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove('fa-play')
    masterPlay.classList.add('fa-pause')
})