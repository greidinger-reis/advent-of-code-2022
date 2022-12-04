// const testInput = `2-4,6-8
// 2-3,4-5
// 5-7,7-9
// 2-8,3-7
// 6-6,4-6
// 2-6,4-8`;

const input = await Deno.readTextFile("./04/input.txt");

let overlapTimes = 0;
let partialOverlapTimes = 0;

input.split("\n").forEach((line) => {
    const [a, b] = line.split(",");
    const right = [parseInt(a.split("-")[0]), parseInt(a.split("-")[1])];
    const left = [parseInt(b.split("-")[0]), parseInt(b.split("-")[1])];

    const fullyOverlaps = getFullOverlap(right, left);

    const partialOverlaps = getPartialOverlap(right, left);

    if (partialOverlaps) {
        partialOverlapTimes++;
    }

    if (fullyOverlaps) {
        overlapTimes++;
    }

    console.log({ line, fullyOverlaps, partialOverlaps });
});

console.log(overlapTimes, partialOverlapTimes);

//check if two ranges fully overlap
function getFullOverlap(right: number[], left: number[]) {
    if (left[0] >= right[0] && left[1] <= right[1]) return true;
    else if (right[0] >= left[0] && right[1] <= left[1]) return true;
    return false;
}

//check if two ranges partially overlap
function getPartialOverlap(right: number[], left: number[]) {
    if (left[0] >= right[0] && left[0] <= right[1]) return true;
    else if (left[1] >= right[0] && left[1] <= right[1]) return true;
    else if (right[0] >= left[0] && right[0] <= left[1]) return true;
    else if (right[1] >= left[0] && right[1] <= left[1]) return true;
    return false;
}
