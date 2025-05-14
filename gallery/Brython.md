### Brython in Smartdown

Smartdown is designed as a way to explain and share prose, media and active programming fragments called *playables*. Javascript-based playables have been well-supported and integrated, including the `javascript` playable and its more specialized `p5js` playable. Smartdown also supports other languages that can run in the browser, either via transpilation to Javascript (as in the `GopherJS` integration) or via compilation to WebAssembly (e.g., `GraphViz`). Eventually, Smartdown will support the optional use of *Remotely Executing* playables, which is the Jupyter notebook model, and the use of *Remotely Dependent* variables, but that's a subject for a different document.

I recently explored the possibility of using [Brython](https://www.brython.info) as a way to run Python code as a playable within the browser, while adhering to Smartdown's serverless principles. Brython is very cool, well-documented, and it was pretty easy (a weekend) to build the following prototype.


#### Hello World

This simple example effectively uses the browser's `window.alert()` function, but does so via Brython and the [browser](https://www.brython.info/static_doc/en/browser.html) module.

```brython/playable/debug
"""A very simple Python3 program"""

import browser

browser.alert("Hello World")
```


#### Smartdown Reactivity

Let's see if we can make a Brython playable *observe* and *react* to a Smartdown variable.

First, play the following playable, which will *wait* until it's dependent variable `NAME` is changed.


```brython/playable
"""React to changes in NAME by adjusting the DOM"""
import browser

sd = __BRYTHON__.smartdown

def nameChanged():
    sd.this.div.innerHTML = "<h4>Hello, %s</h4>" % sd.env.NAME

sd.smartdown.setVariable('NAME', '')

sd.this.dependOn = ['NAME']
sd.this.depend = nameChanged
```

In the Smartdown cell below, enter your name (or whatever), which will trigger the dependent function, which will change the content above to the new value of the Smartdown variable `NAME`.


[What is your name?](:?NAME)

#### Prettier Reactivity with SVG

Adapting the examples in [browser.svg](https://www.brython.info/static_doc/en/svg.html) by dynamically creating an SVG wrapper, we can get a more interesting reactivity. In this case, we'll draw the latest version of `NAME` and a star diagram below it.


```brython/playable
from browser import document, svg

sd = __BRYTHON__.smartdown

def nameChanged():
    title = svg.text(sd.env.NAME, x=70, y=25, font_size=22,
                     text_anchor="middle")

    star = svg.polygon(fill="red", stroke="blue", stroke_width="10",
                       points=""" 75,38  90,80  135,80  98,107
                                 111,150 75,125  38,150 51,107
                                  15,80  60,80""")

    sdDiv = sd.div
    gId = sdDiv.id + "_g"

    svgWrapper = """\
<svg
    xmlns="https://www.w3.org/2000/svg"
    xmlns:xlink="https://www.w3.org/1999/xlink"
    width="200" height="200" style="border-style:solid;border-width:1;border-color:#000;">
        <g id="%s"></g>
</svg>""" % gId

    sdDiv.innerHTML = svgWrapper
    gElement = document[gId]
    gElement <= title
    gElement <= star

sd.this.dependOn = ['NAME']
sd.this.depend = nameChanged
```


#### Analog Clock

The following example is based upon the Brython example [Analog Clock](https://brython.info/gallery/clock.html). The original example specified the `<canvas>` tag in HTML; I've adapted it to use the Smartdown per-playable `<div>` as a parent, and added Brython code to create the `<canvas>` dynamically.


```brython/playable
"""Code for the clock"""
import time
import math
import datetime
import sys


from browser import document as doc
from browser import window as win
import browser.timer

sin, cos = math.sin, math.cos
width, height = 250, 250 # canvas dimensions
ray = 100 # clock ray

background = "#111"
digits = "#fff"
border = "#333"

timer = None

def needle(angle, r1, r2, color="#000000"):
    """Draw a needle at specified angle in specified color.
    r1 and r2 are percentages of clock ray.
    """
    x1 = width / 2 - ray * cos(angle) * r1
    y1 = height / 2 - ray * sin(angle) * r1
    x2 = width / 2 + ray * cos(angle) * r2
    y2 = height / 2 + ray * sin(angle) * r2
    ctx.beginPath()
    ctx.strokeStyle = "#fff"
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()

def set_clock():
    # erase clock
    ctx.beginPath()
    ctx.fillStyle = background
    ctx.arc(width / 2, height / 2, ray * 0.89, 0, 2 * math.pi)
    ctx.fill()

    # redraw hours
    show_hours()

    # print day
    now = datetime.datetime.now()
    day = now.day
    ctx.font = "bold 14px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillStyle="#000"
    ctx.fillText(day, width * 0.7, height * 0.5)

    # draw needles for hour, minute, seconds
    ctx.lineWidth = 2
    hour = now.hour % 12 + now.minute / 60
    angle = hour * 2 * math.pi / 12 - math.pi / 2
    needle(angle, 0.05, 0.5)
    minute = now.minute
    angle = minute * 2 *math.pi / 60 - math.pi / 2
    needle(angle, 0.05, 0.85)
    ctx.lineWidth = 1
    second = now.second + now.microsecond / 1000000
    angle = second * 2 * math.pi / 60 - math.pi / 2
    needle(angle, 0.05, 0.85, "#FF0000") # in red

def show_hours():
    ctx.beginPath()
    ctx.arc(width / 2, height / 2, ray * 0.05, 0, 2 * math.pi)
    ctx.fillStyle = digits
    ctx.fill()
    for i in range(1, 13):
        angle = i * math.pi / 6 - math.pi / 2
        x3 = width / 2 + ray * cos(angle) * 0.75
        y3 = height / 2 + ray * sin(angle) * 0.75
        ctx.font = "18px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(i, x3, y3)
    # cell for day
    ctx.fillStyle = "#fff"
    ctx.fillRect(width * 0.65, height * 0.47, width * 0.1, height * 0.06)


sd = __BRYTHON__.smartdown

canvasId = sd.divId + "_canvas"
canvas = doc.createElement("canvas")
canvas.attrs['id'] = canvasId;
canvas.attrs['width'] = '250';
canvas.attrs['height'] = '250';
canvas.attrs['id'] = canvasId;
sd.div.appendChild(canvas);

# draw clock border
if hasattr(canvas, 'getContext'):
    ctx = canvas.getContext("2d")

    ctx.beginPath()
    ctx.arc(width / 2, height / 2, ray, 0, 2 * math.pi)
    ctx.fillStyle = background
    ctx.fill()

    ctx.beginPath()
    ctx.lineWidth = 6
    ctx.arc(width / 2,height / 2, ray + 3, 0, 2 * math.pi)
    ctx.strokeStyle = border
    ctx.stroke()

    for i in range(60):
        ctx.lineWidth = 1
        if i%5 == 0:
            ctx.lineWidth = 3
        angle = i * 2 * math.pi / 60 - math.pi / 3
        x1 = width / 2 + ray * cos(angle)
        y1 = height / 2 + ray * sin(angle)
        x2 = width / 2 + ray * cos(angle) * 0.9
        y2 = height / 2 + ray * sin(angle) * 0.9
        ctx.beginPath()
        ctx.strokeStyle = digits
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
    timer = browser.timer.set_interval(set_clock, 100)
    show_hours()
else:
    doc['navig_zone'].html = "On Internet Explorer 9 or more, use a Standard rendering engine"

def atExit():
    print("atExit in Brython")
    browser.timer.clear_timeout(timer)

sd.this.atExit(atExit)
```

#### How it works

Brython's default API is the `brython()` function which obtains Python3 source code from a `<script type="text/python3">` tag. Smartdown detects `brython` playables and generates a corresponding `<script ...>` tag. When the playable is *played*, the `Brython` compiler is invoked upon the target Python3 script and the translated Python is `eval`-ed in the context of a Smartdown-generated wrapper script that ensures that Smartdown's context is passed.

#### Inter-language Communication

Because Smartdown's variables are available to all playables, whether Javascript or Brython, we can *compose* a document using multiple languages, depending on which language is appropriate and best expresses a concept. For example, we can write a Javascript playable that reacts to the same variable `NAME` as above. In this simple example, we'll just update the playable's DOM similar to how we did this in Brython above. For convenience, we have another input field below which will *reflect* and *affect* the value of the `NAME` variable.

[What is your Name (again)?](:?NAME)

```javascript/playable
const myDiv = this.div;

this.dependOn = ['NAME']
this.depend = function() {
    const name = env.NAME;
    myDiv.innerHTML = `<h4>Hello, ${name}</h4>`
};

if (!env.NAME) {
    smartdown.setVariable('NAME', '');
}
```


#### What's next

The above examples work pretty well, after a lot of trial and error. Some of the next steps:

- The *augmented code* is unnecessarily large and contains dead code left over from prior experiments.
- If there is a syntax error in the Python code, it is difficult for an ordinary user to debug. The Brython stack trace needs to be interpreted in an author-friendly way. This problem is shared with other Smartdown playables.
- I'm still unclear on the variable scoping and what effects one `brython` playable might have on another. This needs to be explored and explained.

---

[Back to Home](:@Home)


