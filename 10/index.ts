import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const inputTest = await Deno.readTextFile("./10/input_test.txt");
const input = await Deno.readTextFile("./10/input.txt");

const expectedOutput = 13140;

function part1(input: string): number {
    let cycle = 0;
    let X = 1;
    let signalStrength = 0;
    const watchedCycles = [20, 60, 100, 140, 180, 220];

    const instructions = input.split("\n");
    // console.log(instructions);

    for (let i = 0; i < instructions.length; i++) {
        const instruction = instructions[i];

        if (instruction.startsWith("noop")) {
            if (watchedCycles.includes(cycle + 1)) {
                console.log(`noop, cycle ${cycle + 1}, X=${X}`);
                signalStrength += X * (cycle + 1);
            }
            cycle++;
            continue;
        }

        if (instruction.startsWith("addx")) {
            if (watchedCycles.includes(cycle + 1)) {
                console.log(`addx, cycle ${cycle + 1}, X=${X}`);
                signalStrength += X * (cycle + 1);
            }

            const [, val] = instruction.split(" ");

            if (watchedCycles.includes(cycle + 2)) {
                console.log(`addx, cycle ${cycle + 2}, X=${X}`);
                signalStrength += X * (cycle + 2);
            }

            X += parseInt(val);
            cycle += 2;
        }
    }

    return signalStrength;
}

// console.log("Part 1 test:", part1(inputTest));
console.log("Part 1:", part1(input));

Deno.test("Day 10 - Part 1 - Test", () => {
    assertEquals(
        part1(inputTest),
        expectedOutput,
        `Expected ${expectedOutput} but got ${part1(inputTest)}`
    );
});
