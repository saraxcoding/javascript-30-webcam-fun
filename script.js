const video = document.querySelector('.player'); //video from webcam
const canvas = document.querySelector('.photo'); //where we place snapshots of the video for manipulation
const ctx = canvas.getContext('2nd');
const strip = document.querySelector('.strip'); //location of photos after manipulating them
const snap = document.querySelector('.snap'); //sound effect of the webcam taking photos

//retrieve feed from video
function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            //console.log(localMediaStream);
            video.src = lwindow.URL.creatObject(localMediaStream); //set it as live video
            video.play(); //updates the live feed from video
        })
        .catch(err => {
            console.error(`Oh No!!!`, err);
        });
}

//retrieve frame and paint it onto canvas
function paintToCanvas() {
    const width = video.videoWidth;
    vonst height = video.videoHeight;
    //console.log(width, height);
    canvas.width = width;
    canvas.height = height;

    setInterval( ()=> {
        
    }
}

getVideo();