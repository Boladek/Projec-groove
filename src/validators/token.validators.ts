import { z } from "zod";

export const tokenSchema = z.object({
  id: z.string().optional(),
  token_name: z.string().min(2, {
    message: "Token name is required and must be at least 3 characters",
  }),
  total: z.number().min(0, {}),
  amount_available: z.number(),
  token_symbol: z.string().min(2, {
    message: "Token symbol is required and must be at least 3 characters",
  }),
  project_id: z.string(),
});


export const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(8, {
    message: "password is required and must be at least 8 characters",
  }),
});

export const userIdSchema = z.object({
  id: z.string(),
});
