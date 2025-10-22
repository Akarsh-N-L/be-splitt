import { Router } from "express";
import { settlementController } from "../controllers/settlement.controller";
import transactionRouter from "../routes/transaction.router";

const router = Router();

// Health check
router.get("/", (req, res) => {
  res.json({ message: "Split API is running" });
});

router.post("/settle-amount", settlementController);
router.post("/transaction", transactionRouter);

export default router;
