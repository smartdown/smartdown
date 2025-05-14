
#### Data Visualization - Word Cloud

Let's accumulate the `tags` for each video and build a word cloud!

We'll use [d3-cloud](https://github.com/jasondavies/d3-cloud).


##### Generate Tags

```javascript/playable/autoplay
var tagList = [
  {
    text: 'Cherry',
    size: 40
  },
  {
    text: 'Apple',
    size: 30
  },
  {
    text: 'Strawberry',
    size: 25
  },
  {
    text: 'Orange',
    size: 15
  },
  {
    text: 'Grape',
    size: 10
  },
  {
    text: 'Banana',
    size: 7
  },
  {
    text: 'Mango',
    size: 3
  },
];

smartdown.setVariable('TagList', tagList);

```

[](:!TagList|json)


##### Draw Them

```d3/playable/autoplay
var renderDiv = this.div;
this.dependOn = ['TagList'];
this.depend = function() {
  renderDiv.innerHTML = '';
  renderDiv.style.background = 'black !important';
  renderDiv.style.margin = 'auto';
  var bounds = renderDiv.getBoundingClientRect();
  var width = bounds.width;

  var cloud = smartdown.d3cloud;
  words = env.TagList;

  if (!words || words.length === 0) {
    // pass
  }
  else {
    var fill = d3.scaleOrdinal(d3.schemeAccent);
    var layout = cloud()
        .size([width, width])
        .words(words)
        .padding(5)
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .font("Impact")
        .fontSize(function(d) { return 10 * d.size; })
        .on("end", draw);

    layout.start();

    function draw(words) {
      var svg = d3.select(renderDiv).append("svg")
          .attr("width", layout.size()[0])
          .attr("height", layout.size()[1]);

      svg
        .append("rect")
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("fill", "darkgray");

      svg.append("g")
          .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
        .selectAll("text")
          .data(words)
        .enter().append("text")
          .style("font-size", function(d) { return d.size + "px"; })
          .style("font-family", "Impact")
          .style("fill", function(d, i) { return fill(i); })
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function(d) { return d.text; });

      window.setTimeout(function() {
        renderDiv.scrollIntoView();
      }, 1000);
    }
  }
};

```

---

[Back to Home](:@Home)
