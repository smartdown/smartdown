### Using React and JSX (alpha)

Smartdown is by design a *reactive* system, enabling a Smartdown document to compose a set of processes (playables, cells, and variables) within a prose document. Smartdown is also about enabling the embedding of wonderful third-party technologies. It only made sense to try to integrate [ReactJS](https://reactjs.org) with Smartdown in a useful way. There are many React components that could be useful in a Smartdown document. This draft represents the first attempt at this effort. Additional React examples are in the [Using Smartdown-on-Solid](:@Solid) doc.

It has been a few years (see my [Basilisk Puzzle](https://doctorbud.com/celestial-toys/post/2015-02-03-reactjs-basilisk-slide-puzzle/) from early 2015) since I last tried using React, and the framework has evolved nicely to eliminate a lot of redundant syntax and overhead, and to enable better composition of React elements. I was very inspired by [React Function Components](https://www.robinwieruch.de/react-function-component), which shows off *modern* React capabilities.

We're going to experiment with a few ways to add a [ReactJS](https://reactjs.org) component and driver code to a Smartdown document. We'll try it without JSX, with JSX, and with both Functional and Class Components.

#### The `LikeButton` Example

For each example, we'll construct a `<div>` for ReactJS to render a `LikeButton` component into. Our LikeButton will have two state variables: `liked` and `title`, and will render either as a button with label `Like <title>`(e.g., 'Like Kittens'), or as a paragraph with the phrase `You like <title>` (e.g., 'You like Kittens'). Clicking the button will toggle its state from `liked=false` to `liked=true`, which will make it rerender as a paragraph.

We also provide a Smartdown cell to allow for a new title to be chosen (default is 'Kittens'), which our playable will react to and will tell the LikeButton to change its state back to `liked=false`, which will cause the button to be displayed with the new title.


#### No JSX, Class Component

We'll start by using existing Smartdown extension mechanisms to load React then define a `LikeButton` component *without* using JSX. Based on an example at [Add React to a Website](https://reactjs.org/docs/add-react-to-a-website.html). For this example, we'll use a traditional React Class Component, where the `render()` method is explicit and state is managed via `setState`. We'll take advantage of using a `ref` to capture the instantiated LikeButton component, so that our Smartdown code can affect its state, as per the suggestion [Accessing Component Methods And State From Outside React](https://brettdewoody.com/accessing-component-methods-and-state-from-outside-react/).


[What do you want to Like?](:?RTITLE)

```javascript /playable/autoplay
//smartdown.import=https://unpkg.com/react@16/umd/react.production.min.js
//smartdown.import=https://unpkg.com/react-dom@16/umd/react-dom.production.min.js

const innerDivId = this.div.id + '_inner';
this.div.innerHTML = `<div id="${innerDivId}"></div>`;
smartdown.setVariable('RTITLE', 'Kittens');

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      title: '' };
  }

  clicked() {
    this.setState({ liked: true });
  }

  render() {
    if (this.state.liked) {
      return 'You liked ' + this.state.title;
    }

    return React.createElement(
      'button',
      { onClick: () => this.clicked() },
      `Like ${this.state.title}`,
    );
  }
}

const domContainer = document.getElementById(innerDivId);
let component;

const likeButtonElement = React.createElement(
  LikeButton,
  {
    ref: (refComponent) => {component = refComponent}
  });
ReactDOM.render(likeButtonElement, domContainer);

this.dependOn.RTITLE = () => {
  component.setState({
    liked: false,
    title: env.RTITLE,
  })
};

```

---


#### No JSX, Function Component

Here is a LikeButton implementation that uses React Function Components, which are basically the `render()` function, with some optional capabilities obtainable via React Hooks.

Because we want to be able to affect the title of the button via a Smartdown dependency, we need to obtain a function from within the component that we can use to induce `setState` in the function. This is done by passing in a callback function via the `titleAccess` property in LikeButton. LikeButton will, upon render(), invoke this callback with a value which is a function within LikeButton that is able to manipulate LikeButton's state. So basically, our external playable code needs to ask for an accessor/manipulator function and it does this by passing a callback via a prop. Seems to work?

---

[What do you want to Like?](:?RFTITLE)

```javascript /playable/autoplay
//smartdown.import=https://unpkg.com/react@16/umd/react.production.min.js
//smartdown.import=https://unpkg.com/react-dom@16/umd/react-dom.production.min.js

const log = this.log;

const innerDivId = this.div.id + '_inner';
this.div.innerHTML = `<div id="${innerDivId}"></div>`;

smartdown.setVariable('RFTITLE', 'Kittens');

let renderedTitleAccess = null; // Will be set when LikeButton is rendered.

this.dependOn.RFTITLE = () => {
  // Tell the component to change its title
  renderedTitleAccess(env.RFTITLE);
};


// React code below

const LikeButton = ({titleAccess}) => {
  const [title, setTitle] = React.useState('');
  const [liked, setLiked] = React.useState(false);

  const clicked = () => {
    setLiked(true);
  };

  titleAccess((newTitle) => {
    setTitle(newTitle);
    setLiked(false);
  });

  // Return the renderable content
  if (liked) {
    return 'You like ' + title;
  }

  return React.createElement(
    'button',
    { style: {'font-size': '30px', color: 'blue'},
      onClick: () => clicked() },
    `Like ${title}`
  );
};


// This code is non-React code that will create a LikeButton and render it,
// which will cause titleAccess to be passed a function that enables the state
// of the LikeButton to be affected from outside the component.
const element = React.createElement(
  LikeButton,
  {
    titleAccess: (titleAccess) => {
      renderedTitleAccess = titleAccess;
    }
  });
ReactDOM.render(element, document.getElementById(innerDivId));

```

---

#### JSX via Babel, Class Component

We'll include the Babel library to perform the job of converting React/JSX into the equivalent Javascript code that constructs the React DOM elements (by the end of this document, we'll be using Smartdown's builtin translation so that the explicit loading and invocation of Babel is not necessary, but we are taking baby steps towards that).

[Button Title](:?RJBCTITLE)

```javascript /playable/autoplay/debug
//smartdown.import=https://unpkg.com/react@16/umd/react.development.js
//smartdown.import=https://unpkg.com/react-dom@16/umd/react-dom.development.js
//smartdown.import=https://unpkg.com/babel-standalone@6/babel.min.js

const innerDivId = this.div.id + '_inner';
this.div.innerHTML = `<div id="${innerDivId}"></div>`;
smartdown.setVariable('RJBCTITLE', 'Kittens');

const reactCode =
`
class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      title: ''};
  }

  clicked() {
    this.setState({ liked: true });
  }

  render() {
    if (this.state.liked) {
      return 'You liked ' + this.state.title;
    }

    // Display a "Like" <button>
    return (
      <button onClick={() => this.clicked()}>
        Like {this.state.title}
      </button>
    );

  }
}

const domContainer = document.getElementById('${innerDivId}');
let component;
const likeButtonElement = React.createElement(
  LikeButton,
  {
    ref: (refComponent) => {component = refComponent}
  });
ReactDOM.render(likeButtonElement, domContainer);

export default component;
`;
const jsCode = Babel.transform(reactCode,
    {
      presets: [
        ['es2015'], 'react', 'stage-0']
    }).code;
const jsFunction = new Function(['exports'], jsCode);
const exportsFromTransformedModule = {};
jsFunction(exportsFromTransformedModule);
const rjcomponent = exportsFromTransformedModule.default;

this.dependOn.RJBCTITLE = () => {
  rjcomponent.setState.bind(rjcomponent)({
    liked: false,
    title: env.RJBCTITLE});
};
```


---


#### JSX via Smartdown Extension, Class Component

The above two experiments were a way to see how plausible a Smartdown/React integration would be. Once I got the above working, I add a Smartdown *extension* to support React-based playables. This simplifies the embedding of React within Smartdown, and also enables a bunch of possibilities (NYI) like treating Smartdown's variables as a Redux *store* (from the React playable's point of view) which would enable more complex React integrations.

But for now, if we declare a React playable like this:

````markdown
```javascript /playable/autoplay/react

// Javascript that may contain JSX goes here...

```
````

Then Babel will transpile the code, including the JSX into a Javascript fragment suitable for use as a playable. This translation is occurring when the playable is *played*, and not when the Smartdown document is compiled. I added the `/debug` qualifier to the playable definition below so that you can view the *Augmented code* that is actually running when the playable is played.

For this example, we'll use the traditional `React.Component`, as opposed to a Function Component.


---

[What do you want to Like?](:?RJSTITLE)

```javascript /playable/autoplay/react/debug

const innerDivId = this.div.id + '_inner';
this.div.innerHTML = `<div id="${innerDivId}"></div>`;
smartdown.setVariable('RJSTITLE', 'Kittens');

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      title: ''};
  }

  clicked() {
    this.setState({ liked: true });
  }

  render() {
    if (this.state.liked) {
      return 'You liked ' + this.state.title;
    }

    // Display a "Like" <button>
    return (
      <button onClick={() => this.clicked()}>
        Like {this.state.title}
      </button>
    );

  }
}

const domContainer = document.getElementById(innerDivId);
const component = ReactDOM.render(React.createElement(LikeButton), domContainer);

this.dependOn.RJSTITLE = () => {
  component.setState.bind(component)({
    liked: false,
    title: env.RJSTITLE});
};
```

---


[Back to Home](:@Home)
