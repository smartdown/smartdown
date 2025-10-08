## Integrating GopherJS with Smartdown in two beers

A couple weeks ago on a November 2017 Friday evening, I set my mind to integrating a non-Javascript language into Smartdown in order to learn/teach such a language via Smartdown. After eliminating ClojureScript, ScalaJS, and KotlinJS via a fairly simple process of determining whether their demos worked offline, I settled on [GopherJS](https://github.com/gopherjs/gopherjs), the Javascript implementation of Go, as a worthy target.

Why? Because the [GopherJS Playground](https://github.com/gopherjs/gopherjs.github.io) worked wonderfully offline, proving that compilation of my Go source code was occurring in the browser, and satisfying my need for such a capability in Smartdown.

### It took more than two beers

I'm going to write a more detailed article about this project, but I eventually succeeded in learning Go, adapting the GopherJS Playground to work as a UI-less body of code, and integrating this code into Smartdown in a reasonable way. This document is an example of the potential of GoDown, the Smartdown+Go integration.

### Producer/Consumer Example

This demonstrates the use of multiple Go packages, the use of the GopherJS DOM package, and the use of channels to communicate between multiple processes.

#### ProducerA

Creates a Button that emits an "A" to the channel

```go/playable/autoplay
package producerA

import (
  "honnef.co/go/js/dom"
  "github.com/gopherjs/gopherjs/js"
)

func Producer(ch chan string) {
  d := dom.GetWindow().Document()

  myDivId := js.Global.Get("godownDiv_producerA").String()
  println("myDivId", myDivId)
  div := d.GetElementByID(myDivId).(*dom.HTMLDivElement)
  div.SetInnerHTML("")

  child := d.CreateElement("button").(*dom.HTMLButtonElement)
  child.Style().SetProperty("color", "purple", "")
  child.SetTextContent("Produce A")
  div.AppendChild(child)
  child.AddEventListener("click", false, func(event dom.Event) {
    ch <- "A"
  })
}
```

#### ProducerB

Creates a Button that emits a "B" to the channel

```go/playable/autoplay
package producerB

import (
  "honnef.co/go/js/dom"
  "github.com/gopherjs/gopherjs/js"
)

func Producer(ch chan string) {
  d := dom.GetWindow().Document()

  myDivId := js.Global.Get("godownDiv_producerB").String()
  println("myDivId", myDivId)
  div := d.GetElementByID(myDivId).(*dom.HTMLDivElement)
  div.SetInnerHTML("")

  child := d.CreateElement("button").(*dom.HTMLButtonElement)
  child.Style().SetProperty("color", "purple", "")
  child.SetTextContent("Produce B")
  div.AppendChild(child)
  child.AddEventListener("click", false, func(event dom.Event) {
    ch <- "B"
  })
}
```


#### Consumer

Reads from the channel and displays a log of all received messages.


```go/playable/autoplay
package consumer

import (
  "honnef.co/go/js/dom"
  "github.com/gopherjs/gopherjs/js"
)

func Consumer(ch chan string) {
  d := dom.GetWindow().Document()
  consumed := ""
  myDivId := js.Global.Get("godownDiv_consumer").String()
  println("myDivId", myDivId)
  div := d.GetElementByID(myDivId).(*dom.HTMLDivElement)

  for {
    div.SetInnerHTML("<h1>" + consumed + "</h1>")
    consumedChar, more := <- ch
    if more {
      consumed += consumedChar
    } else {
      break
    }
  }
}
```


#### Main program invokes Producers and Consumer and then Chills

All Go programs start with `main`. In this example, we just use `main` to tie together the various producer/consumer components and give them a shared channel for communication. It is totally possible, and reasonable to combine `producerA` and `producerB` into a parametrized package `producer`; but this demo evolved to show off the multi-package capability.


```go/playable/autoplay
package main

import (
  "producerA"
  "producerB"
  "consumer"
  "github.com/gopherjs/gopherjs/js"
)

var ch chan string

func main() {
  js.Global.Set("Godown_Shutdown", js.InternalObject(func(msg string) {
    close(ch)
  }))

  ch = make(chan string, 5)
  go producerA.Producer(ch)
  go producerB.Producer(ch)
  go consumer.Consumer(ch)

  println("All Done")
}

```

---

[Back to Home](:@Home)
