import { z } from "zod";

export const userSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(2, {
    message: "lastName is required and must be at least 3 characters",
  }),
  password: z.string().min(8, {
    message: "password is required and must be at least 8 characters",
  }),
  role: z.string(),
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
