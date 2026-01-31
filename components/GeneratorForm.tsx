"use client";

import React, { useMemo, useState } from "react";

type Size = "letter" | "a4" | "a5";
type ProductType = "planner" | "journal";

const OCCASIONS = [
  "Everyday",
  "2026 Planner",
  "Academic Year 2025-2026",
  "Wedding Planning",
  "Fitness Journey",
  "Business Planning",
  "Travel Journal",
  "Gratitude Journal",
  "Custom"
];

const STYLES = ["Minimal", "Boho", "Floral", "Modern", "Bold"];
const BACKGROUNDS = ["plain", "subtle texture", "grid", "lined", "dotted"];
const FONTS = ["inter", "poppins", "montserrat", "playfair", "lora"];
const COLOR_PRESETS = ["neutral", "warm", "cool", "pastel", "bold"];
const TOPICS = ["Gratitude", "Goals", "Habits", "Wellness", "Finance", "Reflection"];

export default function GeneratorForm() {
  const [type, setType] = useState<ProductType>("planner");
  const [title, setTitle] = useState("Daily Planner");
  const [occasion, setOccasion] = useState("Everyday");
  const [theme, setTheme] = useState("Minimal");
  const [background, setBackground] = useState("plain");
  const [font, setFont] = useState("inter");
  const [colorPreset, setColorPreset] = useState("neutral");
  const [size, setSize] = useState<Size>("letter");
  const [pages, setPages] = useState(30);
  const [topics, setTopics] = useState<string[]>(["Gratitude", "Goals"]);
  const [audience, setAudience] = useState("Adults");
  const [extraNotes, setExtraNotes] = useState("");

  const settings = useMemo(() => {
    return {
      format: type,
      title,
      occasion,
      theme,
      background,
      font,
      colorPreset,
      topics,
      audience,
      pages,
      size,
      extraNotes
    };
  }, [type, title, occasion, theme, background, font, colorPreset, topics, audience, pages, size, extraNotes]);

  async function createAndGenerate() {
    const createRes = await fetch("/api/projects", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(settings)
    });
    const created = await createRes.json();
    if (!createRes.ok) {
      alert(created?.error ?? "Failed to create project");
      return;
    }

    const genRes = await fetch(`/api/projects/${created.id}/generate`, { method: "POST" });
    const job = await genRes.json();
    if (!genRes.ok) {
      alert(job?.error ?? "Failed to generate");
      return;
    }

    alert(`Generated! (Plan: ${created.plan}, pages used: ${created.pages})`);
  }

  function toggleTopic(t: string) {
    setTopics((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="text-sm text-neutral-700">Type</label>
          <select className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
            value={type} onChange={(e) => setType(e.target.value as ProductType)}>
            <option value="planner">Planner</option>
            <option value="journal">Journal</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-neutral-700">Title</label>
          <input className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
            value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <label className="text-sm text-neutral-700">Occasion</label>
          <select className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
            value={occasion} onChange={(e) => setOccasion(e.target.value)}>
            {OCCASIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm text-neutral-700">Theme</label>
          <select className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
            value={theme} onChange={(e) => setTheme(e.target.value)}>
            {STYLES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm text-neutral-700">Background</label>
          <select className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
            value={background} onChange={(e) => setBackground(e.target.value)}>
            {BACKGROUNDS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm text-neutral-700">Font</label>
          <select className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
            value={font} onChange={(e) => setFont(e.target.value)}>
            {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm text-neutral-700">Color preset</label>
          <select className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
            value={colorPreset} onChange={(e) => setColorPreset(e.target.value)}>
            {COLOR_PRESETS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm text-neutral-700">Size</label>
          <select className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
            value={size} onChange={(e) => setSize(e.target.value as Size)}>
            <option value="letter">Letter</option>
            <option value="a4">A4</option>
            <option value="a5">A5</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-neutral-700">Pages</label>
          <input type="number" min={5} max={200}
            className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
            value={pages} onChange={(e) => setPages(parseInt(e.target.value || "30", 10))} />
        </div>

        <div>
          <label className="text-sm text-neutral-700">Audience</label>
          <input className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
            value={audience} onChange={(e) => setAudience(e.target.value)} />
        </div>
      </div>

      <div>
        <div className="text-sm text-neutral-700">Topics</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <button
              key={t}
              type="button"
              className={`rounded-xl border px-3 py-1 text-sm ${
                topics.includes(t) ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300"
              }`}
              onClick={() => toggleTopic(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm text-neutral-700">Extra notes</label>
        <textarea className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
          rows={3} value={extraNotes} onChange={(e) => setExtraNotes(e.target.value)} />
      </div>

      <button className="rounded-xl bg-neutral-900 px-4 py-2 text-white" onClick={createAndGenerate}>
        Create + Generate
      </button>
    </div>
  );
}
