# ReactionTimeIntroduction
---

### Reaction Time Experiment

We'll start by adapting the [Reaction Time Experiment Tutorial](https://www.jspsych.org/tutorials/rt-task/) example, whose final source is [demo-simple-rt-task.html](https://github.com/jspsych/jsPsych/blob/master/examples/demo-simple-rt-task.html).


[Begin Reaction Time Experiment](:@ReactionTimeExperiment)

---

[jsPsych Home](:@JSPsych)


# ReactionTimeExperiment
---

```javascript /playable/autoplay
//smartdown.import=https://cdn.jsdelivr.net/gh/jspsych/jsPsych@6.1.0/jspsych.js
//smartdown.import=https://cdn.jsdelivr.net/gh/jspsych/jsPsych@6.1.0/plugins/jspsych-html-keyboard-response.js
//smartdown.import=https://cdn.jsdelivr.net/gh/jspsych/jsPsych@6.1.0/plugins/jspsych-image-keyboard-response.js

env.reactionTimeData = undefined;
const myDiv = this.div;

smartdown.importCssUrl('https://cdn.jsdelivr.net/gh/jspsych/jsPsych@6.1.0/css/jspsych.css');
smartdown.importCssCode(
`
#${myDiv.id} .jspsych-content img {
  width: 100px;
}
`);

const imgPrefix = 'https://raw.githubusercontent.com/smartdown/gallery/master/resources/';
myDiv.style.width = '500px';
myDiv.style.height = '300px';
myDiv.style.margin = 'auto';

const timeline = [];

const welcomeStimulus = 'Welcome to the experiment. Press <b>spacebar</b> to begin.';
const welcomeBlock = {
  type: 'html-keyboard-response',
  choices: [32],
  stimulus: welcomeStimulus
};
timeline.push(welcomeBlock);


const instructionsStimulus =
`
<p>
A circle will appear in the center of the screen.
</p>
<p>
If the circle is <strong>blue</strong> press the letter F on the
keyboard.
</p>
<p>If the circle is <strong>orange</strong>, press the letter J on the
keyboard.</p>
<div
  style="float: left; width: 200px;">
  <img src="${imgPrefix}blue.png"></img>
  <p class="small">
    <strong>Press the F key</strong>
  </p>
</div>
<div
  style="float: right; width: 200px;">
  <img src="${imgPrefix}orange.png"></img>
  <p class="small">
    <strong>Press the J key</strong>
  </p>
</div>
<hr style="clear:both;">
<p class="small">
  Press the <b>spacebar</b> to begin
</p>
`;

var instructionsBlock = {
  type: "html-keyboard-response",
  choices: [32],
  stimulus: instructionsStimulus,
  post_trial_gap: 2000
};
timeline.push(instructionsBlock);


var testStimuli = [
  { stimulus: imgPrefix + 'blue.png', data: { test_part: 'test', correct_response: 'f' } },
  { stimulus: imgPrefix + 'orange.png', data: { test_part: 'test', correct_response: 'j' } }
];

const preloadImages = testStimuli.map(s => s.stimulus);

const trialTimes = [250, 500, 750, 1000, 1250, 1500, 1750, 2000];
var fixation = {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: function(){
    return jsPsych.randomization.sampleWithoutReplacement(trialTimes, 1)[0];
  },
  data: {test_part: 'fixation'}
}

var test = {
  type: 'image-keyboard-response',
  stimulus: jsPsych.timelineVariable('stimulus'),
  choices: ['f', 'j'],
  data: jsPsych.timelineVariable('data'),
  on_finish: function(data){
    data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
  },
}

var testProcedure = {
  timeline: [fixation, test],
  timeline_variables: testStimuli,
  repetitions: 5,
  randomize_order: true
}
timeline.push(testProcedure);


function debrief() {
  var trials = jsPsych.data.get().filter({test_part: 'test'});
  var correct_trials = trials.filter({correct: true});
  var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
  var rt = Math.round(correct_trials.select('rt').mean());

  const result =
`
<p>
You responded correctly on ${accuracy}% of the trials.
</p>
<p>
Your average response time was ${rt}ms.
</p>

<p>
The experiment is now complete. Thank you!
</p>
`;

  jsPsych.endExperiment();

  return result;
}

var debriefBlock = {
  type: 'html-keyboard-response',
  choices: jsPsych.NO_KEYS,
  stimulus: debrief
};
timeline.push(debriefBlock);


// https://www.jspsych.org/core_library/jspsych-core/#jspsychinit
// https://www.jspsych.org/core_library/jspsych-core/#parameters_7

jsPsych.init({
  on_trial_start: function() {
    const top = myDiv.offsetTop - 40;
    document.body.scrollTop = top; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = top; // For IE and Firefox
    myDiv.focus();
  },
  // preload_images: preloadImages,
  display_element: myDiv,
  timeline: timeline,
  on_finish: function() {
    // jsPsych.data.displayData();

    const experimentData = jsPsych.data.get().values();
    smartdown.setVariable('reactionTimeData', experimentData);
  },
});

// window.setTimeout(function() {
//   const top = myDiv.offsetTop - 40;
//   document.body.scrollTop = top; // For Chrome, Safari and Opera
//   document.documentElement.scrollTop = top; // For IE and Firefox
//   myDiv.focus();
// }, 0);

```

---

[View Reaction Time Data](:@ViewReactionTimeData)

---

[Repeat Experiment](:@JSPsych/ReactionTime)

---

[Back to jsPsych Home](:@JSPsych)


# ViewReactionTimeData
---

The `jsPsych` results from the previous experiment have been captured in the Smartdown variable `experimentData`, which we can display in raw JSON format via a Smartdown [Cell]()

[Experiment Data](:!reactionTimeData|json)

[Visualize the Results](:@VisualizeReactionTimeData)

---

[Repeat Experiment](:@JSPsych/ReactionTime)

---

[Back to jsPsych Home](:@JSPsych)


# VisualizeReactionTimeData
---

Now that we have the data gathered via `jsPsych` in a Smartdown variable, we can use other tech to visualize the data. Since this is a first draft, we'll just do something pretty, but meaningless. We'll just build a pie-chart that shows the correct vs incorrect percentages. We'll use [Plotly](https://smartdown.site/#gallery/Plotly.md), which is a nice library built upon [D3](https://smartdown.site/#gallery/D3.md) that makes it easy to make charts and graphs.

We're going to have to write a little code to make this visualization happen.

```plotly/autoplay/playable
const myDiv = this.div;
myDiv.innerHTML = `<h3>Waiting for reactionTimeData to be available</h3>`;
this.dependOn = ['reactionTimeData'];
this.depend = function() {
  myDiv.innerHTML = '';
  const experimentData = env.reactionTimeData;
  const correctVsIncorrect = [0, 0];
  experimentData.forEach((trial) => {
    if (trial.test_part === 'test') {
      if (trial.correct) {
        correctVsIncorrect[0] += 1;
      }
      else {
        correctVsIncorrect[1] += 1;
      }
    }
  });
  var data = [{
    values: correctVsIncorrect,
    labels: ['Correct', 'Incorrect'],
    type: 'pie'
  }];

  var layout = {
    height: 400,
    width: 500
  };

  Plotly.newPlot(myDiv, data, layout, {displayModeBar: false});
}

```

---

[Repeat Experiment](:@JSPsych/ReactionTime)

---

[Back to jsPsych Home](:@JSPsych)
