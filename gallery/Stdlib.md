### `stdlib` Experiments

[stdlib](https://stdlib.io) is a Javascript library supporting both NodeJS and web browsers. Quoting the authors:

> Stdlib is a standard library for JavaScript and Node.js, with an emphasis on numeric computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

The examples below are adapted from various `stdlib` documentation examples, although many uses of `console.log()` have been replaced with writing to Smartdown variables and having these variables rendered via Smartdown cells. The other minor change needed to use `stdlib` within Smartdown is to replace usage of `require('@stdlib/foo/bar')` with a reference to Smartdown's namesspaced version `stdlib.foo.bar`. This is currently necessary because `stdlib` is being bundled (via Webpack) with Smartdown. Eventually, this will be replaced with a more dynamic mechanism.

The source for this example can be viewed and transiently edited at [Smartdown Stdlib Example](https://smartdown.site/?url=lib/gallery/Stdlib.md)


#### CDF Experiments

Trying to plot the CDF for various $\sigma$ and $\mu$ versions of the normal distribution.

Based upon the Stdlib examples:

- https://stdlib.io/develop/docs/api/@stdlib/math/base/dists/normal/cdf
- https://stdlib.io/develop/docs/api/@stdlib/plot/ctor/


```stdlib/playable/autoplay

const thisDiv = this.div;

var toHTML = Stdlib.vdomToHtml;
var randn = stdlib.random.base.boxMuller;
var Plot = stdlib.plot;
var cdf = stdlib.stats.base.dists.normal.cdf;

var x = new Float64Array( 100 );
var y1 = new Float64Array( x.length );
var y2 = new Float64Array( x.length );
var y3 = new Float64Array( x.length );
var y4 = new Float64Array( x.length );
for (var i = 0; i < x.length; i++) {
  x[ i ] = (((i + 1) * 1.0) - x.length / 2) / 25.0;
  y1[ i ] = cdf(x[i], 0, 1);
  y2[ i ] = cdf(x[i], 0, 0.5);
  y3[ i ] = cdf(x[i], 0, 0.2);
  y4[ i ] = cdf(x[i], 0, 0.1);
}

var h = new Plot(
    [x, x, x, x],
    [y1, y2, y3, y4],
    {
      yMin: -0.1,
      yMax: 1.1,
      'description': 'Plotting the CDF of the Normal Distribution',
      'title': 'CDF of the Normal Distribution for various σ',
      'labels': [
        'σ = 1',
        'σ = 0.5',
        'σ = 0.2',
        'σ = 0.1'
      ],
      lineWidth: 5,
      width: 450,
      paddingLeft: 30,
      paddingRight: 50,
    });

thisDiv.innerHTML = Stdlib.vdomToHtml( h.render() );
```

---

### Incremental Classification

From the example in the documentation at [incrBinaryClassification](https://stdlib.io/docs/api/latest/@stdlib/ml/incr/binary-classification).

I honestly don't understand this example (yet), I've just transliterated it to Smartdown.

```javascript /stdlib/playable/autoplay
// var normal = require( '@stdlib/random/base/normal' );
// var binomial = require( '@stdlib/random/base/binomial' );
// var array = require( '@stdlib/ndarray/array' );
// var exp = require( '@stdlib/math/base/special/exp' );
// var incrBinaryClassification = require( '@stdlib/ml/incr/binary-classification' );

const binomial = stdlib.random.base.binomial;
const normal = stdlib.random.base.normal;
const array = stdlib.ndarray.array;
const exp = stdlib.math.base.special.exp;
const incrBinaryClassification = stdlib.ml.incr.incrBinaryClassification;

// Create a new accumulator:
const acc = incrBinaryClassification( 2, {
  'intercept': true,
  'lambda': 1.0e-3,
  'loss': 'log'
});

// Incrementally update the classification model...
var phat;
var x;
var i;
for ( i = 0; i < 10000; i++ ) {
  x = array( [ normal( 0.0, 1.0 ), normal( 0.0, 1.0 ) ] );
  phat = 1.0 / ( 1.0+exp( -( ( 3.0*x.get(0) ) - ( 2.0*x.get(1) ) + 1.0 ) ) );
  acc( x, ( binomial( 1, phat ) ) ? 1.0 : -1.0 );
}

// Retrieve model coefficients:
var coefs = acc();
console.log( 'Feature coefficients: %d, %d', coefs.get( 0 ), coefs.get( 1 ) );
console.log( 'Intercept: %d', coefs.get( 2 ) );

// Format model coefficients:

const markdownCoefficientsOutput =
`
### Model Coefficients

|Coefficient|Value|
|:---:|---:|
|coefs.get( 0 )|${coefs.get( 0 )}|
|coefs.get( 1 )|${coefs.get( 1 )}|
|coefs.get( 2 )|${coefs.get( 2 )}|

`;

smartdown.setVariable('MarkdownCoefficientsOutput', markdownCoefficientsOutput);

// Predict new observations...
x = array( [ [ 0.9, 0.1 ], [ 0.1, 0.9 ], [ 0.9, 0.9 ] ] );

const xPrediction = acc.predict( x );
console.log( 'x = [%d, %d]; label = %d', x.get( 0, 0 ), x.get( 0, 1 ), xPrediction.get( 0 ) );
console.log( 'x = [%d, %d]; label = %d', x.get( 1, 0 ), x.get( 1, 1 ), xPrediction.get( 1 ) );
console.log( 'x = [%d, %d]; label = %d', x.get( 2, 0 ), x.get( 2, 1 ), xPrediction.get( 2 ) );

const probabilityPrediction = acc.predict( x, 'probability' );
console.log( 'x = [%d, %d]; P(y=1|x) = %d', x.get( 0, 0 ), x.get( 0, 1 ), probabilityPrediction.get( 0 ) );
console.log( 'x = [%d, %d]; P(y=1|x) = %d', x.get( 1, 0 ), x.get( 1, 1 ), probabilityPrediction.get( 1 ) );
console.log( 'x = [%d, %d]; P(y=1|x) = %d', x.get( 2, 0 ), x.get( 2, 1 ), probabilityPrediction.get( 2 ) );

const linearPrediction = acc.predict( x, 'linear' );
console.log( 'x = [%d, %d]; lp = %d', x.get( 0, 0 ), x.get( 0, 1 ), linearPrediction.get( 0 ) );
console.log( 'x = [%d, %d]; lp = %d', x.get( 1, 0 ), x.get( 1, 1 ), linearPrediction.get( 1 ) );
console.log( 'x = [%d, %d]; lp = %d', x.get( 2, 0 ), x.get( 2, 1 ), linearPrediction.get( 2 ) );

var markdownXOutput =
`
### \`x\` prediction

|x|Prediction|
|:---:|---:|
|\`x.get( 0, 0 ), x.get( 0, 1 )\`|${xPrediction.get( 0 )}|
|\`x.get( 1, 0 ), x.get( 1, 1 )\`|${xPrediction.get( 1 )}|
|\`x.get( 2, 0 ), x.get( 2, 1 )\`|${xPrediction.get( 2 )}|
`;

var markdownProbabilityOutput =
`
### \`probability\` prediction

|x|Prediction|
|:---:|---:|
|\`x.get( 0, 0 ), x.get( 0, 1 )\`|${probabilityPrediction.get( 0 )}|
|\`x.get( 1, 0 ), x.get( 1, 1 )\`|${probabilityPrediction.get( 1 )}|
|\`x.get( 2, 0 ), x.get( 2, 1 )\`|${probabilityPrediction.get( 2 )}|
`;

var markdownLinearOutput =
`
### \`linear\` prediction

|x|Prediction|
|:---:|---:|
|\`x.get( 0, 0 ), x.get( 0, 1 )\`|${linearPrediction.get( 0 )}|
|\`x.get( 1, 0 ), x.get( 1, 1 )\`|${linearPrediction.get( 1 )}|
|\`x.get( 2, 0 ), x.get( 2, 1 )\`|${linearPrediction.get( 2 )}|
`;

smartdown.setVariable('MarkdownXOutput', markdownXOutput);
smartdown.setVariable('MarkdownProbabilityOutput', markdownProbabilityOutput);
smartdown.setVariable('MarkdownLinearOutput', markdownLinearOutput);
```

[](:!MarkdownCoefficientsOutput|markdown)
[](:!MarkdownXOutput|markdown)
[](:!MarkdownProbabilityOutput|markdown)
[](:!MarkdownLinearOutput|markdown)

---

#### Unicode Sparklines

From https://stdlib.io/develop/docs/api/@stdlib/plot/sparklines/unicode/column

For this example, we modify the use of `console.log()` to instead place the Unicode sparkline into a Smartdown variable, where it will be rendered automatically as it is updated.

##### The Generated Plot
[](:!SparklinePlot)


##### The `stdlib.plot.sparklines.unicode.column` script

```javascript/playable
//smartdown.import=stdlib

var randu = stdlib.random.base.randu;
var columnChart = stdlib.plot.sparklines.unicode.UnicodeColumnChartSparkline;

var chart;
var data;
var id;
var i;

// Generate some random data...
data = new Float64Array( 30 );
for ( i = 0; i < data.length; i++ ) {
  data[ i ] = randu() * 100.0;
}

// Create a new column chart:
chart = columnChart();

// Set the chart data:
chart.data = data;

// Configure the chart to support streaming data:
chart.window = data.length;
chart.yMin = 0.0;
chart.yMax = 100.0;

// Update the terminal chart with new data every second:
id = setInterval( update, 1000 );

// After some time, stop updating and close:
setTimeout( stop, 20000 );

function update() {
  // Update the chart with new data:
  chart.push( randu() * 100.0 );

  var rendered = chart.render();
  smartdown.setVariable('SparklinePlot', rendered);
}

function stop() {
  clearInterval( id );
}
```

---

#### Plots

Adapted from https://stdlib.io/develop/docs/api/@stdlib/plot/ctor

This example generates a plot as *virtual DOM*, which is then converted to HTML prior to rendering within the Smartdown-created playable's div (`this.div`).


```javascript/playable
//smartdown.import=stdlib

const thisDiv = this.div;

var toHTML = Stdlib.vdomToHtml;
var randn = stdlib.random.base.boxMuller;
var Plot = stdlib.plot;

var now;
var x;
var y;
var i;

// Create some data...
now = ( new Date() ).getTime();
x = new Float64Array( 100 );
y = new Float64Array( x.length );
for ( i = 0; i < x.length; i++ ) {
  x[ i ] = now + (i * 360000);
  y[ i ] = 50.0 + (10.0 * randn());
}

// Create a new plot:
var h = new Plot( [x], [y], {
    'width': 500,
    'height': 500,
    'xScale': 'time',
    'xTickFormat': '%H:%M'
});

// Render as a virtual DOM tree:
var vtree = h.render();
// console.log( JSON.stringify( vtree ) );
smartdown.setVariable('treeJSON', vtree);

// Transform the virtual DOM tree to HTML:
var html = toHTML( vtree );
// console.log( html );
thisDiv.innerHTML = html;

```

##### The generated virtual DOM Tree

[](:!treeJSON|json)


---

#### NLP (Natural Language Processing)

Derived from this example https://stdlib.io/docs/api/v0.0.90/@stdlib/nlp/lda, the following playable will utilize the [SOTU State of the Union Dataset](https://stdlib.io/docs/api/v0.0.90/@stdlib/datasets/sotu) to perform a simple clustering of the speech texts into three main *themes*.

This example also uses the [English Stop Words Dataset](https://stdlib.io/docs/api/v0.0.90/@stdlib/datasets/stopwords-en).


##### Smartdown outputs

The following smartdown cells will be populated with values generated by the `stdlib` script below. They are initially empty or undefined.

###### Stopwords
[](:!stopwords)

###### State of the Union Texts (first 100 characters)
[](:!speechTexts)

###### Average $\theta$ per topic
[](:!yearsMD|markdown)

###### Top words associated with each topic
[](:!topicMD|markdown)


###### The playable `stdlib` example.

```javascript/playable
//smartdown.import=stdlib

var that = this;

// Hack to keep the progress bar up while everything happens in
// this long-running script. Better would be a smartdown.setProgress()
// method that would not leak the implementation details.
//
var saveProgress = this.progress; // Oh, the hack
this.progress = null;

Stdlib.loadSOTU(function() {
  var roundn = stdlib.math.base.special.roundn;
  var stopwords = Stdlib.datasets['stopwords_en'];
  var lda = stdlib.nlp.lda;

  var STOPWORDS = stopwords();
  var terms;
  var model;
  var str;
  var i;

  smartdown.setVariable('stopwords', STOPWORDS);

  function getText(e) {
    function remove(word) {
      var RE = new RegExp('\\b' + word + '\\b', 'gi');
      str = str.replace(RE, '');
    }

    str = e.text.toLowerCase();
    STOPWORDS.forEach(remove);
    return str;
  }

  var startYear = 1930;
  var endYear = 2020;

  var speechTexts = null;
  var speeches = Stdlib.datasets['sotu-data']();

  speechTexts = speeches.reduce(
                      function (
                        accumulator,
                        speech,
                        currentIndex,
                        array) {
                        if (speech.year >= startYear && speech.year <= endYear) {
                          accumulator.push(getText(speech));
                        }
                        return accumulator;
                      },
                      []);

  var trimmedTexts = speeches.map(function(speech, index, array) {
    return speech.year + ': ' + speech.text.slice(0, 100);
  });
  smartdown.setVariable('speechTexts', trimmedTexts);

  model = lda(speechTexts, 3);

  // model.fit(1000, 100, 10);
  model.fit(100, 50, 10);

  // Safari (at least on my machine) will timeout and Chrome will give a warning
  // if we try to execute too many iterations, so I'm using smaller parameters than would
  // be used in a non-browser context. Perhaps Service Workers would alleviate this?
  //

  var yearsMD = '|Year|Topic 1 Average $\\theta$|Topic 2 Average $\\theta$|Topic 3 Average $\\theta$|\n|:---|---:|---:|---:|\n';
  for (i = 0; i < speechTexts.length; i++) {
    var year = (startYear + i);
    var theta0 = roundn(model.avgTheta.get(i, 0), -3);
    var theta1 = roundn(model.avgTheta.get(i, 1), -3);
    var theta2 = roundn(model.avgTheta.get(i, 2), -3);

    str = 'Year: ' + year + '\t';
    str += 'Topic 1: ' + theta0 + '\t';
    str += 'Topic 2: ' + theta1 + '\t';
    str += 'Topic 3: ' + theta2;
    yearsMD += `|${year}|${theta0}|${theta1}|${theta2}|\n`;
  }
  yearsMD += '\n';

  smartdown.setVariable('yearsMD', yearsMD);

  var topicMD = '|Topic|Words Most Associated with Topic|\n|:---|:---|\n';
  var trim = stdlib.string.trim;
  var removePunctuation = stdlib.string.removePunctuation;

  for (var whichTopic = 0; whichTopic < 3; ++whichTopic) {
    terms = model.getTerms(whichTopic, 20);
    var topicString = `|Topic ${whichTopic}||\n`;

    for (i = 0; i < terms.length; i++) {
      terms[i] = terms[i].word;
      const stripped = trim(removePunctuation(terms[i]));
      if (stripped !== '' && stripped !== '-') {
        topicString += `||${terms[i]}|\n`;
      }
    }

    var termsString = terms.join(', ');

    topicMD += topicString;
  }

  smartdown.setVariable('topicMD', topicMD);

  saveProgress.style.display = 'none';
});
```

---

#### Use Graphviz to display `stdlib` functions

This is a *very quick hack* to demonstrate the synergy between Smartdown's playables, variables, and cells. It uses Graphviz to display the heirarchical structure of the `stdlib` namespace. For this example, we are only displaying the heirarchy under `stdlib.math`.

[More Graphviz examples](:@Graphviz)

[](:!plot|code)

[](:!plot|graphviz)

```javascript /playable
//smartdown.import=stdlib

var index = 1;

function generateTree(rootIndex, rootfIndex, rootName, root) {
  var source =
`
"node${rootIndex}" [
    shape = "record"
    label = "`;

  if (!root) {
    return '';
  }

  var keys = Object.keys(root);
  var fIndex = 0;
  var subroot = [];

  keys.forEach(function(k) {
    ++fIndex;
    ++index;
    var v = root[k];
    var line = `  "${rootName}" -> "${k}";\n`;
    line = `<f${fIndex}> ${k}|`;
    source += line;

    if (typeof v === 'object') {
      subroot.push({
        v: v,
        k: k,
        index: index,
        fIndex: fIndex
      });
    }
  });
  source = source.slice(0, source.length - 1);
  source += '"\n];';

  subroot.forEach(function(subroot) {
    if (subroot.v) {
      source += generateTree(subroot.index, subroot.fIndex, subroot.k, subroot.v);
      source += `\n"node${rootIndex}":f${subroot.fIndex} -> "node${subroot.index}":f0;\n`;
    }
  });

  return source;
}

var tree = generateTree(1, 0, 'stdlib', stdlib.math);
var plot =
`
digraph G {
  rankdir = "LR"
  ranksep = 1.5
  ratio="compact"
  node [
    fontsize = "10"
    margin = "0"
    shape = "rectangle"
  ];
  edge [
  ];
  "node0" [
    label = "<f0> math"
    shape = "record"
  ];
  ${tree}
  "node0":f0 -> "node1":f1
}
`;
smartdown.setVariable('plot', plot);
```

---


[Back to Home](:@Home)

