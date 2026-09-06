import Link from "next/link"
import { EvaText } from "@eva-cn/registry/eva-text"
import { CodeBlock } from "./lab-shell"
import type { ReactNode } from "react"

export type PropRow = { name: string; default: string; description: string }

export function ComponentPage({ name, item, description, children, props, notes }: {
  name: string; item: string; description: string; children: ReactNode; props: PropRow[]; notes: string
}) {
  return <main className="page-shell component-page">
    <Link href="/" className="back-link">← All components</Link>
    <header className="component-intro">
      <EvaText as="h1" className="component-heading" variant="interface" tracking="tight">{name}</EvaText>
      <p>{description}</p>
    </header>
    {children}
    <section className="integration-section" aria-labelledby="installation">
      <h2 id="installation">Installation</h2>
      <p>Use a React 19 app with Tailwind CSS 4 and shadcn initialized. The theme and required fonts install automatically.</p>
      <CodeBlock label="Copy command" code={`pnpm dlx shadcn@latest add bendsp/eva-cn/${item}`} />
      <p>{notes}</p>
    </section>
    <section className="integration-section" aria-labelledby="props">
      <h2 id="props">Props</h2>
      <div className="props-scroll"><table><thead><tr><th>Prop</th><th>Default</th><th>Behavior</th></tr></thead>
        <tbody>{props.map(row => <tr key={row.name}><td><code>{row.name}</code></td><td><code>{row.default}</code></td><td>{row.description}</td></tr>)}</tbody>
      </table></div>
    </section>
  </main>
}
