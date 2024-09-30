#!/usr/bin/env node

import program from "commander";
import { extractPortfolio } from ".";

program
  .version("0.1.0")
  .option("-t, --token [string]", "Search token")
  .option("-d, --date [date]", "Search on Date")
  .parse(process.argv);

extractPortfolio({
  token: program.token,
  date: program.date,
}).then((res) => console.log("\nResult\n", res.result));
