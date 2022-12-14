import { Command } from "https://deno.land/x/cliffy@v0.25.5/command/mod.ts";

const session = await Deno.readTextFile(".aoc-session").catch(() => {
    console.error("No .aoc-session file found");
    Deno.exit(1);
});

await new Command()
    .name("advent-of-fetch")
    .version("0.0.1")
    .description("Fetches the input for a given day")
    .option("-y, --year <year:number>", "The year to fetch the input for", {
        default: new Date().getFullYear(),
    })
    .option("-d, --day <day:number>", "The day to fetch the input for", {
        default: new Date().getDate(),
    })
    .arguments("<input:string>")
    .action(async (options, ...args) => {
        const [input] = args;
        const { day, year } = options;

        const res = await fetch(
            `https://adventofcode.com/${year}/day/${day}/input`,
            {
                headers: {
                    cookie: `session=${session}`,
                },
            }
        )
            .then((res) => res.text())
            .catch((err) => console.error(err));

        if (!res) return;

        await Deno.writeTextFile(input, res)
            .then(() =>
                console.log(`Wrote input of day: ${day} to file: ${input}`)
            )
            .catch(() => console.error(`Failed to write input to file.`));
    })
    .parse(Deno.args);
