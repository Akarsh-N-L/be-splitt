import { z } from "zod";

const expenseEngineInput = z.object({
  data: z.object({
    transactions: z.array(
      z.object({
        paidBy: z.array(z.string()),
        amount: z.number(),
        splitAmong: z.array(z.string()),
      })
    ),
  }),
});

export { expenseEngineInput };
