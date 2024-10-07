# typescript-csv-cli-extractor

Portfolio means the balance of the token where you need to add deposits and subtract withdrawals.

Includes:

- [TypeScript](https://www.typescriptlang.org/), for writing good code
- [Commander](https://www.npmjs.com/package/commander), for building CLI applications

Your application will be installable from `npm` or by sharing your native executables.

## Architecture

- `cli.ts`: this is the entry of the command line. Will configured to accept two optional params
  - `token`: target token to get portfolio
  - `date`: target date to get portfolio value on date
- `index.ts`: main script file to execute functions
- `csv.ts`: script for reading data from csv
- `type.ts`: type definition for inputs and results
- `api.ts`: fetch multiple tokens prices from CryptoCompare API

## Usage

You need to specify `API_KEY` in `.env` file for cryptocompare API key.
And this cli app will extract the transactions data from `src/assets/transactions.csv` file.
Ignored git push for this file because it's too large and need to update periodically.

### **dev**

`npm run dev`
Runs the CLI application.

You can pass arguments to your application by running `npm run dev -- --your-argument`. The extra `--` is so that your arguments are passed to your CLI application, and not `npm`.

```
$ yarn dev -t BTC -d "2019-11-19"

yarn run v1.22.19
$ ts-node ./src/cli.ts -t BTC -d 2019-11-19
you extracting portfolio with:
  - token
  - date

Filter token: BTC
Getting on date: 2019-11-19T00:00:00.000Z
```

### **build**

`npm run build`

Cleans, then builds the TypeScript code.

Your built code will be in the `./dist/` directory.

## Result

```
yarn run v1.22.19
$ ts-node ./src/cli.ts
yarn run v1.22.19
$ ts-node ./src/cli.ts -t BTC
you extracting portfolio with:

Filter token: undefined
Getting on date: 2023-03-03T08:05:45.626Z

finished
extracting-csv: 1:06.634 (m:ss.mmm)

{ BTC: { USD: 22385.3 }, ETH: { USD: 1568.77 }, XRP: { USD: 0.3649 } }
fetching-price: 2.027s

Result
 {
  BTC: 26871877158.82462,
  ETH: 1414566628.2377343,
  XRP: 329626.20490294776
}
Done in 69.83s.
```

`Note:`
Positive balance of portfolio result means you can withdraw the balance and negative balance means you need to deposit.
Sometimes the result balance may be NaN. And this means the cryptocompare API does not support the token SYMBOL.
