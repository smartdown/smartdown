### Crossword Puzzles via `exolve`

I've been wanting to add Crossword puzzles to Smartdown, so this weekend in November, 2019, I decided to see how far I could get. I looked around for existing crossword puzzle Javascript libraries that might be applicable to my needs, and discovered [exolve](https://github.com/viresh-ratnakar/exolve).

I really like the simple UI and vanilla Javascript nature of exolve, so I figured out how to get it to work as a Smartdown Playable via a generic Javascript playable and `smartdown.import`.

My biggest challenge with exolve was to take a bunch of code that assumed it occupied a whole web page, and make it reentrant and isolated so that I could place several crosswords on a page. I hacked on [Exolve v0.36 October 22 2019](https://github.com/viresh-ratnakar/exolve/blob/master/CHANGELOG.md#version-exolve-v036-october-22-2019), although the author has already advanced to v0.38 at the time of this writing.

#### Basic Crossword

Based on [example with submit.exolve](https://github.com/viresh-ratnakar/exolve/blob/master/example-with-submit.exolve), I removed the Submit and the Questions section.


[State1](:?State1)
[](:!Errors1|json)

```javascript /playable/autoplay
//smartdown.import=./gallery/exolve-multi.css
//smartdown.import=./gallery/exolve-multi.js

const puzzleText = `
exolve-begin
  exolve-id: example-submit
  exolve-title: Tiny Demo Crossword
  exolve-setter: Exolve
  exolve-width: 5
  exolve-height: 5
  exolve-grid:
    00000
    0...0
    00000
    0...0
    00000
  exolve-across:
    1 Greeting (5)
    3 Earth with a long long clue with a long long clue with a long long clue with a long long clue with a long long clue with a long long clue with a long long clue with a long long clue (5)
    4 Guide (5)
  exolve-down:
    1 Emits cry (5)
    2 More ancient (5)
exolve-end
`;

const log = this.log;
const puzzle = new Puzzle();
const html = puzzle.getHtml();

puzzle.stateChangeListener = (state) => {
  smartdown.setVariable('State1', state);
};

this.dependOn.State1 = () => {
  const errors = puzzle.setState(env.State1);
  if (errors.length === 0) {
    smartdown.setVariable('Errors1', undefined);
  }
  else {
    log('errors', errors);
    smartdown.setVariable('Errors1', errors);
  }
};

this.div.innerHTML = html;
this.div.style.background = 'aliceblue';
puzzle.createPuzzle(puzzleText);
```

---


#### A Bars and Blocks Example

Based on [example-bars-and-blocks.exolve](https://github.com/viresh-ratnakar/exolve/blob/master/example-bars-and-blocks.exolve), this puzzle contains its solution, so the `Check` and `Reveal` buttons are enabled.

```javascript /playable/autoplay
//smartdown.import=./gallery/exolve-multi.css
//smartdown.import=./gallery/exolve-multi.js

const puzzleText = `
exolve-begin
  exolve-id: example-bb
  exolve-title: Tiny Crossword With Bars And Blocks
  exolve-setter: Exolve
  exolve-width: 5
  exolve-height: 5
  exolve-grid:
    H E|B O O
    I_. . . L
    W O R L D_
    A . . . O
    S U E|A N 
  exolve-across:
    1 The man (2)
    2 Jeer (3)
    4 Planet (5)
    6 Take legal action against (3)
    7 Article (2)
  exolve-down:
    1 Greeting (2)
    3 Aged (3)
    4 Used to be (3)
    5 Working (2)
exolve-end
`;

const puzzle = new Puzzle();
const html = puzzle.getHtml();

this.div.innerHTML = html;
puzzle.createPuzzle(puzzleText);
```



#### A Dynamic Example

Let's use a Smartdown variable `PuzzleURL` to refer to an external `.exolve` source file for a puzzle. If the URL changes, we'll adjust the puzzle accordingly. We'll provide a URL cell where our reader can adjust `PuzzleURL`, and we'll provide a few shortcut buttons to exercise some of the exolve examples.

[`.exolve` URL](:?PuzzleURL)

[Basic with Solution](:=PuzzleURL="https://cdn.jsdelivr.net/gh/viresh-ratnakar/exolve@master/example-basic-with-solution.exolve")
[Bars, Blocks, Circles Diagramless](:=PuzzleURL="https://cdn.jsdelivr.net/gh/viresh-ratnakar/exolve@master/example-bars-blocks-circles-diagramless.exolve")
[Bars, Blocks](:=PuzzleURL="https://cdn.jsdelivr.net/gh/viresh-ratnakar/exolve@master/example-bars-and-blocks.exolve")
[Puzzling Times](:=PuzzleURL="https://viresh-ratnakar.github.io/gussalufz-17-unsolved.html")
[gussalufz-16-solved.exolve](:=PuzzleURL="./gallery/gussalufz-16-solved.exolve")




```javascript /playable/autoplay
//smartdown.import=./gallery/exolve-multi.css
//smartdown.import=./gallery/exolve-multi.js

const myDiv = this.div;
this.dependOn = ['PuzzleURL'];
this.depend = function() {
  const url = env.PuzzleURL;
  smartdown.importTextUrl(
    url,
    function(puzzleText) {
      const puzzle = new Puzzle();
      const html = puzzle.getHtml();

      myDiv.innerHTML = html;
      puzzle.createPuzzle(puzzleText);
    },
    function (err) {
      console.log('#Error fetching ', url, err);
    });
};
```


#### More examples

- [Puzzles by the author of exolve](https://viresh-ratnakar.github.io)
- [POTD](https://antagony.droppages.com/potd/grid001#.00000000000...0.0.0.0.0.0.0.000000.0000000000.0.0.0.0.0.0.0000000000.000000...0.0.0.0.0.0000000.000000000.0...0.0...0.000000000.0000000.0.0.0.0.0...000000.0000000000.0.0.0.0.0.0.0000000000.000000.0.0.0.0.0.0.0...00000000000.)

---

[Back to Home](:@Home)

