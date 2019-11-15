/* global window */
/* global XMLHttpRequest */

const smartdown = window.smartdown;

/**
 * calc_handlers.js
 *
 * This file contains useful examples of Smartdown 'calc-handlers'.
 */

function calcWikidataImageUtil(thumb, key, body, done) {
  body = decodeURIComponent(body);
  function lookupComplete() {
    /* eslint no-invalid-this: 0 */
    var lookupResult = this.responseText;
    // console.log('lookupResult', JSON.parse(lookupResult));
    var parsedResult = JSON.parse(lookupResult).query.pages;

    var thumbs = [];
    parsedResult.forEach(function(val, idx) {
      if (thumb && val.thumbnail) {
        thumbs.push(val.thumbnail.source);
      }
      else if (!thumb && val.original) {
        thumbs.push(val.original.source);
      }
    });
    thumbs.elementType = 'image';
    done(thumbs);
  }

  var wdKey = body;
  if (body.indexOf('[') === 0) {
    var possibleJSONArray = JSON.parse(body);
    if (Array.isArray(possibleJSONArray)) {
      wdKey = '';
      possibleJSONArray.forEach(function(val, idx) {
        wdKey += val;
        if (idx < possibleJSONArray.length - 1) {
          wdKey += '|';
        }
      });
    }
  }

  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', lookupComplete);

  // https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&format=json&prop=pageimages&titles=Albert+Einstein&piprop=thumbnail%7Cname%7Coriginal&pithumbsize=300
  // /w/api.php?action=query&format=json&prop=pageimages&titles=Albert+Einstein&piprop=thumbnail%7Cname%7Coriginal&pithumbsize=300

  var url = 'https://en.wikipedia.org/w/api.php?action=query&prop=pageimages%7Cpageterms&format=json&origin=*&wbptterms=description&redirects=&formatversion=2';
  url += '&titles=' + encodeURI(wdKey);
  url += '&piprop=thumbnail%7Cname%7Coriginal&pithumbsize=300';

  /*
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', lookupComplete);
  var url = 'https://en.wikipedia.org/w/api.php?action=query&formatversion=2&prop=pageimages%7Cpageterms&';
  url += 'titles=' + encodeURI(wdKey);
  url += '&pilimit=3&piprop=thumbnail&wbptterms=description&redirects=&format=json&origin=*';
  */

  xhr.open('GET', url);
  xhr.send();
}

function calcWikidataImages(key, body, done) {
  return calcWikidataImageUtil(false, key, body, done);
}


function calcWikidataThumbs(key, body, done) {
  return calcWikidataImageUtil(true, key, body, done);
}


function calcWikidata(key, body, done) {
  body = decodeURIComponent(body);
  function lookupComplete() {
    /* eslint no-invalid-this: 0 */
    var lookupResult = this.responseText;
    // console.log('calcWikidata', JSON.parse(lookupResult));
    var parsedResult = JSON.parse(lookupResult).query.pages;
    // console.log('calcWikidata parsedResult', parsedResult);

    var info = [];
    window.lodashEach(parsedResult, function(val, idx) {
      // console.log('...val', val);
      info.push({
        title: val.displaytitle,
        url: val.canonicalurl
      });
    });
    info.elementType = 'title/url';
    done(info);
  }

  var wdKey = body;
  if (body.indexOf('[') === 0) {
    var possibleJSONArray = JSON.parse(body);
    if (Array.isArray(possibleJSONArray)) {
      wdKey = '';
      possibleJSONArray.forEach(function(val, idx) {
        wdKey += val;
        if (idx < possibleJSONArray.length - 1) {
          wdKey += '|';
        }
      });
    }
  }
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', lookupComplete);

  var url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&origin=*&redirects=';
  url += '&titles=' + encodeURI(wdKey);
  url += '&inprop=displaytitle%7Curl';

  // var url = 'https://en.wikipedia.org/w/api.php?action=query&formatversion=2&prop=pageimages%7Cpageterms&';
  // url += 'titles=' + encodeURI(wdKey);
  // url += '&pilimit=3&piprop=thumbnail&wbptterms=description&redirects=&format=json&origin=*';

  xhr.open('GET', url);
  xhr.send();
}


const tsvCalcHandlerCache = {};
function calcTSV(key, body, done) {
  body = decodeURIComponent(body);
  if (body.indexOf('/http') === 0) {
    body = body.slice(1);
  }
  const translatedURL = smartdown.expandHrefWithLinkRules(body);
  if (smartdown.d3) {
    const cacheKey = 'CACHE_' + key + '_' + translatedURL;

    let hit = tsvCalcHandlerCache[cacheKey];
    if (hit) {
      if (hit.inProgressHandlers.length > 0) {
        // console.log('MISS cacheKey adding handler', cacheKey);
        hit.inProgressHandlers.push(done);
      }
      else {
        // console.log('HIT cacheKey', cacheKey);
        done(hit.cachedResult);
      }
    }
    else {
      // console.log('MISS cacheKey', cacheKey);
      hit = tsvCalcHandlerCache[cacheKey] = {
        inProgressHandlers: [done],
        cachedResult: null,
      };

      smartdown.axios.get(translatedURL).then(function(result) {
        const tsvRows = smartdown.d3.tsvParseRows(result.data);
        hit.cachedResult = tsvRows;
        // console.log('hit.inProgressHandlers.length', cacheKey, hit.inProgressHandlers.length);
        while (hit.inProgressHandlers.length > 0) {
          const doneHandler = hit.inProgressHandlers.pop();
          doneHandler(tsvRows);
        }
      }).catch(function(err) {
        console.log('err', err);
      });
    }
  }
  else {
    smartdown.ensureExtension('d3', function() {
      calcTSV(key, translatedURL, done);
    });
  }
}


const csvCalcHandlerCache = {};
function calcCSV(key, body, done) {
  body = decodeURIComponent(body);
  if (body.indexOf('/http') === 0) {
    body = body.slice(1);
  }
  const translatedURL = smartdown.expandHrefWithLinkRules(body);
  if (smartdown.d3) {
    const cacheKey = 'CACHE_' + key + '_' + translatedURL;

    let hit = csvCalcHandlerCache[cacheKey];
    if (hit) {
      if (hit.inProgressHandlers.length > 0) {
        console.log('MISS cacheKey adding handler', cacheKey);
        hit.inProgressHandlers.push(done);
      }
      else {
        // console.log('HIT cacheKey', cacheKey);
        done(hit.cachedResult);
      }
    }
    else {
      console.log('MISS cacheKey', cacheKey);
      hit = csvCalcHandlerCache[cacheKey] = {
        inProgressHandlers: [done],
        cachedResult: null,
      };

      smartdown.axios.get(translatedURL).then(function(result) {
        const csvRows = smartdown.d3.csvParseRows(result.data);
        hit.cachedResult = csvRows;
        // console.log('hit.inProgressHandlers.length', cacheKey, hit.inProgressHandlers.length);
        while (hit.inProgressHandlers.length > 0) {
          const doneHandler = hit.inProgressHandlers.pop();
          doneHandler(csvRows);
        }
      }).catch(function(err) {
        console.log('err', err);
      });
    }
  }
  else {
    smartdown.ensureExtension('d3', function() {
      calcCSV(key, translatedURL, done);
    });
  }
}


smartdown.defaultCalcHandlers = {
  wikidataImages: calcWikidataImages,
  wikidataThumbs: calcWikidataThumbs,
  wikidata: calcWikidata,
  tsv: calcTSV,
  csv: calcCSV,
};
