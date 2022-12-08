import { transpose } from "npm:mathjs";
import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const input = await Deno.readTextFile("./08/input.txt");

const testInput = `30373
25512
65332
33549
35390`;

const EXPECTED_OUTPUT = 21;

function iterateOverTreeRow(treeRow: number[]): number {
    let tallestTree = 0;
    let visibleInThisRow = 0;

    for (let i = 0; i < treeRow.length; i++) {
        const isFirstTree = i === 0;
        const isLastTree = i === treeRow.length - 1;

        const currTree = treeRow[i];

        if (isFirstTree || isLastTree) {
            visibleInThisRow++;
            continue;
        }

        const treeBeforeThisOne = treeRow[i - 1];

        if (currTree > treeBeforeThisOne) tallestTree = currTree;

        if (currTree > tallestTree) visibleInThisRow++;
    }

    return visibleInThisRow;
}

function calcVisibleTrees(treesMatrix: number[][]) {
    let visibleTrees = 0;

    for (let i = 0; i < treesMatrix.length; i++) {
        const isFirstTreeRow = i === 0;
        const isLastTreeRow = i === treesMatrix.length - 1;

        const currRow = treesMatrix[i];

        if (isFirstTreeRow || isLastTreeRow) {
            visibleTrees += currRow.length;

            continue;
        }

        const visibleFromStartToEnd = iterateOverTreeRow(currRow);

        const visibleFromEndToStart = iterateOverTreeRow(currRow.toReversed());

        if (visibleFromEndToStart === visibleFromStartToEnd) {
            visibleTrees += visibleFromStartToEnd;
            continue;
        }

        visibleTrees +=
            visibleFromStartToEnd > visibleFromEndToStart
                ? visibleFromStartToEnd
                : visibleFromEndToStart;
    }

    return visibleTrees;
}

function part1(input: string) {
    const lines = input.split("\n");
    const treesMatrix = lines.map((line) => {
        const trees = line.split("");
        return trees.map((tree) => parseInt(tree));
    });

    // console.log({ treesMatrix });

    const transposedMatrix = transpose(treesMatrix);
    // console.log({ transposedMatrix });

    const visibleTreesInRows = calcVisibleTrees(treesMatrix);
    console.log({ visibleTreesInRows });

    const visibleTreesInColumns = calcVisibleTrees(transposedMatrix);
    console.log({ visibleTreesInColumns });

    return visibleTreesInRows > visibleTreesInColumns
        ? visibleTreesInRows
        : visibleTreesInColumns;
}

console.log(part1(input));

Deno.test("Day 8 test output: 21", () => {
    assertEquals(part1(testInput), EXPECTED_OUTPUT);
});
