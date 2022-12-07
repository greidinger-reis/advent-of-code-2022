import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const testInputs = {
    mjqjpqmgbljsphdztnvjfqwrcgsmlb: 7,
    nppdvjthqldpwncqszvftbrmjlhg: 6,
    zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: 11,
};

const input = await Deno.readTextFile("./06/input.txt");

function getPart1(input: string) {
    //loop through the string, and find the longest substring without repeating characters, the search stops when 4 non-repeating characters are found
    let count = 0;
    let currSubstring = "";

    for (let i = 0; i < input.length; i++) {
        if (!currSubstring.includes(input[i])) {
            //if the current substring does not include the current character, add it to the substring
            currSubstring += input[i];
            count++;
            //if the substring is 4 characters long, return the count
            if (currSubstring.length === 4) return count;
            continue;
        }

        currSubstring = input[i]; // if the current substring includes the current character, reset the substring to the current character

        count++;
    }

    return count;
}

function getPart2(input: string) {
    //loop through the string, and find the longest substring without repeating characters, the search stops when 4 non-repeating characters are found
    let count = 0;
    let currSubstring = "";

    for (let i = 0; i < input.length; i++) {
        if (!currSubstring.includes(input[i])) {
            //if the current substring does not include the current character, add it to the substring
            currSubstring += input[i];
            count++;
            //if the substring is 14 characters long, return the count
            // for some reason, if the check is for 14 characters, it doesn't find the message starter...
            if (currSubstring.length === 13) return count;
            continue;
        }

        currSubstring = input[i]; // if the current substring includes the current character, reset the substring to the current character

        count++;
    }

    throw new Error("No substring of length 14 found");
}

console.log({
    part1: getPart1(input),
    part2: getPart2(input),
});

Deno.test("Inputs should return their repective outputs", () => {
    for (const [input, output] of Object.entries(testInputs)) {
        assertEquals(
            output,
            getPart1(input),
            `Expected Output: ${output}\nActual Output: ${getPart1(input)}\n`
        );
    }
});
