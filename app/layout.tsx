import "../styles/globals.css";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <header className="mb-8 flex items-center justify-between">
            <div>
              <div className="text-xl font-semibold">Planner / Journal Generator</div>
              <div className="text-sm text-neutral-600">Access-code SaaS (Gumroad-ready)</div>
            </div>
            <nav className="text-sm">
              <a className="text-neutral-900 underline" href="/">Home</a>
              <span className="mx-2 text-neutral-400">•</span>
              <a className="text-neutral-900 underline" href="/dashboard">Dashboard</a>
            </nav>
          </header>
          {children}
          <footer className="mt-12 text-xs text-neutral-500">
            Tip: Use Gumroad post-purchase message to deliver the buyer’s access code.
          </footer>
        </div>
      </body>
    </html>
  );
}
