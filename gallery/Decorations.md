### Decorations

Sometimes you want to make a chunk of text stand out from the main text.  For example, in a text book, you may want to have a special format for definitions, theorems or a historical note.  Decorations are declared the same way that [disclosables](:@Disclosables) are declared, by sandwiching them between two headings.  Smartdown currently offers the following decoration tags for special formatting:

- `--outlinebox` - a white background with black text and a gray rounded outline
- `--colorbox` - a dark bluegray background with white text and rounded corners
- `--partialborder` - a light purple background with black text and double top and bottom outline
- `--aliceblue` - a light blue background with black text and a light gray rounded outline


The following decoration puts an outline box around the content

```markdown
# --outlinebox cartesian_product

**Definition 1.0**
For sets $A$ and $B$ the *Cartesian product* or *cross product*, of $A$ and $B$ is denoted by $A \times B$ and equals
$$\{(a,b) \, | \, a \in A, \, b \in B \}$$

An element $(a,b)$ of $A \times B$ is called an *ordered pair*.

# --outlinebox
```


The opening line of the decoration is a header tag `#` followed by the type of decoration `--outlinebox` and a name for the block of content `cartesian_product`.  The closing of the decoration is again a header tag `#` followed by the type of decoration.
This is displayed as:



#### --outlinebox cartesian_product

**Definition 1.0**
For sets $A$ and $B$ the *Cartesian product* or *cross product*, of $A$ and $B$ is denoted by $A \times B$ and equals
$$\{(a,b) \, | \, a \in A, \, b \in B \}$$

An element $(a,b)$ of $A \times B$ is called an *ordered pair*.

#### --outlinebox



Another decoration places content in a dark background box using the tag `--colorbox`. The proof is from Michael Sipser's *Introduction to the Theory of Computation*.

#### --colorbox thm1

**Theorem 1.1**
In any graph $G$, the sum of the degrees of the nodes of $G$ is an even number.
#### --colorbox

**PROOF:** Every edge in $G$ is connected to two nodes.  Each edge contributes $1$ to each node to which it is connected.  Therefore each edge contributes $2$ to the sum of the degrees of all the nodes.  Hence, if $G$ contains $e$ edges, then the sum of the degrees of all the nodes of $G$ is $2e$, which is an even number.



Here we use the `--partialborder` decoration for an example.

#### --partialborder example1

**Example 1.2**
If $A = \{2,3,4\}$ and $B = \{3,5\}$, then the *cartesian product* $A \times B$ is the set of pairs

$$\{(2,3),(2,5),(3,3),(3,5),(4,3),(4,5)\}$$

#### --partialborder




The old formatting for disclosables is now a decoration.  It uses the `--aliceblue` tag and looks like this:

#### --aliceblue example3

**Example 1.2**
If $A = \{2,3,4\}$ and $B = \{3,5\}$, then the *cartesian product* $A \times B$ is the set of pairs

$$\{(2,3),(2,5),(3,3),(3,5),(4,3),(4,5)\}$$

#### --aliceblue



## Nesting Decorations

You can nest decorations of different types.

#### --colorbox cartesian_product_nest

**Definition 1.0**
For sets $A$ and $B$ the *Cartesian product* or *cross product*, of $A$ and $B$ is denoted by $A \times B$ and equals
$$\{(a,b) \, | \, a \in A, \, b \in B \}$$

An element $(a,b)$ of $A \times B$ is called an *ordered pair*.
#### --outlinebox example1_nest

**Example 1.2**
If $A = \{2,3,4\}$ and $B = \{3,5\}$, then the *cartesian product* $A \times B$ is the set of pairs

$$\{(2,3),(2,5),(3,3),(3,5),(4,3),(4,5)\}$$

#### --outlinebox
#### --colorbox



#### Decorations Inside Disclosables

Decorations can be used inside any [disclosable](:@Disclosables).


##### Cool Nested Decorations

Here is an example of a math problem that uses decorations and [disclosables](:@Disclosables).  If you enter the correct answer the solution is revealed or you can open the solution yourself if you're frustrated and just want the answer.  The solution is in a disclosable that is wrapped in an `--outlinebox` decoration.


#### --partialborder problem1

**Problem 1.3**

For what real values of $c$ is $x^2 + 16x + c$ the square of a binomial? If you find more than one, then list your values separated by commas.

[Your Answer](:?answer)

```javascript/autoplay
smartdown.setVariable('answer', '');
this.dependOn = ['answer'];
this.depend = function() {
  if (env.answer === '64') {
    smartdown.showDisclosure('sol1', '', '');
  }
};
```

[Show Solution](::sol1)

# :::: sol1

# --outlinebox solution1
Solution:
We know that $(x+b)^2 = x^2 + 2bx + b^2$. For this to equal $x^2 + 16x + c$, we must have $2b=16$, so $b=8$.
Comparing the constant terms of $x^2 + 2bx + b^2$ and $x^2 + 16x + c$, we find $c = \boxed{64}$.
# --outlinebox

# ::::

#### --partialborder

More cool stuff with decorations and disclosables is coming soon!

---

[Back to Home](:@Home)