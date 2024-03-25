### Maps via Leaflet, Plotly

#### A Leaflet map of London

```leaflet/playable/autoplay
var mymap = L.map(this.div.id).setView([51.505, -0.09], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://mapbox.com">Mapbox</a>',
    maxZoom: 18,
}).addTo(mymap);

this.leafletMap = mymap;  // Smartdown needs to know about map for cleanup purposes
```

---

#### Smelly London Smartdown Remix

**This is a work in progress; I'm using it to exercise and demonstrate Plotly/Mapbox maps**

The content herein is derived from the [Smelly London Project](www.londonsmells.co.uk), which I first learned about at the 2017 [csv,conf,v3](https://csvconf.com). Although I missed the [Presentation](https://csvconf.com/speakers/#deborah-leem) at the conference, I met the presenter and decided to look at the underlying open source code and data and see if Smartdown could be used to *remix* the content and possibly provide an easier way for others to use that data.

Quoting text from the conference presentation:

> Smelly London: visualising historical smells through text-mining, geo-referencing and mapping.

> Smelly London project (www.londonsmells.co.uk) aims to bring together historical data with modern digitisation and visualisation to give us a unique revealing and visceral glimpse into a London of the past and what it tells us about London today. Text-mining and analysing the MOH reports tells the intimate narratives of the everyday experiences of 19th and 20th century Londoners through the 'smellscape'. The Smelly London project provides a great opportunity to demonstrate how new knowledge and insights have risen from the use of powerful digital applications. All outputs generated from the project will be open access and open source. Our data is available in a public repository [GitHub](https://github.com/Smelly-London) and other platforms such as [Layers of London](https://layersoflondon.blogs.sas.ac.uk/about-the-project/) and [Smelly Maps: Good City Life](https://goodcitylife.org/index.html).


```plotly/playable
var renderDiv = this.div;
renderDiv.style.height = '500px';

var smellBoroughJson = 'https://rawcdn.githack.com/Smelly-London/Smelly-London/master/visualisation/leaflet/data/moh_smell_category_borough_json.json';
var districtsJson = 'https://rawcdn.githack.com/Smelly-London/Smelly-London/master/visualisation/leaflet/data/london_districts_latlong_with_centroids.json';

var centerLat = 51.5;
var centerLon = -0.12;

Plotly.d3.json(districtsJson, function(districtsJson) {

  Plotly.d3.json(smellBoroughJson, function(smellBoroughJson) {

    Plotly.newPlot(renderDiv, [{
      type: 'scattermapbox',
      style: 'mapbox://styles/mapbox/basic-v9',
      lat: [centerLat],
      lon: [centerLon]
    }], {
      title: "Smells of London",
      autosize: true,
      margin: {
        t: 40, b: 0, l: 0, r: 0
      },
      mapbox: {
        center: {
          lat: centerLat,
          lon: centerLon
        },
        style: 'outdoors',
        zoom: 10,
        layers: [
          {
            sourcetype: 'geojson',
            source: districtsJson,
            type: 'line',
            color: 'rgba(200, 0, 0, 0.8)'
          },
          {
            sourcetype: 'geojson',
            source: smellBoroughJson,
            type: 'line',
            color: 'rgba(0, 0, 200, 0.8)'
          },
        ]
      }
    }, {
      mapboxAccessToken: 'pk.eyJ1IjoiZG9jdG9yYnVkIiwiYSI6ImNqMmduc216YjAwMnEycXI2NzN5M291Y3QifQ.Ac0WMEuowA5AgxwqNrsmdw'
    });


});

});

```

---

#### A Plotly Topo Map of Somewhere

[Title](:?PLOT_TITLE)

```plotly/playable
var myDiv = this.div;
var title = env.PLOT_TITLE || 'Default Title';

Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/api_docs/mt_bruno_elevation.csv', function(err, rows){
  function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
  }

  var z_data=[ ]
  for(i=0;i<24;i++)
  {
    z_data.push(unpack(rows,i));
  }

  var data = [{
             z: z_data,
             type: 'surface'
          }];

  var layout = {
    title: title,
    autosize: true,
    width: 400,
    height: 300,
    margin: {
      t: 100, b: 0, l: 0, r: 0
    }
  };
  Plotly.newPlot(myDiv, data, layout, {displayModeBar: false});
});

```

---

#### Geolocation

Using Geolocation features will require the user gives permission.

Also, `https` is required for most browsers to enable Geolocation.


```javascript/playable
  var output = this.div;

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=500x300&key=AIzaSyBIFBOMGSxUHlHO747zxGvJekxWxWF60wA";

    output.appendChild(img);
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
```

---

[Back to Home](:@Home)

