import settleExpenses from "../splitEngine";

const splitService = (balances: Record<string, number>) => {
  if (Object.keys(balances).length === 0) {
    console.warn("No balances provided");
    return [];
  }
  return settleExpenses(balances);
};

export { splitService };
