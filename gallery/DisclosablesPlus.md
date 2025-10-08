### Testing various disclosable options

We'll use `center` positioning for these tests.

#### `colorbox` content

[button](::colorboxDisclosable/button)

[button,transparent](::colorboxDisclosable/button,transparent)

# :::: colorboxDisclosable
# --colorbox
[](:Xa1) area
[](:Xa2) diameter
[](:Xa3) size
# --colorbox
# ::::

[button,transparent,center](::colorboxDisclosable/button,transparent,center)

[button,transparent,center,shadow](::colorboxDisclosable/button,transparent,center,shadow)

[button,transparent,center,outline](::colorboxDisclosable/button,transparent,center,outline)

[button,transparent,center,shadow,outline](::colorboxDisclosable/button,transparent,center,shadow,outline)

[button,transparent,center,draggable,closeable](::colorboxDisclosable/button,transparent,center,draggable,closeable)

[button,transparent,draggable,closeable,center,shadow](::colorboxDisclosable/button,transparent,draggable,closeable,center,shadow)

[button,transparent,center,draggable,closeable,outline](::colorboxDisclosable/button,transparent,center,draggable,closeable,outline)

[button,transparent,center,draggable,closeable,shadow,outline](::colorboxDisclosable/button,transparent,center,draggable,closeable,shadow,outline)



#### Plain text content

[button](::plaintextDisclosable/button)

[button,transparent](::plaintextDisclosable/button,transparent)

# :::: plaintextDisclosable
Hello World
# ::::

[center](::plaintextDisclosable/button,center)

[center,shadow](::plaintextDisclosable/button,center,shadow)

[center,outline](::plaintextDisclosable/button,center,outline)

[center,shadow,outline](::plaintextDisclosable/button,center,shadow,outline)

[center,draggable,closeable](::plaintextDisclosable/button,center,draggable,closeable)

[center,draggable,closeable,shadow](::plaintextDisclosable/button,draggable,closeable,center,shadow)

[center,draggable,closeable,outline](::plaintextDisclosable/button,center,draggable,closeable,outline)

[center,draggable,closeable,shadow,outline](::plaintextDisclosable/button,center,draggable,closeable,shadow,outline)


### Advanced Disclosables

There are two really easy ways to use disclosables described [here](:@Disclosables). On this page we'll show how you can have more control over how your disclosables are configured and displayed.  Disclosables have many options that can be combined in different ways.  Rather than enumerate them all possible permutations, we'll show a few useful examples.  To view a full list of disclosable options click the button below.

[See All Disclosable Options](::discOptions)

# :::: discOptions

## Disclosable Options

Here's a list of all the options that are currently available for disclosables.

1. **Trigger** -- There are currently two ways to trigger a disclosable, `button` or `link`.  If you don't specify one of these you will get the default `button`.

2. **Location** -- This controls where on the screen your disclosable will be displayed.  The options are:
  - `inline` -- Display disclosable where it is defined inline.
  - `attach` - Attach the disclosable below the trigger element and layer on top of main page.
  - `center`,`topright`, `topleft`, `bottomright`, `bottomleft` -- If you choose one of these locations you will get popup box located at specified position on the screen.  It will remained fixed as you scroll the main page content.  If you choose this option for locating your disclosable you can add the `draggable` option.  This allows the user to reposition the disclosable where ever they want on the screen.

3. **UnTrigger** -- These are additional ways to untrigger a disclosable.  The option `onmouseleave` will hide the disclosable when the mouse is no longer over the disclosable, as seen in the [tooltip](:@Disclosables) disclosable.
5. **Decorations** -- You can add a decoration to your disclosable by adding  `shadow`, `lightbox`, or `outline` to your options list.

# ::::

#### Control Panel Example

All the configurations for your disclosables are specified in the trigger element.  In the example below you'll see a disclosable called `controlPanel` followed by it's trigger.  The options for the disclosable are placed in the trigger after the name of the disclosable `::controlPanel` and a slash `/`.  They are written in a comma separated list: `button,bottomright,outline,shadow,draggable` and the order of the options doesn't matter.

```markdown

# :::: controlPanel
# --aliceblue cp
##### Control Panel
**A** [](:?a|number) [](:-a/0/100/0.01)
**B** [](:?b|number) [](:-b/0/100/0.01)
[Close](::controlPanel)
# --aliceblue
# ::::

[Show Control Panel](::controlPanel/button,bottomright,outline,shadow,draggable,closeable)

```

The markdown in the control panel example from above creates a draggable control panel that the user can position. It is rendered below. Click the button below to see the control panel that is created.

# :::: controlPanel
# --aliceblue cp
##### Control Panel
**A** [](:?a|number) [](:-a/0/100/0.01)
**B** [](:?b|number) [](:-b/0/100/0.01)
# --aliceblue
# ::::

[Show Control Panel bottomright](::controlPanel/button,bottomright,transparent,outline,shadow,draggable,closeable)

[Show Control Panel bottomleft](::controlPanel/button,bottomleft,transparent,outline,shadow,draggable,closeable)

[Show Control Panel topright ](::controlPanel/button,topright,transparent,outline,shadow,draggable,closeable)

[Show Control Panel topleft](::controlPanel/button,topleft,transparent,outline,shadow,draggable,closeable)

[Show Control Panel center](::controlPanel/button,center,transparent,utline,shadow,draggable,closeable)

So the configurations `button,bottomright,outline,shadow,draggable` creates a `button` trigger for a disclosable.  The disclosable appears in the `bottomright` corner of the screen with an `outline`, a drop `shadow` and it is `draggable` by the user. Notice that "close" button on the panel is just an additional disclosable trigger for same disclosable.  A disclosable can have multiple triggers.


#### Lightbox Example
The following example creates a lightbox disclosable.  These are great when you really need to get your readers attention. In the following example we have a disclosable called `message` followed by a trigger with the options `center,lightbox`.  This will place the disclosable in the center of the screen and the page behind it will be dimmed.

```markdown
[center,lightbox](::message/center,lightbox)

# :::: message
Do I have your attention for this important message?
[Click here if you got the message](::message)
# ::::

```

This markdown is rendered as:

- [center,lightbox](::message/center,lightbox)
- [center,lightbox,outline,transparent](::message/center,lightbox,outline,transparent)
- [center,lightbox,shadow,transparent](::message/center,lightbox,shadow,transparent)
- [center,lightbox,transparent](::message/center,lightbox,transparent)

# :::: message
Do I have your attention for this important message?
[Click here if you got the message](::message)
# ::::

Testing the `colorbox` as content:

- [center,lightbox](::colorboxmessage/center,lightbox)
- [center,lightbox,outline,transparent](::colorboxmessage/center,lightbox,outline,transparent)
- [center,lightbox,shadow,transparent](::colorboxmessage/center,lightbox,shadow,transparent)
- [center,lightbox,transparent](::colorboxmessage/center,lightbox,transparent)

# :::: colorboxmessage
# --colorbox
Do I have your attention for this important message?
[Click here if you got the message](::colorboxmessage)
# --colorbox
# ::::

## Revisiting Tooltips

If you hover your mouse over the highlighted text in this paragraph you'll see a tooltip. The [tooltip](::tooltip1/link,attach,outline,shadow,onmouseleave) disclosable is just a short cut for the `link,attach,outline,shadow,onmouseleave` options. Here's the markdown for this disclosable

```markdown
# :::: tooltip1

A tooltip is a popup message that appears below a highlighted section of text when the mouse hovers over that text.  They are a great way to add definitions for terms without cluttering up the main text.

# ::::
```
And here's how the trigger would be written

```markdown
[tooltip](::tooltip1/link,attach,outline,shadow,onmouseleave)
```
# :::: tooltip1

A tooltip is a popup message that appears below a highlighted section of text when the mouse hovers over that text.  They are a great way to add definitions for terms without cluttering up the main text.

# ::::

You can adjust these options to create a tooltip with a different look and feel.  You could do a [different tooltip](::tooltip2/link,attach,onmouseleave) without the drop shadow but add a decoration inside the tooltip.

# :::: tooltip2
# --colorbox
This tooltip is different and has a cool decoration wrapped around it.  To see how to add decorations checkout the [Decorations Page](:@Decorations).
# --colorbox
# ::::

Here's the markdown for this disclosable.

```markdown
# :::: tooltip2
# --colorbox
This tooltip is different and has a cool decoration wrapped around it.  To see how to add decorations checkout the [Decorations Page](:@Decorations).
# --colorbox
# ::::
```

And here is how the trigger is written.

```markdown
[different tooltip](::tooltip2/link,attach,onmouseleave)
```


#### High Five Example

Here is a cool example where two disclosables are combined to create an interactive math problem for the user.  The first disclosable allows the user to get a hint about how to answer the question.  In this case the hint is a bit overly generous in case its been a while since you've taken algebra.  The second disclosable will appear after the correct answer has been entered to give the user a celebratory high five.

#### --partialborder problem1

**Problem 1.3**

For what real values of $c$ is $x^2 + 16x + c$ the square of a binomial? If you find more than one, then list your values separated by commas.

[Your Answer](:?answer)

```javascript/autoplay
smartdown.setVariable('answer', '');
this.dependOn = ['answer'];

this.depend = function() {
  if (env.answer === '64') {
    smartdown.showDisclosure('highfive', '', 'bottomright,transparent');
    setTimeout(function () {
      smartdown.hideDisclosure('highfive','','bottomright,transparent');
    }, 3000);
  }
};
```
[Hint](::get_hint)

# :::: get_hint
The answer is 64.
# ::::

#### --partialborder


# :::: highfive
# --colorbox
High five! :raised_hand:
# --colorbox
# ::::

Let's take a look at the markdown for this example.  The hint disclosable is just a simple inline button disclosable.

```markdown
[Hint](::get_hint)

# :::: get_hint
The answer is 64.
# ::::
```

The problem uses [cells](:@Cells) to get the user's answer to the question and it stores that answer in a smartdown variable called `answer`.
```markdown
**Problem 1.3**

For what real values of $c$ is $x^2 + 16x + c$ the square of a binomial? If you find more than one, then list your values separated by commas.

[Your Answer](:?answer)
```

Here is the markdown for the high five disclosable.  Notice that `:raised_hand:` renders as the high five :raised_hand: emoji.

```markdown
# :::: highfive
# --colorbox
High five! :raised_hand:
# --colorbox
# ::::
```

The high five disclosable is triggered by a hidden javascript [playable](:@Javascript).  The `depend` function will be called each time the user changes the value of answer.  If the answer is $64$ we trigger the `highfive` disclosable and feed in the option `bottomright`.  A timeout callback waits three seconds and then hides the disclosable.

```markdown
javascript/autoplay
smartdown.setVariable('answer', '');
this.dependOn = ['answer'];


this.depend = function() {                                          // called when value of answer is changed
  if (env.answer === '64') {
    smartdown.showDisclosure('highfive','','bottomright');      // show high five
    setTimeout(function () {                                    // wait 3 seconds and then hide high five
           smartdown.hideDisclosure('highfive','','bottomright');
      }, 3000);
  }
};
```

#### Scrolling in Disclosables

The following is just a test to ensure that draggable disclosables have proper scrolling ability via the `scrollable` qualifier to the Disclosable trigger. Adding this qualifier results in the creation of a resizable, and if necessary, scrollable disclosable.

[Show Long Disclosable](::longDisclosable/button,topright,outline,shadow,draggable,closeable,scrollable)


# :::: longDisclosable
# --aliceblue cp

- one
- two
- three

- one
- two
- three

- one
- two
- three

- one
- two
- three

- one
- two
- three

- one
- two
- three

- one
- two
- three


# --aliceblue
# ::::


---

[Back to Home](:@Home)
