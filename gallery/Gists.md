### Using Smartdown to view Gists

[GitHub Gist](https://help.github.com/articles/about-gists/) is a free service that provides a way to store one or more files, including Smartdown and image files. More importantly, the files within a Gist can be accessed by various other programs via HTTP. The Smartdown library is able to access content within a Gist, and is able to support relative navigation within a Gist.

This feature is in its early stages, so the spec may change and there may be bugs.

A Gist is identified by its *organization* and its *identifier*, which are usually written as `organization/identifier`. For example, the Gist we'll be using as an example below is identified as `DoctorBud/3b5cbab3424e08199b8046cf98d19c8f`, where `DoctorBud` is the organization and `3b5cbab3424e08199b8046cf98d19c8f` is the identifier. Together, this is the Gist *path* used to uniquely identify a Gist.

#### Gist Tests

For the following example, we'll be using the [Eugene parking visualization with Python and Smartdown](https://gist.github.com/DoctorBud/3b5cbab3424e08199b8046cf98d19c8f) Smartdown Notebook, which contains several interlinked Smartdown cards stored as `.md` files within the Gist. We'll look at several different ways to view this same content.


##### Basic GitHub Gist View

When viewed via GitHub's Gist Viewer, it is possible to see all of the Smartdown files in the notebook, as well as some supporting files needed for `bl.ocks.org`. Note that the Smartdown is rendered as Markdown, and many of the Smartdown-specific features are not usable directly within GitHub.

[`https://gist.github.com/DoctorBud/3b5cbab3424e08199b8046cf98d19c8f`](https://gist.github.com/DoctorBud/3b5cbab3424e08199b8046cf98d19c8f)


##### Smartdown `/lib` and '/gist' Usage

The Smartdown Simple Site supports the use of the browser location *hash* to select particular Cards within a multicard notebook. This has been extended such that Gists can be referenced and loaded easily. There are two techniques I'm trying out, but both rely upon using the Gist path as the location hash to build a URL that will load the Gist content.


##### Pure URLs good for Bookmarking

- [https://smartdown.site/#gist/doctorbud/3b5cbab3424e08199b8046cf98d19c8f](https://smartdown.site/#gist/doctorbud/3b5cbab3424e08199b8046cf98d19c8f)
- [https://smartdown.github.io/smartdown/#gist/doctorbud/3b5cbab3424e08199b8046cf98d19c8f](https://smartdown.github.io/smartdown/#gist/doctorbud/3b5cbab3424e08199b8046cf98d19c8f)
- [https://smartdown.site/gist/#doctorbud/3b5cbab3424e08199b8046cf98d19c8f](https://smartdown.site/gist/#doctorbud/3b5cbab3424e08199b8046cf98d19c8f)


##### Smartdown Tunnels

Smartdown Tunnels are a form of hyperlink that replaces the Smartdown content while leaving the Smartdown container intact and preserving the state of the Smartdown environment (i.e., variables).

- [:@gist/doctorbud/3b5cbab3424e08199b8046cf98d19c8f](:@gist/doctorbud/3b5cbab3424e08199b8046cf98d19c8f)
- [:@/gist/#doctorbud/3b5cbab3424e08199b8046cf98d19c8f](:@/gist/#doctorbud/3b5cbab3424e08199b8046cf98d19c8f)


#### Using `bl.ocks.org` to view Smartdown Gists

The [bl.ocks.org](https://bl.ocks.org) website works by rendering content stored in GitHub Gists, and with some preparation, can be used to view Smartdown content.

`bl.ocks.org` provides two views:

- A *source* view that renders content as well as displaying the source files: [`https://bl.ocks.org/DoctorBud/3b5cbab3424e08199b8046cf98d19c8f`](https://bl.ocks.org/DoctorBud/3b5cbab3424e08199b8046cf98d19c8f)
- A *raw* view that displays only the rendered content. [`https://bl.ocks.org/DoctorBud/raw/3b5cbab3424e08199b8046cf98d19c8f/#Home`](https://bl.ocks.org/DoctorBud/raw/3b5cbab3424e08199b8046cf98d19c8f/#Home)

Note the use of `/raw` to distinguish the two URLs.


---

[Back to Home](:@Home)


