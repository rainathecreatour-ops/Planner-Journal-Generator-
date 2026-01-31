"use client";

import React, { useEffect, useState } from "react";

type Project = {
  id: string;
  title: string;
  type: string;
  status: string;
  updatedAt: string;
};

export default function ProjectList() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/projects");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  if (loading) return <div className="text-sm text-neutral-600">Loading...</div>;
  if (!items.length) return <div className="text-sm text-neutral-600">No projects yet.</div>;

  return (
    <div className="space-y-3">
      {items.map((p) => (
        <div key={p.id} className="rounded-xl border border-neutral-200 p-4">
          <div className="font-medium">{p.title}</div>
          <div className="text-sm text-neutral-600">
            {p.type} • {p.status} • updated {new Date(p.updatedAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
