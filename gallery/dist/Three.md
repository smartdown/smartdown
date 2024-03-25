### three.js Experiments

[threejs](https://threejs.org) is a JS library that is much more fine-grained than [p5.js](https://p5js.org). I thought I'd try it out. I suspect that older machines without WebGL capability will have trouble with some of the [examples](https://threejs.org/examples/).


#### Interactive Cubes

This example is adapted from [WebGL Interactive Cubes](https://threejs.org/examples/#webgl_interactive_cubes), although I'm still having difficulty with getting the mouseover to work properly due to coordinate system issues when the window is scrolled or resized. I eventually need to detect the coordinate system change and recalibrate the mouseover.

```javascript/playable
//smartdown.import=d3
//smartdown.import=three
var container = this.div;
container.style.margin = 'auto';
container.style.width = '250px';
container.style.height = '250px';
var bounds = container.getBoundingClientRect();

var camera, scene, raycaster, renderer;

var mouse = new THREE.Vector2(), INTERSECTED;
var radius = 100, theta = 0;

init();
animate();

function init() {

  camera = new THREE.PerspectiveCamera( 70, container.clientWidth / container.clientHeight, 1, 10000 );

  scene = new THREE.Scene();

  var light = new THREE.DirectionalLight( 0xffffff, 1 );
  light.position.set( 1, 1, 1 ).normalize();
  scene.add( light );

  var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );

  for ( var i = 0; i < 2000; i ++ ) {

    var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

    object.position.x = Math.random() * 800 - 400;
    object.position.y = Math.random() * 800 - 400;
    object.position.z = Math.random() * 800 - 400;

    object.rotation.x = Math.random() * 2 * Math.PI;
    object.rotation.y = Math.random() * 2 * Math.PI;
    object.rotation.z = Math.random() * 2 * Math.PI;

    object.scale.x = Math.random() + 0.5;
    object.scale.y = Math.random() + 0.5;
    object.scale.z = Math.random() + 0.5;

    scene.add( object );

  }

  raycaster = new THREE.Raycaster();

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0xf0f0f0 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( container.clientWidth, container.clientHeight );
  renderer.sortObjects = false;
  container.appendChild(renderer.domElement);

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
}


function onDocumentMouseMove( event ) {
  event.preventDefault();
  mouse.x = ( (event.clientX - bounds.left) / container.clientWidth ) * 2 - 1;
  mouse.y = - ( (event.clientY - bounds.top) / container.clientHeight ) * 2 + 1;
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {

  theta += 0.1;

  camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
  camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
  camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
  camera.lookAt( scene.position );

  camera.updateMatrixWorld();

  // find intersections

  raycaster.setFromCamera( mouse, camera );

  var intersects = raycaster.intersectObjects( scene.children );

  if ( intersects.length > 0 ) {

    if ( INTERSECTED != intersects[ 0 ].object ) {

      if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

      INTERSECTED = intersects[ 0 ].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      INTERSECTED.material.emissive.setHex( 0xff0000 );

    }

  }
  else {
    if (INTERSECTED) {
      INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
    }

    INTERSECTED = null;
  }
  renderer.render( scene, camera );
}
```


#### TopoJSON and ThreeJS

From https://bl.ocks.org/mbostock/2b85250396c17a79155302f91ec21224

```three/playable
//smartdown.import=d3
var width = 480,
    height = 480,
    radius = 114,
    mesh,
    graticule,
    scene = new THREE.Scene,
    camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000),
    renderer = new THREE.WebGLRenderer({alpha: true});

camera.position.z = 200;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
this.div.appendChild(renderer.domElement);

// console.log('d3', d3, d3.version);
const promise = d3.json('https://unpkg.com/world-atlas@1/world/50m.json');
promise.
  then(
    function(topology) {
      scene.add(graticule = wireframe(graticule10(), new THREE.LineBasicMaterial({color: 0xaaaaaa})));
      scene.add(mesh = wireframe(topojson.mesh(topology, topology.objects.land), new THREE.LineBasicMaterial({color: 0xff0000})));
      d3.timer(function(t) {
        graticule.rotation.x = mesh.rotation.x = Math.sin(t / 11000) * Math.PI / 3 - Math.PI / 2;
        graticule.rotation.z = mesh.rotation.z = t / 10000;
        renderer.render(scene, camera);
      });
    }
  )
  .catch(
    function(error) {
      console.log('error', error);
      throw error;
    }
  );

// Converts a point [longitude, latitude] in degrees to a THREE.Vector3.
function vertex(point) {
  var lambda = point[0] * Math.PI / 180,
      phi = point[1] * Math.PI / 180,
      cosPhi = Math.cos(phi);
  return new THREE.Vector3(
    radius * cosPhi * Math.cos(lambda),
    radius * cosPhi * Math.sin(lambda),
    radius * Math.sin(phi)
  );
}

// Converts a GeoJSON MultiLineString in spherical coordinates to a THREE.LineSegments.
function wireframe(multilinestring, material) {
  var geometry = new THREE.Geometry;
  multilinestring.coordinates.forEach(function(line) {
    d3.pairs(line.map(vertex), function(a, b) {
      geometry.vertices.push(a, b);
    });
  });
  return new THREE.LineSegments(geometry, material);
}

// See https://github.com/d3/d3-geo/issues/95
function graticule10() {
  var epsilon = 1e-6,
      x1 = 180, x0 = -x1, y1 = 80, y0 = -y1, dx = 10, dy = 10,
      X1 = 180, X0 = -X1, Y1 = 90, Y0 = -Y1, DX = 90, DY = 360,
      x = graticuleX(y0, y1, 2.5), y = graticuleY(x0, x1, 2.5),
      X = graticuleX(Y0, Y1, 2.5), Y = graticuleY(X0, X1, 2.5);

  function graticuleX(y0, y1, dy) {
    var y = d3.range(y0, y1 - epsilon, dy).concat(y1);
    return function(x) { return y.map(function(y) { return [x, y]; }); };
  }

  function graticuleY(x0, x1, dx) {
    var x = d3.range(x0, x1 - epsilon, dx).concat(x1);
    return function(y) { return x.map(function(x) { return [x, y]; }); };
  }

  return {
    type: 'MultiLineString',
    coordinates: d3.range(Math.ceil(X0 / DX) * DX, X1, DX).map(X)
        .concat(d3.range(Math.ceil(Y0 / DY) * DY, Y1, DY).map(Y))
        .concat(d3.range(Math.ceil(x0 / dx) * dx, x1, dx).filter(function(x) { return Math.abs(x % DX) > epsilon; }).map(x))
        .concat(d3.range(Math.ceil(y0 / dy) * dy, y1 + epsilon, dy).filter(function(y) { return Math.abs(y % DY) > epsilon; }).map(y))
  };
}
```

---

[Back to Home](:@Home)

