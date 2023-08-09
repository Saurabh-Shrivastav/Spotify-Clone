console.log('welcome');

//Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/Kesariya.mp3')
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let masterSongName = document.getElementById('masterSongName')
// let songItemPlay = document.getElementsByClassName('songItemPlay'))
// console.log(songItemPlay);
let songItems = Array.from(document.getElementsByClassName('songItem'))

let songs = [
    {songName: "Kesariya", filePath: "songs/Kesariya.mp3", coverPath: "img/6cover.jpg"},
    {songName: "Apna-Bana-Le", filePath: "songs/Apna-Bana-Le.mp3", coverPath: "img/1cover.jpg"},
    {songName: "Mahabharat", filePath: "songs/Mahabharat.mp3", coverPath: "img/2cover.jpg"},
    {songName: "old_MBKD-Dhunki", filePath: "songs/old_MBKD-Dhunki.mp3", coverPath: "img/3cover.jpg"},
    {songName: "Tere Hi Bal Se ", filePath: "songs/Tere Hi Bal Se Hai Bol Hamara.mp3", coverPath: "img/4cover.jpg"},
    {songName: "Tu Hai To Mujhe", filePath: "songs/Tu Hai To Mujhe.mp3", coverPath: "img/5cover.jpg"},
    {songName: "Ek Zindagi", filePath: "songs/1.mp3", coverPath: "img/7cover.jpg"},
    {songName: "Baapu Tere", filePath: "songs/8.mp3", coverPath: "img/8cover.jpg"},
    {songName: "Gaddiyan Unchiya", filePath: "songs/9.mp3", coverPath: "img/9cover.jpg"},
    {songName: "Hansi-Ban-gaye", filePath: "songs/10.mp3", coverPath: "img/10cover.jpg"},

]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
//audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play()
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity = 0.4;
    }else{
        audioElement.pause()
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')
        gif.style.opacity = 0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);  
    console.log(progress);   
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})


const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-circle-play')
        element.classList.remove('fa-circle-pause')   
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        // console.log(index)
        e.target.classList.remove('fa-circle-play')
        e.target.classList.add('fa-circle-pause')
        masterSongName.innerText = songs[songIndex].songName
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
        audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex].songName
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
})


document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
        audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex].songName
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
})