### GIFs

Smartdown supports the embedding of animated GIF images, with the ability to specify various sizes and an optional *player*.

Currently supported sizes for GIFs are:
- `icon`
- `thumbnail`
- `halfwidth` (the default)
- `fullwidth`

If the keyword `player` is used in the label field of the Smartdown link, then a play/pause button will be added to the GIF, with the GIF initially in a paused state.


#### Playerless Animated GIFs

By default, a GIF image reference will be in *autoplay* mode, which supports both animated and non-animated GIFs. The Smartdown sizing options work similarly for both player-enabled and autoplay images. But let's test this.

```
![](https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif)
```

produces:

![](https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif)

```
![fullwidth](https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif)
```

produces:

![fullwidth](https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif)

#### NASA Eclipse

Embedding https://upload.wikimedia.org/wikipedia/commons/c/cb/An_EPIC_Eclipse.gif with the syntax:

`![player](https://upload.wikimedia.org/wikipedia/commons/c/cb/An_EPIC_Eclipse.gif)`

![player](https://upload.wikimedia.org/wikipedia/commons/c/cb/An_EPIC_Eclipse.gif)

By NASA (NASA Earth Observatory) [Public domain] via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File%3AAn_EPIC_Eclipse.gif)


#### Classic Stick Man vs Door, translated to English:

- Via `![player](https://media.giphy.com/media/8yywW6CcKIpgY/giphy.gif)`

![player](https://media.giphy.com/media/8yywW6CcKIpgY/giphy.gif)

- Via `![thumbnail player](https://media.giphy.com/media/8yywW6CcKIpgY/giphy.gif)`

![thumbnail player](https://media.giphy.com/media/8yywW6CcKIpgY/giphy.gif)

- Via `![halfwidth player](https://media.giphy.com/media/8yywW6CcKIpgY/giphy.gif)`

![halfwidth player](https://media.giphy.com/media/8yywW6CcKIpgY/giphy.gif)

- Via `![fullwidth player](https://media.giphy.com/media/8yywW6CcKIpgY/giphy.gif)`

![fullwidth player](https://media.giphy.com/media/8yywW6CcKIpgY/giphy.gif)


### MP3 and other Audio Formats

Embedding https://unpkg.com/smartdown-gallery/resources/Damscray_DancingTiger.mp3 with the syntax:

`![](https://unpkg.com/smartdown-gallery/resources/Damscray_DancingTiger.mp3)`

![](https://unpkg.com/smartdown-gallery/resources/Damscray_DancingTiger.mp3)



---

[Back to Home](:@Home)
