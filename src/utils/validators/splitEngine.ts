import { z } from "zod";

const splitEngineValidator = z.object({
  data: z.object({
    balances: z.record(z.string(), z.number()),
  }),
});

export { splitEngineValidator };
