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
const viewerContextId = '${divId}-viewerContext';
const viewerCanvasId = '${divId}-viewerCanvas';
const viewerDivId = '${divId}-viewerDiv';
const parametersTableId = '${divId}-parametersTable';

const viewerContext = document.getElementById(viewerContextId);
const viewerCanvas = document.getElementById(viewerCanvasId);
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
let resetView = false;;
let zoomToFit = true;

const entities = entitiesFromSolids({}, model)

// assemble the options for rendering
const renderOptions = {
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
const viewNames = [
  'top',
  // 'bottom', // Doesn't work: null is not an object (evaluating 'u[0]') in renderer
  'front',
  'back',
  'left',
  'right',
];
let viewNamesIndex = 0;

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
    state.camera.position = [1, 1, 1];
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
let lastX = 0
let lastY = 0

const rotateSpeed = 0.002
const panSpeed = 1
const zoomSpeed = 0.08
let rotateDelta = [0, 0]
let panDelta = [0, 0]
let zoomDelta = 0
let pointerDown = false

const moveHandler = (ev) => {
  if(!pointerDown) return
  const dx = lastX - ev.pageX 
  const dy = ev.pageY - lastY 

  const shiftKey = (ev.shiftKey === true) || (ev.touches && ev.touches.length > 2)
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
}

const downHandler = (ev) => {
  pointerDown = true
  lastX = ev.pageX
  lastY = ev.pageY
  containerElement.setPointerCapture(ev.pointerId)
};

const upHandler = (ev) => {
  pointerDown = false
  containerElement.releasePointerCapture(ev.pointerId)
};

const wheelHandler = (ev) => {
  zoomDelta += ev.deltaY
  ev.preventDefault()
};

containerElement.onpointermove = moveHandler;
containerElement.onpointerdown = downHandler;
containerElement.onpointerup = upHandler;
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
