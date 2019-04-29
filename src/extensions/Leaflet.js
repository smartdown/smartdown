/* global window */
/* global useLeaflet */

var Leaflet = {};
if (useLeaflet) {
  /* global L */
  Leaflet = require('leafletJS');
  require('leaflet/dist/leaflet.css');

  delete Leaflet.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'marker-icon-2x.png',
    iconUrl: 'marker-icon.png',
    shadowUrl: 'marker-shadow.png',
  });
}

module.exports = Leaflet;
