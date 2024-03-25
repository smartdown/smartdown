### Smartdown and Markdown

This meaningless note is designed to exercise the syntax-highlighting and editing capabilities of Markdown and Smartdown.

#### Inline Code Fragments

Verify that inline code is highlighted and code fonts are monospaced. This also verifies the language auto-detection.

- Inline: `a + (b * c) + Math.sqrt('xyz') + 1000 + 'WWWWW' // This is a comment 0000`
- Inline: `a + (b * c) + Math.sqrt('xyz') + 1000 + 'iiiii' // This is a comment 0000`
- Inline: `set -x foo`


#### Fenced Code Fragments

##### Unannotated

```
#!/bin/bash

###### CONFIG
ACCEPTED_HOSTS="/root/.hag_accepted.conf"
BE_VERBOSE=false

if [ "$UID" -ne 0 ]
then
 echo "Superuser rights required"
 exit 2
fi

genApacheConf(){
 echo -e "# Host ${HOME_DIR}$1/$2 :"
}

echo '"quoted"' | tr -d \" > text.txt
```

##### Annotated

```bash
#!/bin/bash

###### CONFIG
ACCEPTED_HOSTS="/root/.hag_accepted.conf"
BE_VERBOSE=false

if [ "$UID" -ne 0 ]
then
 echo "Superuser rights required"
 exit 2
fi

genApacheConf(){
 echo -e "# Host ${HOME_DIR}$1/$2 :"
}

echo '"quoted"' | tr -d \" > text.txt
```

```javascript
var i = 1000.001 * 2 ^ 8;
var s = 'JavaScript syntax highlighting' + Math.sqrt(i);
const a = 'hello' + "world!" + s; // comment
print("foo");
```

```python
# Function for nth Fibonacci number
def Fibonacci(n):

	# Check if input is 0 then it will
	# print incorrect input
	if n < 0:
		print("Incorrect input")

	# Check if n is 0
	# then it will return 0
	elif n == 0:
		return 0

	# Check if n is 1,2
	# it will return 1
	elif n == 1 or n == 2:
		return 1

	else:
		return Fibonacci(n-1) + Fibonacci(n-2)

# Driver Program
print(Fibonacci(9))

# This code is contributed by Saket Modi
# then corrected and improved by Himanshu Kanojiya

```

