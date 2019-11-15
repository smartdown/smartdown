import {registerExtension} from 'extensions';

// https://leafletjs.com/download.html

export default function registerLeaflet() {
  registerExtension(
    'leaflet',
    [
      'https://unpkg.com/leaflet/dist/leaflet.js',
      'https://unpkg.com/leaflet/dist/leaflet.css',
      function() {
        console.log('leaflet', window.Leaflet, window.L);
        window.Leaflet = window.L;
        //delete Leaflet.Icon.Default.prototype._getIconUrl;
//
        //L.Icon.Default.mergeOptions({
        //  iconRetinaUrl: 'marker-icon-2x.png',
        //  iconUrl: 'marker-icon.png',
        //  shadowUrl: 'marker-shadow.png',
        //});
      },
    ]);
}
