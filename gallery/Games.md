### Game Starter using P5JS

- **Character Name**: [](:?CharacterName)
- **Music**: [](:XMusicOn) [Tozan's Besai Crystal Gardens 2 Forbidden Pathway](https://opengameart.org/content/besai-crystal-gardens-2-forbidden-pathway)


```p5js/playable/autoplay

// A sound file object
var song;
var spriteX;
var spriteY;
var statusHeight = 30;
var controlHeight = 50;
var trapezoidWidth = 100;
var trapezoidHeight = 200;
var upButton, downButton, leftButton, rightButton, spaceButton;
var musicOn = env.MusicOn;

var myCanvas;
var myDiv = this.div;
myDiv.style.setProperty ("width", "420px", "important");
myDiv.style.setProperty ("height", "420px", "important");
myDiv.style.setProperty ("margin", "auto", "important");
myDiv.style.setProperty ("padding", "5px", "important");

function centerCanvas() {
  if (myCanvas) {
    var x = (p5.windowWidth - myDiv.width) / 2;
    var y = (p5.windowHeight - myDiv.height) / 2;
    myCanvas.position(x, y);
  }
}

p5.preload = function () {
  // Start the audio context on a click/touch event
  p5.userStartAudio();

  // Load a sound file
  var sound = '/gallery/resources/crystal2.mp3';
  song = p5.loadSound(sound);
  song.owner = p5;
};

p5.setup = function () {
  // song.loop();  // Loop the sound forever

  myCanvas = p5.createCanvas(400, 400);
  p5.textSize(20);
  p5.textFont('Helvetica');
  p5.strokeWeight(2);

  function makeButton(label, right, top, keyCode) {
    var result = p5.createButton(label);
    result.class('btn-mobile-button');
//    result.style('right', right + 'px');
    result.style('left', (200 + right) + 'px');
    result.style('top', (top) + 'px');
    result.size(25, 25);
    result.mouseClicked(function() {
      p5.handleKey(keyCode);
    });
    return result;
  }

  upButton = makeButton('&uparrow;', 40, 255, p5.UP_ARROW);
  downButton = makeButton('&downarrow;', 40, 315, p5.DOWN_ARROW);
  leftButton = makeButton('&leftarrow;', 10, 285, p5.LEFT_ARROW);
  rightButton = makeButton('&rightarrow;', 70, 285, p5.RIGHT_ARROW);
  spaceButton = makeButton('&infin;', 40, 285, 32);

  p5.windowResized();
};

p5.windowResized = function() {
  var w = 400;  // p5.windowWidth - 40;
  var h = 400;
  p5.resizeCanvas(w, 400);
  centerCanvas();

  if (!spriteX) {
    spriteX = w / 2;
  }
  if (!spriteY) {
    spriteY = h / 2;
  }
  if (spriteX > w) {
    spriteX = w;
  }
  if (spriteY > h) {
    spriteY = h;
  }
};

p5.handleKey = function(key) {
  var delta = 5;
  if (key === p5.LEFT_ARROW) {
    spriteX -= delta;
    if (spriteX < 0) {
      spriteX = 0;
    }
  }
  else if (key === p5.RIGHT_ARROW) {
    spriteX += delta;
    if (spriteX > p5.width) {
      spriteX = p5.width;
    }
  }
  else if (key === p5.UP_ARROW) {
    spriteY -= delta;
    if (spriteY < 0) {
      spriteY = 0;
    }
  }
  else if (key === p5.DOWN_ARROW) {
    spriteY += delta;
    if (spriteY > p5.height) {
      spriteY = p5.height;
    }
  }
  else if (key === 32) {
    spriteX = p5.width / 2;
    spriteY = p5.height / 2;
  }
};

p5.keyPressed = function(e) {
  var validKeys = [
    p5.LEFT_ARROW,
    p5.RIGHT_ARROW,
    p5.UP_ARROW,
    p5.DOWN_ARROW,
    32
  ];

  if (validKeys.indexOf(p5.keyCode) < 0) {
    return true;
  }
  else {
    p5.handleKey(p5.keyCode);
  }
};

p5.draw = function () {
  if (!musicOn && env.MusicOn) {
    song.loop();
  }
  else if (musicOn && !env.MusicOn) {
    song.stop();
  }
  musicOn = env.MusicOn;

  if (p5.keyIsPressed) {
    p5.keyPressed();
  }

  p5.background('lightgray');

  var forwardViewWidth = p5.width;
  var forwardViewHeight = p5.height - statusHeight;
  var forwardViewX = 0;
  var forwardViewY = statusHeight;
  var trapezoidX = forwardViewX + forwardViewWidth / 2 - trapezoidWidth / 2;
  var trapezoidY = forwardViewY + forwardViewHeight / 2 - trapezoidHeight / 2;
  p5.fill('lightblue');
  p5.stroke('darkslateblue');
  p5.rect(trapezoidX, trapezoidY, trapezoidWidth, trapezoidHeight);
  p5.fill('lightyellow');
  p5.quad(
    forwardViewX, forwardViewY,
    trapezoidX, trapezoidY,
    trapezoidX, trapezoidY + trapezoidHeight,
    forwardViewX, forwardViewY + forwardViewHeight);
  p5.quad(
    forwardViewX + forwardViewWidth, forwardViewY,
    forwardViewX + trapezoidX + trapezoidWidth, trapezoidY,
    forwardViewX + trapezoidX + trapezoidWidth, trapezoidY + trapezoidHeight,
    forwardViewX + forwardViewWidth, forwardViewY + forwardViewHeight);
  p5.fill('black');
  p5.stroke('black');
  var yDelta = 38;  // FIXME - Trigonometry needed here
  p5.rect(forwardViewX + forwardViewWidth / 6, forwardViewY + yDelta,
          1, forwardViewHeight - 2 * yDelta);
  p5.rect(forwardViewX + 5 * forwardViewWidth / 6, forwardViewY + yDelta,
          1, forwardViewHeight - 2 * yDelta);

  p5.fill('red');
  p5.stroke('darkslateblue');
  p5.ellipse(spriteX, spriteY, 10, 10);

  p5.fill('black');
  p5.rect(0, 0, p5.width, statusHeight);
  var name = env.CharacterName || 'Dungeoneer';
  p5.fill('lightgreen');
  p5.stroke('lightgreen');
  p5.text(name, 5, 0.75 * statusHeight);
};

```

---

#### SmartDown Game Tech Example - Part I

I initially began this project in late 2016, inspired by [Global Game Jam Weekend](https://globalgamejam.org). Although I didn't complete it during the Game Jam, I have been slowly advancing it and fixing Smartdown to make it more easy.

This is an experiment in using [Smartdown](https://smartdown.io) and [p5.js](https://p5js.org) to build a simple, but extensible and distributed, game. The game UI is primarily written using `p5.js`, and Smartdown is being used as a prose-oriented wrapper that also provides a way to render the `p5.js`. Smartdown *Variables* are used to communicate the player name and the MusicOn/Off status between the Smartdown and the embedded sketch.

My goal with this first example is to build a rough skeleton of a game that has keyboard controls, some sort of goal or transition (e.g., to a next level), and some visual navigation. Currently, the keyboard controls can be used to move a little red dot around on the screen. There are currently no transitions or goals achievable.

My ultimate goal, probably in Parts II or III of this sequence, is to build a Wizardry-style game with a simple vector hallway/room representation, and to be able to link different *levels* together via URL so that a dungeon can be stored and explored in a completely distributed fashion, with some authors hosting their content on GitHub, others on websites, and others via dynamically generated API servers.

In theory, I could first try to implement my [Basilisk Game](https://doctorbud.com/celestial-toys/post/2015-02-03-reactjs-basilisk-slide-puzzle/) example, which was written as a ReactJS exercise.

---

[Back to Home](:@Home)
