### Using JSXGraph in Smartdown

From the [JSXGraph](https://jsxgraph.uni-bayreuth.de/wp/index.html) home page:

> JSXGraph is a cross-browser JavaScript library for interactive geometry, function plotting, charting, and data visualization in the web browser.


##### A polygon

I started with this [JSXGraph Polygon](https://jsxgraph.uni-bayreuth.de/wiki/index.php/Polygon) example, and hacked it a bit to display angles, and to reflect the current angle values and their sum as Smartdown cells. This example is inspired by Mathigon's [Polygons](https://mathigon.org/course/polyhedra/polygons#angles) example.


[](:!angleA||red|pill)° + [](:!angleB||blue|pill)° + [](:!angleC||green|pill)° + [](:!angleD||orange|pill)° = [](:!angleSum||gold|pill)°


```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css


const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box1' class='jxgbox' style='width:600px; height:600px;'>`;

function toDegrees(angle) {
  return Math.round(180.0 * angle.Value() / Math.PI);
}

JXG.Options.text.fontSize = 16;

const board = JXG.JSXGraph.initBoard('box1', {boundingbox: [0, 0, 300, 300]});
var A = board.create('point',[40.5, 40.5], {name:'A',size:10,color:'black'});
var B = board.create('point',[260, 80], {name:'B',size:10,color:'black'});
var C = board.create('point',[240, 220], {name:'C',size:10,color:'black'});
var D = board.create('point',[80, 260], {name:'D',size:10,color:'black'});
var poly = board.create('polygon',[A,B,C,D],{color:'white'});

const angleA = board.create('angle', [B,A,D], {type:'sector', orthoType:'square', orthoSensitivity:0.5, radius:40,color:'red'});
console.log('angleA', angleA);
angleA.label.setText(function () {return toDegrees(angleA);});

const angleB = board.create('angle', [C,B,A], {type:'sector', orthoType:'square', orthoSensitivity:0.5, radius:40,color:'blue'});
angleB.label.setText(function () {return toDegrees(angleB);});

const angleC = board.create('angle', [D,C,B], {type:'sector', orthoType:'square', orthoSensitivity:0.5, radius:40,color:'green'});
angleC.label.setText(function () {return toDegrees(angleC);});

const angleD = board.create('angle', [A,D,C], {type:'sector', orthoType:'square', orthoSensitivity:0.5, radius:40,color:'orange'});
angleD.label.setText(function () {return toDegrees(angleD);});

function updateSmartdown(pt, ptName) {
  const angleADegrees =  toDegrees(angleA);
  const angleBDegrees =  toDegrees(angleB);
  const angleCDegrees =  toDegrees(angleC);
  const angleDDegrees =  toDegrees(angleD);

  smartdown.set({
    angleA: angleADegrees,
    angleB: angleBDegrees,
    angleC: angleCDegrees,
    angleD: angleDDegrees,
    angleSum: angleADegrees + angleBDegrees + angleCDegrees + angleDDegrees,
  });
}

A.on('drag', function() {updateSmartdown(A, 'A');});
B.on('drag', function() {updateSmartdown(B, 'B');});
C.on('drag', function() {updateSmartdown(C, 'C');});
D.on('drag', function() {updateSmartdown(D, 'D');});

updateSmartdown(A, 'A');

```



#### An L-system

I've adapted a [https://en.wikipedia.org/wiki/Sierpiński_curve](https://en.wikipedia.org/wiki/Sierpiński_curve) example from the JSXGraph Wiki at [Seirpinski Curve](http://jsxgraph.org/wiki/index.php/L-systems). I made the `level` parameter a Smartdown variable that can be adjusted via the slider below.

[Level](:-level/1/10/1) [](:!level)

```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css


const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box0' class='jxgbox' style='width:600px; height:600px;'>`;


var brd = JXG.JSXGraph.initBoard('box0', {boundingbox: [-300, 300, 300, -300]});
var turtle = brd.create('turtle');
var t = turtle;
var shrink = 1.0;


function expander(level,axiom,rules) {
  this.axiom = axiom;
  this.rules = rules;
  this.source = (level>1) ? new expander(level-1,axiom,rules) : (new function() {
    // Axiom:
    this.code = axiom;
    this.pos = 0;
    this.next = function() {
      if (this.pos>=this.code.length) return null;
      return this.code.charAt(this.pos++);
    }
  });

  this.code = '';
  this.pos = 0;
  this.next = function() {
    while (this.pos>=this.code.length) { // produce new symbols from source
      this.pos = 0;
      var pattern = this.source.next();
      if (!pattern) return null // Finished
      this.code = this.rules[pattern];
    }
    return this.code.charAt(this.pos++);
  }
}


function plotter(generator,symbols,len,angle,t,shrink) {
  for (var c; c=generator.next(); c) {
    switch(symbols[c]) {
      case 'F':
        t.fd(len);
        break;
      case 'f':
        t.penUp();
        t.fd(len);
        t.penDown();
        break;
      case '+':
        t.lt(angle);
        break;
      case '-':
        t.rt(angle);
        break;
      case '[':
        t.pushTurtle();
        len *= shrink;
        break;
      case ']':
        t.popTurtle();
        len /= shrink;
        break;
      default:
        ;
    }
  }
  return null;
}

smartdown.setVariable('level', 6);

this.dependOn = ['level'];
this.depend = function() {
  brd.suspendUpdate();
  turtle.cs();
  turtle.hideTurtle();

  var level = parseInt(env.level);
  var axiom = 'A';
  var rules = {
      'A':'B-A-B',
      'B':'A+B+A',
      '+' : '+',
      '-' : '-'
  };
  var symbols = { 'A':'F',
                  'B':'F',
                  '+':'+',
                  '-':'-',
                  '[':'[',
                  ']':']'
                };
  var angle = 60;
  var len = 500/Math.pow(2,level);
  turtle.setPos(-250*Math.pow(-1,level),-250);
  turtle.rt(90*Math.pow(-1,level));

  var generator = new expander(level,axiom,rules);
  plotter(generator,symbols,len,angle,t,shrink);
  brd.unsuspendUpdate();
};


```


---

[Back to Home](:@Home)
