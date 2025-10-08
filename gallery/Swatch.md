# Swatch Image Tags

A Markdown image tag has the syntax `![alt](src)`, which renders as an HTML [`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) element, where `alt` is usually interpreted as the `alt` (alternate text) attribute of the generated HTML image, and `src` is the image source (e.g., `https://example.com/SomeImage.png`). Smartdown extends the Markdown image syntax with a feature called *Swatch* which allows a Markdown image tag to be annotated such that it will synthesize an image, rather than loading an image from the internet. Currently, this synthesized image is a colored square, although the concept is extrapolable to a variety of synthesized sizes, shapes and images.

For example, the *swatch* syntax below:

```
I am an orange swatch: ![swatch](orange)
```

Produces the following output:

I am an orange swatch: ![swatch](orange)

The keyword `swatch` is required in the image tag's `alt` section; in other words, between the square brackets (`![swatch]`). The swatch's color is specified in the image tag's `src` section between parentheses and may be either a color name or a CSS color hex value. For example:

- `![swatch](orange)`: ![swatch](orange)
- `![swatch](#00CC00)`: ![swatch](#00CC00)


## Inlining Swatches

Swatch-style image tags behave exactly like URL-based image tags, and can be inlined within text, and can even abut other images or Swatches. For example:

A `magenta` swatch ![swatch](magenta).

A grid of swatches:

![swatch](purple)![swatch](green)![swatch](cyan)
![swatch](turquoise)![swatch](yellow)![swatch](red)
![swatch](gray)![swatch](black)![swatch](aliceblue)


## Dynamic Swatches

Although Smartdown swatches don't currently have any inherent reactivity with Smartdown variables, the idea of a *dynamic* swatch is easily implemented by using an output cell of type `markdown`, and inserting the appropriate swatch Smartdown code into the cell's associated variable. For example, below we have a grid of output cells which are to be formatted as `markdown` output cells.

[](:!swatch00|markdown)[](:!swatch01|markdown)[](:!swatch02|markdown)
[](:!swatch10|markdown)[](:!swatch11|markdown)[](:!swatch12|markdown)
[](:!swatch20|markdown)[](:!swatch21|markdown)[](:!swatch22|markdown)

And we have an associated playable (below), which periodically (once per 5 sec) changes the grid by adjusting the Smartdown within each cell to be a swatch image.

```javascript /playable/autoplay
function swatchify(color) {
  return `![swatch](${color})`;
}

const colors = [
  'red',
  'green',
  'blue',
  'yellow',
  'orange',
  'magenta',
  'cyan',
  'lightblue',
  'darkslateblue',
];

function getRandomColor() {
  const index = Math.floor(Math.random() * 9);
  return colors[index];
}

function updateGrid() {
  const updateVars = {};

  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      updateVars[`swatch${i}${j}`] = swatchify(getRandomColor());
    }
  }
  smartdown.set(updateVars);
  window.setTimeout(updateGrid, 2000);
}

updateGrid();
window.setTimeout(updateGrid, 2000);

```


---

[Back to Home](:@Home)

