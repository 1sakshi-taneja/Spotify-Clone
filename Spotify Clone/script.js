// @import url('https://fonts.googleapis.com/css2?family=Ubuntu&family=Varela+Round&display=swap');

console.log("Welcome to Spotify");

//Initialize the Variables
let songIndex = 0;
// created a new audio , and play it
let audioElement = new Audio("./songs/1.mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let masterSongName = document.getElementById('masterSongName');


//array of objects
let songs = [
    {songName: "Warriyo -Mortals ", filePath: "./songs/1.mp3", coverPath: "./covers/1.jpg"},
    {songName: "Cielo -Huma-Huma", filePath: "./songs/2.mp3", coverPath: "./covers/2.jpg"},
    {songName: "DEAF KEV -Invincible ", filePath: "./songs/3.mp3", coverPath: "./covers/3.jpg"},
    {songName: "Different Heaven & EH!DE", filePath: "./songs/4.mp3", coverPath: "./covers/4.jpg"},
    {songName: "Ibadat -  Satinder Sartaj", filePath: "./songs/5.mp3", coverPath: "./covers/5.jpg"}
] 

songItem.forEach((element , i)=>{
    // console.log(element , i );
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerHTML = songs[i].songName;
})

// audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    // Update Seekbar 
    let progress = parseInt((audioElement.currentTime / audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    songItemPlay.forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

songItemPlay.forEach((element)=>{
    element.addEventListener('click', (e)=>{
    //   console.log(e.target);
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove('fa-play');
      e.target.classList.add('fa-pause');
      audioElement.src= `./songs/${songIndex+1}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove('fa-circle-play');
      masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0)
    {
        songIndex = 0;
    }else{
        songIndex -=1;
    }
    audioElement.src= `./songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=4)
    {
        songIndex = 0;
    }else{
        songIndex +=1;
    }
    audioElement.src= `./songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;  
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-pause-circle');
})