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
    const height = video.videoHeight;
    //console.log(width, height);
    canvas.width = width;
    canvas.height = height;

    return setInterval(()=> {
        ctx.drawImage(video, 0, 0, width, height);
        // take the pixels out
        let pixels = ctx.getImage(video, 0, 0, width, height);
        //console.log(pixels);

        // manipulate pixels
        //pixels = redEffect(pixels);
        //debugger;

        //pixels = rgbSplit(pixels);
        //ctx.globalAlpha = 0.1; //ghosting effect

        pixels = greenScreen(pixels);

        // place pixels back
        ctx.putImageData(pixels, 0, 0);

    }, 16);
}

function takePhoto() {
    // played the sound
    snap.currentTime = 0;
    snap.play();

    // take the data from the canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    //link.textContent = 'Download Image';
    link.innerHTML = `<img src="${data}" alt="handsome" />`;
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100; // red
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // green
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // blue
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // red
        pixels.data[i + 100] = pixels.data[i + 1]; // green
        pixels.data[i - 150] = pixels.data[i + 2]; // blue
    }
    return pixels;
}

function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });

    console.log(levels);

    for (let i = 0; i < pixels.data.length; i += 4) {
        red = pixels.data[i + 0]; 
        green = pixels.data[i + 1]; 
        blue = pixels.data[i + 2]; 
        alpha = pixels.data[i + 3]; //transparency pixel

        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
            // take it out!
            pixels.data[i + 3] = 0;
        }
    }

    return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);