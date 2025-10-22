import { SettlementEngine } from "../settlementEngine";
import {
  ISettlement,
  ITransaction,
} from "../utils/interfaces/splitEngine.interface";

const settleAmount = (
  transactions: Array<ITransaction>
): Array<ISettlement> => {
  if (transactions.length === 0) {
    throw new Error("Transactions array is empty.");
  }
  return SettlementEngine.calculateSettlements(transactions);
};

export { settleAmount };
