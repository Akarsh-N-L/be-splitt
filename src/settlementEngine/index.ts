import {
  ISettlement,
  ITransaction,
} from "../utils/interfaces/splitEngine.interface";
/**
 * Optimized Splitwise Settlement Algorithm
 * Minimizes the number of transactions needed to settle group expenses
 *
 * Time Complexity: O(T + N log N) where T = transactions, N = people
 * Space Complexity: O(N)
 */
class SettlementEngine {
  /**
   * Calculate minimum settlements for a list of group transactions
   * @param transactions - Array of transaction objects
   * @returns Array of settlement objects with minimum transactions
   */
  public static calculateSettlements(
    transactions: ITransaction[]
  ): ISettlement[] {
    // Step 1: Calculate net balance for each person
    const balances = this.calculateBalances(transactions);

    // Step 2: Minimize cash flow using greedy algorithm
    return this.minimizeCashFlow(balances);
  }

  /**
   * Calculate net balance for each person from all transactions
   * Positive balance = person should receive money
   * Negative balance = person owes money
   */
  private static calculateBalances(
    transactions: ITransaction[]
  ): Map<string, number> {
    const balances = new Map<string, number>();

    for (const transaction of transactions) {
      const { paidBy, amount, splitAmong } = transaction;
      const splitAmount = amount / splitAmong.length;
      const perPayerAmount = amount / paidBy.length;

      // Each person in splitAmong owes their share
      for (const person of splitAmong) {
        balances.set(person, (balances.get(person) || 0) - splitAmount);
      }

      // Each payer gets back what they paid
      for (const payer of paidBy) {
        balances.set(payer, (balances.get(payer) || 0) + perPayerAmount);
      }
    }

    // Remove people with zero balance (settled)
    for (const [person, balance] of balances.entries()) {
      if (Math.abs(balance) < 0.01) {
        // Handle floating point precision
        balances.delete(person);
      }
    }

    return balances;
  }

  /**
   * Minimize cash flow using priority queue greedy algorithm
   * Matches highest debtor with highest creditor iteratively
   */
  private static minimizeCashFlow(
    balances: Map<string, number>
  ): ISettlement[] {
    const settlements: ISettlement[] = [];

    // Separate into debtors (owe money) and creditors (should receive)
    const debtors: Array<{ person: string; amount: number }> = [];
    const creditors: Array<{ person: string; amount: number }> = [];

    for (const [person, balance] of balances.entries()) {
      if (balance < 0) {
        debtors.push({ person, amount: Math.abs(balance) });
      } else if (balance > 0) {
        creditors.push({ person, amount: balance });
      }
    }

    // Sort in descending order for greedy matching
    debtors.sort((a, b) => b.amount - a.amount);
    creditors.sort((a, b) => b.amount - a.amount);

    let i = 0; // debtor index
    let j = 0; // creditor index

    // Greedy algorithm: match highest debtor with highest creditor
    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];

      // Transfer the minimum of what debtor owes and creditor should receive
      const transferAmount = Math.min(debtor.amount, creditor.amount);

      settlements.push({
        payee: debtor.person,
        receiver: creditor.person,
        amount: Math.round(transferAmount * 100) / 100, // Round to 2 decimal places
      });

      // Update remaining amounts
      debtor.amount -= transferAmount;
      creditor.amount -= transferAmount;

      // Move to next debtor if current one is settled
      if (debtor.amount < 0.01) {
        i++;
      }

      // Move to next creditor if current one is settled
      if (creditor.amount < 0.01) {
        j++;
      }
    }

    return settlements;
  }
}

export { SettlementEngine };
