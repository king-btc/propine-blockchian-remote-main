import { getMultiTokensPrice } from "./api";
import { extractingFromCSV } from "./csv";
import { Filters, PortfolioResult, TransactionRow } from "./type";

let result: PortfolioResult = {};

export async function extractPortfolio(
  filters: Filters
): Promise<{ result: any }> {
  let message = "you extracting portfolio with:\n";
  if (filters.token) message += "  - token\n";
  if (filters.date) message += "  - date\n";

  console.log(message);

  /// extracting portfolio from csv
  console.time("extracting-csv");
  console.log("Filter token:", filters.token);
  const filterDate = new Date(filters?.date ?? Date.now());
  console.log("Getting on date:", filterDate, "\n");
  await extractingFromCSV(
    transactionHandler({ token: filters.token, date: filterDate.getTime() })
  );
  console.timeEnd("extracting-csv");
  console.log("\n");

  /// fetching tokens price from cryptocompare api
  console.time("fetching-price");
  const tokenPrices = await getMultiTokensPrice(Object.keys(result));
  console.log(tokenPrices);
  console.timeEnd("fetching-price");

  /// convert token amount to balance
  Object.keys(result).map((token) => {
    if (tokenPrices[token]) result[token] *= tokenPrices[token].USD;
    /// set result as NaN if the API is failed or doesn't support the token
    else result[token] = NaN;
  });

  return {
    result,
  };
}

const transactionHandler =
  (extractingOption: { token: string; date: number }) =>
  (row: TransactionRow) => {
    const filterToken = extractingOption.token;
    const filterDate = extractingOption.date;

    /// skip if timestamp is not in filter date range
    if (row.timestamp > filterDate) return;

    /// skip if token is not matched when token filter is specified
    if (filterToken && row.token !== filterToken) return;

    /// add zero portfolio for the first appeared token
    if (result[row.token] === undefined) result[row.token] = 0;

    if (row.transaction_type === "DEPOSIT")
      result[row.token] += parseFloat(row.amount);
    else if (row.transaction_type === "WITHDRAWAL")
      result[row.token] -= parseFloat(row.amount);
    /// log error if csv contains unexpected transaction type
    else {
      console.error(
        "Unknown transaction type:",
        row.transaction_type,
        "-",
        row.timestamp
      );
    }
  };
