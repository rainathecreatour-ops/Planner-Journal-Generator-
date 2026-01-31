import type { PromptInput } from "@/lib/validation";

type ImagePrompt = {
  id: string;
  purpose: "cover" | "interior_style" | "icons";
  prompt: string;
  negative?: string;
};

function baseStyle(input: PromptInput) {
  const topics = input.topics.length ? `Topics: ${input.topics.join(", ")}.` : "";
  const notes = input.extraNotes?.trim() ? `Extra notes: ${input.extraNotes.trim()}.` : "";
  return [
    `Product: ${input.format} (${input.audience}).`,
    `Occasion: ${input.occasion}.`,
    `Theme: ${input.theme}.`,
    `Background: ${input.background}.`,
    `Font vibe: ${input.font}.`,
    `Color preset: ${input.colorPreset}.`,
    `Size: ${input.size}.`,
    topics,
    notes
  ].filter(Boolean).join(" ");
}

/** ✅ This is the missing export you asked about. */
export function buildPlannerDesignImagePrompts(input: PromptInput): ImagePrompt[] {
  const style = baseStyle(input);

  const cover = [
    `Design a clean printable cover for a ${input.format} titled: "${input.title}".`,
    style,
    `Minimal, professional typography, centered title, lots of whitespace, print-ready.`,
    `No photos of real people.`
  ].join(" ");

  const interior = [
    `Create a cohesive interior page design style guide for a printable ${input.format}.`,
    style,
    `Focus on margins, line weight, section headers, checkboxes, subtle dividers.`,
    `Make it look like a premium planner/journal template set.`
  ].join(" ");

  const icons = [
    `Create a small icon set style for printable ${input.format} pages.`,
    style,
    `Simple monochrome icons (thin line), usable for habit trackers, goals, gratitude.`,
    `No brand logos.`
  ].join(" ");

  return [
    { id: "cover", purpose: "cover", prompt: cover, negative: "watermarks, mockups, clutter, heavy textures" },
    { id: "interior_style", purpose: "interior_style", prompt: interior, negative: "busy patterns, dark backgrounds" },
    { id: "icons", purpose: "icons", prompt: icons, negative: "brand logos, complex illustrations, 3D style" }
  ];
}
