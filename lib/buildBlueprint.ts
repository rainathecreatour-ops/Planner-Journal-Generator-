import type { PromptInput } from "@/lib/validation";

type PageBlock =
  | { type: "title"; text: string }
  | { type: "section"; label: string }
  | { type: "lines"; count: number }
  | { type: "checkbox_list"; label: string; count: number }
  | { type: "grid"; rows: number; cols: number; label?: string };

type PageSpec = {
  pageNumber: number;
  kind: "cover" | "index" | "daily" | "weekly" | "notes" | "tracker";
  blocks: PageBlock[];
};

export function buildBlueprint(input: PromptInput) {
  const pages: PageSpec[] = [];

  pages.push({ pageNumber: 1, kind: "cover", blocks: [{ type: "title", text: input.title }] });

  pages.push({
    pageNumber: 2,
    kind: "index",
    blocks: [{ type: "section", label: "Index" }, { type: "lines", count: 24 }]
  });

  const remaining = Math.max(input.pages - 2, 3);
  for (let i = 0; i < remaining; i++) {
    const pageNumber = i + 3;
    const mod = i % 4;

    if (mod === 0) {
      pages.push({
        pageNumber,
        kind: "daily",
        blocks: [
          { type: "section", label: "Top 3 Priorities" },
          { type: "checkbox_list", label: "Priorities", count: 3 },
          { type: "section", label: "Schedule" },
          { type: "lines", count: 12 },
          { type: "section", label: "Notes" },
          { type: "lines", count: 10 }
        ]
      });
    } else if (mod === 1) {
      pages.push({
        pageNumber,
        kind: "tracker",
        blocks: [
          { type: "section", label: "Habit Tracker" },
          { type: "grid", rows: 10, cols: 8, label: "Habits x Days" },
          { type: "section", label: "Wins" },
          { type: "lines", count: 8 }
        ]
      });
    } else if (mod === 2) {
      pages.push({
        pageNumber,
        kind: "weekly",
        blocks: [
          { type: "section", label: "Weekly Overview" },
          { type: "lines", count: 18 },
          { type: "section", label: "Goals" },
          { type: "checkbox_list", label: "Goals", count: 6 }
        ]
      });
    } else {
      pages.push({
        pageNumber,
        kind: "notes",
        blocks: [{ type: "section", label: "Journal / Notes" }, { type: "lines", count: 30 }]
      });
    }
  }

  return {
    meta: {
      format: input.format,
      audience: input.audience,
      size: input.size,
      theme: input.theme,
      font: input.font,
      colorPreset: input.colorPreset,
      background: input.background,
      topics: input.topics,
      occasion: input.occasion
    },
    pages
  };
}
