### Linked Data Fragments

A few years ago, I learned about [Linked Data Fragments](https://linkeddatafragments.org) (LDF), which is an architecture and software that allows existing knowledge graph data sources to be expressed and made available to web browser clients or other software agents. The basic idea is that a knowledge graph can be made web-accessible via a [Triple Pattern Fragment](https://linkeddatafragments.org/in-depth/#tpf) (TPF) server, and that client software can either query the server with a *triple query*, or can translate a [SPARQL](https://en.wikipedia.org/wiki/SPARQL) query into a set of triple queries. This architecture is efficient, and reduces the amount of software and complexity needed by a potential knowledge graph provider, thereby liberating more knowledge to be available in a web-wide way.

My current understanding, based upon [What is a Linked Data Fragment?](https://linkeddatafragments.org/in-depth/#ldf) is that LDF is a superset of TPF; TPF servers need only provide triple-query access to their data, whereas an LDF server can provide additional means to deliver triple-sets as query results.

#### LDF Servers

As of this writing, there are several [datasets](https://linkeddatafragments.org/data/) that are accessible via LDF servers. This document will attempt to focus on two of them:
- [Wikidata Query Service (WDQS)](https://www.mediawiki.org/wiki/Wikidata_Query_Service/User_Manual) at [Wikidata](https://query.wikidata.org/bigdata/ldf)
- [DBpedia](https://fragments.dbpedia.org)

This document will focus on Wikidata, although I plan to enhance it or write an equivalent version for DBPedia.


##### Bugs in WDQS

This document is sort of broken, because the [Wikidata Query Service (WDQS)](https://www.mediawiki.org/wiki/Wikidata_Query_Service/User_Manual) is sort of broken right now with respect to TPF service. The Comunica/Sparql example should work, and I've hacked the TPF examples so that they return partial results even when the server fails.

The bug at WDQS is related to the TPF paging mechanism, where 100 results are returned, along with a link to `next` and `previous` pages. The `&page=2` parameter *sometimes* breaks things. For example, the following URL will return the first page of 100 results containing the `rdfs:label` triples for Beatles member George Harrison:
- https://query.wikidata.org/bigdata/ldf?subject=http://www.wikidata.org/entity/Q2643&predicate=http://www.w3.org/2000/01/rdf-schema%23label

But clicking on the `next` button will fail with a `java.lang.IllegalStateException`:
- https://query.wikidata.org/bigdata/ldf?subject=http://www.wikidata.org/entity/Q2643&predicate=http://www.w3.org/2000/01/rdf-schema%23label&page=2

Another problem with WDQS and their LDF server is that there appears to be a recent change in the WDQS that has broken the ability to apply `LANG` and `LANGMATCHES` functions, so I've simplified some of the WDQS examples accordingly.

*As of November 9, 2019, the TPF endpoint for WQDS is quite broken. [https://query.wikidata.org/bigdata/ldf](https://query.wikidata.org/bigdata/ldf) no longer returns a usable webpage, due to broken links. The DBPedia example is working fine, however.*

#### LDF Clients

When I originally explored LDF, I used the Javascript client library [Client.js](https://github.com/LinkedDataFragments/Client.js) to access Wikidata's LDF server.

Recently, the team that developed the above `Client.js` has built a successor product known as [Comunica](https://comunica.linkeddatafragments.org) that should provide triple-query and SPARQL query capability.

This document will attempt to use both the legacy `Client.js` and the Comunica client [library](https://github.com/comunica/comunica/tree/master/packages/actor-init-sparql#usage-within-application) to access Wikidata TPF services.

- The number of results returned by `Client.js` and `Comunica` for seemingly identical queries is different. I haven't figured out why yet.


### The Beatles Example

The *toy* example we'll be using will be to query a knowledge graph such as WikiData or DBpedia to ask the following question:

> Give me a list of Beatles that includes their *name* and a URL pointing to an *image* of that Beatle band member.

The specific *subject* and *predicate* will differ between DBpedia and Wikidata, but the basic query should be specifiable and answerable. Because Wikidata supports multiple languages, there will be multiple results returned that differ only in the language of the name. For example, 'Paul McCartney' vs 'Paul MacCartney'.

In order to keep the size of the result set small, we'd like to filter for English only answers. Ordinarily, we'd use a SPARQL `FILTER` expression to filter using `LANGMATCHES` and `LANG`, but because of limitations (hopefully temporary) in Wikidata's TPF interface, we'll instead filter to eliminate non-English letters: `FILTER(REGEX(?name, "^[a-zA-Z ]+$"))`. It's a *total hack* around the Wikidata bug.

### Wikidata via SPARQL

From the [Wikidata](https://wikidata.org) home page:

> Wikidata is a free and open knowledge base that can be read and edited by both humans and machines.

There are various ways to query Wikidata via web-accessible APIs; this document explores the use of SPARQL. However, we'll be taking advantage of the Wikidata TPF interface to demonstrate the use of `Client.js` and its successor `Comunica`, both of which provide a way to use SPARQL in the browser while talking to non-SPARQL (TPF) services. We'll also include an example of using Wikidata's SPARQL endpoint, for completeness.


### Performance Comparisons

The playables on this page have probably completed by the time you read this, and their elapsed time has been recorded in the table below. Note that this is *very crude* timing, because some of the SPARQL queries are competing for network and CPU against the loading of images in the background. A more legitimate test would eliminate the image loading, or at least defer it. This is still a work in progress.

|Test|Time (ms)|
|:---|---:|
|Comunica and Wikidata/SPARQL| [](:!cwsTime) |
|Client.js and Wikidata/TPF| [](:!lwtTime) |
|Client.js and Wikidata/SPARQL| (not implemented) |
|Comunica and Wikidata/TPF| [](:!cwtTime) |


#### Comunica and Wikidata/SPARQL

Let's use Comunica to communicate with Wikidata's SPARQL endpoint, rather than using the TPF interface.

Note that the Wikidata SPARQL endpoint doesn't have the same problem with language tags as the TPF interface, so we can use `FILTER LANGMATCHES(LANG(?name), "EN")` to restrict results to English language. So this experiment will produce 12 results.

```javascript /playable/autoplay
//smartdown.import=https://cdn.jsdelivr.net/gh/rdfjs/comunica-browser/versions/latest/packages/actor-init-sparql/comunica-browser.js

function fixupName(s) {
  let ss = s.replace(/^"(.*)"(\^\^(.*))?$/, '$1');
  return ss;
}

function fixupURL(s) {
  let ss = s.replace(/^http:/, 'https:');
  return ss;
}

const query =
`
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX wdp: <http://www.wikidata.org/prop/direct/>
PREFIX wde: <http://www.wikidata.org/entity/>

SELECT DISTINCT ?name ?image WHERE {
  wde:Q1299 wdp:P527 ?beatle .
  ?beatle rdfs:label ?name .
  ?beatle wdp:P18 ?image .
  FILTER LANGMATCHES(LANG(?name), "EN")
}
`;

var t0 = performance.now();

Comunica.newEngine().query(query,
  { sources: [ { type: 'sparql', value: 'https://query.wikidata.org/sparql' } ] })
  .then(function (result) {
    const triples = [];
    result.bindingsStream.on('data', function (data) {
      triples.push({
        name: data.get('?name').value,
        image: data.get('?image').value,
      });
    });
    result.bindingsStream.on('end', function () {
      var t1 = performance.now();
      let table = '\n\n';

      table += '|Name|Image|\n';
      table += '|:---|:---|\n';

      triples.forEach(triple => {
        const name = fixupName(triple.name);
        const image = fixupURL(triple.image);

        table += `|${name}|![icon](${image})|\n`;
      });
      table += '\n\n\n';

      smartdown.setVariable('cwsTableLength', triples.length);
      smartdown.setVariable('cwsTime', t1 - t0);
      smartdown.setVariable('cwsTable', table, 'markdown');
    });
  })
  .catch(function (err) {
    console.log('err', err);
  });

```

- Request Time: [](:!cwsTime)ms.
- Number of Results: [](:!cwsTableLength)rows.
[](:!cwsTable|markdown)


#### Client.js and Wikidata/TPF

We'll start with an experiment using `Client.js` to query the *somewhat broken* Wikidata TPF interface at https://query.wikidata.org/bigdata/ldf. The *somewhat broken* refers to the fact that language tags are not being returned by Wikidata TPF, and that datatype annotations are being left suffixed to the returned values. We work around this by:
- Use `FILTER(REGEX(?name, "^[a-zA-Z ]+$"))` to restrict names to English alphabetic characters. This is instead of the more obvious `LANGMATCHES` function, which doesn't currently work in Wikidata TPF.
- We postprocess the results with `fixupName()` to remove the  datatype suffix (and any language suffix, if that ever starts working again).
- We postprocess the returned image URL to use `https`, to avoid a Mixed Content error with non-HTTPS URLs being referenced from an HTTP site.

As a result, our query will return names like 'John Lennon', as well as 'Ioannes Lennon', 'John Lennon perez', and so on.

**This `Client.js` experiment currently produces 17 results, which is different from the `Comunica` experiment which produces 25 results. Not sure why this is yet.**


```javascript /playable/autoplay
//smartdown.import=https://unpkg.com/smartdown/dist/lib/ldf-client-browser.js
var ldf = window.ldf;
ldf.Logger.setLevel('NOTICE');

let fragmentServer = 'https://query.wikidata.org/bigdata/ldf';


function fixupName(s) {
  let ss = s.replace(/^"(.*)"(\^\^(.*))?$/, '$1');
  return ss;
}

function fixupURL(s) {
  let ss = s.replace(/^http:/, 'https:');
  return ss;
}

const query =
`
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX wdp: <http://www.wikidata.org/prop/direct/>
PREFIX wde: <http://www.wikidata.org/entity/>

SELECT DISTINCT ?name ?image WHERE {
  wde:Q1299 wdp:P527 ?beatle .
  ?beatle rdfs:label ?name .
  ?beatle wdp:P18 ?image .
  FILTER(REGEX(?name, "^[a-zA-Z ]+$"))
}
`;

this.dependOn = ['cwsTime'];
this.depend = function() {
  var triples = [];
  var fragmentsClient = new ldf.FragmentsClient(fragmentServer);

  var t0 = performance.now();

  function formatTriples() {
    var t1 = performance.now();

    let table = '\n\n';

    table += '|Name|Image|\n';
    table += '|:---|:---|\n';

    triples.forEach(triple => {
      const name = fixupName(triple.name);
      const image = fixupURL(triple.image);

      table += `|${name}|![icon](${image})|\n`;
    });
    table += '\n\n\n';

    smartdown.setVariable('lwtTableLength', triples.length);
    smartdown.setVariable('lwtTime', t1 - t0);
    smartdown.setVariable('lwtTable', table, 'markdown');
  }
  var results = new ldf.SparqlIterator(
    query,
    {
      fragmentsClient: fragmentsClient
    });

  results.on('data', function(result) {
    triples.push({
      name: result['?name'],
      image: result['?image'],
    });
  });

  results.on('end', function(result) {
    formatTriples();
  });

  results.on('error', function(result) {
    console.log('###errorlwt', result);
    formatTriples();
  });
};
```

- Request Time: [](:!lwtTime)ms.
- Number of Results: [](:!lwtTableLength)rows.

[](:!lwtTable|markdown)



#### Comunica and Wikidata/TPF

The Comunica query currently (as of July 17, 2019) takes about 3 to 4 times longer than the legacy `Client.js` query, so wait a little for this query to complete.

```javascript /playable/autoplay
//smartdown.import=https://cdn.jsdelivr.net/gh/rdfjs/comunica-browser/versions/latest/packages/actor-init-sparql/comunica-browser.js

function fixupName(s) {
  let ss = s.replace(/^"(.*)"(\^\^(.*))?$/, '$1');
  return ss;
}

function fixupURL(s) {
  let ss = s.replace(/^http:/, 'https:');
  return ss;
}

let query =
`
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX wdp: <http://www.wikidata.org/prop/direct/>
PREFIX wde: <http://www.wikidata.org/entity/>

SELECT ?name ?image WHERE {
  wde:Q1299 wdp:P527 ?beatle .
  ?beatle rdfs:label ?name .
  ?beatle wdp:P18 ?image .
  FILTER(REGEX(?name, "^[a-zA-Z ]+$"))
}
`;

this.dependOn = ['lwtTime'];
this.depend = function() {
  var t0 = performance.now();

  Comunica.newEngine().query(
    query,
    {
      sources: [
        {
          type: '',
          value: 'https://query.wikidata.org/bigdata/ldf'
        }
      ]
    })
    .then(function (result) {
      const triples = [];

      function formatTriples() {
        var t1 = performance.now();
        let table = '\n\n';

        table += '|Name|Image|\n';
        table += '|:---|:---|\n';

        triples.forEach(triple => {
          const name = fixupName(triple.name);
          const image = fixupURL(triple.image);

          table += `|${name}|![icon](${image})|\n`;
        });
        table += '\n\n\n';

        smartdown.setVariable('cwtTime', t1 - t0);
        smartdown.setVariable('cwtTableLength', triples.length);
        smartdown.setVariable('cwtTable', table, 'markdown');
      }

      result.bindingsStream.on('data', function (data) {
        triples.push({
          name: data.get('?name').value,
          image: data.get('?image').value,
        });
      });
      result.bindingsStream.on('end', function () {
        formatTriples();
      });
      result.bindingsStream.on('error', function (error) {
        console.log('###errorcwt', error);
        formatTriples();
      });
    })
    .catch(function (error) {
      console.log('###exceptioncwt', error);
      formatTriples();
    });
};

```

- Request Time: [](:!cwtTime)ms.
- Number of Results: [](:!cwtTableLength)rows.

[](:!cwtTable|markdown)



---

The source for this [Smartdown](https://smartdown.io) document should be available [here](/LDF.md) and via [GitHub](https://github.com/smartdown/gallery/blob/master/LDF.md).

---

[Back to Home](:@Home)
