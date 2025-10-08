### Cells - Reactive Spreadsheet Cells

Smartdown uses ordinary Markdown link syntax to specify a cell *label* and *body*, where the *label* is specified in the link label, and the *body* is specified in the link's URL. For example, the following declares an *output* cell that displays the value of the `FOO` variable:

```markdown
[The value of FOO is](:!FOO)
```

When a non-empty label is present, the cell will be formatted with its label on its own line. When no label is present, then the cell will be formatted inline.

#### Cells with labels get their own line

- [What is your name?](:?NAME)
- [Glad to meet you](:!NAME)
- [What is your name again?](:?NAME)
- [Really glad to meet you](:!NAME)
- [Are you human?](:XHUMAN)
- [Humanity](:!HUMAN)
- [What is your name? (wait for blur)](:?NAME|text)


#### Cells with no labels are inlined

What is your name? [](:?NAME) So glad to meet you [](:!NAME). What is your name again? [](:?NAME) Really glad to meet you [](:!NAME).
Are you human? [](:XHUMAN) Your Humanity is [](:!HUMAN).

#### Cell output filters

The syntax:

```markdown
[](:!MyExpr|markdown)

```

will result in the value in variable `MyExpr` being formatted as Smartdown and then rendered as the output of the cell.

For example, type Smartdown into the input cell below and see the resulting rendered Smartdown:

[Type Markdown Here](:?MyMarkdown)
[Rendered Markdown](:!MyMarkdown|markdown)


#### Numeric data

By default, a cell is a string. An input cell may be annotated to indicate that the datatype is `number` and that conversions should occur upon input. The example below illustrates this by modifying and displaying the smartdown variables `alpha` and `beta`. This example also shows how the numeric range syntax can be used to create an input slider. This example also demonstrates various ways to label an input.

**α** [](:?alpha|number) [](:-alpha/0/100/0.01)
**β** [](:?beta|number) [](:-beta/0/100/0.01)

[α](:?alpha|number) [](:-alpha/0/100/0.01)
[β](:?beta|number) [](:-beta/0/100/0.01)

[$\alpha$](:?alpha|number) [α](:-alpha/0/100/0.01)
[$\beta$](:?beta|number) [β](:-beta/0/100/0.01)

#### Navigation Links

- [Go to SVG Card with Text Label](:@SVG)
- [Go to P5JS Card with Image ![](https://upload.wikimedia.org/wikipedia/commons/1/12/Earth_within_celestial_sphere.gif)](:@P5JS)
- [Go to Tweets with SVG Image ![](/media/lighthouse/pulse)](:@Tweets)

#### Calculations

[Double Me](:=DNAME=NAME+NAME)

[Double Name](:!DNAME)


#### Comparing inline vs form mode

- [What is your name?](:?NAME)
- [Glad to meet you](:!NAME)
- [What is your age?](:?AGE|number)
- [Your Age](:!AGE)

... What is your name? [](:?NAME) ... Your name is [](:!NAME) ... What is your age? [](:?AGE|number) ... Your Age is [](:!AGE) ...

#### Autocomplete Experiments

We can use existing Smartdown features such as cells and playables to build an *autocomplete* input field, which will enable a user to type into the field and will produce a list or menu of items which match the partial input. The user can optionally select an item from this list and it will replace the partial input.

For the examples below, we'll use the [USASpending API](https://api.usaspending.gov). We'll start with the following endpoint, which returns a list (10 items, by default) of *matches* to a given partial string typed in by the user. For example, typing `duc` will produce a list of agencies that contain **duc**, including *Consumer Pro**duc**t Safety Commission* and *Department of E**duc**ation*.

*This is a work in progress. A future version of Smartdown will have a builtin autocomplete capability.*

##### Cell and Playable

[Account Name](:?AccountName)
[](:!AccountMatches|markdown)


```javascript /playable/autoplay
async function getMatches(partial) {
	const result = await smartdown.axios.post('https://api.usaspending.gov/api/v2/autocomplete/awarding_agency/', {
      'search_text': partial
	  });

	const formatted = result.data.results.map(d => {
		const uri = d.subtier_agency.name.replace(/ /g, '%20');
		const line = `- [${d.subtier_agency.name}](:=AccountSelected=decodeURIComponent("${uri}"))`;
		return line;
	});

	return formatted.join('\n');
}

this.dependOn.AccountName = async () => {
	const partial = env.AccountName;
	if (partial.length > 2) {
		const matches = await getMatches(partial);
		smartdown.set('AccountMatches', matches);
	}
};
```

[Selected](:!AccountSelected)


---

[Back to Home](:@Home)

