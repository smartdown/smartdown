### Graphviz via `viz.js`

Smartdown has integrated the powerful [viz.js](https://github.com/mdaines/viz.js) library, which is compiled into Javascript from the original Graphviz C code.

Note: There is a similarly named package at [https://visjs.org](https://visjs.org) which Smartdown does not currently use.

There is a Graphviz example displaying the `stdlib` namespaces at [Stdlib via Graphviz](:@Stdlib)

#### Crazy.gv

```graphviz/playable
digraph "unix" {
  graph [ fontname = "Helvetica-Oblique",
    fontsize = 36,
    label = "\n\n\n\nObject Oriented Graphs\nStephen North, 3/19/93",
    size = "12,12" ];
  node [  shape = polygon,
    sides = 4,
    distortion = "0.0",
    orientation = "0.0",
    skew = "0.0",
    color = white,
    style = filled,
    fontname = "Helvetica-Outline",
    fontsize = "36"];
  "5th Edition" [sides=9, distortion="0.936354", orientation=28, skew="-0.126818", color=salmon2];
  "6th Edition" [sides=5, distortion="0.238792", orientation=11, skew="0.995935", color=deepskyblue];
  "PWB 1.0" [sides=8, distortion="0.019636", orientation=79, skew="-0.440424", color=goldenrod2];
  LSX [sides=9, distortion="-0.698271", orientation=22, skew="-0.195492", color=burlywood2];
  "1 BSD" [sides=7, distortion="0.265084", orientation=26, skew="0.403659", color=gold1];
  "Mini Unix" [distortion="0.039386", orientation=2, skew="-0.461120", color=greenyellow];
  Wollongong [sides=5, distortion="0.228564", orientation=63, skew="-0.062846", color=darkseagreen];
  Interdata [distortion="0.624013", orientation=56, skew="0.101396", color=dodgerblue1];
  "Unix/TS 3.0" [sides=8, distortion="0.731383", orientation=43, skew="-0.824612", color=thistle2];
  "PWB 2.0" [sides=6, distortion="0.592100", orientation=34, skew="-0.719269", color=darkolivegreen3];
  "7th Edition" [sides=10, distortion="0.298417", orientation=65, skew="0.310367", color=chocolate];
  "8th Edition" [distortion="-0.997093", orientation=50, skew="-0.061117", color=turquoise3];
  "32V" [sides=7, distortion="0.878516", orientation=19, skew="0.592905", color=steelblue3];
  V7M [sides=10, distortion="-0.960249", orientation=32, skew="0.460424", color=navy];
  "Ultrix-11" [sides=10, distortion="-0.633186", orientation=10, skew="0.333125", color=darkseagreen4];
  Xenix [sides=8, distortion="-0.337997", orientation=52, skew="-0.760726", color=coral];
  "UniPlus+" [sides=7, distortion="0.788483", orientation=39, skew="-0.526284", color=darkolivegreen3];
  "9th Edition" [sides=7, distortion="0.138690", orientation=55, skew="0.554049", color=coral3];
  "2 BSD" [sides=7, distortion="-0.010661", orientation=84, skew="0.179249", color=blanchedalmond];
  "2.8 BSD" [distortion="-0.239422", orientation=44, skew="0.053841", color=lightskyblue1];
  "2.9 BSD" [distortion="-0.843381", orientation=70, skew="-0.601395", color=aquamarine2];
  "3 BSD" [sides=10, distortion="0.251820", orientation=18, skew="-0.530618", color=lemonchiffon];
  "4 BSD" [sides=5, distortion="-0.772300", orientation=24, skew="-0.028475", color=darkorange1];
  "4.1 BSD" [distortion="-0.226170", orientation=38, skew="0.504053", color=lightyellow1];
  "4.2 BSD" [sides=10, distortion="-0.807349", orientation=50, skew="-0.908842", color=darkorchid4];
  "4.3 BSD" [sides=10, distortion="-0.030619", orientation=76, skew="0.985021", color=lemonchiffon2];
  "Ultrix-32" [distortion="-0.644209", orientation=21, skew="0.307836", color=goldenrod3];
  "PWB 1.2" [sides=7, distortion="0.640971", orientation=84, skew="-0.768455", color=cyan];
  "USG 1.0" [distortion="0.758942", orientation=42, skew="0.039886", color=blue];
  "CB Unix 1" [sides=9, distortion="-0.348692", orientation=42, skew="0.767058", color=firebrick];
  "USG 2.0" [distortion="0.748625", orientation=74, skew="-0.647656", color=chartreuse4];
  "CB Unix 2" [sides=10, distortion="0.851818", orientation=32, skew="-0.020120", color=greenyellow];
  "CB Unix 3" [sides=10, distortion="0.992237", orientation=29, skew="0.256102", color=bisque4];
  "Unix/TS++" [sides=6, distortion="0.545461", orientation=16, skew="0.313589", color=mistyrose2];
  "PDP-11 Sys V" [sides=9, distortion="-0.267769", orientation=40, skew="0.271226", color=cadetblue1];
  "USG 3.0" [distortion="-0.848455", orientation=44, skew="0.267152", color=bisque2];
  "Unix/TS 1.0" [distortion="0.305594", orientation=75, skew="0.070516", color=orangered];
  "TS 4.0" [sides=10, distortion="-0.641701", orientation=50, skew="-0.952502", color=crimson];
  "System V.0" [sides=9, distortion="0.021556", orientation=26, skew="-0.729938", color=darkorange1];
  "System V.2" [sides=6, distortion="0.985153", orientation=33, skew="-0.399752", color=darkolivegreen4];
  "System V.3" [sides=7, distortion="-0.687574", orientation=58, skew="-0.180116", color=lightsteelblue1];
  "5th Edition" -> "6th Edition";
  "5th Edition" -> "PWB 1.0";
  "6th Edition" -> LSX;
  "6th Edition" -> "1 BSD";
  "6th Edition" -> "Mini Unix";
  "6th Edition" -> Wollongong;
  "6th Edition" -> Interdata;
  Interdata -> "Unix/TS 3.0";
  Interdata -> "PWB 2.0";
  Interdata -> "7th Edition";
  "7th Edition" -> "8th Edition";
  "7th Edition" -> "32V";
  "7th Edition" -> V7M;
  "7th Edition" -> "Ultrix-11";
  "7th Edition" -> Xenix;
  "7th Edition" -> "UniPlus+";
  V7M -> "Ultrix-11";
  "8th Edition" -> "9th Edition";
  "1 BSD" -> "2 BSD";
  "2 BSD" -> "2.8 BSD";
  "2.8 BSD" -> "Ultrix-11";
  "2.8 BSD" -> "2.9 BSD";
  "32V" -> "3 BSD";
  "3 BSD" -> "4 BSD";
  "4 BSD" -> "4.1 BSD";
  "4.1 BSD" -> "4.2 BSD";
  "4.1 BSD" -> "2.8 BSD";
  "4.1 BSD" -> "8th Edition";
  "4.2 BSD" -> "4.3 BSD";
  "4.2 BSD" -> "Ultrix-32";
  "PWB 1.0" -> "PWB 1.2";
  "PWB 1.0" -> "USG 1.0";
  "PWB 1.2" -> "PWB 2.0";
  "USG 1.0" -> "CB Unix 1";
  "USG 1.0" -> "USG 2.0";
  "CB Unix 1" -> "CB Unix 2";
  "CB Unix 2" -> "CB Unix 3";
  "CB Unix 3" -> "Unix/TS++";
  "CB Unix 3" -> "PDP-11 Sys V";
  "USG 2.0" -> "USG 3.0";
  "USG 3.0" -> "Unix/TS 3.0";
  "PWB 2.0" -> "Unix/TS 3.0";
  "Unix/TS 1.0" -> "Unix/TS 3.0";
  "Unix/TS 3.0" -> "TS 4.0";
  "Unix/TS++" -> "TS 4.0";
  "CB Unix 3" -> "TS 4.0";
  "TS 4.0" -> "System V.0";
  "System V.0" -> "System V.2";
  "System V.2" -> "System V.3";
}
```

#### Tree Example

```graphviz/autoplay/playable
digraph L0 {
  size = "8,8";
  ordering=out;
  node [shape = box];

  n0 [label="E"];
  n1 [label="T"];
  n2 [label="F"];
  n3 [label="IDENT : a "];
  n4 [label="+"];
  n5 [label="T"];
  n6 [label="F"];
  n7 [label="("];
  n8 [label="E"];
  n9 [label="T"];
  n10 [label="F"];
  n11 [label="IDENT : b "];
  n12 [label="*"];
  n13 [label="F"];
  n14 [label="IDENT : c "];
  n15 [label=")"];
  n16 [label="*"];
  n17 [label="F"];
  n18 [label="("];
  n19 [label="E"];
  n20 [label="T"];
  n21 [label="F"];
  n22 [label="IDENT : d "];
  n23 [label="*"];
  n24 [label="F"];
  n25 [label="IDENT : e "];
  n26 [label="+"];
  n27 [label="T"];
  n28 [label="F"];
  n29 [label="("];
  n30 [label="E"];
  n31 [label="T"];
  n32 [label="F"];
  n33 [label="IDENT : a "];
  n34 [label="*"];
  n35 [label="F"];
  n36 [label="IDENT : b "];
  n37 [label=")"];
  n38 [label=")"];
  n39 [label="+"];
  n40 [label="T"];
  n41 [label="F"];
  n42 [label="IDENT : q "];
  n0 -> { n1 n4 n5 n39 n40 };
  n1 -> n2 ;
  n2 -> n3 ;
  n5 -> { n6 n16 n17 };
  n6 -> { n7 n8 n15 };
  n8 -> n9 ;
  n9 -> { n10 n12 n13 };
  n10 ->  n11 ;
  n13 ->  n14 ;
  n17 ->  { n18 n19 n38 };
  n19 ->  { n20 n26 n27 };
  n20 ->  { n21 n23 n24 };
  n21 ->  n22 ;
  n24 ->  n25 ;
  n27 ->  n28 ;
  n28 ->  { n29 n30 n37 };
  n30 ->  n31 ;
  n31 ->  { n32 n34 n35 };
  n32 ->  n33 ;
  n35 ->  n36 ;
  n40 ->  n41 ;
  n41 ->  n42 ;
}
```

#### Using Images

This needs better documentation. It is an early-stage feature still under development.

When Smartdown is initialized via `smartdown.initialize`, it is provided with a list of images that can be used with the SVG `/media` syntax (see [SVG](:@SVG) for more info). This same set of images is also made available to Graphviz via its `image:` attribute to nodes.

```graphviz/playable/autoplay
digraph diagram {
    compound=true;
    ranksep=1
    node[shape=record]

    subgraph cluster_all {
        label="Web Host, Content, Author and Reader"

firewall2 [shape=none, label="firewall2", labelloc="b", image="/gallery/resources/lighthouse.svg"]
firewall1 [shape=none, label="firewall1", labelloc="b", image="/gallery/resources/cloud.jpg"]

        Author [shape=none, label="Author DrBud", image="/gallery/resources/cloud.jpg"]
        ContentABC [shape=tab, label="Content/ABC"]
        WebABC [shape=tab, label="Website/ABC"]
        Author -> ContentABC
        ContentABC -> WebABC
    }
}
```

---

[Back to Home](:@Home)

