### Experimenting with Cuneiform

I really like the look and technical design of [Neo-Assyrian cuneiform](https://en.wikipedia.org/wiki/Cuneiform_script#Assyrian_cuneiform), and because my software and company are oriented around creating permanent technical documentation that will stand the test of time, and because I've adopted the *clay* metaphor in my software, it seemed like a good idea to use cuneiform to try to develop a logo.

I'm not an artist and can barely handle a pencil, but I can write code. So I studied the basic elements of the glyphs and broke them down into a single *stalk* element, which can be parametrized to achieve all of the possibilities in Neo-Assyrian. Note that the earlier cuneiforms are not as amenable to this, because they had yet to be standardized and mechanized.

One of my favorite glyphs is `KIR7 (NIM× NÍG.KÁR)` (TBD add good link and definition), which shows different examples of stalks composited together to form a figure:

![](/gallery/resources/KIR7_NIM_NIG_KAR_.png)

#### Work-in-progress

This is a work-in-progress that may eventually become a separate blog post. Right now, I'm trying to unify all three of the diagrams to use a common definition of my `stalk` function. However, each of the diagrams originally used a custom `stalk` function with slightly different internal parameters, including the arc-depth for the arc at the bottom of the stalk. I need to improve `stalk` to make this parameter explicit so that each of the diagrams can have its appropriate curvature.

#### Reusable `stalk` definition

Example of a reusable function, `stalk`, which can be used by subsequent playables. Note the `p5` initial parameter, which must be replaced with the per-playable (sketch) instance of `p5`, by using the construct:

```javascript
const stalk = window.stalk.bind(this, p5);
```

I've set this `stalk` definition to `/autoplay` to ensure it executes before the other, optionally playable content.

---


```javascript/autoplay/playable
function stalk(p5, arrowTailX, arrowTailY, arrowWidth, arrowHeight, stalkWidth, stalkHeight, angle, fillColor, bgColor) {
  // console.log('stalk1', window.p5, this.p5, p5, this, arguments, arrowTailX, arrowTailY, arrowWidth, arrowHeight, stalkWidth, stalkHeight, angle, fillColor, bgColor);

  p5.push();
  var tx = arrowTailX;
  var ty = arrowTailY;
  // p5.fill(bgColor);
  p5.translate(tx, ty);
  p5.rotate(angle);

  arrowTailX -= tx;
  arrowTailY -= ty;
  var halfWidth = arrowWidth / 2;
  var thirdWidth = arrowWidth / 3;
  var quarterWidth = arrowWidth / 4;
  var threeQuarterWidth = 3 * arrowWidth / 4;

  p5.noStroke();
  p5.fill(fillColor);
  p5.triangle(arrowTailX - arrowHeight, arrowTailY, arrowTailX + arrowHeight, arrowTailY, arrowTailX, arrowTailY + arrowHeight);

  p5.fill(fillColor);
  p5.rect(arrowTailX - stalkWidth / 2, arrowTailY, stalkWidth, stalkHeight + arrowWidth / 4);

  p5.fill(bgColor);

  arrowWidth += arrowWidth * 0.35;
  arrowTailY -= arrowHeight * 0.2;

  p5.noStroke();
  // p5.strokeWeight(2);
  // p5.stroke('yellowgreen');
  p5.arc(
      arrowTailX,
      arrowTailY,
      arrowWidth,
      arrowHeight,
      0 + p5.PI * 0,
      p5.PI - p5.PI * 0,
      p5.CHORD);

  p5.pop();
}
window.stalk = stalk;
```



#### Trying to replicate Neo-Assyrian Cuneiform

```p5js/playable/autoplay

var stalk = null;

const ksimImage = p5.loadImage('/gallery/resources/KSIMGlyph.png');
const sirImage = p5.loadImage('/gallery/resources/SIRGlyph.png');
const bgColor = 'white';

function drawQ() {
  var centerX = p5.width / 2;
  var centerY = p5.height / 2;
  var stalkRadius = 100;
  var stalkDiameter = 2 * stalkRadius;
  p5.push();
  p5.strokeWeight(10);
  p5.stroke('darkslateblue');
  p5.fill('aliceblue');
  p5.ellipse(centerX, centerY, stalkDiameter, stalkDiameter);
  p5.pop();

  var arrowWidth = 40;
  var arrowHeight = 15;
  var stalkWidth = 6;
  var stalkHeight = 60;
  var stalkStagger = 0;
  var numSectors = 10;
  var sectorSize = p5.TWO_PI / numSectors;

  for (var i = 0; i < numSectors; ++i) {
    var fillColor = 254 * i / numSectors;
    var rotationAngle = sectorSize * i;
    var stalkDeltaX = p5.cos(rotationAngle) * stalkRadius;
    var stalkDeltaY = p5.sin(rotationAngle) * stalkRadius;
    stalk(centerX + stalkDeltaX,
          centerY + stalkDeltaY,
          arrowWidth,
          arrowHeight,
          stalkWidth,
          stalkHeight,
          rotationAngle + sectorSize,
          fillColor,
          bgColor);
  }
}

p5.windowResized = function() {
  p5.resizeCanvas(p5.windowWidth - 70, 400);
};

p5.setup = function() {
  stalk = window.stalk.bind(this, p5);
  p5.createCanvas(100, 100);
  p5.windowResized();
  p5.background('aliceblue');
  p5.noStroke();
};

p5.draw = function() {
  drawQ();
  p5.fill(0);
  p5.image(ksimImage, 10, 0, 100, 100);
  p5.text('KSIM', 30, 100);
  p5.image(sirImage, p5.width - 150, 0, 100, 100);
  p5.text('ŜIR', p5.width - 100, 100);
  p5.frameRate(1);
};
```



#### InfoClay Logo

```p5js/playable/autoplay

const bgColor = 'aliceblue';
var stalk = null;

function drawQ() {
  var centerX = p5.width / 2;
  var centerY = p5.height / 2;
  var stalkRadius = 100;
  var stalkDiameter = 2 * stalkRadius;
  var circleDiameter = stalkDiameter + 45;
  p5.push();
  p5.strokeWeight(8);
  p5.stroke('yellowgreen');
  p5.fill('aliceblue');
  p5.ellipse(centerX, centerY, circleDiameter, circleDiameter);
  p5.pop();
  p5.fill('royalblue');
  p5.textFont('asap');
  p5.textSize(120);
  p5.text('IC', centerX - 55, centerY + 45);
  var arrowWidth = 45;
  var arrowHeight = 25;
  var stalkWidth = 10;
  var stalkHeight = 35;
  var numSectors = 8;
  var sectorSize = p5.TWO_PI / numSectors;

  for (var i = 0; i < numSectors; ++i) {
    var fillColor = 254 * (i + 1) / numSectors;
    var rotationAngle = sectorSize * i;
    var stalkDeltaX = p5.cos(rotationAngle) * stalkRadius;
    var stalkDeltaY = p5.sin(rotationAngle) * stalkRadius;
    stalk(centerX + stalkDeltaX,
          centerY + stalkDeltaY,
          arrowWidth,
          arrowHeight,
          stalkWidth,
          stalkHeight,
          rotationAngle + sectorSize,
          fillColor,
          bgColor);
  }
}


p5.windowResized = function() {
  // p5.resizeCanvas(p5.windowWidth - 70, 300);
};

p5.setup = function() {
  stalk = window.stalk.bind(this, p5);

  p5.createCanvas(700, 700);
  p5.windowResized();

  p5.noStroke();
};

p5.draw = function() {
  p5.background('aliceblue');
  drawQ();
  p5.fill(0);
  p5.frameRate(1);
};
```


#### Quantum Clay Logo


```p5js/playable/autoplay
var stalk = null;

var bgColor = 'aliceblue';

function drawRing(sectorSkew, numSectors, centerX, centerY, qMode, cMode) {
  var stalkRadius = 100;
  var stalkDiameter = 2 * stalkRadius;

  var arrowHeight = 70;
  var arrowWidth = 115;
  var stalkWidth = 15;
  var stalkHeight = 15;
  var stalkStagger = 0;
  var sectorSize = p5.TWO_PI / numSectors;

  for (var i = 0; i < numSectors; ++i) {
    var fillColor = (254 * (i + 1) / numSectors) % 254;
    fillColor = p5.color(
                      120,
                      50 + 200 * ((i + 0) % numSectors) / numSectors,
                      200 + 50 * ((i + 0) % numSectors) / numSectors);
    var rotationAngle = sectorSize * i + sectorSkew;
    var stalkDeltaX = p5.cos(p5.HALF_PI + rotationAngle) * stalkRadius;
    var stalkDeltaY = p5.sin(p5.HALF_PI + rotationAngle) * stalkRadius;
    var stalkWidthOverride = stalkWidth;
    var stalkHeightOverride = stalkHeight;
    if (qMode && (i === (numSectors - 1))) {
      stalkWidthOverride = 4 * stalkWidth;
      stalkHeightOverride = 1.0 * arrowHeight;
    }
    if (cMode && (i === 2)) {
      // stalkWidthOverride = 2 * stalkWidth;
      // stalkHeightOverride = 2 * arrowHeight;
    }
    if (cMode && ((i > 4) && (i < 6))) {
      continue;
    }
    stalk(centerX + stalkDeltaX,
          centerY + stalkDeltaY,
          arrowWidth,
          arrowHeight,
          stalkWidthOverride,
          stalkHeightOverride,
          rotationAngle,
          fillColor,
          bgColor);
  }
}

function drawQ() {
  drawRing(0, 6, p5.width * 0.3, p5.height * 0.375, true, false);
}

function drawC() {
  var skew = -0.165 * p5.PI;
  drawRing(skew, 6, p5.width * 0.748, p5.height * 0.635, false, true);
}

function drawBox() {
  var margin = 1;
  var arrowWidth = 60;
  var arrowHeight = arrowWidth / 2;
  var stalkWidth = 10;
  var fillColor = 'royalblue';
  // p5.background('lightyellow');
  // p5.fill('orange');
  // p5.stroke('green');

  stalk(margin + arrowWidth / 2,
        p5.height - (margin + arrowWidth / 2),
        2 * arrowWidth,
        arrowHeight,
        stalkWidth,
        p5.height * 0.4 - 2 * (margin + arrowWidth),
        p5.PI,
        fillColor,
        bgColor);
  stalk(p5.width - (margin + arrowWidth / 2),
        margin + arrowWidth / 2,
        2 * arrowWidth,
        arrowHeight,
        stalkWidth,
        p5.height * 0.4 - 2 * (margin + arrowWidth),
        0,
        fillColor,
        bgColor);
  stalk(p5.width * 0.4 + margin + arrowWidth / 2,
        margin + arrowWidth / 2,
        2 * arrowWidth,
        arrowHeight,
        stalkWidth,
        p5.width * 0.6 - 2 * (margin + arrowWidth),
        p5.PI + p5.HALF_PI,
        fillColor,
        bgColor);
  stalk(p5.width * 0.6 - (margin + arrowWidth / 2),
        p5.height - (margin + arrowWidth / 2),
        2 * arrowWidth,
        arrowHeight,
        stalkWidth,
        p5.width * 0.6 - 2 * (margin + arrowWidth),
        p5.HALF_PI,
        fillColor,
        bgColor);
}

p5.setup = function() {
  stalk = window.stalk.bind(this, p5);

  p5.createCanvas(700, 700);
  p5.background(bgColor);
  p5.noStroke();
};

p5.draw = function() {
  drawQ();
  drawC();
  drawBox();
  p5.noFill();
  //p5.stroke('magenta');
  //p5.rect(0, 0, 700, 700);

  p5.frameRate(1);
};
```

---

[Back to Home](:@Home)

