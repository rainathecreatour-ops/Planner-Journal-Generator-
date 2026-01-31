import { z } from "zod";

export const SettingsSchema = z.object({
  format: z.enum(["planner", "journal"]),
  title: z.string().min(1).max(80),
  occasion: z.string().min(1).max(80),
  theme: z.string().min(1).max(40),
  background: z.string().min(1).max(40),
  font: z.string().min(1).max(40),
  colorPreset: z.string().min(1).max(40),
  topics: z.array(z.string()).min(0).max(12),
  audience: z.string().min(1).max(80),
  pages: z.number().int().min(5).max(200),
  size: z.enum(["letter", "a4", "a5"]),
  extraNotes: z.string().max(500).optional().default("")
});

export type PromptInput = z.infer<typeof SettingsSchema>;
