import { EvaBadge } from "@eva-cn/registry/eva-badge"
import { EvaText } from "@eva-cn/registry/eva-text"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import "dialkit/styles.css"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "EVA-CN",
    template: "%s / EVA-CN",
  },
  description: "Evangelion-inspired typography and interface primitives for shadcn.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <header className="site-header">
          <Link className="wordmark" href="/">
            <EvaText as="span" tracking="tight" variant="title">EVA-CN</EvaText>
          </Link>
          <nav aria-label="Primary navigation">
            <a className="site-header-github-link" href="https://github.com/bendsp/eva-cn">
              <EvaBadge
                align="center"
                borderWidth={3}
                cornerRadius={6}
                fontSize={24}
                gap={1}
                horizontalScale={0.86}
                paddingBlock={2}
                paddingInline={8}
                secondary="コードリポジトリ"
                secondaryFontSize={12}
                secondaryLang="ja"
                shape="rounded"
                tone="terminal"
                tracking="tight"
                uppercase
              >
                GITHUB
              </EvaBadge>
            </a>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <EvaText as="span" tracking="wide" variant="data">
            EVA-CN / UNOFFICIAL FAN PROJECT / BY{" "}
            <a className="site-footer-author" href="https://desprets.net">BEN DESPRETS</a>
          </EvaText>
          <EvaText as="span" tracking="wide" variant="data">REGISTRY STATUS 05/05</EvaText>
        </footer>
      </body>
    </html>
  )
}
