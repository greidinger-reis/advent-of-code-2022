// deno-lint-ignore-file ban-ts-comment
const lines = [
    "[G]                 [D] [R]        ",
    "[W]         [V]     [C] [T] [M]    ",
    "[L]         [P] [Z] [Q] [F] [V]    ",
    "[J]         [S] [D] [J] [M] [T] [V]",
    "[B]     [M] [H] [L] [Z] [J] [B] [S]",
    "[R] [C] [T] [C] [T] [R] [D] [R] [D]",
    "[T] [W] [Z] [T] [P] [B] [B] [H] [P]",
    "[D] [S] [R] [D] [G] [F] [S] [L] [Q]",
    " 1   2   3   4   5   6   7   8   9 ",
];

// Split each line into an array of characters
const linesArray = lines.map((line) => line.split(""));

// Create the object where the keys will be the numbers
const result = {};

// Iterate over each line (except the last one)
for (let i = 0; i < linesArray.length - 1; i++) {
    const line = linesArray[i];

    // Iterate over each character in the line
    for (let j = 0; j < line.length; j++) {
        const character = line[j];

        // If the character is a letter, add it to the array of the corresponding number in the result object
        if (isNaN(parseInt(character))) {
            // Check if the number is already in the result object
            if (!(linesArray[linesArray.length - 1][j] in result)) {
                //@ts-ignore
                result[linesArray[linesArray.length - 1][j]] = [];
            } //@ts-ignore
            result[linesArray[linesArray.length - 1][j]].push(character);
        }
    }
}

console.log(result);
