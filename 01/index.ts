// const input = await Deno.readTextFile("./01/input.txt");

// const lines = input.split("\n\n"); // split by double newlines

// const topThree = lines
//     .map((line) => line.split("\n")) // split by newlines
//     .map((elf) => elf.map((num) => parseInt(num))) // convert calories to numbers
//     .map((elf) => elf.reduce((a, b) => a + b)) // sum calories
//     .sort((a, b) => b - a) // sort in descending order
//     .slice(0, 3); // get the top 3

// console.log({
//     top1: topThree[0],
//     top3_sum: topThree.reduce((a, b) => a + b),
// });

import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const testInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

const expectedTestOutput = 24000;

const input = await Deno.readTextFile("./01/input.txt");

function getAnswer(input: string): { topElf: number; topThree: number[] } {
    const elfs = input
        .split("\n\n")
        .map((elf) => elf.split("\n").map((line) => parseInt(line)));

    const elfsSum = elfs.map((elf) => elf.reduce((a, b) => a + b));

    const topElf = elfsSum.reduce((a, b) => Math.max(a, b));
    const topThree = elfsSum.sort((a, b) => b - a).slice(0, 3);

    return { topElf, topThree };
}

function main() {
    console.log(getAnswer(input));
}

main();

Deno.test("Should return 24000 with test input", () => {
    const { topElf } = getAnswer(testInput);
    assertEquals(topElf, expectedTestOutput);
});
