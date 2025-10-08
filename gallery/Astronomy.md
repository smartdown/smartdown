## Visualizing and Analyzing Astronomy Data

*WIP - Work in Progress - This page is not yet complete. Come back later for a complete version.*

Smartdown can be used to discuss and visualize a variety of scientific data, and the recent availability of data from the [James Webb Space Telescope - JWST](https://webb.nasa.gov) has enabled at least one Smartdown author (see [Credits](##credits) below) to create some compelling explorables. This Gallery example demonstrates a few possible ways to load, manipulate, and visualize digital telescope data.

- [Using HTML Canvas in Smartdown](##basic-canvas-usage)
- [Loading FITS Data](##loading-fits-data)

### Basic Canvas Usage

The playable below will create an HTML `<canvas>` element and will ensure its width is 75% of the screen width, and its height is the same as the width, but no more than 50% of the screen height. The playable will be responsive to `resize` events and will adjust accordingly. The content of the canvas will be a simple pattern where each pixel is assigned a color based upon its x/y coordinate.

```javascript /autoplay/playable
const canvasId = 'basicCanvas'; // Ensure each canvas on this page has distinct id
this.div.innerHTML = `
<canvas id="${canvasId}" style="margin:auto; display:block;"></canvas>
`;
let canvas = document.getElementById(canvasId); 
let context = canvas.getContext('2d');

function sizeCanvas() {
  canvas.width  = Math.floor(window.innerWidth / 2);
  canvas.height = Math.min(canvas.width, Math.floor(window.innerHeight * 0.5));
}
sizeCanvas();

window.addEventListener('resize', function(event){
  sizeCanvas();
  draw();
});

function draw() {
  const imagedata = context.createImageData(canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      let pixelindex = (y * canvas.width + x) * 4;
      const xcolor = Math.floor(x / canvas.width * 255);
      const ycolor = Math.floor(y / canvas.height * 255);
      imagedata.data[pixelindex + 0] = xcolor;
      imagedata.data[pixelindex + 1] = ycolor;
      imagedata.data[pixelindex + 2] = Math.floor((xcolor + ycolor) / 2);
      imagedata.data[pixelindex + 3] = 255;
    }
  }
  context.putImageData(imagedata, 0, 0);
}

draw();
```

### Rendering image data

For this next example, we'll create a synthetic 2D data matrix corresponding to an image that might be obtained from a space telescope. Typically, this image data is distributed in [FITS](https://en.wikipedia.org/wiki/FITS) file format, which contains a 2D matrix of data, as well as a metadata header. The metadata header describes the dimensions of the data; the scaling of the measurements; and a wealth of information about the image's location in the sky, the time it was obtained, and the astronomical entity being observed. Each element of the 2D image matrix will be a floating point value corresponding to a measured pixel obtained via a telescope.

#### Generating a synthetic image

We are going to generate a simple `9 x 9` grid containing a radial gradient image of a circle and have its pixel measurements (intensity) be such that the intensity is highest at the center, and fades to black at the perimeter.

For the example below, we'll create a simplistic model where the value `0.0` indicates a recorded pixel of complete darkness, and a value of `1.0` indicates a pixel of maximum brightness.


```javascript /playable/autoplay
//
// The code below inspired by a StackOverflow post:
//  How do I make a 'radial gradient' of values in a 2D array?
//    https://stackoverflow.com/a/53262255/5667222
//

const gridSize = 9;
window.gridSize = gridSize; // For use in subsequent playables.

const centrePoint = {
  x: Math.floor(gridSize / 2),
  y: Math.floor(gridSize / 2)
};

const euclideanDistance = (point1, point2) => {
  return Math.sqrt(
    Math.abs(Math.pow(point1.x - point2.x, 2)) +
    Math.abs(Math.pow(point1.y - point2.y, 2))
  )
}

const furthestDistanceFromCentre = euclideanDistance(
  {
    x: 0,
    y: 0
  },
  centrePoint
)

const grid = [];

for (let x = 0; x < gridSize; x++) {
  grid[x] = [];
  for (let y = 0; y < gridSize; y++) {
    grid[x][y] = Math.floor(
      furthestDistanceFromCentre - euclideanDistance(
        {x, y},
        centrePoint
      )
    );
  }
}

function stringifyGrid(grid) {
  return grid.map((row) => {
    return row.map((col) => col.toFixed(2)).join(', ');
  });
}

const euclideanRadialImageData = grid;
const euclideanRadialImageDataStr = stringifyGrid(euclideanRadialImageData);

const radialImageData = euclideanRadialImageData.map((row) => {
  return row.map((col) => col / Math.floor(furthestDistanceFromCentre));
});
const radialImageDataStr = stringifyGrid(radialImageData);

smartdown.set('radialImageData', radialImageData);
smartdown.set('radialImageDataStr', radialImageDataStr);
smartdown.set('euclideanRadialImageDataStr', euclideanRadialImageDataStr);

```

And here is the image data:

> [](:!radialImageDataStr)

#### Mapping image data pixel values to Canvas pixel colors

When using actual FITS image data from a space telescope, the range of values recorded in the 2D matrix of pixels is based upon the telescope's characteristics and which (if any) *filters* are being applied. In order to visualize this data using a `<canvas>`, we will need to *scale* the pixel measurement (range `0.0 ... 1.0`) to fully use the canvas elements color scale of `0 ... 255`). This *mapping* function can be a simple linear function, which we'll use below; but it can be a more complex non-linear function that can be used to emphasize or contrast different parts of the image. See [Stretch Functions](##stretch-functions) later in this document.

In the playable below, we will use a canvas element, but will dimension it as a `9x9` pixel canvas, even though the actual visible width and height will be the same as the [Basic Canvas Usage](##Basic Canvas Usage) element above, scaling with the window width. By default, canvas elements will *smooth* adjacent pixels, but we can disable this behavior so that the `9x9` canvas pixels are rendered without smoothing. This is done by setting the canvas's CSS property [image-rendering](https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering) to `crisp-edges`.

```javascript /autoplay/playable
const canvasId = 'syntheticCanvas'; // Ensure each canvas on this page has distinct id
this.div.innerHTML = `
<canvas id="${canvasId}" style="image-rendering: crisp-edges; margin:auto; display:block;"></canvas>
`;
let canvas = document.getElementById(canvasId); 
let context = canvas.getContext('2d');

function sizeCanvas() {
  const domWidth = Math.floor(window.innerWidth / 2);
  const domHeight = Math.min(domWidth, Math.floor(window.innerHeight * 0.5));

  canvas.style.width = `${domWidth}px`;
  canvas.style.height = `${domHeight}px`;
  canvas.width = window.gridSize;
  canvas.height = window.gridSize;
}
sizeCanvas();

window.addEventListener('resize', function(event){
  sizeCanvas();
  draw();
});

function draw() {
  const imagedata = context.createImageData(canvas.width, canvas.height);
  const sourceData = env.radialImageData;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      let pixelindex = (y * canvas.width + x) * 4;
      const xcolor = Math.floor(x / canvas.width * 255);
      const ycolor = Math.floor(y / canvas.height * 255);
      imagedata.data[pixelindex + 0] = Math.floor(255 * sourceData[y][x]);
      imagedata.data[pixelindex + 1] = Math.floor(255 * sourceData[y][x]);
      imagedata.data[pixelindex + 2] = Math.floor(255 * sourceData[y][x]);
      imagedata.data[pixelindex + 3] = 255;
    }
  }

  context.putImageData(imagedata, 0, 0);
}

draw();
```

#### Adding Interactivity

In the example above, we used a simple grayscale color mapping. Let's make things more fun by adding a simple control panel that lets us adjust the background color.

[Adjust Background Color :gear:](:=backgroundColorSettings=true)

```javascript /autoplay/playable
const canvasId = 'backgroundColorCanvas'; // Ensure each canvas on this page has distinct id
this.div.innerHTML = `
<canvas id="${canvasId}" style="image-rendering: crisp-edges; margin:auto; display:block;"></canvas>
`;
let canvas = document.getElementById(canvasId); 
let context = canvas.getContext('2d');

function sizeCanvas() {
  const domWidth = Math.floor(window.innerWidth / 2);
  const domHeight = Math.min(domWidth, Math.floor(window.innerHeight * 0.5));

  canvas.style.width = `${domWidth}px`;
  canvas.style.height = `${domHeight}px`;
  canvas.width = window.gridSize;
  canvas.height = window.gridSize;
}
sizeCanvas();

window.addEventListener('resize', function(event){
  sizeCanvas();
  draw();
});

function draw() {
  const imagedata = context.createImageData(canvas.width, canvas.height);
  const sourceData = env.radialImageData;

  const red = env.backgroundColorSettingsColorRed;
  const green = env.backgroundColorSettingsColorGreen;
  const blue = env.backgroundColorSettingsColorBlue;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      let pixelindex = (y * canvas.width + x) * 4;
      const xcolor = Math.floor(x / canvas.width * 255);
      const ycolor = Math.floor(y / canvas.height * 255);
      imagedata.data[pixelindex + 0] = Math.floor(red * sourceData[y][x]);
      imagedata.data[pixelindex + 1] = Math.floor(green * sourceData[y][x]);
      imagedata.data[pixelindex + 2] = Math.floor(blue * sourceData[y][x]);
      imagedata.data[pixelindex + 3] = 255;
    }
  }

  context.putImageData(imagedata, 0, 0);
}

smartdown.set({
  backgroundColorSettings: false,
  backgroundColorSettingsColorRed: 127,
  backgroundColorSettingsColorGreen: 127,
  backgroundColorSettingsColorBlue: 127
});

function buildColor(r, g, b) {
  const rPadded = r.toString(16).padStart(2, '0');
  const gPadded = g.toString(16).padStart(2, '0');
  const bPadded = b.toString(16).padStart(2, '0');
  return `#${rPadded}${gPadded}${bPadded}`;
}

const colorComponentChanged = () => {
  const colorHex = buildColor(
    env.backgroundColorSettingsColorRed,
    env.backgroundColorSettingsColorGreen,
    env.backgroundColorSettingsColorBlue);

  const colorSwatchMarkdown = `![swatch](${colorHex})`;
  smartdown.set('backgroundColorSettingsSwatch', colorSwatchMarkdown);
  draw();
};

this.dependOn.backgroundColorSettingsColorRed = colorComponentChanged;
this.dependOn.backgroundColorSettingsColorGreen = colorComponentChanged;
this.dependOn.backgroundColorSettingsColorBlue = colorComponentChanged;

this.dependOn.backgroundColorSettings = () => {
  if (env.backgroundColorSettings) {
    smartdown.showDisclosure('backgroundColorSettings', '', 'upperright,closeable,draggable');
  }
};

draw();

```


# :::: backgroundColorSettings
# --outlinebox p

|||
|:---|:---|
|Red|[](:-backgroundColorSettingsColorRed/0/255/1)|
|Green|[](:-backgroundColorSettingsColorGreen/0/255/1)|
|Blue|[](:-backgroundColorSettingsColorBlue/0/255/1)|

[](:!backgroundColorSettingsSwatch|markdown)

# --outlinebox
# ::::


#### Credits

This Smartdown Gallery example is inspired by the work of [Isidore Mones](https://izzymones.github.io/blog-kit/), who utilizes publicly available [FITS]() files from the JWST to create interactive images of various cosmic objects:

- [Phantom Galaxy](https://izzymones.github.io/blog-kit/posts/phantomgalaxy/)
- [Southern Ring Nebula](https://izzymones.github.io/blog-kit/posts/southernringnebula/)
- [Cosmic Cliffs](https://izzymones.github.io/blog-kit/posts/cosmic_cliffs/)



---

[Back to Home](:@Home)
