## Welcome to Smartdown

Smartdown is a *declarative*, *literate* and *reactive* authoring technology for writing technical and non-technical documents that are compelling and easy to share and publish within many existing forums and blogging systems. Smartdown is designed for blogging, technical communication, and teaching. Smartdown simplifies the creation of *Explorable Explanations*, which are prose documents with embedded interactive content such as charts, graphs, and featherweight programs called *playables*.

Smartdown extends the simple expressivity of the [Markdown](https://en.wikipedia.org/wiki/Markdown) language commonly used on blogs, messaging systems, technical forums, and on [GitHub](https://help.github.com/articles/basic-writing-and-formatting-syntax/). The Smartdown **engine** is a Javascript library that interprets the content in these Smartdown source files and enacts the desired behavior and presentation.

### Explore

Use the navigation buttons below to explore different aspects of Smartdown. You can always go [Back to Home](:@Home).

|Media|Data/Science|Toys|Advanced|
|:---:|:---:|:---:|:---:|
|[Readme](:@README)|[Graphviz](:@Graphviz)|[MadLibs](:@MadLibs)|[Typescript](:@Typescript)|
|[Markdown](:@Markdown)|[D3](:@D3)|[Cuneiform](:@Cuneiform)|[Javascript](:@Javascript)|
|[Math](:@Math)|[Data](:@Data)|[Mobius](:@Mobius)|[Gists](:@Gists)|
|[Images](:@Images)|[Plotly](:@Plotly)|[Temperature](:@Temperature)|[Extensions](:@Extensions)|
|[Multicards](:@Multicards)|[Maps](:@Maps)|[Vector Field](:@VectorField)|[Brython](:@Brython)|
|[Video](:@Video)|[Stdlib](:@Stdlib)|[Tree](:@Tree)|[YouTube](:@YouTube)|
|[GIF/Audio](:@GIFAndAudio)|[Processes](:@Processes)|[Conic](:@Conic)|[ES6](:@ES6)|
|[Decorations](:@Decorations)|[ThreeJS](:@Three)|[VectorTree](:@VectorTree)|[Mandelbrot](:@Mandelbrot)|
|[Cells](:@Cells)|[P5JS](:@P5JS)|[Dungeon](:@Dungeon)|[LDF](:@LDF)|
|[Disclosables](:@Disclosables)|[Mermaid](:@Mermaid)|[Dungeon3D](:@Games)|[OpenJSCAD](:@OpenJSCAD)|
|[SVG](:@SVG)|[jsPsych](:@JSPsych)|[Music](:@Music)|[Inlines](:@Inlines)|
|[Disclosables++](:@DisclosablesPlus)|[Sankey](:@Sankey)|[WordCloud](:@WordCloud)|[Kiosk](:@Kiosk)|
|[Swatch](:@Swatch)|[Astronomy (WIP)](:@Astronomy)|[Crossword](:@Crossword)|[React](:@React)|
|[Tweets](:@Tweets)|[GraphvizClickable](:@GraphvizClickable)|[JSXGraph](:@JSXGraph)|[Filament](:@Filament)|
|||||

---

#### Basic Features

- [GitHub-flavored Markdown](https://guides.github.com/features/mastering-markdown/) to make it easy to write simple and complex prose and documentation.
- [MathJax](https://www.mathjax.org) including Latex and AsciiMath syntax, chemical notation via [`mhchem`](https://mhchem.github.io/MathJax-mhchem/)
- Code fragment syntax highlighting via [highlight.js](https://highlightjs.org).
- Media embedding support including Images, Tweets, SVG, Video, GIF.

#### Advanced Features

Smartdown is unique in the way that it integrates text with interactive *cells*, *variables* and *playables*. This enables the development of lightweight interactive documents that have the power and expressivity of a web application, but are more easily authored and published. Although Smartdown was designed for instructional and explanatory purposes, its power and expressivity rivals or surpasses that of [Jupyter Notebooks](https://jupyter.org), making it suitable for *data science* exploration and presentation.

Unique features of Smartdown include:

- Reactive *cells* similar to those in a spreadsheet, but inlined with Smartdown prose. These cells can be use for input, output, calculation, navigation, and for interacting with internet APIs such as Wikidata.
- A simple, but expressive *reactive process model* that integrates Smartdown cells with Smartdown playables.
- The ability to structure a Smartdown document as a set of *cards* which can be hyperlinked to provide guided navigation.
- A rich and extensible set of *playables*, which are similar to the *embeddables* found in many blogging systems, but can interact with each other and the document itself. The current default set of playables includes:
	- [P5JS](https://p5js.org) supports drawing-based visualizations, games, sound and much more.
	- [D3.js](https://d3js.org), [D3fc](https://d3fc.io), [Plotly.js](https://plot.ly/javascript/), and [threejs](https://threejs.org) support data visualizations including plots, charts, maps, and much more.
	- [Leaflet.js](https://leafletjs.com) enables easy embedding of geo-based data and maps.
	- [Graphviz via `viz.js`](https://github.com/mdaines/viz.js) is a long-lived standard format for technical and scientific diagrams.
	- Custom Javascript Playables simplify integration and enhance expressivity of the document.
	- (coming soon) [Go](https://github.com/gopherjs/gopherjs) playables provide a typed language and a rich set of concurrency and communication capabilities.
