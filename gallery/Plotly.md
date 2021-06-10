### Plotly.js

The current integration of [plotly.js](https://plot.ly/javascript/) is fairly raw, and you may encounter problems with autolayout/sizing as well as other features I haven't tested or fixed.

#### Hello World

Here is the [Hello World](https://plot.ly/javascript/getting-started/#hello-world-example) example.

This example enables the user to enter an alternate Title, which is associated with the variable `PLOT_TITLE`. Smartdown's Plotly integration is still in its initial stages, with the plot title being adjustable by changing the `PLOT_TITLE` variable. Eventually, it will be possible to have plots respect arbitrary smartdown variable data, instead of just the special `PLOT_TITLE` variables.

---

[Title](:?PLOT_TITLE)

---

```plotly/autoplay/playable
var layout = {
    title: 'Default Title',
    autosize: true,
    width: 500,
    height: 300,
    margin: {
      t: 100, b: 0, l: 0, r: 0
    }
};

Plotly.newPlot( this.div, [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16] }], layout,
    {displayModeBar: false} );

```


#### 3D Surface Plots

From [3D Surface Plots](https://plot.ly/javascript/3d-surface-plots/)


```plotly/playable

var myDiv = this.div;
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
    title: 'Mt Bruno Elevation',
    autosize: true,
    width: 500,
    height: 300,
    margin: {
      t: 100, b: 0, l: 0, r: 0
    }
  };
  Plotly.newPlot(myDiv, data, layout, {displayModeBar: false});
});


```

#### Simple Contour Plot

```plotly/playable
var myDiv = this.div;

var size = 100, x = new Array(size), y = new Array(size), z = new Array(size), i, j;

for(var i = 0; i < size; i++) {
  x[i] = y[i] = -2 * Math.PI + 4 * Math.PI * i / size;
    z[i] = new Array(size);
}

for(var i = 0; i < size; i++) {
    for(j = 0; j < size; j++) {
      var r2 = x[i]*x[i] + y[j]*y[j];
      z[i][j] = Math.sin(x[i]) * Math.cos(y[j]) * Math.sin(r2) / Math.log(r2+1);
  }
}

var data = [ {
    z: z,
    x: x,
    y: y,
    type: 'contour'
  }
];

  var layout = {
    title: 'Simple Contour Plot',
    autosize: true,
    width: 500,
    height: 300,
    margin: {
      t: 100, b: 0, l: 0, r: 0
    }
  };

Plotly.newPlot(myDiv, data, layout, {displayModeBar: false});
```


#### Maps

From [Chloropleth Map](https://plot.ly/javascript/choropleth-maps)


```plotly/autoplay

var myDiv = this.div;
Plotly.d3.csv(
  'https://raw.githubusercontent.com/plotly/datasets/master/2010_alcohol_consumption_by_country.csv',
  function(err, rows) {
    function unpack(rows, key) {
      return rows.map(function(row) { return row[key]; });
    }

    var data = [{
      type: 'choropleth',
      locationmode: 'country names',
      locations: unpack(rows, 'location'),
      z: unpack(rows, 'alcohol'),
      text: unpack(rows, 'location'),
      autocolorscale: true
    }];

    var layout = {
      autosize: true,
      title: 'Pure alcohol consumption among adults (age 15+) in 2010',
      geo: {
        projection: {
          type: 'robinson'
        }
      }
    };

    Plotly.newPlot(myDiv, data, layout, {showLink: false, displayModeBar: false});
  });

```

---

[Back to Home](:@Home)

