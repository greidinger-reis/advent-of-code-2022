const input = await Deno.readTextFile("./01/input.txt");

const lines = input.split("\n\n"); // split by double newlines

const topThree = lines
    .map((line) => line.split("\n")) // split by newlines
    .map((elf) => elf.map((num) => parseInt(num))) // convert calories to numbers
    .map((elf) => elf.reduce((a, b) => a + b)) // sum calories
    .sort((a, b) => b - a) // sort in descending order
    .slice(0, 3); // get the top 3

console.log({
    top1: topThree[0],
    top3_sum: topThree.reduce((a, b) => a + b),
});
