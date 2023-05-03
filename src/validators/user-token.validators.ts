import { z } from "zod";

export const userTokenSchema = z.object({
  id: z.string().optional(),
//   worth: z.number(),
  amount: z.number(),
  user_id: z.string(),
  token_id: z.string(),
});
