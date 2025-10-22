import { Request, Response } from "express";
import { expenseEngineInput } from "../utils/validators/splitEngine";
import { settleAmount } from "../services/settlement.service";

const settlementController = (req: Request, res: Response) => {
  try {
    const { error } = expenseEngineInput.safeParse(req.body);
    if (error) {
      console.error("[settlementController]Error in req.body", error.message);
      return res.status(400).json({ error: error.message });
    }

    const { transactions } = req.body.data;
    const settlements = settleAmount(transactions);
    console.log("Transactions settled successfully.");
    res.json(settlements);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { settlementController };
