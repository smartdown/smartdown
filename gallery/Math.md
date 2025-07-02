### Math Notation

By using MathJax, we can display all sorts of notation.

We can do inline math: $E = mc^2$

Or we can do block math:

$$
A \longrightarrow B
$$

$$
\begin{array}{c|lcr}
n & \text{Left} & \text{Center} & \text{Right} \\
\hline
1 & 0.24 & 1 & 125 \\
2 & -1 & 189 & -8 \\
3 & -20 & 2000 & 1+10i
\end{array}
$$

And even diagrams via *xyjax*:

$$
\begin{xy}
0;<1em,0em>:
(1,1);p+/v a(18) 5.5em/**@{-},
(1,3);p+/v a(18) 5.5em/**@2{-},
(1,5);p+/v a(18) 5.5em/**@3{-},
(1,9);p+/v a(18) 5.5em/**@{.},
(1,11);p+/v a(18) 5.5em/**@2{.},
(1,13);p+/v a(18) 5.5em/**@3{..},
\end{xy}
$$



$$
\begin{xy}
\xymatrix {
U \ar@/_/[ddr]_y \ar@{.>}[dr]|{\langle x,y \rangle} \ar@/^/[drr]^x \\
 & X \times_Z Y \ar[d]^q \ar[r]_p & X \ar[d]_f \\
 & Y \ar[r]^g & Z
}
\end{xy}
$$


#### MathJax $\LaTeX$ vs AsciiMath Syntax

Recently, I learned that MathJax had an alternative syntax, [AsciiMath](https://asciimath.org) that is simpler for many purposes. Smartdown has enabled this feature, although we are currently using `@` as the delimiter instead of \` or `$`.


##### $\LaTeX$ Syntax

Currently, Smartdown uses LaTeX-style math syntax, so the following formula:

$$
\sum_{i=1}^{n} i^3=\left(\frac{n(n+1)}{2}\right)^2
$$

is expressed as:

```
$$
\sum_{i=1}^{n} i^3=\left(\frac{n(n+1)}{2}\right)^2
$$
```

##### AsciiMath Syntax

The above formula is expressed in AsciiMath (using `@` as delimiters) as:

```
@sum_(i=1)^n i^3=((n(n+1))/2)^2@
```

which Smartdown now renders as:

@sum_(i=1)^n i^3=((n(n+1))/2)^2@

Note that AsciiMath via MathJax does not support *display-mode* equations, but centering can be achieved via Markdown table syntax:

```markdown
|     |
|:---:|
|@sum_(i=1)^n i^3=((n(n+1))/2)^2@|
```

which renders as below:

|     |
|:---:|
|@sum_(i=1)^n i^3=((n(n+1))/2)^2@|


##### More AsciiMath Examples

|AsciiMath|Rendered|
|:---:|:---:|
|`@[[a,b],[c,d]]@`|@[[a,b],[c,d]]@|
|`@sqrt sqrt root3x@`|@sqrt sqrt root3x@|
|`@int_0^1 f(x)dx@`|@int_0^1 f(x)dx@|
|`@hat(ab) bar(xy) ulA vec v dotx ddot y@`|@hat(ab) bar(xy) ulA vec v dotx ddot y@|

---


#### Chemistry via `mhchem`

$$
\ce{Zn^2+
  <=>[+ 2OH-][+ 2H+]
  $\underset{\text{amphoteres Hydroxid}}{\ce{Zn(OH)2 v}}$
  <=>[+ 2OH-][+ 2H+]
  $\underset{\text{Hydroxozikat}}{\ce{[Zn(OH)4]^2-}}$
}
$$

---

[Back to Home](:@Home)

