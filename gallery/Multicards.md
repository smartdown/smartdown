
# CardHome
---

A Smartdown Stack can have its cards in separate files, or they have their content within a single file, called a *multicard document*.

To author such a document, precede each logical card by a header identifying the card's *key*, which may then be used for hyperlinking within the multicard document.

For example, the `Card2` in this example multicard stack has its content preceded by the following syntax:

```markdown
 # Card2
 ---
```

#### CardHome: Hello World

[What is your name?](:?NAME)
Hello [](:!NAME)

---

[Next](:@Card1)
[Home](:@Home)


# Card1
---

#### Card1: Hello World

Hello [](:!NAME)

[Prev](:@CardHome)
[Next](:@Card2)


# Card2
---

#### Card2: Thanks for Playing

[Prev](:@Card1)
[Next](:@CardHome)

