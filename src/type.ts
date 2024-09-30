export interface Filters {
  token?: string;
  date?: string;
}

export interface PortfolioResult {
  [token: string]: number;
}

export interface TransactionRow {
  timestamp: number;
  transaction_type: "DEPOSIT" | "WITHDRAWAL";
  token: string;
  amount: string;
}
