var themeName="";function scrollToSubHash(e){let t=!0;if(e){const s=document.getElementById(e);s&&(t=!1,window.setTimeout((()=>{s.scrollIntoView({behavior:"smooth"})}),300))}t&&window.scrollTo({top:0,behavior:"smooth"})}function starter(e,t){var s="Home",o="https://unpkg.com/smartdown/dist/",n=o+"lib/resources/",a=window.location.origin+window.location.pathname,r="",i="gist/",l="#smartdown-output",c=null,d={cloud:"/gallery/resources/cloud.jpg",badge:"/gallery/resources/badge.svg",hypercube:"/gallery/resources/Hypercube.svg",StalactiteStalagmite:"/gallery/resources/StalactiteStalagmite.svg",church:"/gallery/resources/church.svg",lighthouse:"/gallery/resources/lighthouse.svg",barn:"/gallery/resources/barn.svg","medieval-gate":"/gallery/resources/medieval-gate.svg"},m={},u="",h="",f="";"string"==typeof smartdownBaseURL&&(o=smartdownBaseURL),"string"==typeof smartdownResourceURL&&(n=smartdownResourceURL),"string"==typeof smartdownDefaultHome&&(s=smartdownDefaultHome),"string"==typeof smartdownGistPathPrefix&&(r=smartdownGistPathPrefix),"string"==typeof smartdownGistHashPrefix&&(i=smartdownGistHashPrefix),"string"==typeof smartdownRawPrefix&&(a=smartdownRawPrefix),"string"==typeof smartdownOutputDivSelector&&(l=smartdownOutputDivSelector),"function"==typeof smartdownPostLoadMutator&&(c=smartdownPostLoadMutator),"object"==typeof smartdownMedia&&(d=Object.assign(d,smartdownMedia));var p=a;function g(e,t,o,n){var r=new XMLHttpRequest;r.addEventListener("load",(function(){!function(e,t,o,n,r){c&&(e=c(e,t,o,s)),m=smartdown.partitionMultipart(e);var i=document.getElementById(n);u="#"+t,p!==a&&(u="#"+o);let l=window.location.search;""!==themeName&&(l=`?theme=${themeName}`);let d="_default_";if(0!==t.indexOf("http:")&&0!==t.indexOf("https:")&&t.indexOf(":")>=0){const e=t.split(":");d=e[e.length-1]}smartdown.setHome(m[d],i,(function(){let e="#"+t;r&&"undefined"!==r&&(e+="#"+r),history.pushState({},"",window.location.pathname+e+l),scrollToSubHash(r),i.id||(i.id="smartdown-output-"+String(Math.random()).slice(2)),smartdown.startAutoplay(i)}))}(this.responseText,e,t,o,n)})),r.open("GET",t),r.send()}function w(e,t){let s=null,o=null;0!==e.indexOf("#")&&(e="#"+e);const n=e.split("#");if(n.length>1){if(s=n[1],o=n[2],""!==u&&"#"+s===u)return history.replaceState({},"",window.location.pathname+e),void scrollToSubHash(o)}else console.log("... illformatted cardKeyWithHash",e);var c=new RegExp("^/?("+r+")?"+i+"([^/]+)/([^/]+)(/(\\w*))?$","g").exec(s);if(c){h=c[2],f=c[3];var d=c[5]||"Home";s=d}var w=m[s];if(w){var x=document.querySelectorAll(l)[0];smartdown.setHome(w,x,(function(){x.id||(x.id="smartdown-output-"+String(Math.random()).slice(2)),smartdown.startAutoplay(x)}))}else if(0===s.indexOf("http")){h="",f="";var v=s.lastIndexOf("/");v>0&&(p=s.slice(0,v+1)),g(s,s,t,o)}else if(0===s.indexOf("/"))h="",f="",p=a,g(s,s,t);else if(""!==h&&""!==f){var y="https://api.github.com/gists/"+f,b=new XMLHttpRequest;b.addEventListener("load",(function(){var e=JSON.parse(this.responseText).files[s+".md"];if(e){var n=e.raw_url;s=i+h+"/"+f+"/"+s,p="https://gist.githubusercontent.com/"+h+"/"+f+"/raw/",g(s,n,t,o)}else console.log('Unable to locate Gist for "',s,'" ',y)})),b.open("GET",y),b.send()}else if(s.indexOf(":")>=0){const e=s.split(":").slice(0,-1).join(":");g(s,p+(""===e?"":e+".md"),t,o)}else{h="",f="";const e=s.endsWith(".md")?"":".md";let n=p+s+e;p.endsWith("/public/smartdown/")&&(n=p.split("/").slice(0,-2).join("/")+"/"+s+e),g(s,n,t,o)}}function x(e){var t=document.getElementById("smartdown-outer-container");t&&""!==e&&([...t.classList].forEach((e=>{0===e.indexOf("smartdown-theme-")&&t.classList.remove(e)})),t.classList.add(`smartdown-theme-${e}`))}var v=smartdown.defaultCalcHandlers;function y(){var e=p,t=window.location.hash,s=t.indexOf("?");if(s>=0&&(t=t.slice(0,s)),r.length>0&&window.location.pathname.endsWith(r)){var o="^/?("+r+")?"+i+"([^/]+)/([^/]+)(/(\\w*))?$";(n=new RegExp(o,"g").exec(t))&&(e="https://gist.githubusercontent.com/"+n[2].replace("#","")+"/"+n[3]+"/raw/")}else if(i.length>0&&0===t.indexOf("#"+i))o="^#"+i+"([^/]+)/([^/]+)(/(\\w*))?$",(n=new RegExp(o,"g").exec(t))&&(e="https://gist.githubusercontent.com/"+n[1]+"/"+n[2]+"/raw/");else if(0===t.indexOf("#https://gist.githubusercontent.com/")){var n;o="^#https://gist.githubusercontent.com/([^/]+)/([^/]+)/.*$",(n=new RegExp(o,"g").exec(t))&&(e="https://gist.githubusercontent.com/"+n[1]+"/"+n[2]+"/raw/")}return e}const b=[{prefix:"/block/",replace:y},{prefix:"block/",replace:y},{prefix:"assets/",replace:a+"assets/"},{prefix:"/assets/",replace:a+"assets/"},{prefix:"content/",replace:a+"content/"},{prefix:"/content/",replace:a+"content/"},{prefix:"/gallery/resources/",replace:""===n?"/gallery/resources/":n},{prefix:"/gallery/DataElements.csv",replace:"/smartdown/"===o?"/smartdown/gallery/DataElements.csv":"/gallery/DataElements.csv"},{prefix:"/resources/",replace:""===n?"/resources/":n}];window.onhashchange=function(e){e.preventDefault(),e.stopImmediatePropagation();const t=e.oldURL,o=t.indexOf("#"),n=t.indexOf("?");let a="";n>=0&&(a=o>n?t.slice(n,o-1):t.slice(n));var r=window.location.hash,i="",c=r.indexOf("?");if(c>=0&&(i=r.slice(c+1),r=r.slice(0,c),0===i.indexOf("theme=")&&x(themeName=i.slice("theme=".length))),u===r)scrollToSubHash();else{var d=r.slice(1);""===d?d=s:-1===d.indexOf("/")&&(h="",f="",d="#"+d);let e=null;const t=d.split("#");t.length>1&&(d=t[1],e=t[2],""===d&&(d=u),d=d+"#"+e+a),w(d,document.querySelectorAll(l)[0].id)}return!1},t||(t=function(){!function(e){var t=window.location.hash;if(e){var o=t.split("/"),n=e.split("/");t=e,4===n.length&&4===o.length&&(n[3]=o[3],t=n.join("/"))}var a=window.location.search,r="",i=t.indexOf("?");i>=0&&(r=t.slice(i+1),t=t.slice(0,i),0===r.indexOf("theme=")&&(themeName=r.slice("theme=".length))),""===themeName&&0===a.indexOf("?theme=")&&(themeName=a.slice("?theme=".length)),x(themeName),""===t&&(t=s),w(t,document.querySelectorAll(l)[0].id)}(e)}),smartdown.initialize(d,o,t,w,v,b)}window.smartdownStarter=starter;