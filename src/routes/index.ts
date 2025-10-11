import { Router } from "express";
import { splitController } from "../controllers/split.controller";

const router = Router();

// Health check
router.get("/", (req, res) => {
  res.json({ message: "Split API is running" });
});

router.post("/split", splitController);

export default router;
