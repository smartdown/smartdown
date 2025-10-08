### YouTube API Experiments

I was playing with the [YouTube Data API](https://developers.google.com/youtube/v3/) and here are some preliminary examples. I'm just trying to get used to the API and generate some nice visuals and links from Music Videos.

#### API Key Setup

```javascript/autoplay/playable
var apiKey = 'AIzaSyAhQapyEL6ky715vot_AUqF9s6UWufgmMo';

smartdown.setVariable('APIKey', apiKey);
smartdown.setVariable('videoCategoryId', '10');

```

[API Key](:?APIKey)

#### Get Video Categories

Using the [YouTube Data API Explorer](https://developers.google.com/apis-explorer/?hl=en_US#p/youtube/v3/), we discover that the function [youtube.videos.list](https://developers.google.com/apis-explorer/?hl=en_US#p/youtube/v3/youtube.videos.list) seems to be a good way to list videos, but that you need to restrict it with a `videoCategoryId`. So let's see what the available video category Ids exist by using the [youtube.videoCategories.list](https://developers.google.com/apis-explorer/?hl=en_US#p/youtube/v3/youtube.videoCategories.list).

##### Get JSON Result

Since this is a Smartdown document, we'll save the JSON results in a Smartdown variable called `CategoriesJSON` and display those results in a table.

```javascript/autoplay/playable
this.dependOn = ['APIKey'];
this.depend = function() {
  var apiKey = env.APIKey;

  var url = `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=${apiKey}`;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = false;
  xhr.addEventListener("load", function() {
    var sourceText = this.responseText;
    var json = JSON.parse(sourceText);
    smartdown.setVariable('CategoriesJSON', json, 'json');
  });
  xhr.open("GET", url);
  xhr.send();
};

```

[](:!CategoriesJSON)

##### Format JSON as a List

We could format the JSON as a Markdown table, but it will be more compact to just generate a list of `name/id` pairs.

```javascript/playable/autoplay
this.dependOn = ['CategoriesJSON'];
this.depend = function() {
  var json = env.CategoriesJSON;

  let list = '';

  if (json.error && json.error.errors.length > 0) {
    console.log('CategoriesJSON error', json.error.message);
  }
  else {
    var items = json.items;
    items.forEach(item => {
      var snippet = item.snippet;
      list += `\`${snippet.title}/${item.id}\` `;
    });
  }

  smartdown.setVariable('CategoriesList', list);
};

```

[Category/Id Pairs](:!CategoriesList|markdown)


#### Get a list of Music Videos

The table above indicates that category id `10` corresponds to `Music`, and that id `1` corresponds to `Film & Animation`. After experimenting with the API, I've found that many of the categories appear to be empty. So to provide some flexibility, we'll store the category id in a Smartdown variable called `videoCategoryId` and add an input cell and add a few convenience buttons so that you can change it if you want and the video list will be recomputed. I've included buttons for the categories I've tried that contain videos.

[Film & Animation](:=videoCategoryId=1) [Autos & Vehicles](:=videoCategoryId=2) [Music](:=videoCategoryId=10) [Sports](:=videoCategoryId=17) [Travel & Events](:=videoCategoryId=19) [Gaming](:=videoCategoryId=20) [Comedy](:=videoCategoryId=23) [Entertainment](:=videoCategoryId=24) [Howto & Style](:=videoCategoryId=26) [Science & Technology](:=videoCategoryId=28)

[Video Category Id](:?videoCategoryId)


##### Get JSON Results

```javascript/playable/autoplay
this.dependOn = ['videoCategoryId', 'APIKey'];
this.depend = function() {
  var maxResults = 5;
  var apiKey = env.APIKey;
  var videoCategoryId = env.videoCategoryId;
  var url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&maxResults=${maxResults}&chart=mostPopular&videoCategoryId=${videoCategoryId}&key=${apiKey}`;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = false;
  xhr.addEventListener("load", function() {
    var sourceText = this.responseText;
    var json = JSON.parse(sourceText);
    smartdown.setVariable('VideosJSON', json, 'json');
  });
  xhr.open("GET", url);
  xhr.send();
};
```

[](:!VideosJSON)

##### Format JSON as a List

```javascript/playable/autoplay
this.dependOn = ['VideosJSON'];
this.depend = function() {
  var videosJSON = env.VideosJSON;
  let list = '\n\n|Video|Title|Tags|\n|:---:|:---|:---|\n';

  if (videosJSON.error && videosJSON.error.errors.length > 0) {
    console.log('videosJSON error', videosJSON.error.message);
  }
  else {
    var items = videosJSON.items;

    items.forEach(item => {
      var snippet = item.snippet;
      var thumb = snippet.thumbnails.default.url;
      var thumbMax = snippet.thumbnails.maxres ?
                      snippet.thumbnails.maxres.url :
                      snippet.thumbnails.high.url;
      var tags = '';
      if (snippet.tags) {
        snippet.tags.forEach(tag => {
          tags += `${tag} `;
        });
      }
      var vidLink = `https://www.youtube.com/watch?v=${item.id}`;
      var cleanTitle = snippet.title.replace(/[\n\r|]/g, 'Y');
      var line = `|![thumbnail](${vidLink})|**${cleanTitle}**|${tags}|\n`;
      list += line;
    });
    list += '\n\n';
  }

  smartdown.setVariable('VideosList', list, 'markdown');
};
```

#### Display the List of Videos

[](:!VideosList|markdown)


#### Data Visualization - Word Cloud

Let's accumulate the `tags` for each video and build a word cloud!


##### Get Tags

```javascript/playable/autoplay
this.dependOn = ['VideosJSON'];
this.depend = function() {
  var videosJSON = env.VideosJSON;
  var tagList = [];

  if (videosJSON.error && videosJSON.error.errors.length > 0) {
    console.log('videosJSON error', videosJSON.error.message);
  }
  else {
    var items = videosJSON.items;

    tagCounts = {};

    items.forEach(item => {
      if (item.snippet.tags) {
        item.snippet.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });

    for (var tag in tagCounts) {
      var count = tagCounts[tag];
      tagList.push({
        text: tag,
        size: 50 * count * count,  // 20 + 10 * count * count * count * count
      });
    }
  }

  smartdown.setVariable('TagList', tagList);
};

```

[](:!TagList|json)


##### Draw Them

```d3/playable/autoplay
var renderDiv = this.div;
this.dependOn = ['TagList'];
this.depend = function() {
  renderDiv.innerHTML = '';
  renderDiv.style.margin = 'auto';
  renderDiv.style.width = '100%';
  renderDiv.style.height = '100%';
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
        .fontSize(function(d) { return d.size; })
        .on("end", draw);

    layout.start();

    function draw(words) {
      d3.select(renderDiv).append("svg")
          .attr("width", layout.size()[0])
          .attr("height", layout.size()[1])
        .append("g")
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


[Film & Animation](:=videoCategoryId=1) [Autos & Vehicles](:=videoCategoryId=2) [Music](:=videoCategoryId=10) [Sports](:=videoCategoryId=17) [Travel & Events](:=videoCategoryId=19) [Gaming](:=videoCategoryId=20) [Comedy](:=videoCategoryId=23) [Entertainment](:=videoCategoryId=24) [Howto & Style](:=videoCategoryId=26) [Science & Technology](:=videoCategoryId=28)


---

[Back to Home](:@Home)


