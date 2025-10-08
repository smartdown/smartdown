### P5JS Conic Section

The goal here is to build a demonstration of how the various Conic Sections are defined geometrically as well as parametrically by illustrating the cross-section created by a plane intersecting two mirrored cones.

This demonstration is a work in progress. The ellipse drawn is incorrect, but a start.

This demonstration also shows off the interaction between Smartdown variables and the P5JS sketches, where the **Show Plane** button simply sets a boolean flag called `ShowPlane`, which the P5JS will respond to.

---

[Show Plane](:XShowPlane)

[Showing Plane](:!ShowPlane)


```p5js/playable/autoplay
var PI = Math.PI;
var HALF_PI = PI / 2.0;

var geom = {
  sketchWidth: 0,
  sketchHeight: 0,
  coneWidth: 0,
  coneHeight: 0,
  planeWidth: 0,
  planeHeight: 0,
  cardWidth: 0,
  cardHeight: 0,
  planeThickness: 0
};

var speed = 0.05;
var ax = .01;
var ay = ax;
var az = ay;
var dx, dy, dz;
var pg;

p5.windowResized = function() {
  var w = p5.windowWidth - 30;
  var h = Math.round(1.5 * w);

  geom.sketchWidth = w;
  geom.sketchHeight = h;
  geom.coneWidth = Math.round(w / 3);
  geom.coneHeight = geom.coneWidth;
  geom.planeWidth = Math.round(w / 2);
  geom.planeHeight = 3 * geom.planeWidth;
  geom.cardWidth = w;
  geom.cardHeight = Math.round(0.6 * w);
  geom.planeThickness = 10;
  p5.resizeCanvas(geom.sketchWidth, geom.sketchHeight);
  pg = p5.createGraphics(geom.cardHeight, geom.cardHeight);
};

p5.setup = function() {
  dx = p5.random(-speed, speed);
  dy = p5.random(-speed, speed);
  dz = p5.random(-speed, speed);

  p5.createCanvas(10, 10, p5.WEBGL);
  p5.normalMaterial();

  smartdown.setVariable('ShowPlane', true, 'boolean');
  p5.frameRate(5);
  p5.windowResized();
};

p5.draw = function() {
  p5.background('lightgray');
  p5.pointLight(250, 100, 100, 5 * geom.sketchWidth, 0, 5 * geom.sketchWidth);
  p5.pointLight(100, 100, 250, 0, 5 * geom.sketchWidth, 5 * geom.sketchWidth);

  var zoom = (p5.sin(p5.frameCount * 0.1) + 2) * geom.sketchWidth * 2;
  zoom = geom.sketchWidth * 1.5;
  p5.camera(0, 0, zoom, 0, 0, 0, 0, 1, 0);
  ax += dx;
  ay += dy;
  az += dz;

  p5.push();
    p5.rotateX(ax);
    p5.rotateY(ay);
    p5.rotateZ(az);
    p5.ambientLight(100, 100, 100);
  p5.pop();

  p5.push();
    p5.normalMaterial();
    p5.translate(
      0,
      -1.5 * geom.coneHeight,
      0);
    p5.cone(geom.coneWidth, geom.coneHeight);
  p5.pop();

  p5.push();
    p5.normalMaterial();
    p5.translate(
      0,
      -0.5 * geom.coneHeight,
      0);
    p5.rotateX(PI);
    p5.cone(geom.coneWidth, geom.coneHeight);
  p5.pop();

  if (pg) {
    pg.push();
      pg.clear();
      pg.rect(0, 0, geom.cardWidth * 0.58, geom.cardHeight * 0.58);
      pg.textSize(12);
      var ew = geom.cardWidth / 2 + (ax * 10) % 40;
      var eh = geom.cardHeight / 2 + (ay * 10) % 40;
      pg.text('ax ' + ax, 20, 20);
      pg.text('ay ' + ay, 20, 40);
      pg.text('ew ' + ew, 20, 60);
      pg.text('eh ' + eh, 20, 80);
      pg.text('w ' + geom.sketchWidth, 20, 100);
      pg.text('h ' + geom.sketchHeight, 20, 120);
    pg.pop();

    pg.push();
      pg.stroke(0, 0, 0);
      pg.ellipse(geom.cardWidth * 0.3, geom.cardHeight * 0.7, ew, eh);
    pg.pop();

    p5.push();
      p5.translate(
        -5,
        geom.cardHeight - 50,
        50);
      p5.texture(pg);
      p5.ambientLight(254, 254, 254);
      p5.plane(geom.cardWidth, geom.cardHeight);
    p5.pop();
  }

  if (env.ShowPlane) {
    p5.push();
      p5.translate(0, -geom.coneHeight, 0);
      //p5.translate(
      // (1 * ax) % geom.planeHeight,
      // (1 * ay) % geom.planeHeight,
      // (1 * az) % geom.planeHeight);
      p5.rotateX(ax);
      p5.rotateY(ay);
      p5.rotateZ(az);

      p5.ambientLight(150, 150, 150);
      p5.specularMaterial(254);
      p5.box(geom.planeWidth, geom.planeHeight, geom.planeThickness);
      // p5.sphere(10);
      // p5.torus(geom.planeThickness, geom.planeThickness / 2, 24, 16);
    p5.pop();
  }
};
```


---

[Back to Home](:@Home)
