/* global jscadCore */

import {registerExtension} from 'extensions';

const OpenJSCAD = {
  register() {
    registerExtension(
      'openjscad',
      [
        'https://unpkg.com/@jscad/core/dist/jscad-core.min.js',
        'https://unpkg.com/@jscad/modeling/dist/jscad-modeling.min.js',
        'https://unpkg.com/@jscad/regl-renderer/dist/jscad-regl-renderer.min.js',
        // Useful when debugging via a locally built OpenJSCAD
        // 'lib/jscad-core.min.js',
        // 'lib/jscad-modeling.min.js',
        // 'lib/jscad-regl-renderer.min.js',
        // 'lib/jscad-io-io.min.js',
        () => {
          let mostRecentlyRequiredData;

          const fsGlue = {
            readFileSync: function(/* filename, encoding */) {
              return mostRecentlyRequiredData;
            },
          };
          const requireGlue = {
            extensions: {},
          };
          jscadCore.io.registerAllExtensions(fsGlue, requireGlue);

          const stlDeserializer = requireGlue.extensions['.stl'];

          // https://openjscad.xyz/docs/module-io_svg-deserializer.html
          window.jscadStlDeserializer = {
            deserializer: {
              deserialize: function(options, input) {
                mostRecentlyRequiredData = input;
                const fakeOptions = {};
                stlDeserializer(/* options */ fakeOptions, 'hello', input);
                return fakeOptions.exports[0];
              },
            },
            extension: 'stl',
          };
        },
      ]);
  },

  generateInnerHTML(divId) {
    const innerHTML =
`
<div
  class="openjscad-container">
  <div
    id="${divId}-viewerDiv"
    class="viewerDiv">
  </div>
  <div
    class="viewer-footer">
    <button
      onclick="window.resetCamera${divId}()">
      Reset Camera
    </button>
    <button
      onclick="window.exportSTL${divId}()">
      Export STL
    </button>
    <table
      id="${divId}-parametersTable"
      class="openjscad-parametersTable">
    </table>
  </div>
</div>
`;
    return innerHTML;
  },

  generateAugmentedPlayable(divId, code) {
    const augmentedCode =
`
// Begin Augmented script
const viewerDivId = '${divId}-viewerDiv';
const parametersTableId = '${divId}-parametersTable';

const viewerDiv = document.getElementById(viewerDivId);
const parametersTable = document.getElementById(parametersTableId);

// ********************
// Renderer configuration and initiation.
// ********************
const { prepareRender, drawCommands, cameras, controls, entitiesFromSolids } = jscadReglRenderer;

const perspectiveCamera = cameras.perspective;
const orbitControls = controls.orbit;

const containerElement = viewerDiv;

const width = containerElement.clientWidth
const height = containerElement.clientHeight

const state = {}

// prepare the camera
state.camera = Object.assign({}, perspectiveCamera.defaults)
perspectiveCamera.setProjection(state.camera, state.camera, { width, height })
perspectiveCamera.update(state.camera, state.camera)

// prepare the controls
state.controls = orbitControls.defaults

// prepare the renderer
const setupOptions = {
  glOptions: { container: containerElement },
}
const renderer = prepareRender(setupOptions)

const gridOptions = {
  visuals: {
    drawCmd: 'drawGrid',
    show: true,
    color: [0, 0, 0, 1],
    subColor: [0, 0, 1, 0.5],
    fadeOut: false,
    transparent: true
  },
  size: [200, 200],
  ticks: [10, 1]
};

const axisOptions = {
  visuals: {
    drawCmd: 'drawAxis',
    show: true
  },
};

const wrapper = async () => {
  const packageNameToGlobal = {
    '@jscad/core': jscadCore,
    '@jscad/modeling': jscadModeling,
    '@jscad/stl-deserializer': jscadStlDeserializer,
    // '@jscad/io/io': jscadIoIo,
  };

  const require = (packageName) => {
    const result = packageNameToGlobal[packageName];
    if (!result) {
      console.log(\`Error in require('\${packageName}'). Package not available.\`);
    }
    return result;
  };

  const module = {
    exports: {},
  };

  ${code}

  const smartdownOpenJSCADMain = module.exports.main;
  const smartdownOpenJSCADParams = {};

  if (module.exports.getParameterDefinitions) {
    module.exports.getParameterDefinitions().forEach((def) => {
      smartdownOpenJSCADParams[def.name] = def.initial;
    });
  }

  return smartdownOpenJSCADMain(smartdownOpenJSCADParams);
}

const model = await wrapper();
let resetView = false;
let zoomToFit = true;

const entities = entitiesFromSolids({}, model)

// assemble the options for rendering
const renderOptions = {
  rendering: {
    background: [0.9, 0.9, 1, 1],
    meshColor: [0, 0.6, 1, 1],
    autoRotate: false,
    autoZoom: false
  },
  camera: state.camera,
  drawCommands: {
    drawAxis: drawCommands.drawAxis,
    drawGrid: drawCommands.drawGrid,
    drawLines: drawCommands.drawLines,
    drawMesh: drawCommands.drawMesh
  },
  // define the visual content
  entities: [
    gridOptions,
    axisOptions,
    ...entities
  ]
}

// the heart of rendering, as themes, controls, etc change
let updateView = true

const doRotatePanZoom = () => {
  if (rotateDelta[0] || rotateDelta[1]) {
    const updated = orbitControls.rotate({ controls: state.controls, camera: state.camera, speed: rotateSpeed }, rotateDelta)
    state.controls = { ...state.controls, ...updated.controls }
    updateView = true
    rotateDelta = [0, 0]
  }

  if (panDelta[0] || panDelta[1]) {
    const updated = orbitControls.pan({ controls:state.controls, camera:state.camera, speed: panSpeed }, panDelta)
    state.controls = { ...state.controls, ...updated.controls }
    panDelta = [0, 0]
    state.camera.position = updated.camera.position
    state.camera.target = updated.camera.target
    updateView = true
  }

  if (zoomDelta) {
    const updated = orbitControls.zoom({ controls:state.controls, camera:state.camera, speed: zoomSpeed }, zoomDelta)
    state.controls = { ...state.controls, ...updated.controls }
    zoomDelta = 0
    updateView = true
  }

  if (zoomToFit) {
    const updated = orbitControls.zoomToFit({ controls:state.controls, camera:state.camera, entities })
    state.controls = { ...state.controls, ...updated.controls }

    updateView = true;
    zoomToFit = false;
  }

  if (resetView) {
    console.log('resetView', state.camera.position, state.camera.target);
    state.camera.position = [1, 1, 1];
    state.camera.target = [0, 0, 0];
    const updated = orbitControls.zoomToFit({ controls:state.controls, camera:state.camera, entities })
    state.controls = { ...state.controls, ...updated.controls }

    updateView = true;
    resetView = false;
  }
}

const updateAndRender = (timestamp) => {
  doRotatePanZoom()

  if (updateView) {
    const updates = orbitControls.update({ controls: state.controls, camera: state.camera })
    state.controls = { ...state.controls, ...updates.controls }
    updateView = state.controls.changed // for elasticity in rotate / zoom

    state.camera.position = updates.camera.position
    perspectiveCamera.update(state.camera)

    renderer(renderOptions)
  }
  window.requestAnimationFrame(updateAndRender)
}
window.requestAnimationFrame(updateAndRender);

// convert HTML events (mouse movement) to viewer changes
let lastX = 0;
let lastY = 0;

const rotateSpeed = 0.002
const panSpeed = 1
const zoomSpeed = 0.08
let rotateDelta = [0, 0]
let panDelta = [0, 0]
let zoomDelta = 0
let pointerDown = false
let lastDistance = null;
let scaling = false;
let panning = false;

const downHandler = (ev) => {
  pointerDown = true
  lastX = ev.pageX
  lastY = ev.pageY
  // console.log('downHandler', ev.pageX, ev.pageY);
  containerElement.setPointerCapture(ev.pointerId)
  // ev.stopPropagation();
  // ev.preventDefault();
};

const moveHandler = (ev) => {
  if (!pointerDown) return
  if (scaling) return
  // console.log('moveHandler', scaling, ev.pageX, ev.pageY);

  const dx = lastX - ev.pageX 
  const dy = ev.pageY - lastY

  const shiftKey = (ev.shiftKey === true) || panning
  if (shiftKey) {
    panDelta[0] += dx
    panDelta[1] += dy
  } else {
    rotateDelta[0] -= dx
    rotateDelta[1] -= dy
  }

  lastX = ev.pageX
  lastY = ev.pageY

  ev.preventDefault()
  ev.stopPropagation();
};

const upHandler = (ev) => {
  // console.log('upHandler', ev.pageX, ev.pageY);
  pointerDown = false
  containerElement.releasePointerCapture(ev.pointerId);
  lastDistance = null;
  // ev.stopPropagation();
  // ev.preventDefault();
};

const wheelHandler = (ev) => {
  zoomDelta += ev.deltaY
  ev.preventDefault()
};

containerElement.onpointerdown = downHandler;
containerElement.onpointermove = moveHandler;
containerElement.onpointerup = upHandler;

const touchStartHandler = (e) => {
  // console.log('touchStartHandler', e);
  if (e.touches.length === 2) {
    // console.log('touchStartHandler2', e.touches.length);
    scaling = true;
  }
  else if (e.touches.length === 3) {
    panning = true;
  }
};

const touchMoveHandler = (e) => {
  // console.log('touchMoveHandler', e);
  if (scaling) {
    const distance = Math.hypot(
      e.touches[0].pageX - e.touches[1].pageX,
      e.touches[0].pageY - e.touches[1].pageY);
    if (lastDistance !== null) {
      // console.log('#touchMoveHandler2', distance, lastDistance, distance - lastDistance);
      zoomDelta -= distance - lastDistance;
    }
    lastDistance = distance;
  }
};

const touchEndHandler = (e) => {
  // console.log('touchEndHandler', e);
  scaling = false;
  panning = false;
};

containerElement.ontouchstart = touchStartHandler;
containerElement.ontouchmove = touchMoveHandler;
containerElement.ontouchend = touchEndHandler;

containerElement.onwheel = wheelHandler;

window[\`resetCamera${divId}\`] = function() {
  resetView = true;
  // zoomToFit = true;
  updateView = true;
};

window[\`exportSTL${divId}\`] = function() {
  window.alert('Export STL is Not Yet Implemented.');
  console.log('exportSTL NYI', state, state.camera);
};


// End Augmented Code
`;

    return augmentedCode;
  }
};

export default OpenJSCAD;
