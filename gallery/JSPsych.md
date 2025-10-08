## jsPsych

# JSPsychHome
---

I recently discovered [jsPsych](https://www.jspsych.org), which is best described by its creators:

> jsPsych is a JavaScript library for running behavioral experiments in a web browser. The library provides a flexible framework for building a wide range of laboratory-like experiments that can be run online.

I wanted to see whether it *played well* with Smartdown, and created this document to explore what a Smartdown/jsPsych integration might look like. I mostly plan on adapting some of the jsPsych examples and using Smartdown to visualize the data produced by an experiment. My goal isn't to provide an unnecessary wrapper around jsPsych, but to make it easier to *talk about* jsPsych and different experiment types.

So far, I've converted two experiments:

- [Reaction Time Experiment](:@JSPsych/ReactionTime)
- [Flanker Experiment](:@JSPsych/Flanker)

### Source for this document

This Smartdown project consists of a few Smartdown files, some of which are partioned into *cards* via Smartdown's [MultiCards](https://smartdown.site/#gallery/Multicards.md) syntax:

- Single-Card Document: https://github.com/smartdown/gallery/blob/master/JSPsych.md
- Multi-Card Document: https://github.com/smartdown/gallery/blob/master/JSPsych/ReactionTime.md
- Multi-Card Document: https://github.com/smartdown/gallery/blob/master/JSPsych/Flanker.md

Note that the same project could be broken out into separate Smartdown files, but for quick hacking, fewer files are more convenient.

### Modifications to the original experiments

Some of the modifications I've made to the original, to get it to fit better into a Smartdown document and to show off Smartdown's powers:

- I've used CSS to reduce the size of the circles.
- I've simplified the code to be more readable, by taking advantage of modern Javascript features like [Template Literals](https://developer.a.org/en-US/docs/Web/JavaScript/Reference/Template_literals).
- I'm currently using the `smartdown.import` syntax to dynamically load `jsPsych` into the document (see [Extension Mechanisms for Smartdown](https://smartdown.site/#gallery/Extensions.md)). If the `jsPsych` integration proves promising, I will build a *first-class* embedding in the same way that [P5JS](https://smartdown.site/#gallery/P5JS.md) and [D3](https://smartdown.site/#gallery/D3.md) are embedded.
- Rather than relying upon jsPsych's `data.displayData()` function, I instead use `get().values()` to extract the experiment data into a Smartdown variable, so that it can be subsequently visualized.
- I converted the double-quotation marks into single-quotes when in Javascript, because that is how I roll. Similarly, I replaced `snake_case` identifiers with `camelCase`.
- I eliminated the `Press any key to complete the experiment` step, since I'm using Smartdown to display the values and the user invokes that step with the `View Reaction Time Data`.
- I use 'spacebar' instead of 'any key', because 'any key' is too broad and makes debugging harder.

### Issues that came up

My jsPsych experimentation has highlighted some of Smartdown's power, but also revealed some issues that can and should be fixed. Here's what I learned so far:

- The issue of *keyboard focus* needs to be handled better. The Reaction Time example relies upon the user interacting with the keyboard, and I had to write code in the Smartdown document to manage this focus. I'd like to have `jsPsych` playables automatically get focus when they are *played*.
- Because most jsPsych experiments have their own introduction and conclusion phases in the timeline, it is *desirable* for Smartdown's buttons to be disabled until it makes sense to move to the next Smartdown card. This same concept has come up previously with [Disclosables](https://smartdown.site/#gallery/Disclosables.md), where we wanted to have the visibility of a Disclosable be reactively linked to a Smartdown variable. I consider this a feature that can be added to Smartdown in the future.
- Because both the Reaction Time and Flanker experiments require image assets, I needed to add these assets to the Gallery so they'd be accessible. I'd really like to adjust these experiments so that they generated the images dynamically at experiment startup. The Flanker experiment could be made more general this way, rather than relying upon the simple congruent vs non-congruent examples.

---

[Gallery Home](:@Home)
