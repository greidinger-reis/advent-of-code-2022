import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const testInput = await Deno.readTextFile("./11/input_test.txt");
const input = await Deno.readTextFile("./11/input.txt");

const expectedOutput = 10605;

type IMonke = {
    number: number;
    holdingItems: number[];
    operation: (old: number) => number;
    testFn: (item: number, divisibleBy: number) => boolean;
    divisibleBy: number;
    truthyThrowTo: number;
    falsyThrowTo: number;
};

class Monke implements IMonke {
    constructor(
        public readonly number: number,
        public holdingItems: number[],
        public readonly operation: (old: number) => number,
        public readonly testFn: (item: number, divisibleBy: number) => boolean,
        public readonly divisibleBy: number,
        public readonly truthyThrowTo: number,
        public readonly falsyThrowTo: number,
        public readonly isPart2 = false,
        public inspectedTimes = 0
    ) {}

    public inspectItems(monkes: Monke[]) {
        if (this.isPart2) {
            this.part2InspectItems(monkes);
            return;
        }
        this.part1InspectItems(monkes);
    }

    public part1InspectItems(monkes: Monke[]) {
        for (let item = 0; item < this.holdingItems.length; item++) {
            this.inspectedTimes++;
            this.holdingItems[item] = this.isPart2
                ? this.operation(this.holdingItems[item])
                : Math.floor(this.operation(this.holdingItems[item]) / 3);

            const monkeToThrow = this.getMonkeToThrow(this.holdingItems[item]);
            console.log(
                `Monke ${this.number} threw item with worry level of ${this.holdingItems[item]} to monkey number ${monkeToThrow}`
            );
            monkes[monkeToThrow].holdingItems.push(this.holdingItems[item]);
        }
        this.holdingItems = [];
    }

    public part2InspectItems(monkes: Monke[]) {
        const bigMOD = monkes.reduce((acc,monke) => acc * monke.divisibleBy, 1);

        for (let item = 0; item < this.holdingItems.length; item++) {
            this.inspectedTimes++;

            this.holdingItems[item] = this.operation(this.holdingItems[item]) % bigMOD;

            const monkeToThrow = this.getMonkeToThrow(this.holdingItems[item]);
            
            console.log(
                `Monke ${this.number} threw item with worry level of ${this.holdingItems[item]} to monkey number ${monkeToThrow}`
            );

            monkes[monkeToThrow].holdingItems.push(this.holdingItems[item]);
        }

        this.holdingItems = [];
    }

    public getMonkeToThrow(item: number) {
        return this.testFn(item, this.divisibleBy)
            ? this.truthyThrowTo
            : this.falsyThrowTo;
    }
}

function parseMonkes(input: string, isPart2 = false) {
    const lines = input.split("\n");
    console.log(lines);

    const monkeTest = (item: number, divisibleBy: number) => {
        return item % divisibleBy === 0;
    };

    const monkes: Monke[] = [];

    function buildMonkeOperation(operation: string[]) {
        const op = operation[3] as "+" | "*";
        const by = operation[4];

        if (op === "*") {
            return (old: number) => old * (by === "old" ? old : parseInt(by));
        }

        if (op === "+") {
            return (old: number) => old + (by === "old" ? old : parseInt(by));
        }

        throw new Error("Invalid operation");
    }

    const currMonke: IMonke = {
        number: 0,
        holdingItems: [],
        operation: (old: number) => old,
        testFn: monkeTest,
        divisibleBy: 0,
        truthyThrowTo: 0,
        falsyThrowTo: 0,
    };

    for (const line of lines) {
        if(line.startsWith("Monkey")) {
            currMonke.number = parseInt(line.split(" ")[1]);
            continue;
        }

        if (line.startsWith("  Starting items:")) {
            currMonke.holdingItems = line
                .split(" ")
                .slice(4)
                .map((i) => parseInt(i.replace(",", "")));
            continue;
        }

        if (line.startsWith("  Operation:")) {
            const operation = line.split(" ").slice(3);
            currMonke.operation = buildMonkeOperation(operation);
            continue;
        }

        if (line.startsWith("  Test:")) {
            const divisibleBy = line.split(" ").at(-1)!;
            currMonke.divisibleBy = parseInt(divisibleBy);
            continue;
        }

        if (line.startsWith("    If true")) {
            currMonke.truthyThrowTo = parseInt(line.split(" ").at(-1)!);
            // console.log({ truthThrow: currMonke.truthyThrowTo });
            continue;
        }

        if (line.startsWith("    If false")) {
            currMonke.falsyThrowTo = parseInt(line.split(" ").at(-1)!);
            // console.log({ falseThrow:currMonke.falsyThrowTo});
            continue;
        }

        if (line.length === 0) {
            console.log({ currMonke });
            monkes.push(
                new Monke(
                    currMonke.number,
                    currMonke.holdingItems,
                    currMonke.operation,
                    currMonke.testFn,
                    currMonke.divisibleBy,
                    currMonke.truthyThrowTo,
                    currMonke.falsyThrowTo,
                    isPart2
                )
            );
        }
    }

    return monkes;
}

function part1(input: string) {
    const monkes = parseMonkes(input);
    console.log(monkes);

    for (let round = 0; round < 20; round++) {
        console.log({ round });
        for (let monke = 0; monke < monkes.length; monke++) {
            monkes[monke].inspectItems(monkes);
        }
    }

    console.log(monkes);

    const timesInspected = monkes
        .map((monke) => monke.inspectedTimes)
        .sort((a, b) => b - a)
        .slice(0, 2);

    const total = timesInspected[0] * timesInspected[1];

    console.log({
        timesInspected,
        total,
    });

    return total;
}

function part2(input: string) {
    const monkes = parseMonkes(input, true);
    console.log(monkes);

    for (let round = 0; round < 10000; round++) {
        console.log({ round });
        for (let monke = 0; monke < monkes.length; monke++) {
            monkes[monke].inspectItems(monkes);
        }
    }

    console.log(monkes);

    const timesInspected = monkes
        .map((monke) => monke.inspectedTimes)
        .sort((a, b) => b - a)
        .slice(0, 2);
    const total = timesInspected[0] * timesInspected[1];

    console.log({
        timesInspected,
        total,
    });

    return total;
}

// part1(input);

part2(input);

Deno.test("Day 11 - Part 1 - Test Input", () => {
    assertEquals(
        part1(testInput),
        expectedOutput,
        `Expected ${expectedOutput} but got ${part1(testInput)}`
    );
});
