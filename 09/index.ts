import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const input = await Deno.readTextFile("./09/input.txt");

const testInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const expectedOutput = 13;

type Direction = "R" | "L" | "U" | "D";

type Move = {
    direction: Direction;
    distance: number;
};

type Coords = [number, number];

// [x,y]
const directions: Record<Direction, number[]> = {
    R: [1, 0],
    L: [-1, 0],
    U: [0, 1],
    D: [0, -1],
};

class Head {
    public coords: Coords = [0, 0];
    public tail = new Tail(this);

    public move({ direction, distance }: Move) {
        console.log(`Moving head ${distance} distance to ${direction}\n`);

        for (let step = 0; step < distance; step++) {
            console.log(`Step ${step + 1} of ${distance} to ${direction}`);
            console.log(`Head coords: ${this.coords}`);

            this.coords[0] += directions[direction][0];
            this.coords[1] += directions[direction][1];

            console.log(`Head coords after move: ${this.coords}`);

            if (!this.tail.touching) {
                const x =
                    this.coords[0] === this.tail.coords[0]
                        ? 0
                        : (this.coords[0] - this.tail.coords[0]) /
                          Math.abs(this.coords[0] - this.tail.coords[0]);
                const y =
                    this.coords[1] === this.tail.coords[1]
                        ? 0
                        : (this.coords[1] - this.tail.coords[1]) /
                          Math.abs(this.coords[1] - this.tail.coords[1]);

                // console.log(`Tail to move ${x} in x and ${y} in y\n`);

                console.log(`Tail coords: ${this.tail.coords}`);
                this.tail.coords[0] += x;
                this.tail.coords[1] += y;
                console.log(`Tail coords after move: ${this.tail.coords}\n`);

                this.tail.visitedPositions.add(this.tail.coords);
            }
        }
    }
}

class Tail {
    public coords: Coords = [0, 0];
    public visitedPositions = new VisitedPositions(this.coords);

    constructor(private head: Head) {}

    get touching(): boolean {
        return (
            Math.abs(this.head.coords[0] - this.coords[0]) <= 1 &&
            Math.abs(this.head.coords[1] - this.coords[1]) <= 1
        );
    }
}

class VisitedPositions {
    public visitedPositions = new Set<string>();

    constructor(initialPosition: Coords) {
        this.visitedPositions.add(
            initialPosition[0] + "," + initialPosition[1]
        );
    }

    add(position: Coords) {
        console.log(`Adding position ${position} to visited positions\n`);
        this.visitedPositions.add(position[0] + "," + position[1]);
    }

    get size() {
        return this.visitedPositions.size;
    }

    print() {
        return this.visitedPositions;
    }
}

function main(input: string) {
    const head = new Head();
    const moves = input.split("\n").map((move) => {
        const [direction, distance] = move.split(" ");
        return { direction, distance: parseInt(distance) } as Move;
    });

    moves.forEach((move) => {
        head.move(move);
    });

    console.log(
        `Tail visited ${head.tail.visitedPositions.size} positions:`,
        head.tail.visitedPositions.print()
    );
}

main(input);

Deno.test("Day 9 test should result in 13", () => {
    const head = new Head();
    const moves = testInput.split("\n").map((move) => {
        const [direction, distance] = move.split(" ");
        return { direction, distance: parseInt(distance) } as Move;
    });

    moves.forEach((move) => {
        head.move(move);
    });

    assertEquals(
        head.tail.visitedPositions.size,
        expectedOutput,
        `Expected ${expectedOutput} but got ${head.tail.visitedPositions.size}`
    );
});
