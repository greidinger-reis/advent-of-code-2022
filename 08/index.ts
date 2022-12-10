const input = await Deno.readTextFile("./08/input.txt");

const testInput = `30373
25512
65332
33549
35390`;

function part1(input: string) {
    //
    const grid = input
        .split("\n")
        .map((line) =>
            line.split("").map((num) => [parseInt(num), false, 0])
        ) as [number, boolean, number][][];
    // console.log(grid);

    //iterate over all rows
    for (let row = 0; row < grid.length; row++) {
        let colMax = -1;

        // check if the trees are visible from left to right
        for (let col = 0; col < grid[row].length; col++) {
            if (colMax < grid[row][col][0]) {
                grid[row][col][1] = true;
            }
            colMax = Math.max(colMax, grid[row][col][0]);
        }

        colMax = -1;

        // check if the trees are visible from right to left
        for (let col = grid[row].length - 1; col >= 0; col--) {
            if (colMax < grid[row][col][0]) {
                grid[row][col][1] = true;
            }
            colMax = Math.max(colMax, grid[row][col][0]);
        }
    }
    // console.log(grid);

    //iterate over all columns
    for (let col = 0; col < grid[0].length; col++) {
        let rowMax = -1;

        // check if the trees are visible from top to bottom
        for (let row = 0; row < grid.length; row++) {
            if (rowMax < grid[row][col][0]) {
                grid[row][col][1] = true;
            }
            rowMax = Math.max(rowMax, grid[row][col][0]);
        }

        rowMax = -1;

        // check if the trees are visible from bottom to top
        for (let row = grid.length - 1; row >= 0; row--) {
            if (rowMax < grid[row][col][0]) {
                grid[row][col][1] = true;
            }
            rowMax = Math.max(rowMax, grid[row][col][0]);
        }
    }

    //get the count of visible trees
    const count = grid.reduce((acc, row) => {
        return acc + row.filter((col) => col[1]).length;
    }, 0);

    console.log(grid);
    console.log(count);
}

type scoreByDirections = {
    n: number;
    s: number;
    e: number;
    w: number;
};

function part2(input: string) {
    const grid = input
        .split("\n")
        .map((line) =>
            line
                .split("")
                .map((num) => [parseInt(num), { n: 0, s: 0, e: 0, w: 0 }])
        ) as [number, scoreByDirections][][];

    //iterate over all rows
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const currTree = grid[row][col];

            // check the east visible trees
            for (let sibling = col + 1; sibling < grid[row].length; sibling++) {
                const siblingTree = grid[row][sibling];

                if (currTree[0] > siblingTree[0]) {
                    currTree[1].e++;
                    continue;
                }

                if (currTree[0] <= siblingTree[0]) {
                    currTree[1].e++;
                    break;
                }
            }
        }

        for (let col = grid[row].length - 1; col >= 0; col--) {
            const currTree = grid[row][col];

            // check the west visible trees
            for (let sibling = col - 1; sibling >= 0; sibling--) {
                const siblingTree = grid[row][sibling];

                if (currTree[0] > siblingTree[0]) {
                    currTree[1].w++;
                    continue;
                }

                if (currTree[0] <= siblingTree[0]) {
                    currTree[1].w++;
                    break;
                }
            }
        }
    }

    //iterate over all columns
    for (let col = 0; col < grid[0].length; col++) {
        for (let row = 0; row < grid.length; row++) {
            const currTree = grid[row][col];

            // check the north visible trees
            for (let sibling = row + 1; sibling < grid[row].length; sibling++) {
                const siblingTree = grid[sibling][col];

                if (currTree[0] > siblingTree[0]) {
                    currTree[1].s++;
                    continue;
                }

                if (currTree[0] <= siblingTree[0]) {
                    currTree[1].s++;
                    break;
                }
            }
        }

        for (let row = grid.length - 1; row >= 0; row--) {
            const currTree = grid[row][col];

            // check the south visible trees
            for (let sibling = row - 1; sibling >= 0; sibling--) {
                const siblingTree = grid[sibling][col];

                if (currTree[0] > siblingTree[0]) {
                    currTree[1].n++;
                    continue;
                }

                if (currTree[0] <= siblingTree[0]) {
                    currTree[1].n++;
                    break;
                }
            }
        }
    }

    const scenicScores = grid
        .map((row) =>
            row.map((col) => {
                const { n, s, e, w } = col[1];
                return n * s * e * w;
            })
        )
        .flat()
        .filter((num) => num > 0);

    const highest = Math.max(...scenicScores);

    console.log(grid);
    console.log({ highest });
}

part1(input);
part2(input);
