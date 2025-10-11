import { Request, Response } from "express";
import { splitEngineValidator } from "../utils/validators/splitEngine";
import { splitService } from "../services/split.service";

const splitController = (req: Request, res: Response) => {
  try {
    const { error } = splitEngineValidator.safeParse(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const { balances } = req.body.data;
    const settlements = splitService(balances);
    res.json(settlements);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { splitController };
