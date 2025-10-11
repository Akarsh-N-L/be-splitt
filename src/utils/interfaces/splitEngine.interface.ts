// Define interfaces for type safety
interface Expenses {
  [person: string]: number;
}

interface Settlement {
  payer: string;
  receiver: string;
  amount: number;
}

export { Expenses, Settlement };
