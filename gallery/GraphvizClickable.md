### Using GraphViz to create clickable navigation maps

This document explores the use of [viz.js](https://github.com/mdaines/viz.js), which provides Graphviz capability in the browser. Specifically, we explore the use of the `URL` attribute and the ability have clickable nodes, edges, and graphs.

#### Inline Diagrams with Clickable Nodes

The following example demonstrates the use of an *inline* Graphviz playable, and the use of the `URL` attribute to attach link behaviors to nodes.

- `URL=#README` will use Smartdown tunneling to load the `README.md` document
- `URL=#Markdown#philosophy` will load `Markdown.md`, and then go to the `philosophy` anchor within that document
- `URL=#GraphvizClickable#gallery-digraph-with-clusters` will go to the `gallery-digraph-with-clusters` anchor within this document.
- `URL=javascript:alert('You clicked Hello');` will put up a `Hello` alert
- `URL=javascript:smartdown.setVariable('Goodbye', true);` will set the Smartdown variable `Goodbye` to `true`, and a Javascript playable will react to this change by displaying `Goodbye` in its div.

Can we do inline graphviz? Let's see...

```graphviz/playable/autoplay/inline
digraph "unix" {
  rankdir=LR; // Left to Right, instead of Top to Bottom
  graph [
    size = "4,1",
  ];

  node [
    fontsize = 30,
    color = lightblue,
    style = filled,
  ];

  "Readme" [URL="#README"];
  "Markdown" [URL="#Markdown#philosophy"];
  "Math" [URL="#Math"];
  "Clustered Digraph" [URL="#GraphvizClickable#gallery-digraph-with-clusters"];

  "Readme" -> "Markdown";
  "Markdown" -> "Math";
  "Math" -> "Clustered Digraph";
}
```

and here is another one...

```graphviz/playable/autoplay/inline
digraph "unix" {
  rankdir=LR; // Left to Right, instead of Top to Bottom
  graph [
    size = "3,1",
  ];

  node [
    fontsize = 30,
    color = lightyellow,
    style = filled,
  ];

  "Hello" [URL="javascript:alert('Hello'); smartdown.setVariable('Goodbye', false);"];
  "Goodbye" [URL="javascript:smartdown.setVariable('Goodbye', true);"];
  "Hello" -> "Goodbye";
}
```
It appears that we can do inline Graphviz playables.

The `Goodbye` playable is below, and will react to changes in the `Goodbye` variable.

```javascript /playable/autoplay
this.dependOn.Goodbye = () => {
  this.div.innerHTML = env.Goodbye ? `<h1>Goodbye</h1>` : '';
};
```


#### Gallery Digraph

A first attempt at displaying the various Gallery examples in a more graphical format. Clicking on a node should tunnel to that node's content.

```graphviz/playable/autoplay
digraph "unix" {
  rankdir=LR; // Left to Right, instead of Top to Bottom
  graph [
    fontname = "Helvetica-Oblique",
    fontsize = 36,
    label = "\n\n\n\nSmartdown Gallery Map",
    size = "12,12",

  ];
  node [
    shape = polygon,
    sides = 6,
    distortion = "0.0",
    orientation = "0.0",
    skew = "0.0",
    color = lightblue,
    style = filled,
    fontname = "Helvetica-Outline",
    fontsize = "36"
  ];

  "Media" [color=pink, shape=circle];
  "Readme" [URL="#README"];
  "Markdown" [URL="#Markdown"];
  "Math" [URL="#Math"];
  "Images" [URL="#Images"];
  "Multicards" [URL="#Multicards"];
  "Video" [URL="#Video"];
  "GIF/Audio" [URL="#GIFAndAudio"];
  "Decorations" [URL="#Decorations"];
  "Cells" [URL="#Cells"];
  "Disclosables" [URL="#Disclosables"];
  "SVG" [URL="#SVG"];
  "Disclosables++" [URL="#DisclosablesPlus"];
  "Tweets" [URL="#Tweets"];

  "Media" -> "Readme";
  "Media" -> "Markdown";
  "Media" -> "Math";
  "Media" -> "Images";
  "Media" -> "Multicards";
  "Media" -> "Video";
  "Media" -> "GIF/Audio";
  "Media" -> "Decorations";
  "Media" -> "Cells";
  "Media" -> "Disclosables";
  "Media" -> "SVG";
  "Media" -> "Disclosables++";
  "Media" -> "Tweets";



  "Data/Science" [color=pink, shape=circle];
  "Graphviz" [URL="#Graphviz"];
  "Graphviz Maps" [URL="#GraphvizClickable"];
  "D3" [URL="#D3"];
  "Data" [URL="#Data"];
  "Plotly" [URL="#Plotly"];
  "Maps" [URL="#Maps"];
  "Stdlib" [URL="#Stdlib"];
  "Processes" [URL="#Processes"];
  "ThreeJS" [URL="#Three"];
  "P5JS" [URL="#P5JS"];
  "Mermaid" [URL="#Mermaid"];
  "jsPsych" [URL="#JSPsych"];
  "Sankey" [URL="#Sankey"];
  "Crossword" [URL="#Crossword"];


  "Data/Science" -> "Graphviz";
  "Data/Science" -> "Graphviz Maps";
  "Data/Science" -> "D3";
  "Data/Science" -> "Data";
  "Data/Science" -> "Plotly";
  "Data/Science" -> "Maps";
  "Data/Science" -> "Stdlib";
  "Data/Science" -> "Processes";
  "Data/Science" -> "ThreeJS";
  "Data/Science" -> "P5JS";
  "Data/Science" -> "Mermaid";
  "Data/Science" -> "jsPsych";
  "Data/Science" -> "Sankey";
  "Data/Science" -> "Crossword";

  "Toys" [color=pink, shape=circle];
  "MadLibs" [URL="#MadLibs"];
  "Cuneiform" [URL="#Cuneiform"];
  "Mobius" [URL="#Mobius"];
  "Temperature" [URL="#Temperature"];
  "Vector Field" [URL="#VectorField"];
  "Tree" [URL="#Tree"];
  "Conic" [URL="#Conic"];
  "Vector Tree" [URL="#VectorTree"];
  "Dungeon" [URL="#Dungeon"];
  "Dungeon3D" [URL="#Games"];
  "Music" [URL="#Music"];
  "WordCloud" [URL="#WordCloud"];
  "Mathigon" [URL="#Mathigon"];
  "JSXGraph" [URL="#JSXGraph"];

  "Toys" -> "MadLibs";
  "Toys" -> "Cuneiform";
  "Toys" -> "Mobius";
  "Toys" -> "Temperature";
  "Toys" -> "Vector Field";
  "Toys" -> "Tree";
  "Toys" -> "Conic";
  "Toys" -> "Vector Tree";
  "Toys" -> "Dungeon";
  "Toys" -> "Dungeon3D";
  "Toys" -> "Music";
  "Toys" -> "WordCloud";
  "Toys" -> "Mathigon";
  "Toys" -> "JSXGraph";




  "Advanced" [color=pink, shape=circle];
  "Typescript" [URL="#Typescript"];
  "Javascript" [URL="#Javascript"];
  "Gists" [URL="#Gists"];
  "Extensions" [URL="#Extensions"];
  "Brython" [URL="#Brython"];
  "YouTube" [URL="#YouTube"];
  "ES6" [URL="#ES6"];
  "Mandelbrot" [URL="#Mandelbrot"];
  "LDF" [URL="#LDF"];
  "OpenJSCAD" [URL="#OpenJSCAD"];
  "Inlines" [URL="#Inlines"];
  "Kiosk" [URL="#Kiosk"];
  "React" [URL="#React"];

  "Media" -> "Data/Science" -> "Toys" -> "Advanced" [style=invis];

  "Advanced" -> "Typescript";
  "Advanced" -> "Javascript";
  "Advanced" -> "Gists";
  "Advanced" -> "Extensions";
  "Advanced" -> "Brython";
  "Advanced" -> "YouTube";
  "Advanced" -> "ES6";
  "Advanced" -> "Mandelbrot";
  "Advanced" -> "LDF";
  "Advanced" -> "OpenJSCAD";
  "Advanced" -> "Inlines";
  "Advanced" -> "Kiosk";
  "Advanced" -> "React";


  "P5JS" -> "Conic";
  "P5JS" -> "Mobius";
  "P5JS" -> "Tree";
  "P5JS" -> "Vector Field";
  "P5JS" -> "Vector Tree";
  "P5JS" -> "Dungeon3D";
  "P5JS" -> "Mandelbrot";

  "D3" -> "Processes";
  "D3" -> "Maps";

}
```

#### Gallery Digraph with Clusters

Here, I took the original Gallery table of examples and structured it using Graphviz clusters instead of table columns.

```graphviz/playable/autoplay
digraph "unix" {
  rankdir=LR; // Left to Right, instead of Top to Bottom
  graph [
    fontname = "Helvetica-Oblique",
    fontsize = 36,
    label = "\n\n\n\nSmartdown Gallery Map",
    size = "20,12",

  ];
  node [
    shape = polygon,
    sides = 6,
    distortion = "0.0",
    orientation = "0.0",
    skew = "0.0",
    color = lightblue,
    style = filled,
    fontname = "Helvetica-Outline",
    fontsize = "36"
  ];

  subgraph cluster_1 {
    label="Media";
    rankdir="TB";
    "top1" [style=invis];

    "Readme" [URL="#README"];
    "Markdown" [URL="#Markdown"];
    "Math" [URL="#Math"];
    "Images" [URL="#Images"];
    "Multicards" [URL="#Multicards"];
    "Video" [URL="#Video"];
    "GIF/Audio" [URL="#GIFAndAudio"];
    "Decorations" [URL="#Decorations"];
    "Cells" [URL="#Cells"];
    "Disclosables" [URL="#Disclosables"];
    "SVG" [URL="#SVG"];
    "Disclosables++" [URL="#DisclosablesPlus"];
    "Tweets" [URL="#Tweets"];
  }

  subgraph cluster_2 {
    label="Data/Science";
    rankdir="TB";

    "top2" [style=invis];

    "Graphviz" [URL="#Graphviz", sides=9, color=lemonchiffon];
    "Graphviz Maps" [URL="#GraphvizClickable", sides=9, color=aquamarine2];
    "D3" [URL="#D3"];
    "Data" [URL="#Data"];
    "Plotly" [URL="#Plotly"];
    "Maps" [URL="#Maps"];
    "Stdlib" [URL="#Stdlib"];
    "Processes" [URL="#Processes"];
    "ThreeJS" [URL="#Three"];
    "P5JS" [URL="#P5JS"];
    "Mermaid" [URL="#Mermaid"];
    "jsPsych" [URL="#JSPsych"];
    "Sankey" [URL="#Sankey"];
    "Crossword" [URL="#Crossword"];
  }

  subgraph cluster_3 {
    label="Toys";
    rankdir="TB";

    "top3" [style=invis];

    "MadLibs" [URL="#MadLibs"];
    "Cuneiform" [URL="#Cuneiform"];
    "Mobius" [URL="#Mobius"];
    "Temperature" [URL="#Temperature"];
    "Vector Field" [URL="#VectorField"];
    "Tree" [URL="#Tree"];
    "Conic" [URL="#Conic"];
    "Vector Tree" [URL="#VectorTree"];
    "Dungeon" [URL="#Dungeon"];
    "Dungeon3D" [URL="#Games"];
    "Music" [URL="#Music"];
    "WordCloud" [URL="#WordCloud"];
    "Mathigon" [URL="#Mathigon"];
    "JSXGraph" [URL="#JSXGraph"];
  }

  subgraph cluster_4 {
    label="Advanced";
    rankdir="TB";

    "top4" [style=invis];

    "Typescript" [URL="#Typescript"];
    "Javascript" [URL="#Javascript"];
    "Gists" [URL="#Gists"];
    "Extensions" [URL="#Extensions"];
    "Brython" [URL="#Brython"];
    "YouTube" [URL="#YouTube"];
    "ES6" [URL="#ES6"];
    "Mandelbrot" [URL="#Mandelbrot"];
    "LDF" [URL="#LDF"];
    "OpenJSCAD" [URL="#OpenJSCAD"];
    "Inlines" [URL="#Inlines"];
    "Kiosk" [URL="#Kiosk"];
    "React" [URL="#React"];
  }

  "top1" -> "top2" -> "top3" -> "top4"  [style=invis];

  "P5JS" -> "Conic";
  "P5JS" -> "Mobius";
  "P5JS" -> "Tree";
  "P5JS" -> "Vector Field";
  "P5JS" -> "Vector Tree";
  "P5JS" -> "Dungeon3D";
  "P5JS" -> "Mandelbrot";

  "D3" -> "Processes";
  "D3" -> "Maps";

}
```

---

[Gallery Home](:@Home)
