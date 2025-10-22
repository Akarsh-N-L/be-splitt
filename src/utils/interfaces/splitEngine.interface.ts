// Transaction Input Interface
interface ITransaction {
  paidBy: string[]; // Can have multiple payees
  amount: number;
  splitAmong: string[]; // Members who share this expense
}

// Settlement Output Interface
interface ISettlement {
  payee: string;
  receiver: string;
  amount: number;
}

export { ISettlement, ITransaction };
