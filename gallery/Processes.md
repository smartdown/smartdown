### Processes: Variables, Cells, Expressions, and Playables

This document attempts to provide a working example of how Smartdown's *reactivity* works via Smartdown *variables* and *expressions*, and how these can be affected by and reflected in *cells* and *playables*, as well as other external effects and services. Each of these elements is actually a *process*, and Smartdown implements a flexible scheduling and dependency mechanism.

```javascript /autoplay/playable
smartdown.setVariables([
  // {lhs: 'title', rhs: '', type: 'string'},
  {lhs: 'latitude', rhs: -18.1017436, type: 'number'},
  {lhs: 'longitude', rhs: 178.3908867, type: 'number'}]);
```

#### GeoLocation sets LOCATION

```javascript /playable/autoplay
var output = this.div;

output.innerHTML = "<p>Locating…</p>";

if (!navigator.geolocation){
  output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
}
else {
  try {
    navigator.geolocation.getCurrentPosition(
      function success(position) {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;
        smartdown.setVariables([
          {lhs: 'latitude', rhs: latitude, type: 'number'},
          {lhs: 'longitude', rhs: longitude, type: 'number'}]);
        output.innerHTML = '<p>Latitude is ' + latitude + '° </p><p>Longitude is ' + longitude + '°</p>';

        var img = new Image();
        img.style.height = '200px';
        img.style.width = '300px';
        img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x200&key=AIzaSyBIFBOMGSxUHlHO747zxGvJekxWxWF60wA";

        output.appendChild(img);
      },
      function error() {
        output.innerHTML = "Unable to retrieve your location";
      }
    );
  }
  catch (e) {
    console.log('exception', e);
    output.innerHTML = `Exception: ${e}`;
  }
}
```

- [Corvallis OR (44.55,-123.25)](:=latitude=44.55;longitude=-123.25) [Null Island (0.0, 0.0)](:=latitude=0.0;longitude=0.0) [Suva, Fiji (-18.1017436, 178.3908867)](:=latitude=-18.1017436;longitude=178.3908867) [Tangier, Morocco (35.7596143,-5.8367623)](:=latitude=35.7596143;longitude=-5.8367623)
- [title](:?title)
- [latitude](:?latitude|number)
- [longitude](:?longitude|number)


#### Map that depends on `latitude`, `longitude` and `title` being set

```leaflet/playable/autoplay
smartdown.importCssCode(
`
.leaflet-icon-div {
  font-size:10px;
  font-weight:600;
  border:1px solid transparent;
  border-radius: 4px;
  background: lightyellow;  /* rgba(254, 254, 254, 0.8); */
  text-align: center;
  padding:0;
}
`);

this.dependOn = ['latitude', 'longitude', 'title'];
this.depend = function() {
  console.log('dependency fired', env.title);
  var mapCenter = [env.latitude, env.longitude];
  var title = env.title === '' ? null : env.title;
  var isValidLatLon = typeof env.latitude === 'number' &&
                      typeof env.longitude === 'number';
  if (title && isValidLatLon && !this.leafletMap) {
    const mymap = L.map(this.div);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://mapbox.com">Mapbox</a>',
    }).addTo(mymap);
    this.leafletMap = mymap;
  }

  if (this.leafletMap) {
    this.leafletMap.setView(mapCenter, 13);
    var myIcon = L.divIcon({
      iconSize: [250, 20],
      popupAnchor:  [0, 0],
      className: 'leaflet-icon-div',
      html: `<b style="background:lightyellow;">${env.title}</b>`
    });

    const marker = L.marker(
                  [env.latitude, env.longitude],
                  {
                    title: env.title,
                    icon: myIcon
                  });
    marker.addTo(this.leafletMap);
  }
};
```


#### Leaflet Map With Data Markers


Now let's put some data markers on this map. We'll obtain location and information details for these markers by using WikiPedia's ability to return data for any entities within a given radius.

We'll break this work up into two parts:
- Obtaining the data from WikiPedia
- Rendering the data as markers on a Leaflet map


##### Obtaining the WikiPedia Data

```javascript/playable/autoplay
const outputDiv = this.div;
function dataLoaded() {
  var sourceText = this.responseText;
  var json = JSON.parse(sourceText);
  var payload = json.query.geosearch;
  smartdown.setVariable('geodata', payload);
  smartdown.setVariable('geodatax', {payload: payload});
}


function loadData(mapCenter) {
  var getSightsPointsURL = 'https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gsradius=10000&gslimit=10&format=json&origin=*';

  getSightsPointsURL += '&gscoord=' +
                          mapCenter[0] + '%7C' +
                          mapCenter[1];
  var oReq = new XMLHttpRequest();
  oReq.withCredentials = false;
  oReq.addEventListener("load", dataLoaded);
  oReq.open("GET", getSightsPointsURL);
  oReq.send();
}

this.dependOn = ['latitude', 'longitude'];
this.depend = function() {
  var isValidLatLon = typeof env.latitude === 'number' &&
                      typeof env.longitude === 'number';
  if (isValidLatLon) {
    var mapCenter = [env.latitude, env.longitude];
    loadData(mapCenter);
  }
};

```

##### Results stored in `geodata` variable, accessible via `[](:!geodata)`

[](:!geodata)


##### Mapping it


```leaflet/playable/autoplay
this.dependOn = ['latitude', 'longitude', 'geodata'];
this.depend = function() {
  function idToLink(pageid, title) {
    var url = 'https://en.wikipedia.org/?curid=' + pageid;
    return '<a target="_blank" href="' + url + '">' + title + '</a>';
  }

  function addMarkersToMap(map, geodata) {
    geodata.forEach(function(d) {
      var link = idToLink(d.pageid, d.title);

      // See https://leafletjs.com/reference-1.1.0.html#divicon
      var myIcon = L.divIcon({
        iconSize: [100, 30],
        popupAnchor:  [0, 0],
        className: 'leaflet-icon-div',
        html: `<span>${d.title}</span>`
      });

      const marker = L.marker(
                    [d.lat, d.lon],
                    {
                      icon: myIcon,
                      title: `${d.title}`
                    });
      marker.addTo(map);
      var popupContent = `${link}`;
      marker.bindPopup(popupContent);
    });
  };

  var mapCenter = [env.latitude, env.longitude];
  var isValidLatLon = typeof env.latitude === 'number' &&
                      typeof env.longitude === 'number';

  if (!this.leafletMap && isValidLatLon) {
    const mymap = L.map(this.div);
    this.leafletMap = mymap;

    this.leafletMap.setView(mapCenter, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://mapbox.com">Mapbox</a>',
    }).addTo(this.leafletMap);
  }

  if (this.leafletMap && env.geodata) {
    this.leafletMap.setView(mapCenter, 13);
    addMarkersToMap(this.leafletMap, env.geodata);
  }
};

```

---

[Back to Home](:@Home)

