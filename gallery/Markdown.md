### Markdown Basics

[Markdown](https://en.wikipedia.org/wiki/Markdown) was originally conceived as an easier way to write prose and technical material for online presentation. Smartdown embraces and extends that philosophy, best expressed by the original mind behind Markdown, [John Gruber](https://daringfireball.net/projects/markdown/syntax#philosophy):

> #### Philosophy
> Markdown is intended to be as easy-to-read and easy-to-write as is feasible.
> Readability, however, is emphasized above all else. A Markdown-formatted document should be publishable as-is, as plain text, without looking like it's been marked up with tags or formatting instructions. While Markdown's syntax has been influenced by several existing text-to-HTML filters -- including [Setext][1], [atx][2], [Textile][3], [reStructuredText][4], [Grutatext][5], and [EtText][6] -- the single biggest source of inspiration for Markdown's syntax is the format of plain text email.
> To this end, Markdown's syntax is comprised entirely of punctuation characters, which punctuation characters have been carefully chosen so as to look like what they mean. E.g., asterisks around a word actually look like \*emphasis\*. Markdown lists look like, well, lists. Even blockquotes look like quoted passages of text, assuming you've ever used email.


  [1]: https://docutils.sourceforge.net/mirror/setext.html
  [2]: https://www.aaronsw.com/2002/atx/
  [3]: https://textism.com/tools/textile/
  [4]: https://docutils.sourceforge.net/rst.html
  [5]: https://www.triptico.com/software/grutatxt.html
  [6]: https://ettext.taint.org/doc/


#### Markdown is worth learning

Although there are several variants and extensions of Markdown, the ubiquity of the core Markdown syntax makes it a worthwhile and minimal investment to learn. Smartdown is based primarily upon GitHub-flavored Markdown, which is supported widely on GitHub, and also by many other Markdown tools and sites.

Some resources that may help:

- [John Gruber's Markdown from 2004](https://daringfireball.net/projects/markdown/)
- [GitHub's *Mastering Markdown*](https://guides.github.com/features/mastering-markdown/)
- [A Formal Spec for GitHub Markdown](https://githubengineering.com/a-formal-spec-for-github-markdown/)
- [GitHub-flavored Markdown Spec](https://github.github.com/gfm/)


#### How is Smartdown Different?

Smartdown *is* Markdown, and any Markdown document can be viewed within a Smartdown-enabled viewer. A Smartdown-enabled viewer is able to interpret certain valid Markdown constructs in a way that enables the document to be more interactive than as a static Markdown document. Smartdown takes advantage of two features of Markdown, and extends their interpretation to enable Smartdown's interactivity. Specifically, Smartdown uses Markdown's *link* syntax to embed input, output and calculation*cells* into a document, and uses Markdown's *code block* syntax to embed more complex content as *playables*.

#### Markdown Examples

In each of the examples below, the Markdown source will be shown, followed by its rendered appearance.

##### Headers

```markdown
# Level 1 header [Link Test](https://en.wikipedia.org/wiki/Markdown)
## Level 2 header  $E=mc^2$
### Level 3 header
#### Level 4 header
##### Level 5 header $E=mc^2$
###### Level 6 header [Link Test](https://en.wikipedia.org/wiki/Markdown)
```


# Level 1 header [Link Test](https://en.wikipedia.org/wiki/Markdown)
## Level 2 header  $E=mc^2$
### Level 3 header `var a = 50; // Code`
#### Level 4 header `var a = 50; // Smaller Code`
##### Level 5 header $E=mc^2$
###### Level 6 header [Link Test](https://en.wikipedia.org/wiki/Markdown)



#### Styles

```markdown
*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

~~This text will be strikethru~~

_You **can** combine styles_
```


*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

~~This text will be strikethru~~

_You **can** combine styles ~~easily~~_


#### Lists

```markdown
- Item 1
- Item 2
  - Item 2a
  - Item 2b

* Item 1
* Item 2
  * Item 2a
  * Item 2b

1. Item 1
1. Item 2
1. Item 3
   1. Item 3a
   1. Item 3b
```

- Item 1
- Item 2
  - Item 2a
  - Item 2b

* Item 1
* Item 2
  * Item 2a
  * Item 2b

1. Item 1
1. Item 2
1. Item 3
   1. Item 3a
   1. Item 3b


#### Code/Syntax Highlighting

````markdown

Inline: `const a = b + "foo" + 300; // comment`
Inline Longer: `const myVariable = yourVariable + "existential" + space + 'threat'; // A multiple word comment`

Block:
```python
print("Python is sort of a programming language")
is_a_real_language = 0
print("LOL, just kidding.")
```

Link name with code: [`var a = 5;`](https://www.example.com)

````

Inline: `const a = b + "foo" + 300; // comment`
Inline Longer: `const myVariable = yourVariable + "existential" + space + 'threat'; // A multiple word comment`

Block:
```python
print("Python is sort of a programming language")
is_a_real_language = 0
print("LOL, just kidding.")
```

Link name with code: [`var xyz = 10001;`](https://www.example.com)

#### Blockquotes

```markdown
> **The Road Not Taken**

> Two roads diverged in a yellow wood,
And sorry I could not travel both
And be one traveler, long I stood
And looked down one as far as I could
To where it bent in the undergrowth;

> Then took the other, as just as fair,
And having perhaps the better claim,
Because it was grassy and wanted wear;
Though as for that the passing there
Had worn them really about the same,

> And both that morning equally lay
In leaves no step had trodden black.
Oh, I kept the first for another day!
Yet knowing how way leads on to way,
I doubted if I should ever come back.

> I shall be telling this with a sigh
Somewhere ages and ages hence:
Two roads diverged in a wood, and I—
I took the one less traveled by,
And that has made all the difference.

> **Robert Frost**
```


> **The Road Not Taken**

> Two roads diverged in a yellow wood,
And sorry I could not travel both
And be one traveler, long I stood
And looked down one as far as I could
To where it bent in the undergrowth;

> Then took the other, as just as fair,
And having perhaps the better claim,
Because it was grassy and wanted wear;
Though as for that the passing there
Had worn them really about the same,

> And both that morning equally lay
In leaves no step had trodden black.
Oh, I kept the first for another day!
Yet knowing how way leads on to way,
I doubted if I should ever come back.

> I shall be telling this with a sigh
Somewhere ages and ages hence:
Two roads diverged in a wood, and I—
I took the one less traveled by,
And that has made all the difference.

> **Robert Frost**


#### Hyperlinks

See [Intra-page Links](##intra-page-links) below.

```markdown
- https://en.wikipedia.org/wiki/Raven
- [Markdown Philosophy](https://daringfireball.net/projects/markdown/syntax#philosophy)
- ![Picture of Raven](https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Natural_History%2C_Birds_-_Raven.jpg/570px-Natural_History%2C_Birds_-_Raven.jpg)
- ![](https://media.poetryfoundation.org/uploads/media/default/0001/08/22208df9f0df9b4e6d3e267b60d17d43f20252f3.mp3)
- The source for this page is [`gallery/Markdown.md`](gallery/Markdown.md)
```

- https://en.wikipedia.org/wiki/Raven
- [Markdown Philosophy](https://daringfireball.net/projects/markdown/syntax#philosophy)
- ![Picture of Raven](https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Natural_History%2C_Birds_-_Raven.jpg/570px-Natural_History%2C_Birds_-_Raven.jpg)
- ![](https://media.poetryfoundation.org/uploads/media/default/0001/08/22208df9f0df9b4e6d3e267b60d17d43f20252f3.mp3)
- The source for this page is [`gallery/Markdown.md`](gallery/Markdown.md)
- Here is a CSS file [`lib/fonts.css`](lib/fonts.css)

##### Intra-page Links

**Notes on experimental behavior with respect to intra-page links**

- Current behavior is to use `##foo` to link to an element with id `foo` in the current page.
- Current behavior is to use `#Card#foo` to link to an element with id `foo` after loading the content from `Card`.


See [Philosophy](##philosophy) far above - `[Philosophy](##philosophy)`
See [Hyperlinks](##hyperlinks) above. - `[Hyperlinks](##hyperlinks)`

Or, visit an internal link on a different card. Like [Home - Basic Features](#Home#basic-features).


##### Open in new tab/window vs current tab/window

HTML links can be declared to either open in the current browser window, or to open in a new browser window, by using the `target="_blank"` qualifier on the `<a>` element. Smartdown attempts to apply the following *reasonable* defaults:

- A link to an absolute URL will open in a new window
- A link to a relative URL will open in the current window.

Smartdown provides an optional syntax on its Markdown link declarations to force a relative link to open in a new window. The current syntax for this is to append `##blank` to the URL.

- [`README.md`](README.md) is relative, so opens in same window.
- [`/README.md`](/README.md) is relative, so opens in same window.
- [`./README.md`](./README.md) is relative, so opens in same window.
- [`README.md#-blank`](README.md#-blank) is relative, but opens in new window.
- [`/README.md#-blank`](/README.md#-blank) is relative, but opens in new window.
- [`./README.md#-blank`](./README.md#-blank) is relative, but opens in new window.
- [`https://example.com` in new window](https://example.com) is absolute, so opens in new window.
- [`https://example.com` in current window](https://example.com) is absolute, so opens in new window.


##### Autolinks

The Markdown specification and the `marked.js` implementation that Smartown uses provide a feature called *autolinking*, which means that things that look *linkable* are rendered as clickable links. There are some current issues with how email addresses are rendered with [marked.js](https://github.com/markedjs/marked/issues/1218), so Smartdown has disabled the autolinking of email addresses for now.

Here are some examples of autolinking, mostly for test purposes:

- https://example.com
- `https://example.com`
- dan@example.com
- `dan@example.com`
- [dan@example.com](https://example.com)
- `https://gist.github.com/DrBud/0d86d77875826743680a0d0a1cbe75ed`


#### Tables

|Left|Center|Right|
|:---|:---:|---:|
|`left`|`center`|`right`|
|Left|Center|Right|
|$\leftarrow$|$\leftrightarrow$|$\rightarrow$|



#### Try out some Markdown and Smartdown

Type Smartdown into the input cell below and see the result rendered as Smartdown.

[Markdown here ...](:?MyMarkdown)

... is rendered below as:

[](:!MyMarkdown|markdown)

Examples to start with:
- `I am **bold**`
- `Einstein said: $E=mc^2$`
- `I am a [hyperlink](https://en.wikipedia.org/wiki/Hyperlink)`
- `[What is your name](:?NAME) [Pleased to meet you, ](:!NAME)`


#### Emoji Support

Smartdown now incorporates support for Emoji, as is conventional in many Markdown implementations, including GitHub-flavored Markdown's [Emoji](https://help.github.com/articles/basic-writing-and-formatting-syntax/#using-emoji) conventions.

For example, we can do a Smiley emoji with the syntax:

```markdown
plain: :smiley:  *italic* *:smiley:*   **bold** **:smiley:**
```

which should render as:

plain: :smiley:  *italic* *:smiley:*   **bold** **:smiley:**

#### :rainbow: Emoji in Headings :honeybee:

Other examples of Emoji (e.g., `:cherry_blossom:` turns into :cherry_blossom:) can be found at: [Emoji Cheat Sheet :rocket:](https://www.webfx.com/tools/emoji-cheat-sheet/)

---

[Back to Home](:@Home)


