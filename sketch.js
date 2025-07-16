let song;
let fft;
let playButton;
let playing = false;

function preload() {
    song = loadSound('musica/videoplayback.m4a');
}

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('musicBox');
    playButton = select('#playButton');
    playButton.mousePressed(togglePlay);
    fft = new p5.FFT();
    fft.setInput(song);
    // Initial resize to fit the parent div correctly on load
    resizeCanvas(select('#musicBox').width, select('#musicBox').height);
}

function draw() {
    background(255, 240, 220);

    let spectrum = fft.analyze();
    noStroke();

    for (let i = 0; i < spectrum.length; i += 10) {
        let x = map(i, 0, spectrum.length, 0, width);
        let h = map(spectrum[i], 0, 255, 0, height);

        let r = random(200, 255);
        let g = random(100, 180);
        let b = random(50, 120);
        fill(r, g, b);

        rect(x, height - h, width / 64, h);
    }
}

function togglePlay() {
    if (playing) {
        song.pause();
        playButton.html('Reproducir');
    } else {
        song.loop();
        playButton.html('Pausar');
    }
    playing = !playing;
}

function windowResized() {
    resizeCanvas(select('#musicBox').width, select('#musicBox').height);
}