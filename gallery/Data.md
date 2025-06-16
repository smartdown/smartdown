### Data Access

One of the goals of Smartdown is to enable authors to easily express rich interactive experiences that enable a reader to explore and experience real-world data. This data may be *static* or *dynamic*.

One of the constraints that Smartdown typically operates under is the assumption that it is running in a web browser without a corresponding server to *drive* behavior or to *deliver* data. But in modern web environments, this is a challenge and an opportunity.

*The Smartdown calc_handlers that are used here for examples are still in active development, and may change or be enhanced as we understand our users' needs better. However, there is value in publishing even provisional documentation.*

*In other words, this is a Draft document.*

#### Static Data

An example of static data is a [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) file that contains reference data that is (mostly) unchanging, like the [List of Chemical Elements](https://en.wikipedia.org/wiki/List_of_chemical_elements).

Smartdown makes it easy to assign the contents of this CSV file to a Smartdown variable, without having to deal with Javascript programming, or at least reducing the amount of Javascript programming. To support the following examples, we've provided a CSV file at [/gallery/DataElements.tsv](/gallery/DataElements.tsv).


##### Loading the Element Data

[Load Elements](:=ElementList=/csv/gallery/DataElements.csv)

##### Displaying the Element Data as JSON

By default, Smartdown formats values from variables in an *appropriate* type. Since the Elements data is a JSON value derived from the imported CSV file, Smartdown will display it with a JSON-based display.

[Elements](:!ElementList)


##### Visualizing the data, a stupid example

For no other reason than to generate pretty graphics, let's use a [plotly.js]() playable to draw a pie chart based upon the *length* of the element name. This is, from a chemistry/physics point of view, meaningless. But it will give us a colorful diagram.



```plotly/playable/autoplay
var layout = {
    title: 'Element Name Lengths',
    autosize: true,
    width: 600,
    height: 600,
    margin: {
      t: 200, b: 0, l: 0, r: 0
    }
};

var renderDiv = this.div;
renderDiv.innerHTML = '<h1>Click the "Load Elements" button above</h1>';
this.dependOn = ['ElementList'];
this.depend = function() {
  var elementList = env.ElementList;
  var elementFirstLetterMap = {};
  elementList.forEach((e) => {
    var firstLetter = e[2][0];
    elementFirstLetterMap[firstLetter] =
      elementFirstLetterMap[firstLetter] ?
        elementFirstLetterMap[firstLetter] + 1 : 1;
  });

  var elementFirstLetterList = Object.keys(elementFirstLetterMap);
  var elementFirstLetterCounts = elementFirstLetterList.map((e) => {
    return elementFirstLetterMap[e];
  });

  var plot = {
    values: elementFirstLetterCounts,
    labels: elementFirstLetterList,
    text: elementFirstLetterList,
    type:   'pie',
    hoverinfo: 'text',
    hole: .4
  };

  Plotly.newPlot(renderDiv,
    [plot],
    layout,
    {displayModeBar: false} );
};

```


#### Dynamic Data

Smartdown is designed to provide a way for readers of a published document to interact and explore data which might be located in internet-accessible databases or services. So rather than loading an entire dataset as in the above Static example, we want to *query* an external service. Usually, we want to pass some sort of *parameters* or *arguments* along with our query. The same calc_handler tech we used to extend Smartdown to support CSV and TSV extraction from a remote file can be used to query external services.

In the examples below, we are exploring the use of [Wikidata](https://www.wikidata.org) as a data source.

The Wikidata calc_handler is currently limited to producing image URLs or WikiPedia URls in response to a query.

##### Hardcoded Examples

- [Albert Einstein|Marie Curie|Max Plank (Slash, Thumbnails)](:=HCLOOKUP=/wikidataThumbs/Albert%20Einstein|Marie%20Curie|Max%20Plank)
- [Albert Einstein (Falcor, Thumbnails)](:=HCLOOKUP=/wikidataThumbs["Albert%20Einstein"])
- [Albert Einstein|Marie Curie|Max Plank (Slash, Original)](:=HCLOOKUP=/wikidataImages/Albert%20Einstein|Marie%20Curie|Max%20Plank)
- [Albert Einstein (Falcor, Original)](:=HCLOOKUP=/wikidataImages["Albert%20Einstein"])

- [Lookup result](:!HCLOOKUP)

##### Dynamic Examples


[WHAT do you want to look up?](:?WHAT)

Examples:
- Earth
- Penguin
- Uranium
- Oregon
- Abraham Lincoln
- [`WHAT`](:=LOOKUP=/wikidata["`WHAT`"])
- [`WHAT` thumbnails](:=LOOKUP=/wikidataThumbs["`WHAT`"])
- [`WHAT` images](:=LOOKUP=/wikidataImages["`WHAT`"])

- [Lookup result](:!LOOKUP)

---

[](:!LOOKUP)

---


#### Summary of best practice, before we talk about CORS

- Store data files *near* where your Smartdown document is. That will allow you to use relative paths and ensure you don't run into CORS issues.

#### CORS Issues (Advanced)

One of the current downsides of the web at this point in time (2019) is that there are many web-accessible data files and services, but often these lack support for [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing). Briefly, web browsers are designed to be very careful about what a webpage can access in order to ensure privacy and security, so they make it easy to access data from the same *origin* as the user's current web page, but make it *challenging* to access resources from other origins (an *origin* is the beginning of a URL, for example: `https://smartdown.github.io/` is an origin.

This default security is great for ordinary web usage, but gets in the way of advanced web applications like Smartdown, which would like to access resources from various sites. For example, the website [Science Notes](https://sciencenotes.org/list-elements-atomic-number/) provides a version of the Elements CSV at [elementlist.csv](https://sciencenotes.org/PDFs/elementlist.csv). However, Smartdown (or any browser-based application whose origin is different from `https://sciencenotes.org`) cannot access that version of the CSV *programmatically* via the [XMLHttpRequest]() mechanism normally used by browser-based apps.

This is because the [Science Notes](https://sciencenotes.org/list-elements-atomic-number/) website does not (yet?) support CORS headers, which are a web mechanism to allow a site like Science Notes to provide that resource in a safe and secure manner, such that the browser will allow it.

The following example will try to load the CSV file from Science Notes and will be denied by your browser's security mechanism.

[This 'Load Elements' Will Fail](:=ElementList2=/csv/https://sciencenotes.org/PDFs/elementlist.csv)

[Elements via Science Notes](:!ElementList2)

*Note: Depending on your browser and your default settings, it is possible that the above request will work.*


##### Using a CORS Proxy

If you are writing a Smartdown document and wish to access a resource that is denied because it doesn't support CORS, then you can sometimes take advantage of a *cross-origin proxy service* like [https://yacdn.org/proxy/](https://yacdn.org/proxy/).

**Do Not Use such a service for any form of secure data. This is because a proxy service passes data through a server and can therefore read any data.**

[This 'Load Elements' Uses a Proxy](:=ElementList3=/csv/https://yacdn.org/proxy/https://sciencenotes.org/PDFs/elementlist.csv)

[Elements via Proxy](:!ElementList3)

---

[Back to Home](:@Home)

