// deno-lint-ignore-file ban-ts-comment
// const testInput = `vJrwpWtwJgWrhcsFMMfFFhFp
// jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
// PmmdzqPrVvPwwTWBwg
// wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
// ttgJtRGJQctTZtZT
// CrZsJsPPZsGzwwsLwLmpwMDw`;
// const lines = testInput.split("\n");
// console.log(lines);

const input = await Deno.readTextFile("./03/input.txt");
// console.log(input);

const lines = input.split("\n");
// console.log(lines);

/*
    Lowercase item types a through z have priorities 1 through 26.
    Uppercase item types A through Z have priorities 27 through 52.
    Create a dictionary in which the keys are the item types and the values are the priorities.
*/
const priorities = {};
for (let i = 0; i < 26; i++) {
    //@ts-ignore
    priorities[String.fromCharCode(i + 97)] = i + 1;
    //@ts-ignore
    priorities[String.fromCharCode(i + 65)] = i + 27;
}
// console.log(priorities);

function getPart1(): number {
    let sum = 0;

    for (const line of lines) {
        const firstHalf = line.slice(0, line.length / 2);
        const secondHalf = line.slice(line.length / 2);
        // console.log("firstHalf:", firstHalf, "secondHalf:", secondHalf);

        // get all characters that repeat from the first half in the second half
        const repeatedChars = new Set(
            secondHalf.split("").filter((char) => firstHalf.includes(char))
        );
        // console.log("repeatedChars:", repeatedChars);

        // get the priority of each repeated character and add it to sum;
        for (const char of repeatedChars) {
            //@ts-ignore
            sum += priorities[char];
        }
    }

    return sum;
}

function getPart2(): number {
    let sum = 0;

    for (let i = 2; i < lines.length; i += 3) {
        const currLine = lines[i];
        const prevLine1 = lines[i - 1];
        const prevLine2 = lines[i - 2];

        //get the character in currLine that repeats in prevLine1 and prevLine2
        const repeatedChars = new Set(
            currLine
                .split("")
                .filter(
                    (char) =>
                        prevLine1.includes(char) && prevLine2.includes(char)
                )
        );
        // console.log("repeatedChars:", repeatedChars);

        //@ts-ignore
        sum += priorities[repeatedChars.values().next().value];
    }

    return sum;
}

console.log({
    part1: getPart1(),
    part2: getPart2(),
});
