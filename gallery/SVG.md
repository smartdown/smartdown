### SVG Icons and Images

Smartdown enables SVG images to be registered and preprocessed so that they can be dynamically styled via CSS. For this example, we incorporate an SVG from [Wikimedia Hypercube](https://commons.wikimedia.org/wiki/File:Hypercube.svg).

We can use ordinary Markdown image syntax:

![](https://upload.wikimedia.org/wikipedia/commons/2/22/Hypercube.svg)

Or, we can use Smartdowns `/media` syntax and amend it with styling:

|plain|pulse|clockwise|cclockwise|bluegreen|
|:---:|:---:|:---:|:---:|:---:|
|![](/media/hypercube)|![](/media/hypercube/pulse)|![](/media/hypercube/clockwise)|![](/media/hypercube/cclockwise)|![](/media/hypercube/bluegreen)|
|![](/media/StalactiteStalagmite)|![](/media/StalactiteStalagmite/pulse)|![](/media/StalactiteStalagmite/clockwise)|![](/media/StalactiteStalagmite/cclockwise)|![](/media/StalactiteStalagmite/bluegreen)|

---

|lighthouse|medieval-gate|barn|church|
|:---:|:---|---:|:---:|
|![](/media/lighthouse)|![](/media/medieval-gate)|![](/media/barn)|![](/media/church)|
|![](/media/lighthouse/pulse)|![](/media/medieval-gate/pulse)|![](/media/barn/pulse)|![](/media/church/pulse)|
|![](/media/lighthouse/clockwise)|![](/media/medieval-gate/clockwise)|![](/media/barn/clockwise)|![](/media/church/clockwise)|
|![](/media/lighthouse/cclockwise)|![](/media/medieval-gate/cclockwise)|![](/media/barn/cclockwise)|![](/media/church/cclockwise)|

#### Experimenting with dynamic SVG

I was inspired to create dynamic SVGs for badges and other purposes while reading
[Making a cheap scalable image server with AWS](https://claudiajs.com/tutorials/image-server.html). The SVG template I'm using is from [large.svg](https://github.com/claudiajs/example-projects/blob/master/github-repo-labels/svg/large.svg)

This is a *very early* demonstration of the potential. I plan on creating a much more Smartdown-like syntax (extending the `/media` syntax for SVG images with Smartdown variable references, and eliminating the need for explicit `dependOn` and JS code.

- [Name](:?NAME)
- [Forks](:?FORKS)
- [Stars](:?STARS)

```javascript/playable/autoplay
smartdown.setVariable('NAME', 'MyName');
smartdown.setVariable('FORKS', '5');
smartdown.setVariable('STARS', '10');

this.dependOn = ['NAME', 'FORKS', 'STARS'];
this.depend = function() {
	var name = env.NAME || '?NAME?';
	var forks = env.FORKS || '?FORKS?';
	var stars = env.STARS || '?STARS?';
	var svgText =
	`<svg version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink" x="0" y="0" width="400" height="200" viewBox="0, 0, 512, 200">
	  <g id="Layer_3">
	    <g>
	      <path d="M12.5,0.5 L500.5,0.5 C507.127,0.5 512.5,5.873 512.5,12.5 L512.5,188.5 C512.5,195.127 507.127,200.5 500.5,200.5 L12.5,200.5 C5.873,200.5 0.5,195.127 0.5,188.5 L0.5,12.5 C0.5,5.873 5.873,0.5 12.5,0.5 z" fill="#000000"/>
	      <path d="M12.5,0.5 L500.5,0.5 C507.127,0.5 512.5,5.873 512.5,12.5 L512.5,188.5 C512.5,195.127 507.127,200.5 500.5,200.5 L12.5,200.5 C5.873,200.5 0.5,195.127 0.5,188.5 L0.5,12.5 C0.5,5.873 5.873,0.5 12.5,0.5 z" fill-opacity="0" stroke="#FFFFFF" stroke-width="1"/>
	    </g>
	  </g>
	  <g id="Layer_1">
	    <text transform="matrix(1, 0, 0, 1, 343.159, 39.706)">
	      <tspan x="-142.436" y="5.5" font-family="HelveticaNeue-Bold" font-size="24" fill="#FFFFFF">${name}</tspan>
	    </text>
	    <text transform="matrix(1, 0, 0, 1, 340.913, 149.5)">
	      <tspan x="-140.19" y="-5.5" font-family="HelveticaNeue" font-size="18" fill="#FFFFFF">Created (created)</tspan>
	      <tspan x="-140.19" y="16.5" font-family="HelveticaNeue" font-size="18" fill="#FFFFFF">Updated (updated)</tspan>
	    </text>
	  </g>
	  <g id="Layer_4">
	    <path d="M91,22.206 C48.594,22.206 14.207,56.586 14.207,98.999 C14.207,132.927 36.21,161.713 66.723,171.867 C70.561,172.578 71.97,170.201 71.97,168.173 C71.97,166.343 71.898,160.292 71.865,153.875 C50.501,158.521 45.993,144.815 45.993,144.815 C42.5,135.94 37.467,133.578 37.467,133.578 C30.499,128.812 37.992,128.91 37.992,128.91 C45.703,129.452 49.764,136.825 49.764,136.825 C56.613,148.564 67.729,145.169 72.111,143.207 C72.801,138.245 74.79,134.856 76.986,132.939 C59.93,130.998 41.999,124.412 41.999,94.987 C41.999,86.604 44.999,79.754 49.911,74.376 C49.114,72.441 46.486,64.63 50.657,54.052 C50.657,54.052 57.105,51.99 71.779,61.925 C77.904,60.224 84.474,59.371 91,59.34 C97.526,59.371 104.101,60.224 110.238,61.925 C124.895,51.99 131.335,54.052 131.335,54.052 C135.514,64.63 132.886,72.441 132.089,74.376 C137.013,79.754 139.991,86.604 139.991,94.987 C139.991,124.483 122.026,130.976 104.926,132.878 C107.68,135.261 110.135,139.934 110.135,147.099 C110.135,157.374 110.047,165.643 110.047,168.173 C110.047,170.217 111.428,172.612 115.321,171.858 C145.818,161.692 167.793,132.917 167.793,98.999 C167.793,56.586 133.411,22.206 91,22.206" fill="#FFFFFE"/>
	  </g>
	  <g id="Layer_2">
	    <path d="M212.723,75.103 L333,75.103 C339.627,75.103 345,80.476 345,87.103 L345,107.103 C345,113.731 339.627,119.103 333,119.103 L212.723,119.103 C206.096,119.103 200.723,113.731 200.723,107.103 L200.723,87.103 C200.723,80.476 206.096,75.103 212.723,75.103 z" fill="#FFFFFF"/>
	    <path d="M367.723,75.103 L488,75.103 C494.627,75.103 500,80.476 500,87.103 L500,107.103 C500,113.731 494.627,119.103 488,119.103 L367.723,119.103 C361.096,119.103 355.723,113.731 355.723,107.103 L355.723,87.103 C355.723,80.476 361.096,75.103 367.723,75.103 z" fill="#FFFFFF"/>
	    <path d="M391.808,83.595 C390.944,82.731 389.895,82.3 388.662,82.3 C387.428,82.3 386.38,82.731 385.516,83.595 C384.653,84.458 384.221,85.507 384.221,86.741 C384.221,87.542 384.421,88.287 384.822,88.973 C385.223,89.659 385.762,90.195 386.441,90.58 C386.441,91.382 386.376,92.088 386.245,92.697 C386.114,93.306 385.898,93.841 385.597,94.304 C385.296,94.767 384.984,95.16 384.66,95.484 C384.336,95.808 383.881,96.112 383.295,96.398 C382.709,96.683 382.165,96.922 381.664,97.115 C381.163,97.307 380.489,97.535 379.64,97.797 C378.098,98.275 376.911,98.714 376.078,99.116 L376.078,87.619 C376.757,87.234 377.297,86.698 377.697,86.012 C378.098,85.326 378.299,84.581 378.299,83.78 C378.299,82.546 377.867,81.497 377.003,80.634 C376.14,79.771 375.092,79.339 373.858,79.339 C372.624,79.339 371.575,79.77 370.712,80.634 C369.848,81.497 369.416,82.546 369.416,83.78 C369.416,84.581 369.617,85.326 370.018,86.012 C370.419,86.698 370.958,87.234 371.637,87.619 L371.637,106.587 C370.958,106.972 370.419,107.509 370.018,108.195 C369.617,108.881 369.416,109.625 369.416,110.427 C369.416,111.66 369.848,112.709 370.712,113.572 C371.575,114.436 372.624,114.868 373.858,114.868 C375.091,114.868 376.14,114.436 377.003,113.572 C377.867,112.709 378.299,111.66 378.299,110.427 C378.299,109.625 378.098,108.881 377.697,108.195 C377.296,107.509 376.757,106.972 376.078,106.587 L376.078,105.986 C376.078,104.922 376.398,104.151 377.038,103.673 C377.678,103.194 378.985,102.647 380.959,102.031 C383.041,101.367 384.606,100.742 385.655,100.156 C389.109,98.198 390.852,95.006 390.882,90.58 C391.561,90.195 392.101,89.659 392.502,88.973 C392.902,88.286 393.103,87.542 393.103,86.741 C393.103,85.507 392.671,84.458 391.808,83.595 z M375.431,112 C374.999,112.432 374.475,112.648 373.858,112.648 C373.241,112.648 372.717,112.432 372.285,112 C371.853,111.569 371.637,111.044 371.637,110.428 C371.637,109.811 371.853,109.286 372.285,108.854 C372.717,108.423 373.241,108.207 373.858,108.207 C374.475,108.207 374.999,108.423 375.431,108.854 C375.863,109.286 376.079,109.811 376.079,110.428 C376.078,111.044 375.863,111.569 375.431,112 z M375.431,85.353 C374.999,85.785 374.475,86 373.858,86 C373.241,86 372.717,85.785 372.285,85.353 C371.853,84.921 371.637,84.397 371.637,83.78 C371.637,83.163 371.853,82.639 372.285,82.207 C372.717,81.775 373.241,81.559 373.858,81.559 C374.475,81.559 374.999,81.775 375.431,82.207 C375.863,82.639 376.079,83.163 376.079,83.78 C376.078,84.397 375.863,84.921 375.431,85.353 z M390.235,88.314 C389.803,88.745 389.279,88.961 388.662,88.961 C388.045,88.961 387.521,88.745 387.089,88.314 C386.658,87.882 386.442,87.358 386.442,86.741 C386.442,86.124 386.658,85.6 387.089,85.168 C387.521,84.736 388.045,84.52 388.662,84.52 C389.279,84.52 389.803,84.736 390.235,85.168 C390.666,85.599 390.882,86.124 390.882,86.741 C390.882,87.358 390.667,87.882 390.235,88.314 z" fill="#000000" id="code-fork-symbol"/>
	    <text transform="matrix(1, 0, 0, 1, 449.68, 97.103)">
	      <tspan x="-48.32" y="12.5" font-family="HelveticaNeue" font-size="36" fill="#000000">${forks}</tspan>
	    </text>
	    <path d="M241,93.525 C241,93.03 240.626,92.723 239.877,92.603 L229.815,91.139 L225.305,82.019 C225.051,81.471 224.723,81.197 224.322,81.197 C223.921,81.197 223.594,81.471 223.34,82.019 L218.83,91.139 L208.767,92.603 C208.019,92.723 207.644,93.03 207.644,93.525 C207.644,93.806 207.811,94.126 208.146,94.487 L215.442,101.583 L213.718,111.606 C213.692,111.793 213.678,111.927 213.678,112.007 C213.678,112.288 213.748,112.525 213.889,112.719 C214.029,112.913 214.239,113.009 214.52,113.009 C214.761,113.009 215.028,112.93 215.322,112.769 L224.322,108.038 L233.323,112.769 C233.604,112.93 233.871,113.009 234.124,113.009 C234.393,113.009 234.596,112.913 234.736,112.719 C234.876,112.525 234.946,112.288 234.946,112.007 C234.946,111.833 234.939,111.7 234.926,111.606 L233.202,101.583 L240.479,94.487 C240.826,94.14 241,93.819 241,93.525 z" fill="#000000" id="star"/>
	    <text transform="matrix(1, 0, 0, 1, 295.68, 97.103)">
	      <tspan x="-47.988" y="12.5" font-family="HelveticaNeue" font-size="36" fill="#000000">${stars}</tspan>
	    </text>
	  </g>
	</svg>`;

	smartdown.setVariable('dynamicSVG', svgText);
};

```

[[](:!dynamicSVG|svg)](https://github.com/claudiajs/example-projects/blob/master/github-repo-labels/svg/large.svg)

#### Using a builtin SVG

Better than inlining the SVG as above, we can reference an SVG file that has been registered with Smartdown. For this example, I've created a `badge.svg` that can be used as a template:

![](/media/badge)


```javascript/playable/autoplay
this.dependOn = ['NAME', 'FORKS', 'STARS'];
this.depend = function() {
	var name = env.NAME || '?NAME?';
	var forks = env.FORKS || '?FORKS?';
	var stars = env.STARS || '?STARS?';
	var data = smartdown.getMedia('badge');
	var svg = data.svgData;
	svg = svg.replace(/\`NAME\`/g, name);
	svg = svg.replace(/\`FORKS\`/g, forks);
	svg = svg.replace(/\`STARS\`/g, stars);
	smartdown.setVariable('builtinSVG', svg);
};

```

[](:!builtinSVG|svg)

#### SVG Buttons

[Tunnel ![](https://upload.wikimedia.org/wikipedia/commons/f/f4/Cool.svg)](:@SVG) [Calculation ![](https://upload.wikimedia.org/wikipedia/commons/f/f4/Cool.svg)](:=count=(count?count+1:1))

[Clicked Count](:!count)

---

[Back to Home](:@Home)

