"use client"

import * as React from "react"

export type EvaTextElement = "span" | "p" | "div" | "h1" | "h2" | "h3"
export type EvaTextVariant = "title" | "interface" | "roman" | "data"
export type EvaTextLanguage = "en" | "ja"
export type EvaTextTracking = "tight" | "normal" | "wide"

export interface EvaTextProps extends Omit<React.HTMLAttributes<HTMLElement>, "children" | "lang"> {
  ref?: React.Ref<HTMLElement>
  as?: EvaTextElement
  variant?: EvaTextVariant
  lang?: EvaTextLanguage
  fit?: boolean
  horizontalScale?: number
  tracking?: EvaTextTracking
  uppercase?: boolean
  className?: string
  children: React.ReactNode
}

type FitBox = {
  height: number
  scale: number
  width: number
}

const fontFamilies = {
  title: {
    en: "var(--font-eva-title-en, 'Besley', 'Century Schoolbook', serif)",
    ja: "var(--font-eva-title-ja, 'Noto Serif JP', serif)",
  },
  interface: {
    en: "var(--font-eva-interface-en, 'Archivo', 'Helvetica Neue', Arial, sans-serif)",
    ja: "var(--font-eva-interface-ja, 'Noto Sans JP', sans-serif)",
  },
  roman: {
    en: "var(--font-eva-roman-en, 'Tinos', 'Times New Roman', serif)",
    ja: "var(--font-eva-roman-ja, 'Noto Serif JP', serif)",
  },
  data: {
    en: "var(--font-eva-data, 'M PLUS 1 Code', ui-monospace, monospace)",
    ja: "var(--font-eva-data, 'M PLUS 1 Code', ui-monospace, monospace)",
  },
} satisfies Record<EvaTextVariant, Record<EvaTextLanguage, string>>

const fontWeights = {
  title: { en: 700, ja: 900 },
  interface: { en: 700, ja: 700 },
  roman: { en: 400, ja: 400 },
  data: { en: 500, ja: 500 },
} satisfies Record<EvaTextVariant, Record<EvaTextLanguage, number>>

const letterSpacing = {
  tight: "-0.045em",
  normal: "0em",
  wide: "0.12em",
} satisfies Record<EvaTextTracking, string>

const lineHeights = {
  title: 0.9,
  interface: 0.95,
  roman: 1.2,
  data: 1.1,
} satisfies Record<EvaTextVariant, number>

function normalizeScale(horizontalScale: number) {
  if (!Number.isFinite(horizontalScale) || horizontalScale <= 0) {
    return 1
  }

  return horizontalScale
}

export function EvaText({
  as: Component = "span",
  variant = "interface",
  lang = "en",
  fit = false,
  horizontalScale = 1,
  tracking = "normal",
  uppercase,
  className,
  children,
  style,
  ref: forwardedRef,
  ...props
}: EvaTextProps) {
  const Root = Component
  const scale = normalizeScale(horizontalScale)
  const shouldUppercase = uppercase ?? variant === "title"
  const rootRef = React.useRef<HTMLElement>(null)
  const contentRef = React.useRef<HTMLSpanElement>(null)
  const [fitBox, setFitBox] = React.useState<FitBox | null>(null)

  const setRootRef = React.useCallback((node: HTMLElement | null) => {
    rootRef.current = node
    if (typeof forwardedRef === "function") {
      const cleanup = forwardedRef(node)
      return () => {
        rootRef.current = null
        if (typeof cleanup === "function") cleanup()
        else forwardedRef(null)
      }
    }
    if (forwardedRef) forwardedRef.current = node
    return () => {
      rootRef.current = null
      if (forwardedRef) forwardedRef.current = null
    }
  }, [forwardedRef])

  React.useLayoutEffect(() => {
    if (!fit) return

    const root = rootRef.current
    const content = contentRef.current
    const parent = root?.parentElement
    if (!root || !content || !parent) return

    let active = true
    let animationFrame = 0

    const measure = () => {
      cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(() => {
        if (!active) return

        const parentStyle = getComputedStyle(parent)
        const availableWidth =
          parent.clientWidth -
          Number.parseFloat(parentStyle.paddingLeft) -
          Number.parseFloat(parentStyle.paddingRight)
        const naturalHeight = content.scrollHeight
        const naturalWidth = content.scrollWidth

        if (availableWidth <= 0) return

        const nextScale = naturalWidth > 0
          ? Math.min(1, availableWidth / (naturalWidth * scale))
          : 1
        const nextBox = {
          height: naturalHeight * nextScale,
          scale: nextScale,
          width: naturalWidth * scale * nextScale,
        }

        setFitBox((current) =>
          current &&
          Math.abs(current.height - nextBox.height) < 0.5 &&
          Math.abs(current.scale - nextBox.scale) < 0.001 &&
          Math.abs(current.width - nextBox.width) < 0.5
            ? current
            : nextBox
        )
      })
    }

    const observer = new ResizeObserver(measure)
    observer.observe(parent)
    observer.observe(content)
    void document.fonts?.ready.then(() => {
      if (active) measure()
    })
    measure()

    return () => {
      active = false
      cancelAnimationFrame(animationFrame)
      observer.disconnect()
    }
  }, [children, Component, fit, lang, scale, tracking, uppercase, variant])

  const scaledStyle: React.CSSProperties =
    scale === 1 && !fit
      ? {}
      : {
          display: "inline-block",
          ...(!fit
            ? { transform: `scaleX(${scale})`, transformOrigin: "left center" }
            : {}),
          ...(fit && fitBox
            ? {
                height: fitBox.height,
                position: "relative",
                verticalAlign: "top",
                width: fitBox.width,
              }
            : {}),
        }

  return (
    <Root
      {...props}
      className={className}
      data-eva-text=""
      data-fit={fit ? "shrink" : undefined}
      data-language={lang}
      data-tracking={tracking}
      data-variant={variant}
      lang={lang}
      ref={setRootRef}
      style={{
        fontFamily: fontFamilies[variant][lang],
        fontWeight: fontWeights[variant][lang],
        letterSpacing: letterSpacing[tracking],
        lineHeight: lineHeights[variant],
        textTransform: shouldUppercase ? "uppercase" : undefined,
        ...style,
        ...scaledStyle,
      }}
    >
      {fit ? (
        <span
          data-eva-text-content=""
          ref={contentRef}
          style={{
            display: "inline-block",
            left: fitBox ? 0 : undefined,
            position: fitBox ? "absolute" : undefined,
            top: fitBox ? 0 : undefined,
            transform: `scale(${fitBox?.scale ?? 1}) scaleX(${scale})`,
            transformOrigin: "left top",
            whiteSpace: "nowrap",
            width: "max-content",
          }}
        >
          {children}
        </span>
      ) : (
        children
      )}
    </Root>
  )
}
