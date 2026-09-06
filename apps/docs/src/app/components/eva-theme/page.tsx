import Link from "next/link"
import { EvaText } from "@eva-cn/registry/eva-text"
import { CodeBlock } from "@/components/lab-shell"
import { ThemePreview } from "@/components/theme-preview"

export const metadata = { title: "EvaTheme" }

export default function Page() {
  return <main className="page-shell component-page">
    <Link href="/" className="back-link">← All components</Link>
    <header className="component-intro">
      <EvaText as="h1" className="component-heading" variant="interface" tracking="tight">EvaTheme</EvaText>
      <p>Signal colors, English and Japanese font roles, and semantic shadcn tokens. The preview uses exactly the theme you install.</p>
    </header>
    <ThemePreview />
    <section className="integration-section">
      <h2>Installation</h2>
      <p>Initialize shadcn in a React 19 and Tailwind CSS 4 app first. Installing any EVA component also installs this theme. It adds six Fontsource packages and updates global semantic colors, fonts, and radius tokens. Review the CLI diff when adding it to an existing design.</p>
      <CodeBlock label="Copy command" code="pnpm dlx shadcn@latest add bendsp/eva-cn/eva-theme" />
      <p>Light mode is the default. Add the dark class to your HTML element to use dark mode. Fonts are served by your app; no external font service is required.</p>
      <CodeBlock code={'<html lang="en" className="dark">\n  <body className="bg-background text-foreground">\n    {children}\n  </body>\n</html>'} />
    </section>
    <section className="integration-section">
      <h2>Font roles</h2>
      <div className="props-scroll"><table><thead><tr><th>Variant</th><th>English</th><th>Japanese</th></tr></thead><tbody>
        <tr><td>title</td><td>Besley 700</td><td>Noto Serif JP 900</td></tr>
        <tr><td>interface</td><td>Archivo 700</td><td>Noto Sans JP 700</td></tr>
        <tr><td>roman</td><td>Tinos 400</td><td>Noto Serif JP 400</td></tr>
        <tr><td>data</td><td>M PLUS 1 Code 500</td><td>M PLUS 1 Code 500</td></tr>
      </tbody></table></div>
      <p>Use bg-eva-black and text-eva-paper, text-eva-critical, text-eva-amber, text-eva-terminal, or text-eva-data for explicit signal colors. Use standard shadcn utilities such as bg-background and text-foreground for theme-aware content.</p>
    </section>
  </main>
}
