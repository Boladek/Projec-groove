import { z } from "zod";

export const projectSchema = z.object({
  id: z.string().optional(),
  token_symbol: z.string().optional(),
  token_name: z.string().optional(),
  project_name: z.string().min(2, {
    message: "Project name is required and must be at least 3 characters",
  }),
  organiser_name: z.string().min(2, {
    message: "Organiser name is required and must be at least 3 characters",
  }),
  artist_name: z.string().min(2, {
    message: "Artist name is required and must be at least 3 characters",
  }),
  tokens: z.number().min(1, {}),
  worth: z.number().min(1, {}),
  user_id: z.string(),
});
