### Mandelbrot, ThreeJS, WebGL

**Requires WebGL be enabled in your browser.**

This is a one-pint demo of how ThreeJS and Smartdown can be used to understand the [Mandelbrot Set](https://en.wikipedia.org/wiki/Mandelbrot_set). Although Smartdown is not intended to be a programming language to build *apps* with, it is perfect for *Explorable Explanations* such as this Mandelbrot Explorer.

[Zoom Out](:=zoom=zoom/2.0) [Zoom In](:=zoom=zoom*2.0) [Up](:=posY=posY+0.1/zoom) [Down](:=posY=posY-0.1/zoom) [Left](:=posX=posX-0.1/zoom) [Right](:=posX=posX+0.1/zoom) **AutoZoom** [](:Xbounciness)

[Entire Set](:=posX=0.6;posY=0.0;zoom=1) [Region A](:=posX=0.570;posY=0.630;zoom=25) [Region B](:=posX=0.190;posY=0.650;zoom=50) [Region C](:=posX=0.04292602539062498;posY=0.6965332031250012;zoom=2048)
[Set X/Y/Zoom](:=useCoordinates=1) [](:?coordinates)

```javascript/playable/autoplay
//smartdown.import=three
var vertexShader =
`
precision highp float;
uniform float zoom;
varying vec2 pos;

void main () {
  pos = position.xy / zoom;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

var fragmentShader =
`
precision highp float;
uniform float zoom;
varying vec2 pos;
uniform float posX;
uniform float posY;

void main () {
  vec2 basePos = vec2(pos.x - posX, pos.y - posY);
  vec2 fractal = basePos;
  int iterations = 20 + int(zoom);

  for (int i = 0; i < 1000; i++) {
    if (i > iterations) {
      break;
    }
    fractal = basePos + vec2(
      fractal.x * fractal.x - fractal.y * fractal.y,
      2.0 * fractal.x * fractal.y
    );
  }

  // interpolate fractal color over position
  float x = abs(fractal.x);
  float y = abs(fractal.y);
  float z = (x + y);
  float magnitude = length(fractal);
  x = 2.0 * magnitude * x;
  y = 2.0 * magnitude * y;
  if (x > 1.0) {
    x = 1.0;
  }
  if (y > 1.0) {
    y = 1.0;
  }
  if (z > 1.0) {
    z = 1.0;
  }
  gl_FragColor = vec4(x, y, z, 1.0);
}
`;

var that = this;
var myDiv = that.div;
myDiv.style.background = 'darkslateblue';
myDiv.style['vertical-align'] = 'center';
myDiv.style['text-align'] = 'center';
myDiv.style['padding'] = '5px';
var width = 450.0;
var height = 350.0;

smartdown.setVariable('posX', 0.6, 'number');
smartdown.setVariable('posY', 0.0, 'number');
smartdown.setVariable('zoom', 0.666, 'number');
myDiv.innerHTML = '';
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75.0, width / height, 0.1, 1000.0);
camera.position.z = 1;

// create canvas
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
myDiv.appendChild(renderer.domElement);

// create mandelbrot mesh
var geometry = new THREE.PlaneGeometry(2.0, 2.0, 0.0);
var material = new THREE.ShaderMaterial({
  uniforms: {
      zoom: { type: 'f', value: env.zoom },
      posX: { type: 'f', value: env.posX },
      posY: { type: 'f', value: env.posY }
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader
});

var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

var zoomOld = null;
var posXOld = null;
var posYOld = null;
var bouncinessOld = null;
var coordinatesOld = null;

function render(delta) {
  var posX = env.posX;
  var posY = env.posY;
  var zoom = env.zoom;
  var bounciness = env.bounciness;
  var coordinates = env.coordinates;
  var coordinatesNew = `${posX}/${posY}/${zoom}`;
  var useCoordinates = env.useCoordinates;

  if (delta) {
    if (useCoordinates) {
      var coordinatesParts = coordinates.split('/');
      posX = Number(coordinatesParts[0]);
      posY = Number(coordinatesParts[1]);
      zoom = Number(coordinatesParts[2]);
      coordinatesNew = coordinates;
      env.useCoordinates = 0;
      env.posX = posX;
      env.posY = posY;
      env.zoom = zoom;
    }

    if (bounciness || bouncinessOld ||
        zoom !== zoomOld ||
        posX !== posXOld ||
        posY !== posYOld) {
      zoomOld = zoom;
      posXOld = posX;
      posYOld = posY;
      bouncinessOld = bounciness;
      coordinatesOld = coordinatesNew;
      smartdown.setVariable('coordinates', coordinatesNew);
      var bounce = bounciness ? (1.25 + Math.cos(delta / 2500)) : 1;
      mesh.material.uniforms.zoom.value = zoom * bounce;
      mesh.material.uniforms.posX.value = posX;
      mesh.material.uniforms.posY.value = posY;
      renderer.render(scene, camera);
    }
    requestAnimationFrame(render);
  }
  else {
    requestAnimationFrame(render);
  }
}

render();
```


*This is a draft. I want to add more prose and more parametrization.*


---

[Back to Home](:@Home)

