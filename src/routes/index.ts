import { Router } from "express";
import { settlementController } from "../controllers/settlement.controller";

const router = Router();

// Health check
router.get("/", (req, res) => {
  res.json({ message: "Split API is running" });
});

router.post("/settle-amount", settlementController);

export default router;
