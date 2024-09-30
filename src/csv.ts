import fs from "fs";
import { parse } from "csv-parse";
import { TransactionRow } from "./type";

export const extractingFromCSV = async (
  handler: (_: TransactionRow) => void
) => {
  await new Promise((resolve, reject) => {
    fs.createReadStream("src/assets/transactions.csv")
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
        // console.log(row);
        handler({
          timestamp: row[0],
          transaction_type: row[1],
          token: row[2],
          amount: row[3],
        });
      })
      .on("end", function () {
        console.log("finished");
        resolve(true);
      })
      .on("error", function (error) {
        console.log(error.message);
        reject(error);
      });
  });
};
