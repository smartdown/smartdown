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

#### An Example

This demo inspired by the example at [OpenJSCAD.org/packages/utils/regl-renderer/demo.html](https://github.com/jscad/OpenJSCAD.org/blob/master/packages/utils/regl-renderer/demo.html).

```openjscad/playable/autoplay
const { booleans, colors, primitives } = require('@jscad/modeling');

const { intersect, subtract } = booleans;
const { colorize } = colors;
const { cube, cuboid, line, sphere, star } = primitives;

const main = () => {
  const logo = [
    colorize([1.0, 0.4, 1.0], subtract(
      cube({ size: 300 }),
      sphere({ radius: 200 })
    )),
    colorize([1.0, 1.0, 0], intersect(
      sphere({ radius: 130 }),
      cube({ size: 210 })
    ))
  ]

  const transpCube = colorize([1, 0, 0, 0.75], cuboid({ size: [100, 100, 210 + (200)] }))
  const star2D = star({ vertices: 8, innerRadius: 300, outerRadius: 400 })
  const line2D = colorize([1.0, 0, 0], line([[260, 260], [-260, 260], [-260, -260], [260, -260], [260, 260]]))
  // some colors are intentionally without alpfa channel to test geom2ToGeometries will add alpha channel
  const colorChange = [
    [1, 0, 0, 1],
    [1, 0.5, 0],
    [1, 0, 1],
    [0, 1, 0],
    [0, 0, 0.7]
  ]
  star2D.sides.forEach((side, i) => {
    if (i >= 2) side.color = colorChange[i % colorChange.length]
  })

  return [transpCube, star2D, line2D, ...logo]
};

module.exports = {main};
```

#### Color and Transparency Example

This examples shows some of the color and transparency potential. Based upon [transparency.js](https://github.com/jscad/OpenJSCAD.org/blob/master/packages/examples/core/colors/transparency.js)


```openjscad/playable/autoplay

/**
 * Transparency
 * @category Colors
 * @skillLevel 2
 * @description showing transparent objects
 * @tags colors, transparency, hsltorgb
 * @authors Rene K. Mueller, Moissette Mark, Simon Clark
 * @licence MIT License
 */

const { colorize, hslToRgb, colorNameToRgb } = require('@jscad/modeling').colors
const { cuboid, cylinder } = require('@jscad/modeling').primitives
const { translate } = require('@jscad/modeling').transforms

const main = () => {
  const shapes = []
  for (let i = 7; i >= 0; i--) {
    // reverse order for seeing through all cylinders (see http://www.opengl.org/wiki/Transparency_Sorting)
    const shapeColor = hslToRgb(i / 8, 1, 0.5, (i + 1) / 8) // hslToRGB can accept a transparency value as well.
    shapes.push(
      colorize(shapeColor, translate([(i - 3) * 7.5, 0, 0], cylinder({ radius: 3, height: 20 })))
    )
  }
  shapes.push(
    colorize(colorNameToRgb('red'), translate([-4, -10, 0], cuboid({ size: [5, 5, 5] })))
  )
  shapes.push(
    colorize([1, 0, 0, 0.5], translate([4, -10, 0], cuboid({ size: [5, 5, 5] })))
  )
  return shapes
}

module.exports = { main }
```


#### Parametrized Gear Example

This example illustrates a parameterizable model of a gear. OpenJSCAD provides a mechanism to allow the author to specify that certain *parameters* can be controlled by the user. This is based upon the original at [gear.jscad](https://github.com/jscad/OpenJSCAD.org/blob/4f811a27c0cbb7caabf28fcef932cbaf19aaa6f4/packages/examples/parameters/gear.js).

##### TBD: Design Parameters UI

The actual display of the design parameters UI is currently not implemented in Smartdown. Version 1 of OpenJSCAD provided a reusable `Processor` class that handled the rendering of the parameters, but in Version 2, this is no longer an exposed functionality and we will need to *roll our own* version by adapting the [OpenJSCAD Web UI](https://github.com/jscad/OpenJSCAD.org/blob/4f811a27c0cbb7caabf28fcef932cbaf19aaa6f4/packages/web/src/ui/views/designParameters.js).

In the meantime, the `.name` and `.initial` values from `getParameterDefinitions()` are used to populate the parameters passed to `main()`.


```openjscad/playable/autoplay
/**
 * Parametric Involute Gear
 * @category Parameters
 * @skillLevel 1
 * @description Build a proper involute gear, demonstrating parameters, and how they can be used in complex math.
 * @tags gear, tangent, parameter, parameters
 * @authors Joost Nieuwenhuijse, Simon Clark
 * @licence MIT License
 */

const jscad = require('@jscad/modeling')
const { cylinder, polygon } = jscad.primitives
const { rotateZ, translateZ } = jscad.transforms
const { extrudeLinear } = jscad.extrusions
const { union, subtract } = jscad.booleans
const { vec2 } = jscad.maths
const { degToRad } = jscad.utils

// Here we define the user editable parameters:
const getParameterDefinitions = () => [
  { name: 'numTeeth', caption: 'Number of teeth:', type: 'int', initial: 10, min: 5, max: 20, step: 1 },
  { name: 'circularPitch', caption: 'Circular pitch:', type: 'float', initial: 5 },
  { name: 'pressureAngle', caption: 'Pressure angle:', type: 'float', initial: 20 },
  { name: 'clearance', caption: 'Clearance:', type: 'float', initial: 0.0, step: 0.1 },
  { name: 'thickness', caption: 'Thickness:', type: 'float', initial: 5 },
  { name: 'centerholeradius', caption: 'Radius of center hole (0 for no hole):', type: 'float', initial: 2 }
]

// Main entry point; here we construct our solid:
const main = (params) => {
  let gear = involuteGear(
    params.numTeeth,
    params.circularPitch,
    degToRad(params.pressureAngle),
    params.clearance,
    params.thickness
  )
  if (params.centerholeradius > 0) {
    const centerHole = translateZ(params.thickness / 2, cylinder({ height: params.thickness, radius: params.centerholeradius, segments: 16 }))
    gear = subtract(gear, centerHole)
  }
  return gear
}

const createSingleToothPolygon = (maxAngle, baseRadius, angularToothWidthAtBase) => {
  // build a single 2d tooth in the 'points' array
  // A single tooth is a polygon from the origin out.
  // the points on the involute curve are made by adding a series of radial lines to tangents of increasing length.
  const toothCurveResolution = 5
  const points = [[0, 0]]
  for (let i = 0; i <= toothCurveResolution; i++) {
    // first side of the tooth:
    const angle = maxAngle * Math.pow(i / toothCurveResolution, 2 / 3)
    const tanLength = angle * baseRadius
    let radiantVector = vec2.fromAngleRadians(vec2.create(), angle)
    let tangentVector = vec2.scale(vec2.create(), vec2.normal(vec2.create(), radiantVector), -tanLength)
    radiantVector = vec2.scale(vec2.create(), radiantVector, baseRadius)
    points[i + 1] = [radiantVector[0] + tangentVector[0], radiantVector[1] + tangentVector[1]]

    // opposite side of the tooth:
    radiantVector = vec2.fromAngleRadians(vec2.create(), angularToothWidthAtBase - angle)
    tangentVector = vec2.scale(vec2.create(), vec2.normal(vec2.create(), radiantVector), tanLength)
    radiantVector = vec2.scale(vec2.create(), radiantVector, baseRadius)
    points[(2 * toothCurveResolution) + 2 - i] = [radiantVector[0] + tangentVector[0], radiantVector[1] + tangentVector[1]]
  }
  return polygon({ points, closed: true })
}

const createBaseCirclePolygon = (numTeeth, angularToothWidthAtBase, rootRadius) => {
  const points = []
  const toothAngle = 2 * Math.PI / numTeeth
  const toothCenterAngle = 0.5 * angularToothWidthAtBase
  for (let k = 0; k < numTeeth; k++) {
    const currentAngle = toothCenterAngle + k * toothAngle
    const p1 = vec2.scale(vec2.create(), vec2.fromAngleRadians(vec2.create(), currentAngle), rootRadius)
    points.push([p1[0], p1[1]])
  }
  return polygon({ points, closed: true })
}

const joinGearTeeth = (numTeeth, tooth3d) => {
  const allTeeth = []
  for (let j = 0; j < numTeeth; j++) {
    const currentToothAngle = j * 2 * Math.PI / numTeeth
    const rotatedTooth = rotateZ(currentToothAngle, tooth3d)
    allTeeth.push(rotatedTooth)
  }
  return allTeeth
}

/*
  For gear terminology see:
    http://www.astronomiainumbria.org/advanced_internet_files/meccanica/easyweb.easynet.co.uk/_chrish/geardata.htm
  Algorithm based on:
    http://www.cartertools.com/involute.html
*/
const involuteGear = (numTeeth, circularPitch, pressureAngle, clearance, thickness) => {
  const addendum = circularPitch / Math.PI
  const dedendum = addendum + clearance

  // radii of the 4 circles:
  const pitchRadius = numTeeth * circularPitch / (2 * Math.PI)
  const baseRadius = pitchRadius * Math.cos(pressureAngle)
  const outerRadius = pitchRadius + addendum
  const rootRadius = pitchRadius - dedendum

  const maxTanLength = Math.sqrt(outerRadius * outerRadius - baseRadius * baseRadius)
  const maxAngle = maxTanLength / baseRadius

  const tlAtPitchCircle = Math.sqrt(pitchRadius * pitchRadius - baseRadius * baseRadius)
  const angleAtPitchCircle = tlAtPitchCircle / baseRadius
  const diffAngle = angleAtPitchCircle - Math.atan(angleAtPitchCircle)
  const angularToothWidthAtBase = (Math.PI / numTeeth) + (2 * diffAngle)

  // create the polygon for a single tooth.
  const singleTooth2D = createSingleToothPolygon(maxAngle, baseRadius, angularToothWidthAtBase)
  // extrude into 3D:
  const singleTooth3D = extrudeLinear({ height: thickness }, singleTooth2D)
  const allTeeth = joinGearTeeth(numTeeth, singleTooth3D)

  // build the root circle:
  const rootCircle2D = createBaseCirclePolygon(numTeeth, angularToothWidthAtBase, rootRadius)
  // extrude into 3D:
  const rootcircle = extrudeLinear({ height: thickness }, rootCircle2D)

  return union(rootcircle, allTeeth)
}

module.exports = { main, getParameterDefinitions }
```


#### Text Example

Based upon [text.jscad](https://github.com/jscad/OpenJSCAD.org/blob/master/packages/examples/text.jscad), this example illustrates OpenJSCAD's parameter mechanism, and also the ability to render 3D text.

##### TBD: Design Parameters UI Not Implemented

See [note](##tbd-design-parameters-ui) above.


```openjscad/playable/autoplay
/**
 * Basic Text Creation
 * @category Creating Shapes
 * @skillLevel 10
 * @description Demonstrating methods of building 3D text
 * @tags text, font, characters
 * @authors Simon Clark
 * @licence MIT License
 */

const jscad = require('@jscad/modeling')
const { union } = jscad.booleans
const { extrudeLinear } = jscad.extrusions
const { hullChain } = jscad.hulls
const { circle, sphere } = jscad.primitives
const { vectorText } = jscad.text
const { translate } = jscad.transforms

const getParameterDefinitions = () => {
  return [
    { name: 'outline_string', initial: 'Outline', type: 'text', caption: 'Outline Text', size: 30 },
    { name: 'flat_string', initial: 'Flat', type: 'text', caption: 'Flat Text', size: 30 },
    { name: 'round_string', initial: 'Round', type: 'text', caption: 'Round Text', size: 30 }
  ]
}

const main = (params) => {
  const outlineText = buildOutlineText(params.outline_string, 2)
  const flatText = buildFlatText(params.flat_string, 2, 2)
  const roundText = buildRoundText(params.round_string, 2)

  return [outlineText, flatText, roundText]
}

// Build text by creating the font strokes (2D).
const buildOutlineText = (message, characterLineWidth) => {
  if (message === undefined || message.length === 0) return []

  const lineRadius = characterLineWidth / 2
  const lineCorner = circle({ radius: lineRadius })

  const lineSegments3D = []
  const lineSegmentPointArrays = vectorText({ x: 0, y: 0, input: message }) // line segments for each character

  const lineSegments = []
  lineSegmentPointArrays.forEach((segmentPoints) => { // process the line segment
    const corners = segmentPoints.map((point) => translate(point, lineCorner))
    lineSegments.push(hullChain(corners))
  })
  const message2D = union(lineSegments)
  return translate([0, 35, 0], message2D)
}

// Build text by creating the font strokes (2D), then extruding up (3D).
const buildFlatText = (message, extrusionHeight, characterLineWidth) => {
  if (message === undefined || message.length === 0) return []

  const lineRadius = characterLineWidth / 2
  const lineCorner = circle({ radius: lineRadius })

  const lineSegmentPointArrays = vectorText({ x: 0, y: 0, input: message }) // line segments for each character
  const lineSegments = []
  lineSegmentPointArrays.forEach((segmentPoints) => { // process the line segment
    const corners = segmentPoints.map((point) => translate(point, lineCorner))
    lineSegments.push(hullChain(corners))
  })
  const message2D = union(lineSegments)
  const message3D = extrudeLinear({ height: extrusionHeight }, message2D)
  return translate([0, 0, 0], message3D)
}

// Build text by creating the font strokes (3D).
const buildRoundText = (message, p) => {
  if (message === undefined || message.length === 0) return []

  const lineRadius = p / 2
  const lineCorner = sphere({ radius: lineRadius, center: [0, 0, lineRadius], segments: 16 })

  const lineSegmentPointArrays = vectorText({ x: 0, y: 0, input: message }) // line segments for each character
  const lineSegments = []
  lineSegmentPointArrays.forEach((segmentPoints) => { // process the line segment
    const corners = segmentPoints.map((point) => translate(point, lineCorner))
    lineSegments.push(hullChain(corners))
  })
  const message3D = union(lineSegments)
  return translate([0, -35, 0], message3D)
}

module.exports = { main, getParameterDefinitions }

```


#### Importing STL Designs

The following example demonstrates how external files, such as [STL](), can be imported and integrated into an OpenJSCAD design. For this example, we incorporate a binary STL file [frog-OwenCollins.stl](https://github.com/ergogen/oldjscad/blob/master/examples/frog-OwenCollins.stl) into a design that also includes a translucent cube; a Frog-in-a-Box, if you will.

```javascript /openjscad/playable/autoplay
const { deserializer, extension } = require('@jscad/stl-deserializer');

const { booleans, colors, primitives } = require('@jscad/modeling');
const { intersect, subtract } = booleans;
const { colorize } = colors;
const { cube, cuboid, line, sphere, star } = primitives;

const main = async () => {
  const logo = [
    colorize([1.0, 0.4, 1.0], subtract(
      cube({ size: 300 }),
      sphere({ radius: 200 })
    )),
    colorize([1.0, 1.0, 0], intersect(
      sphere({ radius: 130 }),
      cube({ size: 210 })
    ))
  ]

  const transpCube = colorize([0, 1, 1, 0.25], cuboid({ size: [50, 50, 50] }))
  // some colors are intentionally without alpfa channel to test geom2ToGeometries will add alpha channel

  const rawData = await fetch('/gallery/resources/frog-OwenCollins.stl');
  const rawDataArrayBuffer = await rawData.arrayBuffer();
  const stlGeometry = deserializer.deserialize({output: 'geometry', filename: 'file.stl'}, rawDataArrayBuffer);

  return [stlGeometry, transpCube];
};

module.exports = {main};
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
const jscad = require('@jscad/modeling');
const { union } = jscad.booleans
const { hullChain } = jscad.hulls
const { sphere } = jscad.primitives
const { vectorText } = jscad.text
const { translate } = jscad.transforms

function main () {
  var o = [];

  const lineRadius = 3;
  const lineCorner = sphere({ radius: lineRadius, center: [0, 0, lineRadius], segments: 16 })

  const lineSegmentPointArrays = vectorText({ x: 0, y: 0, input: '${env.Text}' }) // line segments for each character
  const lineSegments = []
  lineSegmentPointArrays.forEach((segmentPoints) => { // process the line segment
    const corners = segmentPoints.map((point) => translate(point, lineCorner))
    lineSegments.push(hullChain(corners))
  })
  const message3D = union(lineSegments)
  o.push(translate([0, -35, 0], message3D));

  return o;
}

module.exports = { main }
`;

  smartdown.setVariable('ojsOutput', ojsScript, 'openjscad');
};

```

[](:!ojsOutput|openjscad)


---

The source for this page is visible at the Smartdown Gallery at [OpenJSCAD](/gallery/OpenJSCAD.md).

---

[Back to Home](:@Home)

