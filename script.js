//fetch all element from DOM that we will manipulate
const trackImg = document.querySelector("#music img");//use to update artist profile image
const songName = document.querySelector("#details h4");//use to update song name
const artistName = document.querySelector("#details p");//use to update artist name
const shuffle = document.querySelector("#control i:nth-of-type(1)");//use to update control
const backward = document.querySelector("#control i:nth-of-type(2)");//use to update control
const play = document.querySelector("#control i:nth-of-type(3)");//use to update control
const forward = document.querySelector("#control i:nth-of-type(4)");//use to update control
const redo = document.querySelector("#control i:nth-of-type(5)");//use to update control
const progressBar = document.getElementById("progress");//use to update slider
const progress = document.getElementById("bar");//use to update slider
const timerStart = document.querySelector("#progress-bar-container span:nth-of-type(1)");//use to update timer
const timerEnd = document.querySelector("#progress-bar-container span:nth-of-type(2)");//use to update timer
const like = document.querySelector("#music i:nth-of-type(1)");//use to update like
const unLike = document.querySelector("#music i:nth-of-type(2)");//use to update unlike
const volume = document.querySelector("#volume-container input");//use to update unlike
const volumeIcon = document.querySelector("#volume-container i");//use to update unlike


//create an array of tracks/songs
let tracks = [
    {
        id: 0,
        songName: "All Of Me",
        artistName: "John Legend",
        artistImgSrc: "./assets/image/all of me.jpg",
        bannerSrc: "./assets/image/all of me.jpg",
        trackSrc: "./assets/music/All Of Me.mp3",
        isFavorite: false,
    },
    {
        id: 1,
        songName: "Hurts So Good",
        artistName: "Astrid S",
        artistImgSrc: "./assets/image/Astrid S.jpg",
        bannerSrc: "./assets/image/Hurts So Good.jpg",
        trackSrc: "./assets/music/Astrid S  Hurts So Good.mp3",
        isFavorite: false,
    },
    {
        id: 2,
        songName: "SIX FEET UNDER Lyrics",
        artistName: "Billie Eilish  ",
        artistImgSrc: "./assets/image/Billie Elilish.jpg",
        bannerSrc: "./assets/image/SIX FEET UNDER.jpg",
        trackSrc: "./assets/music/Billie Eilish  SIX FEET UNDER Lyrics.mp3",
        isFavorite: false,
    },
    {
        id: 3,
        songName: "Make You Mine Put Your Hand in ",
        artistName: "PUBLIC",
        artistImgSrc: "./assets/image/PUBLIC.jpg",
        bannerSrc: "./assets/image/Make You Mine Put Your Hand in.jpg",
        trackSrc: "./assets/music/PUBLIC  Make You Mine Put Your Hand in .mp3",
        isFavorite: false,
    },
    {
        id: 4,
        songName: "Dancing With Your Ghost Li",
        artistName: "Sasha Sloan",
        artistImgSrc: "./assets/image/sasha sloan.jpg",
        bannerSrc: "./assets/image/Dancing With Your Ghost Li.jpg",
        trackSrc: "./assets/music/Sasha_Alex_Sloan_-_Dancing_With_Your_Ghost_(Jesusful.com).mp3",
        isFavorite: false,
    },
    {
        id: 5,
        songName: "STAY",
        artistName: "The Kid LARI and Justin Bibber ",
        artistImgSrc: "./assets/image/justin  and kid.jpg",
        bannerSrc: "./assets/image/stay.jpg",
        trackSrc: "./assets/music/The Kid LAROI Justin Bieber  STAY Offic.mp3",
    },
]

let count = 0;

//create audio element
const audio = document.createElement('audio');
audio.src = tracks[count].trackSrc;
trackImg.src = tracks[count].bannerSrc;
songName.innerText = tracks[count].songName;
artistName.innerText = tracks[count].artistName;

// add event listener to play control and play music
play.addEventListener('click', playMusic);
forward.addEventListener('click', forwardPlay);
backward.addEventListener('click', backwardPlay);


//create func to play audio
function playMusic() {
    setTime(timerEnd, audio.duration);
    // click to play 
    console.log("music is playing...");
    if (play.classList[1] === 'fa-play-circle-o') {
        play.classList.remove('fa-play-circle-o');
        play.classList.add('fa-pause-circle-o');
        audio.play();
    } else {
        // click to pause 
        play.classList.remove('fa-pause-circle-o');
        play.classList.add('fa-play-circle-o');
        audio.pause();
    }
}
playMusic();//play on load

// make func to go to next music
function forwardPlay() {
    console.log("forward control is click");

    if (count === tracks.length - 1) {
        count = 0;
    } else {
        count++;
    }
    audio.src = tracks[count].trackSrc;
    trackImg.src = tracks[count].bannerSrc;
    songName.innerText = tracks[count].songName;
    artistName.innerText = tracks[count].artistName;

    //when directly click on next with click on play btn, some edge cases checks
    if (play.classList[1] === 'fa-play-circle-o') {
        play.classList.remove('fa-play-circle-o');
        play.classList.add('fa-pause-circle-o');
    }
    audio.play();


}

// make func to go to back music
function backwardPlay() {
    console.log("backward control is click");
    if (count === 0) {
        count = tracks.length - 1;
    } else {
        count--;
    }
    audio.src = tracks[count].trackSrc;
    trackImg.src = tracks[count].bannerSrc;
    songName.innerText = tracks[count].songName;
    artistName.innerText = tracks[count].artistName;

    //when directly click on next with click on play btn
    if (play.classList[1] === 'fa-play-circle-o') {
        play.classList.remove('fa-play-circle-o');
        play.classList.add('fa-pause-circle-o');
    }

    audio.play();
}


//redo functionality
function repeatMusic() {
    audio.currentTime = 0;
    audio.play();
    if (play.classList[1] === 'fa-play-circle-o') {
        play.classList.remove('fa-play-circle-o');
        play.classList.add('fa-pause-circle-o');
        audio.play();
    }

}
redo.addEventListener('click', repeatMusic);


// slider timer and timeline
function setTime(output, input) {
    //again again set time change//input = seconds,output=timerStart element
    //we use audioObj.currentTime to get current time of audio and than convert to minutes and embed on player

    if (isNaN(input)) {
        return;
    }

    //minutes calculate
    const minutes = Math.floor(input / 60);
    const seconds = Math.floor(input % 60);

    if (seconds < 10) {
        output.innerText = minutes + ":0" + seconds;
    } else {
        output.innerText = minutes + ":" + seconds;
    }

}



//drag slider functionality
let isDragging = false;

progress.addEventListener("mousedown", startDragging);
progress.addEventListener("mousemove", dragProgress);
progress.addEventListener("mouseup", stopDragging);
progress.addEventListener("mouseout", stopDragging);

//drag slide start
function startDragging() {
    isDragging = true;
}

//drag slide is dragging/mouse over it
function dragProgress(e) {
    if (isDragging) {
        const progressBarWidth = progressBar.offsetWidth;//pb upto fill
        const clickOffset = e.offsetX; console.log(clickOffset);
        const newTime = (clickOffset / progressBarWidth) * audio.duration;

        audio.currentTime = newTime;
        progress.style.width = (clickOffset / progressBarWidth) * 100 + "%";
    }
}


//drag slide end
function stopDragging() {
    isDragging = false;
}







//when-when audio track time change this event get trigger
audio.addEventListener('timeupdate', () => {
    // set audio time on player


    if (!isDragging) {
        if (audio.currentTime === audio.duration) {
            forwardPlay();
        }
        setTime(timerEnd, audio.duration);

        const currentAudioTime = Math.floor(audio.currentTime);//234.433 == 234 SECONDS
        const timePercentage = (currentAudioTime / audio.duration) * 100 + "%";

        //set time to timerStart
        setTime(timerStart, currentAudioTime);

        progress.style.width = timePercentage;
    }
})



progressBar.onclick = function (e) {
    if (!isDragging) {
        progress.style.width = e.offsetX;
        audio.currentTime = (e.offsetX / progressBar.offsetWidth) * audio.duration;

    }
    //0s=( progresswidth=0/totalwidth )seconds
}

//likes and unlike
like.onclick = function () {
    if (unLike.classList[2] === 'unlike') {
        unLike.classList.remove('unlike');
    }
    like.classList.toggle("like");//classList an array having all class in it
}
unLike.onclick = function () {
    if (like.classList[2] === 'like') {
        like.classList.remove('like');
    }
    unLike.classList.toggle("unlike");//classList an array having all class in it
}




//volume and volumeIcon
volume.value = 20;
audio.volume = 20 / volume.max;
volume.onclick = function () {
    console.log("volume", volume.value, volumeIcon);
    if (volume.value === 0) {
        changeIcon();
    } else {
        if (volumeIcon.classList[1] === "fa-volume-off") {
            changeIcon();
        }
        audio.volume = parseInt(volume.value) / parseInt(volume.max);
    }

    // 0 to 1 volume
}
volumeIcon.onclick = changeIcon;
function changeIcon() {
    if (volumeIcon.classList[1] === "fa-volume-off") {
        volumeIcon.classList.remove("fa-volume-off");
        volumeIcon.classList.add("fa-volume-up");
        volume.value = 20;
        audio.volume = 20 / volume.max;
        return;
    }
    volumeIcon.classList.remove("fa-volume-up");
    volumeIcon.classList.add("fa-volume-off");
    audio.volume = 0;
    volume.value = 0;
}


//shuffle
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        //0.0 to 1.0 any value multiply output less than that any value  .9 * 4=3.6,.9 * 5=4.5 max , single digit max <multiply value
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];

        //temp=arr[j]
        //arr[i]=arr[j]
        //arr[j]=temp;
    }
    return array;
}

shuffle.onclick = function () {
    shuffleArray(tracks);
    shuffle.style.color = "aqua";
}



// play track on click

const PlayTracksOnClick = document.getElementsByClassName("on-click-play-track");
const favorites = document.querySelectorAll('.queue-body-item i');

for (const element of PlayTracksOnClick) {
    element.addEventListener('click', function () {
        const id = element.getAttribute('data-trackId');
        audio.src = tracks[id].trackSrc;

        console.log(tracks[id]);

        trackImg.src = tracks[id].bannerSrc;
        songName.innerText = tracks[id].songName;
        artistName.innerText = tracks[id].artistName;

        //when directly click on next with click on play btn
        //user click after pause music,checks
        if (play.classList[1] === 'fa-play-circle-o') {
            play.classList.remove('fa-play-circle-o');
            play.classList.add('fa-pause-circle-o');
        }
        audio.play();

    });
}

// favorite btn script
for (const favorite of favorites) {
    favorite.addEventListener('click', function () {
        const trackId = parseInt(favorite.getAttribute('data-trackId'));

        favorite.classList.toggle('like');
        tracks = tracks.map((track, index) => {
            if (trackId === index) {
                track.isFavorite = !track.isFavorite;
            }
            console.log(track);
            return track;
        });
        console.log(tracks);


    });
}


/** Some POints to create things

1.use progress for mousemove ,
 pointer in progress slider is important with  it help we will move in forward with mouse because it is in 5px right from progress

2. use progressBar for mousemove

mousemove event trigger each time when an element area move karta hai mouse



mousedown than work:
each time we move left or right it change current time of audio and than an event updateTime automatically call and set progress

mouse up drag stop:
another we can set at time when we change current time of audio so it show like moving progress pointer progress

mousemove we can CREATE OWN MANUALLY DRAG FEATURE
--> PARENT CONTAINER TOWARD MOVE ,offsetX USE


------------- or -------------
RANGE INPUT WAY (using input element type range)
    progressB.value=audio.currentTime * (parseInt(progressB.max)/audio.duration);
    console.log(audio.currentTime * (parseInt(progressB.max)/audio.duration));
    parseInt convert sting into number and remove decimals
    Math.floor only remove decimals


    const =parseInt(progressB.max)/audio.duration;

    
 RANGE INPUT WAY
progressB.value='0';
progressB.onclick=function(e){
    // console.log(e);
    progressB.value=Math.floor(parseInt(progressB.value)+(100/audio.duration));
    audio.currentTime = (progressB.value/progressB.max) * audio.duration;
    
    // console.log(progressB.value);
    
    
    0s=( progresswidth=0/totalwidth )seconds
    
}


//4 steps to create player

 * 1. create audio element
 * 2. using audio obj time manage
 * 3. first create an func convert time/duration if track in min:sec
 * 4. use timeUpdate event to change timerStart with currentTime of audio change
  
    draggable slider bar is an functionality
*/