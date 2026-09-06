"use client"

import { DialRoot } from "dialkit"
import { useState, type ReactNode } from "react"

export function CodeBlock({ code, label = "Copy JSX" }: { code: string; label?: string }) {
  const [copyResult, setCopyResult] = useState<{ code: string; message: string } | null>(null)
  const status = copyResult?.code === code ? copyResult.message : ""
  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopyResult({ code, message: "Copied" })
    } catch {
      setCopyResult({ code, message: "Select and copy the code below." })
    }
  }
  return (
    <div className="code-block">
      <div className="code-toolbar">
        <span>Usage</span>
        <div><span role="status">{status}</span><button onClick={copy} type="button">{label}</button></div>
      </div>
      <pre tabIndex={0}><code>{code}</code></pre>
    </div>
  )
}

export function LabShell({ children, code, onReset }: { children: ReactNode; code: string; onReset: () => void }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  return (
    <section className="playground" aria-label="Interactive playground">
      <div className="playground-toolbar">
        <h2>Playground</h2>
        <div className="playground-actions">
          <div role="group" aria-label="Preview theme">
            <button type="button" aria-pressed={theme === "light"} onClick={() => setTheme("light")}>Light</button>
            <button type="button" aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}>Dark</button>
          </div>
          <button type="button" onClick={onReset}>Reset</button>
        </div>
      </div>
      <div className="playground-grid">
        <div className={`playground-preview eva-theme-${theme}`} data-testid="preview">
          <div className="playground-canvas">{children}</div>
        </div>
        <aside className="playground-controls" aria-label="Component controls">
          <DialRoot mode="inline" theme="dark" productionEnabled />
        </aside>
      </div>
      <CodeBlock code={code} />
    </section>
  )
}

// JSX string expressions preserve quotes, newlines, braces and Japanese labels.
export function componentCode(name: string, item: string, props: Record<string, unknown>, children?: string) {
  const attributes = Object.entries(props)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `  ${key}={${JSON.stringify(value)}}`)
    .join("\n")
  return `import { ${name} } from "@/components/ui/${item}"\n\n<${name}\n${attributes}\n${children === undefined ? "/>" : `>\n  {${JSON.stringify(children)}}\n</${name}>`}`
}
