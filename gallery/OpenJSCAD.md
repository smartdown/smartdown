### OpenJSCAD Examples

Smartdown recently added an integration with [OpenJSCAD](https://www.openjscad.org), which is an open source library that enables an easy-to-understand OpenJSCAD *program* to be compiled into an interactive 3D model. This is very *bleeding edge* and there are likely going to be some bugs, especially if Dynamic Generation (experimental) is being used.

Smartdown supports OpenJSCAD diagrams as playables, by using the syntax:

````markdown
```openjscad/playable/autoplay
  // OpenJSCAD script here
```
````

Smartdown also supports the use of `openjscad` as an output cell filter, enabling a cell to display a rendered Smartdown variable containing an OpenJSCAD script (see Dynamic Generation at the end of this document).

#### About OpenJSCAD

In order to get the OpenJSCAD UMD library to support multiple diagrams on a web page, I needed to make a few minor fixes to the OpenJSCAD UMD Library. See my fork at [doctorbud/OpenJSCAD.org](https://github.com/DoctorBud/OpenJSCAD.org/tree/reentracy-fixes-for-umd) for the relevant changes.


#### Color and Transparency Example

This examples shows some of the color and transparency potential. Based upon [transparency.jscad](https://github.com/jscad/OpenJSCAD.org/blob/master/packages/examples/transparency.jscad)

```openjscad/playable/autoplay
// title      : Transparency
// author     : Rene K. Mueller
// license    : MIT License
// description: showing transparent objects
// file       : transparency.jscad

function main () {
  var o = [];
  for (var i = 7; i >= 0; i--) { // reverse order for seeing through all cylinders (see https://www.opengl.org/wiki/Transparency_Sorting)
    // hsl to rgb, creating rainbow [r,g,b]
    o.push(
      cylinder({r: 3, h: 20}).setColor(
        hsl2rgb(i / 8, 1, 0.5).concat(1 / 8 + i / 8) // and add to alpha to make it [r,g,b,a]
      ).translate([(i - 3) * 7.5, 0, 0])
    );
  }
  o.push(color('red', cube(5)).translate([-4, -10, 0]));
  o.push(color('red', 0.5, cube(5)).translate([4, -10, 0]));
  return o;
}
```


#### Gear Example

This example illustrates a parameterizable model of a gear. OpenJSCAD provides a mechanism to allow the author to specify that certain *parameters* can be controlled by the user. This is based upon the original at [gear.jscad](https://github.com/jscad/OpenJSCAD.org/blob/master/packages/examples/gear.jscad).

```openjscad/playable/autoplay

// title      : Gear
// author     : Joost Nieuwenhuijse
// license    : MIT License
// description: a simple gear
// file       : gear.jscad

// Here we define the user editable parameters:
function getParameterDefinitions () {
  return [
    { name: 'numTeeth', caption: 'Number of teeth:', type: 'int', initial: 10, min: 5, max: 20, step: 1 },
    { name: 'circularPitch', caption: 'Circular pitch:', type: 'float', initial: 5 },
    { name: 'pressureAngle', caption: 'Pressure angle:', type: 'float', initial: 20 },
    { name: 'clearance', caption: 'Clearance:', type: 'float', initial: 0.0, step: 0.1 },
    { name: 'thickness', caption: 'Thickness:', type: 'float', initial: 5 },
    { name: 'centerholeradius', caption: 'Radius of center hole (0 for no hole):', type: 'float', initial: 2 }
  ];
}

// Main entry point; here we construct our solid:
function main (params) {
  var gear = involuteGear(
    params.numTeeth,
    params.circularPitch,
    params.pressureAngle,
    params.clearance,
    params.thickness
  );
  if (params.centerholeradius > 0) {
    var centerhole = CSG.cylinder({start: [0, 0, -params.thickness], end: [0, 0, params.thickness], radius: params.centerholeradius, resolution: 16});
    gear = gear.subtract(centerhole);
  }
  return gear;
}

/*
  For gear terminology see:
    https://www.astronomiainumbria.org/advanced_internet_files/meccanica/easyweb.easynet.co.uk/_chrish/geardata.htm
  Algorithm based on:
    https://www.cartertools.com/involute.html

  circularPitch: The distance between adjacent teeth measured at the pitch circle
*/
function involuteGear (numTeeth, circularPitch, pressureAngle, clearance, thickness) {
  // default values:
  if (arguments.length < 3) pressureAngle = 20;
  if (arguments.length < 4) clearance = 0;
  if (arguments.length < 4) thickness = 1;

  var addendum = circularPitch / Math.PI;
  var dedendum = addendum + clearance;

  // radiuses of the 4 circles:
  var pitchRadius = numTeeth * circularPitch / (2 * Math.PI);
  var baseRadius = pitchRadius * Math.cos(Math.PI * pressureAngle / 180);
  var outerRadius = pitchRadius + addendum;
  var rootRadius = pitchRadius - dedendum;

  var maxtanlength = Math.sqrt(outerRadius * outerRadius - baseRadius * baseRadius);
  var maxangle = maxtanlength / baseRadius;

  var tlAtPitchCircle = Math.sqrt(pitchRadius * pitchRadius - baseRadius * baseRadius);
  var angleAtPitchCircle = tlAtPitchCircle / baseRadius;
  var diffangle = angleAtPitchCircle - Math.atan(angleAtPitchCircle);
  var angularToothWidthAtBase = Math.PI / numTeeth + 2 * diffangle;

  // build a single 2d tooth in the 'points' array:
  var resolution = 5;
  var points = [new CSG.Vector2D(0, 0)];
  for (var i = 0; i <= resolution; i++) {
    // first side of the tooth:
    var angle = maxangle * i / resolution;
    var tanlength = angle * baseRadius;
    var radvector = CSG.Vector2D.fromAngle(angle);
    var tanvector = radvector.normal();
    var p = radvector.times(baseRadius).plus(tanvector.times(tanlength));
    points[i + 1] = p;

    // opposite side of the tooth:
    radvector = CSG.Vector2D.fromAngle(angularToothWidthAtBase - angle);
    tanvector = radvector.normal().negated();
    p = radvector.times(baseRadius).plus(tanvector.times(tanlength));
    points[2 * resolution + 2 - i] = p;
  }

  // create the polygon and extrude into 3D:
  var tooth3d = new CSG.Polygon2D(points).extrude({offset: [0, 0, thickness]});

  var allteeth = new CSG();
  for (var j = 0; j < numTeeth; j++) {
    var ang = j * 360 / numTeeth;
    var rotatedtooth = tooth3d.rotateZ(ang);
    allteeth = allteeth.unionForNonIntersecting(rotatedtooth);
  }

  // build the root circle:
  points = [];
  var toothAngle = 2 * Math.PI / numTeeth;
  var toothCenterAngle = 0.5 * angularToothWidthAtBase;
  for (var k = 0; k < numTeeth; k++) {
    var angl = toothCenterAngle + k * toothAngle;
    var p1 = CSG.Vector2D.fromAngle(angl).times(rootRadius);
    points.push(p1);
  }

  // create the polygon and extrude into 3D:
  var rootcircle = new CSG.Polygon2D(points).extrude({offset: [0, 0, thickness]});

  var result = rootcircle.union(allteeth);

  // center at origin:
  result = result.translate([0, 0, -thickness / 2]);

  return result;
}

```


#### Text Example

Based upon [text.jscad](https://github.com/jscad/OpenJSCAD.org/blob/master/packages/examples/text.jscad), this example illustrates OpenJSCAD's parameter mechanism, and also the ability to render 3D text.

```openjscad/playable/autoplay

// title      : Vector Text Rendering
// author     : Rene K. Mueller
// license    : MIT License
// description: playing with vector font
// date       : 2013/04/22
// file       : text.jscad

function getParameterDefinitions () {
  return [
    { name: 's', initial: 'Hello World!', type: 'text', caption: 'Text to render', size: 30 },
    { name: 'c', initial: 'A', type: 'text', caption: 'Char to render', size: 2 }
  ];
}

function main (param) {
  var o = [];

  var l = vector_text(0, 0, param.s); // get line segments [ [ [x1,y1], [x2,y2] ...], [ ]... ]

  l.forEach(function (s) { // process the line segments
    o.push(rectangular_extrude(s, {w: 2, h: 2}));
  });

  if (param.c.length) {
    var c = vector_char(0, 0, param.c); // get data for one character
    var a = c.segments;
    for (var i = 0; i < 5; i++) {
      var p = [];
      a.forEach(function (s) {
        p.push(circularExtrude(s, {r: i / 2 + 1, fn: 8})); // variable thickness
      });
      o.push(union(p).setColor(hsl2rgb(i / 5, 1, 0.5)).translate([i * (c.width + i / 2), 30, 0]));
    }
  }
  return union(o).scale(0.5).translate([-50, 0, 0]);
}

// -- simplistic circularExtrude done with cylinders + spheres

function circularExtrude (s, p) {
  var o = [];
  var r = 1; fn = 16; rot = 0;
  if (p) {
    if (p.r) r = p.r;
    if (p.fn) fn = p.fn;
    if (p.rot !== undefined) rot = p.rot;
  }
  for (var i = 0; i < s.length - 1; i++) {
    var p1 = s[i].concat(0);
    var p2 = s[i + 1].concat(0);
    o.push(cylinder({start: p1, end: p2, r: r, fn: fn}));
    o.push(sphere({center: true, r: r, fn: fn}).translate(p1));
    if (i === s.length - 2) {
      o.push(sphere({center: true, r: r, fn: fn}).translate(p2));
    }
  }
  return union(o);
}
```

#### Name Plate Example

From the [name_plate.jscad](https://github.com/jscad/OpenJSCAD.org/blob/master/packages/examples/name_plate.jscad) example.

```openjscad/playable/autoplay

// title      : Name Plate
// author     : Rene K. Mueller
// license    : MIT License
// description: create your own name plate
// date       : 2013/04/24
// file       : name_plate.jscad

function getParameterDefinitions () {
  return [
    {name: 'name', initial: 'Joe Example', type: 'text', caption: 'Your name', size: 30},
    {name: 'title', initial: '3D Printer Developer', type: 'text', caption: 'Your title', size: 30},
    {name: 'thickness', initial: 3, type: 'float', caption: 'Thickness'}
  ];
}

function main (param) {
  var o = []; // our stack of objects
  var l = []; // our stack of line segments (when rendering vector text)
  var p = []; // our stack of extruded line segments

  // -- render name & extrude
  l = vector_text(0, 0, param.name);
  l.forEach(function (s) {
    p.push(rectangular_extrude(s, {w: param.thickness, h: param.thickness}));
  });
  o.push(union(p).setColor([1, 1, 0]).scale([1 / 3, 1 / 3, 1 / 3]).center([true, true, false]).translate([0, 0, param.thickness]));

  if (param.title.length) {
    // -- render title & extrude
    l = vector_text(0, 0, param.title);
    p = [];
    l.forEach(function (s) {
      p.push(rectangular_extrude(s, {w: param.thickness, h: param.thickness}));
    });
    o.push(union(p).setColor([1, 1, 0]).scale([1 / 8, 1 / 8, 1 / 3]).center([true, true, false]).translate([0, -8, param.thickness]));
  }
  o = [union(o)]; // neat: we combine name + title, and make it first entry of an array

  var b = o[0].getBounds();
  var m = 2;
  var w = b[1].x - b[0].x + m * 2;
  var h = b[1].y - b[0].y + m * 2;
  o.push(cube({size: [w, h, param.thickness], round: true, radius: 0.5}).translate([b[0].x - m, b[0].y - m, 0]));

  return union(o);
}

```


#### Dynamic Generation

One of Smartdown's powers (which hasn't been fully generalized yet) is the ability to generate Smartdown text that will be rendered and interpreted. This same power has been implemented for `Graphviz`, and just recently, for `openjscad`. So we can treat Smartdown, OpenJSCad, and Graphviz as *output formats* and have their contents rendered into an appropriate Smartdown cell.

So let's write a little playable that generates an OpenJSCAD script, and have that script rendered into a cell. To make it more fun, let's have the playable react to an ordinary Smartdown cell. In this case, we'll just have the cell generate some 3D text.

[Text](:?Text)

```javascript/playable/autoplay
this.dependOn = ['Text'];
this.depend = function() {
  const ojsScript =
`
function main () {
  var o = [];

  var l = vector_text(0, 0, '${env.Text}');

  l.forEach(function (s) { // process the line segments
    o.push(rectangular_extrude(s, {w: 4, h: 4}));
  });

  return union(o);  // .scale(0.5); // .translate([-50, 0, 0]);
}
`;

  smartdown.setVariable('ojsOutput', ojsScript, 'openjscad');
};

```

[](:!ojsOutput|openjscad)


#### Smartdown Logo via OpenJSCAD

I'd like to build a 3D model of the [Smartdown Logo](https://doctorbud.com/celestial-toys/post/2018-11-23-logo-version-2/#index):

![](/gallery/resources/logo.svg)


But so far I've only built a very rough starting point:


```openjscad/playable/autoplay

function main () {
  const height = 30.0;

  var sqrt3 = Math.sqrt(3);

  const v0 = {
          x: sqrt3 * height / 4.0,
          y: 0
        };
  const v1 = {
          x: sqrt3 * height / 2.0,
          y: height / 4.0
        };
  const v2 = {
          x: sqrt3 * height / 2.0,
          y: 3 * height / 4.0
        };
  const v3 = {
          x: sqrt3 * height / 4.0,
          y: height
        };
  const v4 = {
          x: 0,
          y: 3 * height / 4.0
        };
  const v5 = {
          x: 0,
          y: height / 4.0
        };

  const width = v1.x;
  const center = {
    x: (v1.x - v5.x) / 2.0,
    y: (v3.y - v0.y) / 2.0,
  };

  const hexagon = polyhedron({
    points: [
      [v0.x, v0.y, 5.0],
      [v1.x, v1.y, 5.0],
      [v2.x, v2.y, 5.0],
      [v3.x, v3.y, 5.0],
      [v4.x, v4.y, 5.0],
      [v5.x, v5.y, 5.0],
    ],
    triangles: [
      [1, 0, 5],
      [2, 1, 0],
      [3, 2, 1],
      [4, 3, 2],
      [5, 4, 3],
      [0, 5, 4],
      [5, 0, 1],
      [0, 1, 2],
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5],
      [4, 5, 0],
    ]
  }).setColor(css2rgb('chartreuse'));

  const pyramid = polyhedron({
    points: [ [5,5,0],[5,-5,0],[-5,-5,0],[-5,5,0], // the four points at base
              [0,0,10] ],                                  // the apex point
    triangles: [ [0,1,4],[1,2,4],[2,3,4],[3,0,4],          // each triangle side
                 [1,0,3],[2,1,3] ]                         // two triangles for square base
  }).setColor(css2rgb('tomato'));

  return union([pyramid, hexagon]);
}
```

---

The source for this page is visible at the Smartdown Gallery at [OpenJSCAD](/gallery/OpenJSCAD.md).

---

[Back to Home](:@Home)

