"use client"

import { useState } from "react"
import { EvaBadge } from "@eva-cn/registry/eva-badge"
import { EvaText } from "@eva-cn/registry/eva-text"

export function ThemePreview() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  return <section className="playground" aria-label="Theme preview">
    <div className="playground-toolbar"><h2>Theme preview</h2><div className="playground-actions" role="group" aria-label="Preview theme">
      <button aria-pressed={theme === "light"} onClick={() => setTheme("light")}>Light</button>
      <button aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}>Dark</button>
    </div></div>
    <div className={`theme-preview eva-theme-${theme}`} data-testid="theme-preview">
      <EvaText as="h2" variant="title" style={{ fontSize: 36 }}>NEON GENESIS</EvaText>
      <EvaText as="p" variant="roman">A shared palette for typography, frames, and signals.</EvaText>
      <div className="theme-badges"><EvaBadge tone="amber">STANDBY</EvaBadge><EvaBadge tone="terminal" lang="ja">接続中</EvaBadge></div>
      <div className="theme-swatches">{["primary", "secondary", "accent", "background", "foreground", "ring"].map(token =>
        <div key={token}><span style={{ background: `var(--${token})` }} /><code>{token}</code></div>
      )}</div>
    </div>
  </section>
}
