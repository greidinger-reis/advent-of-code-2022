const input = await Deno.readTextFile("./10/input.txt");

function part2(input: string) {
    const instructions = input.split("\n");
    let cycle = 0;
    let X = 1;
    let spritePosition: number[] = [];
    const screen: string[][] = Array.from({ length: 6 }).map(() =>
        Array.from({ length: 40 }).map(() => ".")
    );

    let currRow = 0;
    let currCol = 0;

    function updateSpritePosition() {
        spritePosition = [X - 1, X, X + 1];
    }

    function drawPixel() {
        if (spritePosition.includes(currCol)) {
            screen[currRow][currCol] = "#";
        } else {
            screen[currRow][currCol] = ".";
        }
    }

    function updateRow() {
        if (currCol === 40) {
            currRow++;
            currCol = 0;
        }
    }

    function logCycle() {
        console.log({ cycle, currRow, currCol });
    }

    updateSpritePosition();
    drawPixel();
    logCycle();

    for (const instruction of instructions) {
        if (instruction.startsWith("noop")) {
            cycle++;
            currCol++;
            drawPixel();
            updateRow();
            logCycle();
            continue;
        }

        if (instruction.startsWith("addx")) {
            const [, val] = instruction.split(" ");
            X += parseInt(val);

            cycle++;
            currCol++;

            drawPixel();
            updateRow();
            logCycle();

            cycle++;
            currCol++;

            updateSpritePosition();
            drawPixel();
            updateRow();
            logCycle();
        }
    }
    return screen;
}

const screen = part2(input);

await Deno.writeTextFile(
    "./10/screen.txt",
    screen.map((row) => row.join("")).join("\n")
);
