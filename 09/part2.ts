const input = await Deno.readTextFile("./09/input.txt");

type Direction = "R" | "L" | "U" | "D";

type Move = {
    direction: Direction;
    distance: number;
};

const directions: Record<Direction, number[]> = {
    R: [1, 0],
    L: [-1, 0],
    U: [0, 1],
    D: [0, -1],
};

// [x,y]
type Knot = [number, number];

const knots: Knot[] = Array.from({length:10}).map(() => [0, 0]);
const visited = new Set<string>();

visited.add(knots.at(-1)!.toString());

function touching(hx: number, hy: number, tx: number, ty: number) {
    return Math.abs(hx - tx) <= 1 && Math.abs(hy - ty) <= 1;
}

function moveKnots(dx: number, dy: number) {
    // console.log("Moving knots in ", { dx, dy });
    knots[0][0] += dx;
    knots[0][1] += dy;

    for (let i = 1; i < knots.length; i++) {
        const [hx,hy] = knots[i - 1]; 
        const [tx,ty] = knots[i];

        if(!touching(hx,hy,tx,ty)){
            const signX = Math.sign(hx - tx);
            const signY = Math.sign(hy - ty);
            // console.log({i,signX,signY});
            knots[i][0] += signX;
            knots[i][1] += signY;
        }

        // console.log({touching:touching(hx,hy,tx,ty),i,hx,hy,tx,ty});
        if(i === knots.length - 1) {
            visited.add(knots[i].toString());
        }
    }
}

function main(input: string) {

    const moves = input.split("\n").map((move) => {
        const [direction, distance] = move.split(" ");
        return { direction, distance: parseInt(distance) } as Move;
    });

    for (const move of moves) {
        const [dx, dy] = directions[move.direction];
        for (let i = 0; i < move.distance; i++) {
            moveKnots(dx, dy);
        }
    }
    // console.log({ visited, length: visited.size });
    console.log({ visited, visited_size:visited.size, knots });
}

main(input);
