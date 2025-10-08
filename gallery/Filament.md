
### Filament

This [Smartdown](https://smartdown.io) document shows how [Filament](https://github.com/joshmarinacci/filament-lang) may be utilized within a Smartdown environment, and provides some examples.

The source for this Smartdown document should be visible at [Filament.md](gallery/Filament.md#-blank)

Many of the examples below are derived from the [/test](https://github.com/joshmarinacci/filament-lang/tree/master/test) examples in the Filament repository. If the output of the Filament playable is an Object, then it is displayed in the playable's console log. If it is a function, then a Canvas element is created for the function to draw into.

Click the `Play` button at the top of each playable to execute Javascript code that will in turn execute the Filament code.


#### Evaluate the Filament expression `42ft`.

One of the most basic Filament examples. Currently, the Smartdown Filament integration by default displays the `Object` returned by Filament, as well as the `toString()` representation.

```filament /playable
42ft
```

### Reactivity between Smartdown and Filament

In this example, we'll use Smartdown variables `Color` and `MouseClicked`. We define a Filament playable that draws a circle in the color name in `Color`. We'll add a few Smartdown buttons to change the color, and the playable will react to the color change and will redraw the circle. To make it even more fun, we'll register (within Filament) a `mousedown` handler that will react by adjusting the Smartdown variables `X`, `Y`, and `MouseClicked`. We'll add a subsequent Smartdown playable (in Javascript) that will react to changes in `MouseClicked` by adjusting the `Color` variable, which will cause the Filament diagram to redraw in that color. Chaos!

[Color](:!Color)
[red](:=Color='red') [green](:=Color='green') [blue](:=Color='blue')

[X](:!X) [Y](:!Y)

```filament /playable/autoplay
{
  sd_set('Color', 'red')  // Define an initial color

  def mousedown(x, y) {
    print(['mousedown', x, y])
    sd_set('X', x)
    sd_set('Y', y)
    sd_set('MouseClicked', true)
    [x,y]
  }

  // Uncomment this to update the Smartdown vars as the mouse moves
  // def mousemove(x, y) {
  //   sd_set('X', x)
  //   sd_set('Y', y)
  //   [x,y]
  // }

  def diagram(color:?) {
    circle(x : 4cm, y : 4cm, radius : 2cm, fill : color)
      >> draw(width: 8cm, height: 8cm, fill: 'lightgray')
  }

  sd_watch('Color', diagram)
  diagram(sd_get('Color'))
}
```

#### Smartdown playable that reacts to mouse movement from Filament

Let's make it so that if the canvas is clicked, we react by cycling the color between red/green/blue. 

```javascript /playable/autoplay
this.dependOn.MouseClicked = () => {
  const colors = ['red', 'green', 'blue'];
  const colorIndex = colors.indexOf(env.Color);
  const newColorIndex = (colorIndex + 1) % colors.length;
  if (env.MouseClicked) {
    smartdown.set('Color', colors[newColorIndex]);
    smartdown.set('MouseClicked', false);
  }
};

```


#### Plot a Heart

Based on [filament-lang/test/plot.test.js](https://github.com/joshmarinacci/filament-lang/blob/70cbdd75d0b9edf3573be4f69c666c6232108fca/test/plot.test.js#L141), this playable will use Filament to plot a 2D curve that looks like a heart.


```filament /playable
{
  def px3(t:?) { (16 * (sin(t)**3))/10 }
  def py3(t:?) { (13 * cos(t) - 5 * cos (2*t) - 2 * cos(3*t) - cos(4*t))/10 }
  plot(x:px3, y:py3, zoom:40)
}
```



#### Lissajou

Based on [filament-lang/test/plot.test.js](https://github.com/joshmarinacci/filament-lang/blob/70cbdd75d0b9edf3573be4f69c666c6232108fca/test/plot.test.js#L111)


```filament /playable
{
  def px2(theta:?) {
      sin(2*theta)
  }
  def py2(theta:?) {
      sin(3*theta)
  }
  plot(x:px2,y:py2)
}
```

#### Turtle a Flower

This uses Filament's `turtle` capability to draw a flower. Based upon [filament-lang/test/turtle.test.js](https://github.com/joshmarinacci/filament-lang/blob/70cbdd75d0b9edf3573be4f69c666c6232108fca/test/turtle.test.js#L116)

```filament /playable
{
  turtle_start(0,0,0)
  turtle_pendown()
  arc << () -> {
      map(range(120), with:(n)->{
        turtle_forward(2)
        turtle_right(1)
      })       
  }
  leaf << () -> {
      arc()
      turtle_right(60)
      arc()
      turtle_right(60)
  }
  
  range(36) >> map(with: () -> {
      leaf()
      turtle_right(10)
  })
  
  turtle_penup()
  turtle_done()
}
```

#### Statehood Date by Year by Decade Histogram

Based upon [filament-lang/docs/tutorial.md](https://github.com/joshmarinacci/filament-lang/blob/70cbdd75d0b9edf3573be4f69c666c6232108fca/docs/tutorial.md#histograms), this histogram displays statehood date by year by decade.


```filament /playable
{
  states << dataset('states')
  get_year << state -> {
      field << get_field(state, 'statehood_date')
      dt << date(field, format:"MMMM dd, yyyy")
      get_field(dt,'year')
  }
  years << map(states, with:get_year)
  histogram(years, bucket:10)
}           
```


#### Scatter the Planets

A scatterplot based upon [filament-lang/test/chart.test.js](https://github.com/joshmarinacci/filament-lang/blob/70cbdd75d0b9edf3573be4f69c666c6232108fca/test/chart.test.js#L41)


```filament /playable

{
  planets << dataset('planets')
  chart(planets, type:'scatter', 
                    x:'orbital_radius',
                    y:'mean_radius',
                 size:'mean_radius',
                 name:'name'
            )
}
```


#### How does Smartdown integrate with Filament

If a playable has the optional `/debug` qualifier, then an `Augmented Code` button will be displayed. Clicking this button will reveal the actual JavaScript code that Smartdown will execute when the playable runs. For example, the following very simple Filament expression is wrapped in a playable with the `/debug` qualifier

```filament /playable/debug
42ft
```

#### Exploring Filament without the Smartdown Plugin

One of Smartdown's features is the ability to dynamically load external Javascript Libraries (either as ESModules or as UMD Libraries), and to then *exercise* these libraries. See [Extensions](:@Extensions) for more information on this technique.

Before adding Filament as a Smartdown plugin (using the `filament` playable qualifier), it was available via the general-purpose Extension mechanism. I've included some examples below. The only real difference is that the Filament library is explicitly loaded via `smartdown.import` instead of being implicitly loaded via the plugin mechanism.


##### 42ft

Evaluate the Filament expression `42ft`.

```javascript /playable
//smartdown.import=https://unpkg.com/filament-lang@0.4.3/dist/filament.js

await Filament.setup_parser()

let ret = await Filament.eval_code('42ft')
this.log('we should have a scalar with 42 and feet for the unit:' + ret);

```

##### Plot a Heart

Based on [filament-lang/test/plot.test.js](https://github.com/joshmarinacci/filament-lang/blob/70cbdd75d0b9edf3573be4f69c666c6232108fca/test/plot.test.js#L141), this playable will use Filament to plot a 2D curve that looks like a heart.

```javascript /playable
//smartdown.import=https://unpkg.com/filament-lang@0.4.3/dist/filament.js

const canvasId = this.div.id + '_canvas';
this.div.innerHTML =
`
<canvas
  id="${canvasId}"
  style="display: block; margin: auto; border: 5px solid blue;"
  xwidth="500"
  height="300"></canvas>
`;

const canvas = document.getElementById(canvasId);

await Filament.setup_parser()

const heartCode =
`
{
  def px3(t:?) { (16 * (sin(t)**3))/10 }
  def py3(t:?) { (13 * cos(t) - 5 * cos (2*t) - 2 * cos(3*t) - cos(4*t))/10 }
  plot(x:px3, y:py3)
}
`;

let ret = await Filament.eval_code(heartCode);
ret.cb(canvas);

```



---

[Back to Home](:@Home)

