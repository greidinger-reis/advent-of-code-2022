const input = await Deno.readTextFile("./05/input.txt");
// console.log(input);

// remove everything from input after the first two new lines
const inputWithoutInstructions = input.split("\n\n")[0];
// console.log(inputWithoutInstructions);

const instructions = input.split("\n\n")[1];
// console.log(instructions);

const lines = inputWithoutInstructions.split("\n");
// console.log(lines);

// Create an empty object
const stacks: Record<string, string[]> = {};

// Loop through each item in the array starting at the last item
for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    const chars = line.split("");

    for (const char of chars) {
        if (!isNaN(parseInt(char))) {
            // get the characters from the next line in the same index
            for (let j = i - 1; j >= 0; j--) {
                const nextLine = lines[j]; // get the next line

                const nextLineChars = nextLine.split(""); // split the next line into an array of characters

                const nextLineChar = nextLineChars[chars.indexOf(char)]; // get the character from the next line in the same index as the current character

                stacks[char] = [...(stacks[char] || []), nextLineChar]; // add the character to the stack
            }
        }
    }
}

// Remove empty strings from the stack items
for (const key in stacks) {
    stacks[key] = stacks[key].filter((x) => x !== " ");
}

//remove "move","from","to" from instructions
const instructionsParsed = instructions
    .replace(/move/g, "")
    .replace(/from/g, "")
    .replace(/to/g, "");

// console.log(instructionsParsed);

// Split instructions into an array
const instructionsArray = instructionsParsed
    .split("\n")
    .map((line) => line.split("  ").map((x) => x.trim()));

console.log({ stacksBeforeInstructions: stacks });

// Loop through each instruction
for (const instruction of instructionsArray) {
    const [move, from, to] = instruction;
    //move the last items from the stacks[from] to stacks[to], 'move' is the number of items to move
    stacks[to] = [
        ...stacks[to],
        ...stacks[from]
            .splice(stacks[from].length - parseInt(move)) // remove the last items from the stack
            .toReversed(), // Stack: last in first out
    ];
}

console.log({ stacksAfterInstructions: stacks });

let finalMessage = "";

for (const key in stacks) {
    const lastChar = stacks[key].at(-1);
    if (!lastChar) break;
    finalMessage += lastChar;
}

console.log({ finalMessage });
