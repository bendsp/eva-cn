"use client"

import { useDialKitController, type DialConfig, type SelectConfig } from "dialkit"
import { EvaBadge, type EvaBadgeProps } from "@eva-cn/registry/eva-badge"
import { EvaText, type EvaTextProps } from "@eva-cn/registry/eva-text"
import { EvaSegmentDisplay, resolveEvaSegmentGeometry } from "@eva-cn/registry/eva-segment-display"
import { EvaStripe } from "@eva-cn/registry/eva-stripe"
import { LabShell, componentCode } from "./lab-shell"

const tones = ["amber", "critical", "terminal", "paper", "data"] as const
const variants = ["interface", "title", "roman", "data"] as const
const languages = ["en", "ja"] as const
const tracking = ["tight", "normal", "wide"] as const
function selection<T extends string>(value: string, options: readonly T[]): T {
  const selected = options.find(option => option === value)
  if (selected === undefined) throw new Error(`Unknown control value: ${value}`)
  return selected
}
const tone = { type: "select", options: [...tones], default: "amber" } satisfies SelectConfig
const language = { type: "select", options: [...languages], default: "en" } satisfies SelectConfig

const textConfig = {
  text: "NEON GENESIS EVANGELION",
  variant: { type: "select", options: [...variants], default: "title" },
  language,
  fontSize: [80, 16, 160, 1],
  horizontalScale: [0.72, 0.4, 1.4, 0.01],
  fit: true,
  typography: {
    _collapsed: true,
    tracking: { type: "select", options: [...tracking], default: "tight" },
    uppercase: true,
  },
} satisfies DialConfig

export function TypographyLab() {
  const dial = useDialKitController("Typography", textConfig)
  const p = dial.values
  const props = {
    as: "div", variant: selection(p.variant, variants), lang: selection(p.language, languages),
    horizontalScale: p.horizontalScale, fit: p.fit,
    tracking: selection(p.typography.tracking, tracking), uppercase: p.typography.uppercase,
    style: { fontSize: p.fontSize },
  } satisfies Omit<EvaTextProps, "children">
  return <LabShell code={componentCode("EvaText", "eva-text", props, p.text)} onReset={dial.resetValues}>
    <EvaText {...props}>{p.text}</EvaText>
  </LabShell>
}

const badgeConfig = {
  text: "WARNING",
  secondary: "CONTAMINATION DETECTED",
  twoLines: false,
  tone,
  fontSize: [40, 12, 96, 1],
  horizontalScale: [0.86, 0.4, 1.4, 0.01],
  typography: {
    _collapsed: true, language,
    secondaryLanguage: language,
    secondaryFontSize: [16, 10, 64, 1],
    align: { type: "select", options: ["start", "center", "end"], default: "center" },
    tracking: { type: "select", options: [...tracking], default: "tight" },
    uppercase: true,
  },
  frame: {
    _collapsed: true,
    shape: { type: "select", options: ["rounded", "square"], default: "rounded" },
    paddingInline: [12, 0, 40, 1], paddingBlock: [5, 0, 24, 1],
    borderWidth: [3, 0, 10, 1], cornerRadius: [8, 0, 24, 1],
    gap: [3, 0, 20, 1], separator: false, separatorThickness: [2, 0, 8, 1],
  },
} satisfies DialConfig

export function EvaBadgeLab() {
  const dial = useDialKitController("Badge", badgeConfig)
  const p = dial.values
  const props = {
    tone: selection(p.tone, tones), fontSize: p.fontSize, horizontalScale: p.horizontalScale,
    secondary: p.twoLines ? p.secondary : undefined,
    lang: selection(p.typography.language, languages),
    secondaryLang: selection(p.typography.secondaryLanguage, languages),
    secondaryFontSize: p.typography.secondaryFontSize,
    align: selection(p.typography.align, ["start", "center", "end"] as const),
    tracking: selection(p.typography.tracking, tracking), uppercase: p.typography.uppercase,
    shape: selection(p.frame.shape, ["rounded", "square"] as const),
    paddingInline: p.frame.paddingInline, paddingBlock: p.frame.paddingBlock,
    borderWidth: p.frame.borderWidth, cornerRadius: p.frame.cornerRadius,
    gap: p.frame.gap, separator: p.frame.separator, separatorThickness: p.frame.separatorThickness,
  } satisfies Omit<EvaBadgeProps, "children">
  return <LabShell code={componentCode("EvaBadge", "eva-badge", props, p.text)} onReset={dial.resetValues}>
    <EvaBadge {...props}>{p.text}</EvaBadge>
  </LabShell>
}

const segmentConfig = {
  value: "09:13.27", tone,
  digitSize: [126, 24, 200, 1], ghostOpacity: [0.1, 0, 1, 0.01],
  geometry: {
    _collapsed: true,
    digitWidth: [55, 32, 100, 1], segmentThickness: [10.2, 3, 20, 0.1],
    segmentGap: [2.8, 0, 8, 0.1], characterGap: [6, 0, 40, 1],
  },
} satisfies DialConfig

export function EvaSegmentDisplayLab() {
  const dial = useDialKitController("Segment display", segmentConfig)
  const p = dial.values
  const geometry = resolveEvaSegmentGeometry(p.geometry)
  const props = {
    value: p.value, tone: selection(p.tone, tones), digitSize: p.digitSize,
    ghostOpacity: p.ghostOpacity, digitWidth: geometry.digitWidth,
    segmentThickness: geometry.segmentThickness, segmentGap: geometry.segmentGap,
    characterGap: geometry.characterGap,
  }
  return <LabShell code={componentCode("EvaSegmentDisplay", "eva-segment-display", props)} onReset={dial.resetValues}>
    <EvaSegmentDisplay {...props} />
  </LabShell>
}

const stripeConfig = {
  tone, angle: [-45, -90, 90, 1], band: [24, 1, 100, 1], gap: [16, 0, 100, 1],
  orientation: { type: "select", options: ["horizontal", "vertical"], default: "horizontal" },
  motion: {
    _collapsed: true, enabled: false,
    direction: { type: "select", options: ["forward", "reverse"], default: "forward" },
    durationMs: [1200, 100, 6000, 100],
  },
} satisfies DialConfig

export function EvaStripeLab() {
  const dial = useDialKitController("Stripe", stripeConfig)
  const p = dial.values
  const props = {
    tone: selection(p.tone, tones), angle: p.angle, band: p.band, gap: p.gap,
    orientation: selection(p.orientation, ["horizontal", "vertical"] as const),
    motion: p.motion.enabled ? {
      kind: "scroll" as const, direction: selection(p.motion.direction, ["forward", "reverse"] as const),
      durationMs: p.motion.durationMs,
    } : { kind: "none" as const },
  }
  const dimensions = props.orientation === "horizontal" ? { width: "100%", height: 80 } : { width: 80, height: 240 }
  const code = componentCode("EvaStripe", "eva-stripe", props)
  const usage = code.replace("\n\n<EvaStripe", `\n\n<div style={${JSON.stringify(dimensions)}}>\n<EvaStripe`) + "\n</div>"
  return <LabShell code={usage} onReset={dial.resetValues}>
    <div style={dimensions}><EvaStripe {...props} /></div>
  </LabShell>
}
