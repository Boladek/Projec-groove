import { z } from "zod";

export const trasactionSchema = z.object({
  id: z.string().optional(),
  type: z.string(),
  amount: z.number().min(0, {}),
  worth: z.number().optional(),
  user_id: z.string(),
  token_id: z.string(),
});

export const buyProjectTokenSchema = z.object({
    id: z.string().optional(),
    type: z.string(),
    amount: z.number().min(0, {}),
    username: z.string(),
    user_id: z.string(),
    token_id: z.string(),
  });
