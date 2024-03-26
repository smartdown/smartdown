import registerABC from '../extensions/ABC';
import registerD3 from '../extensions/D3';
import registerThree from '../extensions/Three';
import registerPlotly from '../extensions/Plotly';
import registerLeaflet from '../extensions/Leaflet';
import OpenJSCAD from '../extensions/OpenJSCAD';
import Brython from '../extensions/Brython';
import FilamentExtension from '../extensions/Filament';
import React from '../extensions/React';
import Typescript from '../extensions/Typescript';
import Mermaid from '../extensions/Mermaid';
import Stdlib from '../extensions/Stdlib';

export default function registerDefaultExtensions() {
  registerABC();
  registerD3();
  registerThree();
  registerPlotly();
  registerLeaflet();
  OpenJSCAD.register();
  Brython.register();
  FilamentExtension.register();
  React.register();
  Typescript.register();
  Mermaid.register();
  Stdlib.register();
}
