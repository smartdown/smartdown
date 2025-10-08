### Mermaid Examples

[Mermaid](https://mermaidjs.github.io) provides a concise and practical way to describe various technical diagrams and have them rendered within a web page. See [Mermaid Demos](https://mermaidjs.github.io/demos.html) for some of its capabilities.

Smartdown has integrated Mermaid, making it easier to mix Mermaid diagrams with Markdown and other Smartdown playables and content.

The examples below show some of the ways Mermaid may be used to help explain with diagrams.

---


```mermaid/playable

%% Example of sequence diagram

graph LR
    id1((This is the text in the circle));
```

#### Graph/Flowchart Diagram

```mermaid/autoplay/playable
graph TB
   subgraph one
   a1-->a2{Rhombus}
   end
   subgraph two
   b1-->b2[This is a really long label.]
   end
   subgraph three
   c1-->c2
   end
   c1-->a2
```

#### Sequence Diagram

```mermaid/autoplay/playable
sequenceDiagram
A->> B: Query
B->> C: Forward query
Note right of C: Thinking...
C->> B: Response
B->> A: Forward response
```

#### Gantt Diagram

```mermaid/autoplay/playable
gantt
  dateFormat  YYYY-MM-DD
  title GANTT diagram functionality

  section A section
  Completed task            :done,    des1, 2014-01-06,2014-01-08
  Active task               :active,  des2, 2014-01-09, 3d
  Future task               :         des3, after des2, 5d
  Future task2              :         des4, after des3, 5d

  section Critical tasks
  Completed task in the critical line :crit, done, 2014-01-06,24h
  Implement parser and jison          :crit, done, after des1, 2d
  Create tests for parser             :crit, active, 3d
  Future task in critical line        :crit, 5d
  Create tests for renderer           :2d
  Add to mermaid                      :1d

  section Documentation
  Describe gantt syntax               :active, a1, after des1, 3d
  Add gantt diagram to demo page      :after a1  , 20h
  Add another diagram to demo page    :doc1, after a1  , 48h

  section Last section
  Describe gantt syntax               :after doc1, 3d
  Add gantt diagram to demo page      :20h
  Add another diagram to demo page    :48h
```


#### Experimenting with dynamic Mermaid

A quick experiment that shows how a Smartdown cell (called `Name`, in this example) can be used as input to derive a dynamic Mermaid diagram which uses `Name`. In this example, if `Name` is blank, then `Alice` will be used as the name.

[What is your Name?](:?Name)

#### Here is your diagram, [](:!Name)

```javascript/playable
var actorName = env.Name;
if (!actorName || actorName.length === 0) {
   actorName = 'Alice';
}

var dynamicMermaidSource =
`
sequenceDiagram
    ${actorName}->>John: Hello John, how are you?
    John-->>${actorName}: I'm awesome, as are you, ${actorName}!
`;

smartdown.setVariable('MermaidSource', dynamicMermaidSource)
```

[](:!MermaidSource|mermaid)
[](:!MermaidSource|code)


---


[Back to Home](:@Home)

