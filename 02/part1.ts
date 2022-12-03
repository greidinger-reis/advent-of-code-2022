const input = await Deno.readTextFile("./02/input.txt");

// Define the scores for each shape
const shapeScores = {
    X: 1, // Rock
    Y: 2, // Paper
    Z: 3, // Scissors
};

type ShapeScoreInput = keyof typeof shapeScores;

//Opponent: A-> Rock, B-> Paper, C-> Scissors
//Me: X-> Rock, Y-> Paper, Z-> Scissors
//Outcome: Win-> 6, Lose-> 0, Draw-> 3
const possibleOutcomes = {
    AX: 3,
    AY: 6,
    AZ: 0,
    BX: 0,
    BY: 3,
    BZ: 6,
    CX: 6,
    CY: 0,
    CZ: 3,
};

type PossibleOutComesInput = keyof typeof possibleOutcomes;

function calculateScore(input: string): number {
    // Split the strategy string into lines
    const lines = input.split("\n");

    // Initialize the total score
    let totalScore = 0;

    // Loop over the lines in the strategy
    for (const line of lines) {
        // Split the line into opponent shape and your shape
        const [opponentShape, yourShape] = line.split(" ");

        // Calculate the score for this round
        const score =
            possibleOutcomes[
                (opponentShape + yourShape) as PossibleOutComesInput
            ] + shapeScores[yourShape as ShapeScoreInput];

        // Add the score for this round to the total score
        totalScore += score;
    }

    // Return the total score
    return totalScore;
}

console.log(calculateScore(input));
