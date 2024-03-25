### P5JS

Smartdown integrates the wonderful [P5.js](https://p5js.org/) Javascript library, which provides a way for authors to embed *sketches* within their Smartdown documents.


#### P5JS Ellipse Example

```p5js/playable
p5.setup = function() {
};

p5.draw = function() {
  p5.ellipse(50, 50, 80, 80);
};
```


#### P5JS Sound Oscillator Frequency Example

Here is the [P5JS Sound Oscillator Frequency Example](https://p5js.org/examples/examples/Sound_Oscillator_Frequency.php).

```p5js/playable
var osc, fft;

p5.setup = function () {
  p5.createCanvas(420, 256);

  // Start the audio context on a click/touch event
  p5.userStartAudio();

  osc = new p5.TriOsc(); // set frequency and type
  osc.amp(.5);
  osc.owner = p5;

  fft = new p5.FFT();
  fft.owner = p5;
  osc.start();
};

p5.draw = function () {
  p5.background(255);

  var waveform = fft.waveform();  // analyze the waveform
  p5.beginShape();
  p5.strokeWeight(5);
  for (var i = 0; i < waveform.length; i++) {
    var x = p5.map(i, 0, waveform.length, 0, p5.width);
    var y = p5.map(waveform[i], -1, 1, p5.height, 0);
    p5.vertex(x, y);
  }
  p5.endShape();

  // change oscillator frequency based on mouseX
  var freq = p5.map(p5.mouseX, 0, p5.width, 40, 880);
  osc.freq(freq);
  var amp = p5.map(p5.mouseY, 0, p5.height, 1, .01);
  osc.amp(amp);
};
```


#### P5JS Playback Rate Example

Here is the [P5JS Playback Rate Example](https://p5js.org/examples/examples/Sound_Playback_Rate.php). Load a SoundFile and map its playback rate to mouseY, volume to mouseX.


```p5js/playable
// A sound file object
var song;

p5.preload = function () {
  // Start the audio context on a click/touch event
  p5.userStartAudio();

  // Load a sound file
  song = p5.loadSound('https://unpkg.com/smartdown-gallery/resources/Damscray_DancingTiger.mp3');
  song.owner = p5;
};

p5.windowResized = function() {
  p5.resizeCanvas(p5.windowWidth - 70, 100);
};

p5.setup = function () {
  p5.createCanvas(100, 100);
  p5.windowResized();
  // Loop the sound forever
  // (well, at least until stop() is called)
  song.loop();
};

p5.draw = function () {
  p5.background(200);

  // Set the volume to a range between 0 and 1.0
  var volume = p5.map(p5.mouseX, 0, p5.width, 0, 1);
  volume = p5.constrain(volume, 0, 1);
  song.amp(volume);

  // Set the rate to a range between 0.1 and 4
  // Changing the rate alters the pitch
  var speed = p5.map(p5.mouseY, 0.1, p5.height, 0, 2);
  speed = p5.constrain(speed, 0.01, 4);
  song.rate(speed);

  // Draw some circles to show what is going on
  p5.stroke(0);
  p5.fill(51, 100);
  p5.ellipse(p5.mouseX, 100, 48, 48);
  p5.stroke(0);
  p5.fill(51, 100);
  p5.ellipse(100, p5.mouseY, 48, 48);
};
```


#### Prefixed vs Global Syntax

Most of the examples at the [p5js.org](https://p5js.org) site are written using the *Global Mode* of p5.js, which means that a sketch can refer to p5.js functions and variables using their Processing-inspired names, such as `ellipse` and `width`. The examples above are written using Smartdown's default *Instance Mode* syntax, which requires that functions are prefixed by `p5.` and that handler callbacks (aka User Functions) are declared like `p5.setup = function() {...}` rather than the Global Mode syntax `function setup {...}`.

The Global Mode syntax is experimental in Smartdown currently, and can be accessed by using the playable language `P5JS` instead of the well-supported default `p5js`. When using the `P5JS` language, sketch authors should be able to copy and paste most of the Global Mode examples of p5.js.


##### Tickle example with Instance mode Syntax

```p5js/playable
var message = "tickle",
  font,
  bounds, // holds x, y, w, h of the text's bounding box
  fontsize = 60,
  x, y; // x and y coordinates of the text

p5.preload = function preload() {
  font = p5.loadFont('https://unpkg.com/smartdown-gallery/resources/SourceSansPro-Regular.otf');
};

p5.setup = function setup() {
  p5.createCanvas(410, 250);

  // set up the font
  p5.textFont(font);
  p5.textSize(fontsize);

  // get the width and height of the text so we can center it initially
  bounds = font.textBounds(message, 0, 0, fontsize);
  x = p5.width / 2 - bounds.w / 2;
  y = p5.height / 2 - bounds.h / 2;
};

p5.draw = function draw() {
  p5.background(204, 120);

  // write the text in black and get its bounding box
  p5.fill(0);
  p5.text(message, x, y);
  bounds = font.textBounds(message,x,y,fontsize);

  // check if the mouse is inside the bounding box and tickle if so
  if ( p5.mouseX >= bounds.x && p5.mouseX <= bounds.x + bounds.w &&
    p5.mouseY >= bounds.y && p5.mouseY <= bounds.y + bounds.h) {
    x += p5.random(-5, 5);
    y += p5.random(-5, 5);
  }
};
```

##### Tickle example with Global mode Syntax

```P5JS/playable/debug
var message = "tickle",
  font,
  bounds, // holds x, y, w, h of the text's bounding box
  fontsize = 60,
  x, y; // x and y coordinates of the text

function preload() {
  font = loadFont('https://unpkg.com/smartdown-gallery/resources/SourceSansPro-Regular.otf');
}

function setup() {
  createCanvas(410, 250);

  // set up the font
  textFont(font);
  textSize(fontsize);

  // get the width and height of the text so we can center it initially
  bounds = font.textBounds(message, 0, 0, fontsize);
  x = width / 2 - bounds.w / 2;
  y = height / 2 - bounds.h / 2;
}

function draw() {
  background(204, 120);

  // write the text in black and get its bounding box
  fill(0);
  text(message, x, y);
  bounds = font.textBounds(message,x,y,fontsize);

  // check if the mouse is inside the bounding box and tickle if so
  if ( mouseX >= bounds.x && mouseX <= bounds.x + bounds.w &&
    mouseY >= bounds.y && mouseY <= bounds.y + bounds.h) {
    x += random(-5, 5);
    y += random(-5, 5);
  }
}
```


#### More P5JS Examples

[P5JS Mobius](:@Mobius)
[P5JS Conic Sections](:@Conic)
[P5JS Game](:@Games)
[P5JS Tree](:@Tree)
[P5JS VectorField](:@VectorField)
[P5JS VectorTree](:@VectorTree)

---

[Back to Home](:@Home)

