### Sankey diagram

We'll use [d3-sankey](https://github.com/d3/d3-sankey).

The following example inspired by a post on StackOverflow: [D3v5 Sankey Diagram add Drag&Drop](https://stackoverflow.com/questions/58377761/d3v5-sankey-diagram-add-dragdrop), which provided the first usable d3V5 example for me.


```d3 /playable/autoplay

smartdown.importCssCode(
`
rect.node {
  /*cursor: move; */
  fill-opacity: .9;
  shape-rendering: crispEdges;
}

.node title {
  pointer-events: none;
  text-shadow: 0 1px 0 #fff;
}

.link {
  fill: none;
  stroke: #000;
  stroke-opacity: .2;
}

.link:hover {
  stroke-opacity: .5;
}
`);

this.div.innerHTML =
`
  <div>
    <svg id='chart'></svg>
  </div>
`;



var units = "Links";

var margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  },
  width = 900 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

// the function for moving the nodes
function dragmove(d) {
  console.log(d3.event);
  /*???
  sankey.update(graph);
  */

}

const d3color = d3.scaleOrdinal(d3.schemeCategory10);
const color = function(name) {
  const result = d3color(name.replace(/ .*/, ""));
  return result;
}
var format = function(d) {
  const f = d3.format(",.0f");
  return f(d);
}

// append the svg canvas to the page
var svg = d3.select("#chart")
  //.attr("viewBox", [0, 0, width, height]);;
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

// Set the sankey diagram properties
const sankey = d3.sankey()
  .nodeAlign(d3.sankeyJustify)
  .nodeWidth(15)
  .nodePadding(10)
  .extent([
    [margin.top, margin.left],
    [width - margin.right, height - margin.bottom]
  ]);

const data = {
  links: [{
      source: 1,
      target: 0,
      value: 1
    },
    {
      source: 3,
      target: 2,
      value: 24
    },
    {
      source: 5,
      target: 4,
      value: 1
    },
    {
      source: 5,
      target: 6,
      value: 1
    },
    {
      source: 7,
      target: 6,
      value: 2
    },
    {
      source: 9,
      target: 8,
      value: 2
    },
    {
      source: 11,
      target: 10,
      value: 32
    },
    {
      source: 11,
      target: 4,
      value: 32
    },
    {
      source: 11,
      target: 12,
      value: 32
    },
    {
      source: 11,
      target: 13,
      value: 32
    },
    {
      source: 11,
      target: 14,
      value: 30
    },
    {
      source: 11,
      target: 15,
      value: 32
    },
    {
      source: 11,
      target: 16,
      value: 32
    },
    {
      source: 17,
      target: 6,
      value: 3
    },
    {
      source: 18,
      target: 4,
      value: 1
    },
    {
      source: 19,
      target: 2,
      value: 62
    },
    {
      source: 20,
      target: 6,
      value: 7
    },
    {
      source: 21,
      target: 6,
      value: 1
    },
    {
      source: 23,
      target: 22,
      value: 7
    },
    {
      source: 23,
      target: 4,
      value: 18
    },
    {
      source: 23,
      target: 6,
      value: 15
    },
    {
      source: 23,
      target: 24,
      value: 2
    },
    {
      source: 25,
      target: 6,
      value: 1
    },
    {
      source: 26,
      target: 4,
      value: 1
    },
    {
      source: 26,
      target: 6,
      value: 1
    },
    {
      source: 28,
      target: 27,
      value: 24
    },
    {
      source: 28,
      target: 29,
      value: 1
    },
    {
      source: 28,
      target: 2,
      value: 24
    },
    {
      source: 28,
      target: 30,
      value: 24
    },
    {
      source: 28,
      target: 10,
      value: 24
    },
    {
      source: 28,
      target: 12,
      value: 10
    },
    {
      source: 28,
      target: 31,
      value: 12
    },
    {
      source: 28,
      target: 32,
      value: 9
    },
    {
      source: 28,
      target: 33,
      value: 24
    },
    {
      source: 28,
      target: 14,
      value: 22
    },
    {
      source: 34,
      target: 6,
      value: 1
    },
    {
      source: 35,
      target: 24,
      value: 1
    },
    {
      source: 36,
      target: 27,
      value: 12
    },
    {
      source: 36,
      target: 37,
      value: 12
    },
    {
      source: 36,
      target: 14,
      value: 12
    },
    {
      source: 38,
      target: 4,
      value: 3
    },
    {
      source: 38,
      target: 6,
      value: 1
    },
    {
      source: 38,
      target: 39,
      value: 1
    },
    {
      source: 40,
      target: 22,
      value: 8
    },
    {
      source: 40,
      target: 4,
      value: 6
    },
    {
      source: 40,
      target: 41,
      value: 1
    },
    {
      source: 40,
      target: 42,
      value: 6
    },
    {
      source: 43,
      target: 30,
      value: 21
    },
    {
      source: 44,
      target: 6,
      value: 1
    },
    {
      source: 45,
      target: 10,
      value: 1
    },
    {
      source: 45,
      target: 4,
      value: 5
    },
    {
      source: 45,
      target: 42,
      value: 2
    },
    {
      source: 45,
      target: 6,
      value: 2
    },
    {
      source: 46,
      target: 4,
      value: 3
    },
    {
      source: 46,
      target: 6,
      value: 1
    },
    {
      source: 47,
      target: 4,
      value: 7
    },
    {
      source: 47,
      target: 41,
      value: 9
    },
    {
      source: 47,
      target: 42,
      value: 6
    },
    {
      source: 47,
      target: 6,
      value: 6
    },
    {
      source: 48,
      target: 6,
      value: 1
    },
    {
      source: 49,
      target: 4,
      value: 3
    },
    {
      source: 49,
      target: 6,
      value: 13
    },
    {
      source: 49,
      target: 24,
      value: 1
    },
    {
      source: 50,
      target: 4,
      value: 1
    },
    {
      source: 51,
      target: 4,
      value: 1
    },
    {
      source: 51,
      target: 41,
      value: 6
    },
    {
      source: 51,
      target: 42,
      value: 3
    },
    {
      source: 51,
      target: 6,
      value: 11
    },
    {
      source: 52,
      target: 4,
      value: 3
    },
    {
      source: 52,
      target: 6,
      value: 1
    },
    {
      source: 53,
      target: 4,
      value: 1
    },
    {
      source: 53,
      target: 39,
      value: 1
    },
    {
      source: 54,
      target: 22,
      value: 2
    },
    {
      source: 54,
      target: 41,
      value: 7
    },
    {
      source: 56,
      target: 55,
      value: 3
    },
    {
      source: 57,
      target: 27,
      value: 4
    },
    {
      source: 57,
      target: 30,
      value: 4
    },
    {
      source: 57,
      target: 10,
      value: 4
    },
    {
      source: 57,
      target: 4,
      value: 4
    },
    {
      source: 57,
      target: 58,
      value: 4
    },
    {
      source: 59,
      target: 4,
      value: 3
    },
    {
      source: 59,
      target: 60,
      value: 2
    },
    {
      source: 59,
      target: 41,
      value: 5
    },
    {
      source: 59,
      target: 6,
      value: 5
    },
    {
      source: 59,
      target: 24,
      value: 1
    },
    {
      source: 61,
      target: 4,
      value: 1
    },
    {
      source: 61,
      target: 6,
      value: 1
    },
    {
      source: 62,
      target: 6,
      value: 1
    },
    {
      source: 63,
      target: 41,
      value: 1
    },
    {
      source: 63,
      target: 6,
      value: 1
    },
    {
      source: 64,
      target: 4,
      value: 1
    },
    {
      source: 65,
      target: 6,
      value: 1
    }
  ],
  nodes: [{
      value: 1,
      name: 'site1'
    },
    {
      value: 1,
      name: 'site2'
    },
    {
      value: 110,
      name: 'site3'
    },
    {
      value: 24,
      name: 'site4'
    },
    {
      value: 95,
      name: 'site5'
    },
    {
      value: 2,
      name: 'site6'
    },
    {
      value: 78,
      name: 'site7'
    },
    {
      value: 2,
      name: 'site8'
    },
    {
      value: 2,
      name: 'site9'
    },
    {
      value: 2,
      name: 'site10'
    },
    {
      value: 61,
      name: 'site11'
    },
    {
      value: 222,
      name: 'site12'
    },
    {
      value: 42,
      name: 'site13'
    },
    {
      value: 32,
      name: 'site14'
    },
    {
      value: 64,
      name: 'site15'
    },
    {
      value: 32,
      name: 'site16'
    },
    {
      value: 32,
      name: 'site17'
    },
    {
      value: 3,
      name: 'site18'
    },
    {
      value: 1,
      name: 'site19'
    },
    {
      value: 62,
      name: 'site20'
    },
    {
      value: 7,
      name: 'site21'
    },
    {
      value: 1,
      name: 'site22'
    },
    {
      value: 17,
      name: 'site23'
    },
    {
      value: 42,
      name: 'site24'
    },
    {
      value: 5,
      name: 'site25'
    },
    {
      value: 1,
      name: 'site26'
    },
    {
      value: 2,
      name: 'site27'
    },
    {
      value: 40,
      name: 'site28'
    },
    {
      value: 174,
      name: 'site29'
    },
    {
      value: 1,
      name: 'site30'
    },
    {
      value: 49,
      name: 'site31'
    },
    {
      value: 12,
      name: 'site32'
    },
    {
      value: 9,
      name: 'site33'
    },
    {
      value: 24,
      name: 'site34'
    },
    {
      value: 1,
      name: 'site35'
    },
    {
      value: 1,
      name: 'site36'
    },
    {
      value: 36,
      name: 'site37'
    },
    {
      value: 12,
      name: 'site38'
    },
    {
      value: 5,
      name: 'site39'
    },
    {
      value: 2,
      name: 'site40'
    },
    {
      value: 21,
      name: 'site41'
    },
    {
      value: 29,
      name: 'site42'
    },
    {
      value: 17,
      name: 'site43'
    },
    {
      value: 21,
      name: 'site44'
    },
    {
      value: 1,
      name: 'site45'
    },
    {
      value: 10,
      name: 'site46'
    },
    {
      value: 4,
      name: 'site47'
    },
    {
      value: 28,
      name: 'site48'
    },
    {
      value: 1,
      name: 'site49'
    },
    {
      value: 17,
      name: 'site50'
    },
    {
      value: 1,
      name: 'site51'
    },
    {
      value: 21,
      name: 'site52'
    },
    {
      value: 4,
      name: 'site53'
    },
    {
      value: 2,
      name: 'site54'
    },
    {
      value: 9,
      name: 'site55'
    },
    {
      value: 3,
      name: 'site56'
    },
    {
      value: 3,
      name: 'site57'
    },
    {
      value: 20,
      name: 'site58'
    },
    {
      value: 4,
      name: 'site59'
    },
    {
      value: 16,
      name: 'site60'
    },
    {
      value: 2,
      name: 'site61'
    },
    {
      value: 2,
      name: 'site62'
    },
    {
      value: 1,
      name: 'site63'
    },
    {
      value: 2,
      name: 'site64'
    },
    {
      value: 1,
      name: 'site65'
    },
    {
      value: 1,
      name: 'site66'
    }
  ]
};


const graph = sankey(data);

const node = svg.append("g")
  .attr("stroke", "#000")
  .selectAll("rect")
  .data(graph.nodes)
  .join("rect")
  .attr("class", "node")
  .attr("x", d => d.x0)
  .attr("y", d => d.y0)
  .attr("height", d => d.y1 - d.y0)
  .attr("width", d => d.x1 - d.x0)
  .attr("fill", d => d.color = color(d.name))
  .style("stroke", d => d3.rgb(d.color).darker(2))
  .call(d3.drag()
    .subject(function(d) { return d; })
    .on("start", function() { this.parentNode.appendChild(this); })
    .on("drag", dragmove));

 node.append("title")
  .text(d => d.name + ': ' + format(d.value))


const link = svg.append("g")
  .attr("fill", "none")
  .selectAll("g")
  .data(graph.links)
  .join("g")
  .style("mix-blend-mode", "multiply")
  .attr("class", "link");

var count = 0;
function Id(id) {
  this.id = id;
  this.href = new URL(`#${id}`, location) + "";
}
Id.prototype.toString = function() {
  return "url(" + this.href + ")";
};
function genUID() {
  return new Id("O-link-" + ++count);
}

const gradient = link.append("linearGradient")
  .attr("id", d => {
    d.uid = genUID();
    return d.uid.id;
  })
  .attr("id", d => (d.uid = genUID()).id)
  .attr("gradientUnits", "userSpaceOnUse")
  .attr("x1", d => d.source.x1)
  .attr("x2", d => d.target.x0);

gradient.append("stop")
  .attr("offset", "0%")
  .attr("stop-color", d => color(d.source.name));

gradient.append("stop")
  .attr("offset", "100%")
  .attr("stop-color", d => color(d.target.name));

link.append("path")
  .attr("d", d3.sankeyLinkHorizontal())
  .attr("stroke", d => d.uid)
  .attr("stroke-width", d => Math.max(1, d.width));

link.append("title")
  .text(d => d.source.name + ' → ' + d.target.name + ': ' + format(d.value));

svg.append("g")
  .style("font", "10px sans-serif")
  .selectAll("text")
  .data(graph.nodes)
  .join("text")
  .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
  .attr("y", d => (d.y1 + d.y0) / 2)
  .attr("dy", "0.35em")
  .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
  .text(d => d.name);

/*
// the function for moving the nodes
  function dragmove(d) {
    d3.select(this).attr("transform",
        "translate(" + d.x + "," + (
                d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
            ) + ")");
    sankey.relayout();
    link.attr("d", d3.sankeyLinkHorizontal());
  }*/

```



---

[Back to Home](:@Home)
