const audioElement = document.querySelector('audio');
const playButton = document.getElementById('play');
const image = document.querySelector('img');
const title = document.getElementById('title');
const author = document.getElementById('artist');
const nextSongButton = document.getElementById('next');
const previousSongButton = document.getElementById('prev');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const songs = [
    {
        name: "Cant_hold_us",
        displayName: "Can't hold us",
        artist: 'Macklemore'
    },
    {
        name: 'Counting_Stars',
        displayName: 'Counting Stars',
        artist: 'One Republic'
    },
    {
        name: 'demons',
        displayName: 'Demons',
        artist: 'Imagine Dragons'
    },
    {
        name: 'pitbull',
        displayName: 'Rain Over Me',
        artist: 'Pibull & Marc Anthony'
    },
]

let isPlaying = false;

function playSong() {
    isPlaying = true;
    playButton.classList.replace('fa-play', 'fa-stop');
    audioElement.play();
}

function stopSong() {
    isPlaying = false;
    playButton.classList.replace('fa-stop', 'fa-play');
    audioElement.pause();
}

playButton.addEventListener('click', () => {
    isPlaying ? stopSong() : playSong();
})

function loadSong(song) {
    title.textContent = song.displayName;
    author.textContent = song.artist;
    image.src = `img/${song.name}.jpg`;
    audioElement.src = `music/${song.name}.mp3`;
}

let songIndex = 0;

function nextSong() {
    songIndex += 1;
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex]);
    playSong();
}

function previousSong() {
    songIndex -= 1;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

function updateTimes(event) {
    if (isPlaying) {
        let {currentTime, duration} = event.srcElement;

        // Calculating progress bar width
        const progressPercent = currentTime / duration * 100;
        progress.style.width = `${progressPercent}%`;

        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`
        }

        // Avoid NAN
        if (durationSeconds) {
            durationElement.textContent =`${durationMinutes}:${durationSeconds}`
        }

        // Calculate current Time
        const currentMinutes = Math.floor(currentTime / 60);
        currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }

        if(currentSeconds) {
            currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`
        }
    }
}

function updateProgressBar(event) {
    const width = this.clientWidth;
    const clickX = event.offsetX;
    // console.log('width', width, 'clickX', clickX);
    const {duration} = audioElement;
    audioElement.currentTime = clickX / width * duration;
}

nextSongButton.addEventListener('click', nextSong);
previousSongButton.addEventListener('click', previousSong);
audioElement.addEventListener('ended', nextSong)

audioElement.addEventListener('timeupdate', updateTimes);
progressContainer.addEventListener('click', updateProgressBar);