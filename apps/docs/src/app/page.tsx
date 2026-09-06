import { EvaBadge } from "@eva-cn/registry/eva-badge"
import { EvaStripe } from "@eva-cn/registry/eva-stripe"
import { EvaText } from "@eva-cn/registry/eva-text"
import Link from "next/link"

const itemBadgeProps = {
  align: "center",
  borderWidth: 3,
  cornerRadius: 4,
  fontSize: 32,
  horizontalScale: 0.86,
  paddingBlock: 1,
  paddingInline: 6,
  shape: "rounded",
  tone: "amber",
  tracking: "tight",
  uppercase: true,
} as const

const heroStripeProps = {
  angle: -45,
  band: 32,
  gap: 16,
  motion: {
    direction: "forward",
    durationMs: 1200,
    kind: "scroll",
  },
  orientation: "horizontal",
  tone: "amber",
} as const

const bottomHeroStripeProps = {
  ...heroStripeProps,
  angle: 45,
  motion: {
    ...heroStripeProps.motion,
    direction: "reverse",
  },
} as const

export default function Home() {
  return (
    <main className="home-page-shell">
      <div className="home-page-content">
        <EvaText as="p" className="eyebrow" tracking="wide" variant="data">
          EVA-CN / SHADCN REGISTRY / INITIAL RELEASE
        </EvaText>
      </div>
      <div className="home-hero-stripe">
        <EvaStripe {...heroStripeProps} />
      </div>
      <div className="home-page-content home-hero-heading">
        <EvaText as="h1" className="doc-heading" tracking="normal" variant="interface" uppercase>
          UI STRAIGHT FROM <span className="home-hero-lockup">NERV HQ</span>
        </EvaText>
      </div>
      <div className="home-hero-stripe">
        <EvaStripe {...bottomHeroStripeProps} />
      </div>

      <div className="home-page-content">
        <div className="registry-grid">
          <Link className="registry-link" href="/components/eva-theme">
            <EvaBadge className="registry-link-badge" {...itemBadgeProps}>
              ITEM-01
            </EvaBadge>
            <EvaText as="h2" horizontalScale={0.8} tracking="tight" variant="interface" uppercase>
              THEME
            </EvaText>
            <EvaText as="p" variant="roman">
              Color, typography, radius, and semantic tokens. Install this first or let Eva Text pull it in.
            </EvaText>
            <EvaText as="span" className="registry-link-arrow" tracking="wide" variant="data">OPEN ITEM →</EvaText>
          </Link>
          <Link className="registry-link" href="/components/eva-text">
            <EvaBadge className="registry-link-badge" {...itemBadgeProps}>
              ITEM-02
            </EvaBadge>
            <EvaText as="h2" horizontalScale={0.8} tracking="tight" variant="interface" uppercase>
              TEXT
            </EvaText>
            <EvaText as="p" variant="roman">
              English and Japanese type roles with explicit tracking and horizontal display scaling.
            </EvaText>
            <EvaText as="span" className="registry-link-arrow" tracking="wide" variant="data">OPEN LAB →</EvaText>
          </Link>
          <Link className="registry-link" href="/components/eva-badge">
            <EvaBadge className="registry-link-badge" {...itemBadgeProps}>
              ITEM-03
            </EvaBadge>
            <EvaText as="h2" horizontalScale={0.8} tracking="tight" variant="interface" uppercase>
              BADGE
            </EvaText>
            <EvaText as="p" variant="roman">
              Content-sized labels whose frame grows with the widest text level and the chosen spacing.
            </EvaText>
            <EvaText as="span" className="registry-link-arrow" tracking="wide" variant="data">OPEN LAB →</EvaText>
          </Link>
          <Link className="registry-link" href="/components/eva-segment-display">
            <EvaBadge className="registry-link-badge" {...itemBadgeProps}>
              ITEM-04
            </EvaBadge>
            <EvaText as="h2" horizontalScale={0.8} tracking="tight" variant="interface" uppercase>
              SEGMENT DISPLAY
            </EvaText>
            <EvaText as="p" variant="roman">
              Configurable seven-segment glyphs for numeric values, clocks, limits, and readouts.
            </EvaText>
            <EvaText as="span" className="registry-link-arrow" tracking="wide" variant="data">OPEN LAB →</EvaText>
          </Link>
          <Link className="registry-link" href="/components/eva-stripe">
            <EvaBadge className="registry-link-badge" {...itemBadgeProps}>
              ITEM-05
            </EvaBadge>
            <EvaText as="h2" horizontalScale={0.8} tracking="tight" variant="interface" uppercase>
              STRIPE
            </EvaText>
            <EvaText as="p" variant="roman">
              Repeating signal bands with controlled angle, band width, gap, tone, and motion.
            </EvaText>
            <EvaText as="span" className="registry-link-arrow" tracking="wide" variant="data">OPEN LAB →</EvaText>
          </Link>
        </div>
      </div>
    </main>
  )
}
