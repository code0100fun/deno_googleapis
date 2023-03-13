#!/usr/bin/env -S deno run --allow-read=. --allow-write=. --allow-net --allow-env --allow-hrtime
import { indexHtml, apiModules } from '../generator/compile.ts'

async function writeFiles() {
  const origin = 'https://github.com/code0100fun/deno_googleapis'
  await Deno.mkdir("docs", { recursive: true });
  const index = indexHtml(origin)
  Deno.writeTextFile("./docs/index.html", index);
  (await apiModules(origin)).forEach((api) => {
    Deno.mkdir(`./build/${api.dir}`, { recursive: true }).then(() => {
      Deno.writeTextFile(`./build/${api.dir}/${api.filename}`, api.source);
    });
  });
}

await writeFiles()