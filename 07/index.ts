import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const input = await Deno.readTextFile("./07/input.txt");

const testInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

const EXPECTED_OUTPUT = 95437;

const LIMITSIZE = 100_000;

const SPACE_NEEDED = 30_000_000;
const TOTAL_SPACE = 70_000_000;

type Directory = {
    name: string;
    size: number;
};

function getPart1(input: string) {
    const roots: Directory[] = [];
    const childrens: Directory[] = [];

    const lines = input.split("\n");

    for (const line of lines) {
        if (line.startsWith("$ cd")) {
            let [, , dirName] = line.split(" ");

            if (dirName === "..") {
                childrens.push(roots.pop()!);
                continue;
            }

            const exists = roots.some((dir) => dir.name === dirName);

            if (exists) dirName = dirName + "_";

            roots.push({ name: dirName, size: 0 });
            continue;
        }

        if (line.startsWith("$ ls")) continue;

        if (line.startsWith("dir ")) continue;

        const [size] = line.split(" ");

        roots.forEach((dir) => (dir.size += parseInt(size)));
    }

    const answer = childrens.reduce((acc, dir) => {
        return dir.size <= LIMITSIZE ? acc + dir.size : acc;
    }, 0);

    const rootDir = roots.find((dir) => dir.name === "/");

    const spaceToClean = (TOTAL_SPACE - SPACE_NEEDED - rootDir!.size) * -1;

    childrens.sort((a, b) => a.size - b.size);

    let bestSuitedDirToDelete: Directory | null = null;

    for (const dir of childrens) {
        if (dir.size >= spaceToClean) {
            bestSuitedDirToDelete = dir;
            break;
        }
    }

    return { part1: answer, part2: bestSuitedDirToDelete!.size };
}

console.log(getPart1(input));

Deno.test("Day 7 test input", () => {
    console.log(getPart1(testInput));
    assertEquals(
        getPart1(testInput).part1,
        EXPECTED_OUTPUT,
        `Expected ${EXPECTED_OUTPUT} but got ${getPart1(testInput)}`
    );
});
