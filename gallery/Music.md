### Music, abc-notation, and MIDI

I recently learned about [abc notation](https://en.wikipedia.org/wiki/ABC_notation), which enables a simple text description that can be turned into sheet music (or even MIDI). I've adopted a wonderful library, [abcjs](https://abcjs.net) which I've made available via Smartdown.

*The Smartdown/abcjs integration is still quite fresh, and there are browser-specific bugs I'm still working on. In addition, I'm learning more about the capabilities of abcjs, which I'd like to make accessible via Smartdown.*


#### Introduction to `abc` notation

Basically, you can take an `abc` script like this one obtained from [abcjs demo page](https://abcjs.net/abcjs-editor.html):

```abc
X: 1
T: Cooley's
M: 4/4
L: 1/8
K: Emin
|:D2|"Em"EB{c}BA B2 EB|~B2 AB dBAG|"D"FDAD BDAD|FDAD dAFD|
"Em"EBBA B2 EB|B2 AB defg|"D"afe^c dBAF|"Em"DEFD E2:|
|:gf|"Em"eB B2 efge|eB B2 gedB|"D"A2 FA DAFA|A2 FA defg|
"Em"eB B2 eBgB|eB B2 defg|"D"afe^c dBAF|"Em"DEFD E2:|
```

and by using the Smartdown notation:

````markdown
```abc/playable
X: 1
T: Cooley's
M: 4/4
L: 1/8
K: Emin
|:D2|"Em"EB{c}BA B2 EB|~B2 AB dBAG|"D"FDAD BDAD|FDAD dAFD|
"Em"EBBA B2 EB|B2 AB defg|"D"afe^c dBAF|"Em"DEFD E2:|
|:gf|"Em"eB B2 efge|eB B2 gedB|"D"A2 FA DAFA|A2 FA defg|
"Em"eB B2 eBgB|eB B2 defg|"D"afe^c dBAF|"Em"DEFD E2:|
```
````

it will render as sheet music and a MIDI player:

```abc/playable/autoplay
X: 1
T: Cooley's
M: 4/4
L: 1/8
K: Emin
|:D2|"Em"EB{c}BA B2 EB|~B2 AB dBAG|"D"FDAD BDAD|FDAD dAFD|
"Em"EBBA B2 EB|B2 AB defg|"D"afe^c dBAF|"Em"DEFD E2:|
|:gf|"Em"eB B2 efge|eB B2 gedB|"D"A2 FA DAFA|A2 FA defg|
"Em"eB B2 eBgB|eB B2 defg|"D"afe^c dBAF|"Em"DEFD E2:|
```

#### Sheet, MIDI or Both

Smartdown displays both sheet music and MIDI by default. By using the playable types `abcsheet` and `abcmidi`, you can select to display only one of the types. For example, the following will display only the MIDI for the above song:

```abcmidi/playable/autoplay
X: 1
T: Cooley's
M: 4/4
L: 1/8
K: Emin
|:D2|"Em"EB{c}BA B2 EB|~B2 AB dBAG|"D"FDAD BDAD|FDAD dAFD|
"Em"EBBA B2 EB|B2 AB defg|"D"afe^c dBAF|"Em"DEFD E2:|
|:gf|"Em"eB B2 efge|eB B2 gedB|"D"A2 FA DAFA|A2 FA defg|
"Em"eB B2 eBgB|eB B2 defg|"D"afe^c dBAF|"Em"DEFD E2:|
```


#### `abc` via URL

We can use Smartdown's *image URL* syntax to refer to an `.abc` file and embed sheet music, midi, or both.

```markdown
![abcsheet](/resources/Cooleys.abc)
```

![abcsheet](/resources/Cooleys.abc)

---

```markdown
![abcmidi](/resources/Cooleys.abc)
```

![abcmidi](/resources/Cooleys.abc)

---

```markdown
![abc](/resources/Cooleys.abc)
```

![abc](/resources/Cooleys.abc)

---


```markdown
![](/resources/Cooleys.abc)
```

![](/resources/Cooleys.abc)



#### Dynamic abc script (with Lyrics)

The above examples show how an `abc` script can be embedded into a Smartdown project either as a *playable* of type `abc`, or via a URL using the `abc` image URL syntax above. We can also use a Smartdown *variable* of type `abc` and and then use a *cell* to display that value as sheet music, midi, or both. Let's give it a try.


We'll use the Scottish Ballad [Auld Lang Syne](https://en.wikipedia.org/wiki/Auld_Lang_Syne) as our example. The version of the song we'll start with will be the 5-verse *original* version by [Robert Burns]() that is from the [abcnotation.com](https://abcnotation.com/tunePage?a=trillian.mit.edu/~jc/music/abc/mirror/gulfweb.net:34043/~rlwalker/abc/AuldOrig/0000) index site.

Let's place the text of this `abc` version of our song into a variable, and then have a cell render that as sheet music and MIDI. For kicks, we'll make it easy to modify the speed of the song by using Smartdown to edit the `abc` script before using it.


```javascript/playable/autoplay
const originalSong =
`

X:1
T:Auld Lang Syne (Original Version)
C:Traditional
O:Scotland
M:4/4
L:1/8
K:D
V:1 name="Melody" clef=treble
|A2|"D""^Verses"d3 d "A"e2 f2|"D"A3 B "A"A3 A
w:1Should auld ac-quain-tance be for-got, and
w:2We two hae run a-bout the braes, and
w:3We two hae paid-elt in the burn, frae
w:4And here's a hand, my trus-ty fere, and
w:5And sure-ly ye'll be your pint-stoup, and
|"D"d2 f2 "Em"e2 d2|"G"B6 d2
w:nev-er brought to mind? Should
w:pu'd the go-wans fine, We've
w:morn-in sun till dine, But
w:gi‚s a hand o' thine, We'll
w:sure-ly I'll be mine, We'll
|"D"A3 F "A"E2 D2|"Em"E3 D "A"E3 F
w:auld ac-quain-tance be for-got, In
w:wan-dered mony a wea-ry foot, sin'
w:seas be-tween us braid hae roared, sin'
w:tak' a richt gude wil-lie waught, For
w:take a cup of kind-ness yet, for
|A3 A B2 A2|A6||
w:days of auld lang syne?
w:auld_ lang_ syne.
w:auld_ lang_ syne.
w:auld_ lang_ syne.
w:sake of auld lang syne.
V:2 name="Harmony" clef=treble
|ag|:f3 f g2 a2|f3 g f3 f
|f2 a2 g2 f2|g6 g2
|f3 d c2 b2|G3 F G3 A
|c4 d2 c2|c6||
V:1 name="Melody" clef=treble
|A2|"D""^Refrain"d3 d "A"e2 f2|"D"A3 B "A"A3 A
w:For auld_ lang_ syne my dear for
|"D"d2 f2 "Em"e2 d2|"G"B6 d2
w:auld_ lang_ syne. We'll
|"D"A3 F "A"E2 D2|"Em"E3 D "A"E3 F
w:tak' a cup o' kind-ness yet for
|1A4 B2 A2|"A"A6:|2"A"A4 "Em"BA"A"FE|"D"D6||
w:auld lang_ syne. auld lang___ syne.
V:2 name="Harmony" clef=treble
|c2|f3 f g2 a2|f3 g f3 f
|f2 a2 g2 f2|g6 g2
|f3 d c2 B2|G3 F G3 A
|1c4 d2 c2|c6:|2c4 d2 c2|a6||
`;

env.notesPerMeasure = 8;

this.dependOn = ['notesPerMeasure'];
this.depend = function() {
	const newLength = `L:1/${env.notesPerMeasure}`;
	const modifiedSong = originalSong.replace('L:1/8', newLength);
	smartdown.setVariable('DynamicABC', modifiedSong);
	smartdown.setVariable('DynamicABCSheet', modifiedSong);
	smartdown.setVariable('DynamicABCMidi', modifiedSong);
}
```

---

[](:!DynamicABC|abc)

[Notes per Measure (default is 8)](:-notesPerMeasure/2/32/1)


In addition, you can use `abcsheet` or `abcmidi` if you don't want both displayed.

```markdown
[DynamicABC Sheet Music](:!DynamicABCSheet|abcsheet)
```

```markdown
[DynamicABC MIDI](:!DynamicABCMidi|abcmidi)
```

---

[Back to Home](:@Home)
