const input = await Deno.readTextFile("./02/input.txt");
const rounds = input
    .split("\n")
    .map((line) => line.split(" ") as [string, string]);

type Shape = "A" | "B" | "C";
type Outcome = "X" | "Y" | "Z";

// win: 6, draw: 3, lose: 0
// rock: 1, paper:2 , scissors: 3
// A: rock, B: paper, C: scissors

// X: Rock, Y: Paper, Z: Scissors
const shapeScoresPart1: Record<Shape, Record<Outcome, number>> = {
    A: { X: 4, Y: 8, Z: 3 },
    B: { X: 1, Y: 5, Z: 9 },
    C: { X: 7, Y: 2, Z: 6 },
};

// X: loss, Y: draw, Z: win
const shapeScoresPart2: Record<Shape, Record<Outcome, number>> = {
    A: { X: 3, Y: 4, Z: 8 },
    B: { X: 1, Y: 5, Z: 9 },
    C: { X: 2, Y: 6, Z: 7 },
};

function calculateScorePart1(rounds: [string, string][]): number {
    let score = 0;

    for (const round of rounds) {
        const shape = round[0] as Shape;
        const outcome = round[1] as Outcome;

        score += shapeScoresPart1[shape][outcome];
    }

    return score;
}

function calculateScorePart2(rounds: [string, string][]): number {
    let score = 0;

    for (const round of rounds) {
        const shape = round[0] as Shape;
        const outcome = round[1] as Outcome;

        score += shapeScoresPart2[shape][outcome];
    }

    return score;
}

console.log({
    part1: calculateScorePart1(rounds),
    part2: calculateScorePart2(rounds),
});
