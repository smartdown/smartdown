### P5JS Mobius Example

```p5js/playable/autoplay
var PI = Math.PI;
var HALF_PI = PI / 2.0;

smartdown.setVariable('SEGMENTS', 30, 'number');
smartdown.setVariable('SEG_WIDTH', 8, 'number');
smartdown.setVariable('SEG_LENGTH', 50, 'number');

var speed = 0.05;
var ax = .01;
var ay = ax;
var az = ay;
var dx, dy, dz;

p5.windowResized = function() {
  p5.resizeCanvas(p5.windowWidth - 50, p5.windowHeight - 300);
};

p5.setup = function() {
  dx = p5.random(-speed, speed);
  dy = p5.random(-speed, speed);
  dz = p5.random(-speed, speed);

  p5.createCanvas(300, 300, 'webgl');
  p5.normalMaterial();

  p5.windowResized();
};

p5.draw = function() {
  var SEGMENTS = env.SEGMENTS;
  var SEG_WIDTH = env.SEG_WIDTH;
  var SEG_LENGTH = env.SEG_LENGTH;
  var DIAMETER = SEG_LENGTH * 2;
  p5.background('ivory');
  p5.camera(0, SEG_LENGTH, p5.windowHeight / 3, 0, 0, 0, 0, 1, 0);
  p5.rotateX(ax += dx);
  p5.rotateY(ay += dy);
  p5.rotateZ(az += dz);

  for (var i = 0; i < SEGMENTS; i++) {
    var frac = i * 2 / SEGMENTS;
    p5.push();
    p5.rotateX(frac * HALF_PI);
    p5.rotateY(HALF_PI);
    p5.translate(
        0,
        DIAMETER * p5.cos(frac * HALF_PI),
        DIAMETER * p5.sin(frac * PI));
    p5.cylinder(SEG_WIDTH, SEG_LENGTH);
    p5.pop();
  }
};
```

- [Number of Segments? [30]](:?SEGMENTS|number)
- [Strip Thickness? [8]](:?SEG_WIDTH|number)
- [Strip Width? [50]](:?SEG_LENGTH|number)

---

[Back to Home](:@Home)
