### Mathigon

Early explorations of using [Mathigon](https://mathigon.org)'s libraries within Smartdown.

I used the JS libraries documented at https://mathigon.io/fermat and distributed via [unpkg.com/@mathigon/fermat](https://unpkg.com/browse/@mathigon/fermat@0.3.4/), but I needed to hack the files in `/dist` because they are not in any standard module format and they assume the variable `exports` is available.


### Mathigon.Fermat.gcd Example

https://mathigon.io/fermat#number-theory

[Input Numbers](:?inputNumbers)
[Clean Numbers](:!cleanNumbers)
[GCD](:!gcd)

```javascript /playable/xautoplay/debug
//smartdown.import=/gallery/MathigonFermat.js

const log = this.log;

this.dependOn.inputNumbers = () => {
  const numbersStr = env.inputNumbers;
  const numbersList = numbersStr
    .replace(',', ' ')
    .replace('  ', ' ')
    .split(' ');
  const cleanNumbers = [];
  numbersList.forEach((nStr) => {
    const n = parseInt(nStr, 10);
    if (!isNaN(n)) {
      cleanNumbers.push(n);
    }
  });

  const g = Mathigon.Fermat.gcd(...cleanNumbers);
  smartdown.setVariable('cleanNumbers', cleanNumbers.join(' '));
  smartdown.setVariable('gcd', g);
};

```

---


##### Mathigon.Core.isPalindrome Example

https://mathigon.io/core#isPalindrome

---

[String to Check](:?palindromeCheck)
[isPalindrome](:!isPalindrome)

```javascript /playable/xautoplay/debug
//smartdown.import=/gallery/MathigonCore.js

const log = this.log;

this.dependOn.palindromeCheck = () => {
  const palindromeCheck = env.palindromeCheck;
  const p = Mathigon.Core.isPalindrome(palindromeCheck);
  smartdown.setVariable('isPalindrome', p);
};

```

---

[Back to Home](:@Home)
