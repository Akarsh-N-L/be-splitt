import {
  Expenses,
  Settlement,
} from "../utils/interfaces/splitEngine.interface";

/**
 * Calculates the minimum number of transactions to settle expenses among a group.
 *
 * @param expenses - An object where keys are names (string) and values are amounts spent (number).
 * @returns An array of settlement objects, each representing a transaction.
 */
function settleExpenses(expenses: Expenses): Settlement[] {
  // 1. Calculate total spent and the number of people
  const amounts = Object.values(expenses);
  const people = Object.keys(expenses);
  const numPeople = people.length;

  const totalSpent = amounts.reduce((sum, amount) => sum + amount, 0);

  // Return early if there's nothing to settle
  if (totalSpent === 0 || numPeople === 0) {
    return [];
  }

  // 2. Determine the fair share and individual balances
  const fairShare = totalSpent / numPeople;
  const balances: { [person: string]: number } = {};
  for (const person of people) {
    balances[person] = expenses[person] - fairShare;
  }

  // 3. Separate people into creditors (owed money) and debtors (owe money)
  const creditors: [string, number][] = [];
  const debtors: [string, number][] = [];

  for (const person in balances) {
    const balance = balances[person];
    if (balance > 0) {
      creditors.push([person, balance]);
    } else if (balance < 0) {
      // Store the amount owed as a positive number for easier calculation
      debtors.push([person, -balance]);
    }
  }

  const settlements: Settlement[] = [];
  let creditorIndex = 0;
  let debtorIndex = 0;

  // 4. Greedily match debtors to creditors until all debts are settled
  while (creditorIndex < creditors.length && debtorIndex < debtors.length) {
    const [receiver, amountOwed] = creditors[creditorIndex];
    const [payer, amountToPay] = debtors[debtorIndex];

    const settleAmount = Math.min(amountOwed, amountToPay);

    // Create the settlement transaction
    settlements.push({
      payer,
      receiver,
      // Round to 2 decimal places to handle floating-point inaccuracies
      amount: Number(settleAmount.toFixed(2)),
    });

    // Update the remaining balances for the current creditor and debtor
    creditors[creditorIndex][1] -= settleAmount;
    debtors[debtorIndex][1] -= settleAmount;

    // Move to the next person if their balance is settled
    if (creditors[creditorIndex][1] < 0.01) {
      // Use a small tolerance
      creditorIndex++;
    }
    if (debtors[debtorIndex][1] < 0.01) {
      debtorIndex++;
    }
  }

  return settlements;
}
// Expected Output: [ { payer: 'Bob', receiver: 'Alice', amount: 20 } ]

export default settleExpenses;
