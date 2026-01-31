"use client";

import React, { useState } from "react";

export default function RedeemForm() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function redeem() {
    setStatus(null);
    const res = await fetch("/api/redeem", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ code })
    });

    const data = await res.json();
    if (!res.ok) {
      setStatus(data?.error ?? "Failed to redeem code.");
      return;
    }

    setStatus("Unlocked! Redirecting...");
    window.location.href = "/dashboard";
  }

  return (
    <div className="space-y-3">
      <input
        className="w-full rounded-xl border border-neutral-300 px-3 py-2"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter access code"
      />
      <button className="rounded-xl bg-neutral-900 px-4 py-2 text-white" onClick={redeem}>
        Unlock
      </button>
      {status && <div className="text-sm text-neutral-700">{status}</div>}
    </div>
  );
}
