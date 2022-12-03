# [Day 03 (2022)](https://adventofcode.com/2022/day/3) - Rucksack Reorganization

Dont mind all of the @ts-ignores, it's just to make things work faster, because I'm lazy.

## Part 1

We first create a character to priority value dictionary. In here, copilot gave me a nice and quick helping hand xD

```js
const priorities = {};
for (let i = 0; i < 26; i++) {
    //@ts-ignore
    priorities[String.fromCharCode(i + 97)] = i + 1;
    //@ts-ignore
    priorities[String.fromCharCode(i + 65)] = i + 27;
}
```

We have to find the repeating characters on each half of each line of the input. To do this, we can use a simple for of loop to iterate over each line of the input.

```js
 for (const line of lines)
```

We can then slice the first and second half of the current line

```js
const firstHalf = line.slice(0, line.length / 2);
const secondHalf = line.slice(line.length / 2);
```

We can then iterate over the second half and check which character is included on the first half and then add it to a new Set.

```js
// get all characters that repeat from the first half in the second half
const repeatedChars = new Set(
    secondHalf.split("").filter((char) => firstHalf.includes(char))
);
```

And finally we get the sum of the repeated characters priority values and add it to the sum variable.

```js
// get the priority of each repeated character and add it to sum;
for (const char of repeatedChars) {
    //@ts-ignore
    sum += priorities[char];
}
```

## Part 2

This part, seemed a lot harder than I tought, but with a little of thinking, It's actually pretty simple.

For part 2, we have to find the repeating characters on each group of 3 lines of the input. To do this, we can use a simple for of loop to iterate over the lines of the input in groups of 3.

```js
for (let i = 2; i < lines.length; i += 3)
```

We then get the current line, and the two lines before it.

```js
const currLine = lines[i];
const prevLine1 = lines[i - 1];
const prevLine2 = lines[i - 2];
```

We can then iterate over the current line and check which character is included on the two lines before it and then add it to a new Set.

```js
//get the character in currLine that repeats in prevLine1 and prevLine2
    const repeatedChars = new Set(
        currLine
            .split("")
            .filter(
                (char) =>
                    prevLine1.includes(char) && prevLine2.includes(char)
            )
    );
```

And then simply add the sum of the repeated characters priority values to the sum variable.

```js
//@ts-ignore
    sum += priorities[repeatedChars.values().next().value];
```
