### ES6 Module Inclusion (*work-in-progress*)

This example uses the (currently experimental) `/module` qualifier to the playable to load the playable as an ES6 Module. If the module defines a `start(pThis)` function, then it will be invoked after the module is loaded, which allows the module to resemble a traditional playable with access to the playable's `this.div` and `this.env`. However, module side-effects will occur at load-time and will have no idea what playable they belong to.

[NameA](:?NameA)

```javascript /playable/autoplay/debug/module
console.log('in ModuleA');

import * as Lib from './gallery/ExtensionsES6Module.js';

export default function start(pThis, playable, env) {
	const log = pThis.log;

	log('start', pThis);

	pThis.dependOn.NameA = () => {
		smartdown.setVariable('NameB', env.NameA.toUpperCase());
		pThis.div.innerHTML = `<h1>Hello from an ES6 Module A. ${env.NameA}</h1>`;
	};

	const nums = [12, 23, 34, 45];
	log('sum', Lib.sum(...nums));
	log('mult', Lib.mult(...nums));
	Lib.note.note = 'ModuleA was here';
}
```

---

This module ModuleB will import the same `ExtensionsES6Module.js` as ModuleA above. The `ExtensionsES6Module.js` module will NOT be reloaed, and will retain the same internal state as when it was loaded above. So `Lib.note.note` will be *shared* between ModuleA and ModuleB.

[NameB](:!NameB)

```javascript /playable/autoplay/debug/module
console.log('in ModuleB');

import * as Lib from 'https://localhost:4000/gallery/ExtensionsES6Module.js';

export default function start(pThis, playable, env) {
	const log = pThis.log;
	log('start', pThis);
	const nums = [12, 23, 34, 45];
	log('sum', Lib.sum(...nums));
	log('mult', Lib.mult(...nums));

	log('Lib.note.note', Lib.note.note);

	pThis.dependOn.NameB = () => {
		pThis.div.innerHTML = `<h1>Hello from an ES6 Module B. ${env.NameB}</h1>`;
	};

}
```

---


[Back to Home](:@Home)
