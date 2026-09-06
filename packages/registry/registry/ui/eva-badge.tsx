"use client"

import * as React from "react"
import { cva, cx, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"

import {
  EvaText,
  type EvaTextLanguage,
  type EvaTextTracking,
} from "./eva-text"

const evaBadgeVariants = cva(
  "inline-grid w-max max-w-none shrink-0 overflow-hidden border-[length:var(--eva-badge-border)] border-current bg-eva-black px-[var(--eva-badge-padding-inline)] py-[var(--eva-badge-padding-block)] leading-none",
  {
    variants: {
      shape: {
        rounded: "rounded-[var(--eva-badge-radius)]",
        square: "rounded-none",
      },
      tone: {
        paper: "text-eva-paper",
        critical: "text-eva-critical",
        amber: "text-eva-amber",
        terminal: "text-eva-terminal",
        data: "text-eva-data",
      },
      size: {
        sm: "[--eva-badge-border:2px] [--eva-badge-gap:2px] [--eva-badge-padding-block:4px] [--eva-badge-padding-inline:8px] [--eva-badge-primary-size:24px] [--eva-badge-radius:6px] [--eva-badge-secondary-size:12px] [--eva-badge-separator:2px]",
        md: "[--eva-badge-border:3px] [--eva-badge-gap:3px] [--eva-badge-padding-block:5px] [--eva-badge-padding-inline:12px] [--eva-badge-primary-size:40px] [--eva-badge-radius:8px] [--eva-badge-secondary-size:16px] [--eva-badge-separator:2px]",
        lg: "[--eva-badge-border:5px] [--eva-badge-gap:4px] [--eva-badge-padding-block:8px] [--eva-badge-padding-inline:18px] [--eva-badge-primary-size:64px] [--eva-badge-radius:12px] [--eva-badge-secondary-size:24px] [--eva-badge-separator:4px]",
      },
    },
    defaultVariants: {
      shape: "rounded",
      tone: "amber",
      size: "md",
    },
  }
)

const contentTextVariants = cva(
  "relative block whitespace-nowrap",
  {
    variants: {
      align: {
        center: "justify-self-center",
        end: "justify-self-end",
        start: "justify-self-start",
      },
    },
    defaultVariants: {
      align: "center",
    },
  }
)

const contentTextInnerVariants = cva(
  "absolute top-0 block w-max whitespace-nowrap",
  {
    variants: {
      align: {
        center: "left-1/2 [transform-origin:center_center]",
        end: "right-0 [transform-origin:right_center]",
        start: "left-0 [transform-origin:left_center]",
      },
    },
    defaultVariants: {
      align: "center",
    },
  }
)

const separatorVariants = cva("w-full bg-current", {
  variants: {
    shape: {
      rounded: "rounded-full",
      square: "rounded-none",
    },
  },
  defaultVariants: {
    shape: "rounded",
  },
})

export type EvaBadgeTone = NonNullable<VariantProps<typeof evaBadgeVariants>["tone"]>
export type EvaBadgeSize = NonNullable<VariantProps<typeof evaBadgeVariants>["size"]>
export type EvaBadgeShape = NonNullable<VariantProps<typeof evaBadgeVariants>["shape"]>
export type EvaBadgeAlignment = "start" | "center" | "end"

export interface EvaBadgeProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children" | "lang">,
    Omit<VariantProps<typeof evaBadgeVariants>, "shape" | "size" | "tone"> {
  align?: EvaBadgeAlignment
  borderWidth?: React.CSSProperties["borderWidth"]
  children: React.ReactNode
  cornerRadius?: React.CSSProperties["borderRadius"]
  emphasis?: "primary" | "secondary"
  frameClassName?: string
  frameStyle?: React.CSSProperties
  fontSize?: React.CSSProperties["fontSize"]
  gap?: React.CSSProperties["gap"]
  horizontalScale?: number
  lang?: EvaTextLanguage
  paddingBlock?: React.CSSProperties["paddingBlock"]
  paddingInline?: React.CSSProperties["paddingInline"]
  secondary?: React.ReactNode
  secondaryFontSize?: React.CSSProperties["fontSize"]
  secondaryLang?: EvaTextLanguage
  separator?: boolean
  separatorThickness?: React.CSSProperties["height"]
  shape?: EvaBadgeShape
  size?: EvaBadgeSize
  tone?: EvaBadgeTone
  tracking?: EvaTextTracking
  uppercase?: boolean
}

interface ContentTextProps {
  align: EvaBadgeAlignment
  children: React.ReactNode
  fontSize: React.CSSProperties["fontSize"]
  horizontalScale: number
  lang: EvaTextLanguage
  tracking: EvaTextTracking
  uppercase: boolean
}

type EvaBadgeShellStyle = React.CSSProperties & {
  "--eva-badge-fitted-height"?: string
  "--eva-badge-natural-width"?: string
}

interface EvaBadgeShellBox {
  blockInset: number
  borderBox: boolean
  inlineInset: number
}

function ContentText({
  align,
  children,
  fontSize,
  horizontalScale,
  lang,
  tracking,
  uppercase,
}: ContentTextProps) {
  const textRef = React.useRef<HTMLDivElement>(null)
  const [naturalSize, setNaturalSize] = React.useState<{ height: number; width: number } | null>(null)

  React.useLayoutEffect(() => {
    const text = textRef.current
    if (!text) return

    let active = true
    let animationFrame = 0

    const measure = () => {
      if (!active) return

      cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(() => {
        const height = text.scrollHeight
        const width = text.scrollWidth
        if (!active || text.getClientRects().length === 0) return

        setNaturalSize((current) =>
          current?.height === height && current.width === width
            ? current
            : { height, width }
        )
      })
    }

    const observer = new ResizeObserver(measure)
    observer.observe(text)
    void document.fonts?.ready.then(() => {
      if (active) measure()
    })
    measure()

    return () => {
      active = false
      cancelAnimationFrame(animationFrame)
      observer.disconnect()
    }
  }, [children, fontSize, lang, tracking, uppercase])

  const translate = align === "center" ? "translateX(-50%) " : ""
  const measured = naturalSize !== null

  return (
    <div
      className={contentTextVariants({ align })}
      data-slot="eva-badge-text"
      style={{
        height: naturalSize?.height,
        width: naturalSize ? naturalSize.width * horizontalScale : undefined,
      }}
    >
      <div
        className={contentTextInnerVariants({ align })}
        ref={textRef}
        style={{
          fontSize,
          // Keep server-rendered labels in normal flow until measurement.
          position: measured ? "absolute" : "relative",
          left: !measured ? "auto" : undefined,
          right: !measured ? "auto" : undefined,
          transform: `${measured ? translate : ""}scaleX(${horizontalScale})`,
        }}
      >
        <EvaText
          as="span"
          className="block"
          lang={lang}
          tracking={tracking}
          uppercase={uppercase}
          variant="interface"
        >
          {children}
        </EvaText>
      </div>
    </div>
  )
}

export function EvaBadge({
  align = "center",
  borderWidth,
  children,
  cornerRadius,
  emphasis = "primary",
  frameClassName,
  frameStyle,
  fontSize,
  gap,
  horizontalScale = 0.86,
  lang = "en",
  paddingBlock,
  paddingInline,
  secondary,
  secondaryFontSize,
  secondaryLang = lang,
  separator = false,
  separatorThickness,
  shape,
  size,
  tone,
  tracking = "tight",
  uppercase = true,
  className,
  style,
  ...props
}: EvaBadgeProps) {
  const badgeRef = React.useRef<HTMLDivElement>(null)
  const shellRef = React.useRef<HTMLDivElement>(null)
  const [naturalSize, setNaturalSize] = React.useState({ height: 0, width: 0 })
  const [shellBox, setShellBox] = React.useState<EvaBadgeShellBox>({
    blockInset: 0,
    borderBox: true,
    inlineInset: 0,
  })
  const [fitScale, setFitScale] = React.useState(1)
  const hasSecondary = secondary !== undefined && secondary !== null
  const safeHorizontalScale = Number.isFinite(horizontalScale) && horizontalScale > 0
    ? horizontalScale
    : 1
  const primaryFontSize = fontSize
    ?? (hasSecondary && emphasis === "secondary"
      ? "var(--eva-badge-secondary-size)"
      : "var(--eva-badge-primary-size)")
  const resolvedSecondaryFontSize = secondaryFontSize
    ?? (emphasis === "secondary"
      ? "var(--eva-badge-primary-size)"
      : "var(--eva-badge-secondary-size)")

  React.useLayoutEffect(() => {
    const badge = badgeRef.current
    const shell = shellRef.current
    if (!badge || !shell) return

    let active = true
    let animationFrame = 0

    const measure = () => {
      if (!active) return

      cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(() => {
        const height = badge.offsetHeight
        const width = badge.offsetWidth
        if (!active || badge.getClientRects().length === 0) return

        const computedShellStyle = getComputedStyle(shell)
        const paddingBlock = Number.parseFloat(computedShellStyle.paddingTop)
          + Number.parseFloat(computedShellStyle.paddingBottom)
        const paddingInline = Number.parseFloat(computedShellStyle.paddingLeft)
          + Number.parseFloat(computedShellStyle.paddingRight)
        const blockInset = paddingBlock
          + Number.parseFloat(computedShellStyle.borderTopWidth)
          + Number.parseFloat(computedShellStyle.borderBottomWidth)
        const inlineInset = paddingInline
          + Number.parseFloat(computedShellStyle.borderLeftWidth)
          + Number.parseFloat(computedShellStyle.borderRightWidth)
        const borderBox = computedShellStyle.boxSizing === "border-box"
        const availableWidth = Math.max(0, shell.clientWidth - paddingInline)

        const rawScale = width === 0 ? 1 : availableWidth === 0
          ? 0
          : Math.min(1, availableWidth / width)
        const nextScale = rawScale > 0.999 ? 1 : rawScale

        setNaturalSize((current) =>
          current.height === height && current.width === width
            ? current
            : { height, width }
        )
        setShellBox((current) =>
          current.blockInset === blockInset
            && current.borderBox === borderBox
            && current.inlineInset === inlineInset
            ? current
            : { blockInset, borderBox, inlineInset }
        )
        setFitScale((current) =>
          Math.abs(current - nextScale) < 0.001 ? current : nextScale
        )
      })
    }

    const observer = new ResizeObserver(measure)
    observer.observe(badge)
    observer.observe(shell)
    void document.fonts?.ready.then(() => {
      if (active) measure()
    })
    measure()

    return () => {
      active = false
      cancelAnimationFrame(animationFrame)
      observer.disconnect()
    }
  }, [])

  const measured = naturalSize.height > 0 && naturalSize.width > 0
  const fittedHeight = naturalSize.height * fitScale
    + (shellBox.borderBox ? shellBox.blockInset : 0)
  const naturalWidth = naturalSize.width
    + (shellBox.borderBox ? shellBox.inlineInset : 0)
  const shellStyle: EvaBadgeShellStyle = {
    "--eva-badge-fitted-height": measured
      ? `${fittedHeight}px`
      : undefined,
    "--eva-badge-natural-width": measured
      ? `${naturalWidth}px`
      : undefined,
    ...style,
  }

  return (
    <div
      className={twMerge(
        cx(
          "relative box-border inline-block h-[var(--eva-badge-fitted-height)] w-[var(--eva-badge-natural-width)] max-w-full min-w-0 shrink align-middle leading-none",
          className
        )
      )}
      data-slot="eva-badge"
      lang={lang}
      ref={shellRef}
      style={shellStyle}
      {...props}
    >
      <div
        data-slot="eva-badge-scaler"
        style={{
          transform: `scale(${fitScale})`,
          transformOrigin: "left top",
          width: "max-content",
        }}
      >
        <div
          className={twMerge(
            evaBadgeVariants({ shape, size, tone }),
            frameClassName
          )}
          data-shape={shape ?? "rounded"}
          data-size={size ?? "md"}
          data-slot="eva-badge-frame"
          ref={badgeRef}
          style={{
            borderColor: "currentColor",
            ...frameStyle,
            contain: "none",
            containerType: "normal",
            ...(paddingInline !== undefined ? { paddingInline } : {}),
            ...(paddingBlock !== undefined ? { paddingBlock } : {}),
            ...(borderWidth !== undefined ? { borderWidth } : {}),
            ...(shape === "square"
              ? { borderRadius: 0 }
              : cornerRadius !== undefined
                ? { borderRadius: cornerRadius }
                : {}),
          }}
        >
          <div
            className="inline-grid w-max max-w-none items-center gap-[var(--eva-badge-gap)]"
            data-slot="eva-badge-content"
            style={gap !== undefined ? { gap } : undefined}
          >
            <ContentText
              align={align}
              fontSize={primaryFontSize}
              horizontalScale={safeHorizontalScale}
              lang={lang}
              tracking={tracking}
              uppercase={uppercase}
            >
              {children}
            </ContentText>
            {hasSecondary ? (
              <>
                {separator ? (
                  <span
                    aria-hidden="true"
                    className={separatorVariants({ shape })}
                    data-slot="eva-badge-separator"
                    style={{
                      height: separatorThickness
                        ?? "var(--eva-badge-separator)",
                    }}
                  />
                ) : null}
                <ContentText
                  align={align}
                  fontSize={resolvedSecondaryFontSize}
                  horizontalScale={safeHorizontalScale}
                  lang={secondaryLang}
                  tracking={tracking}
                  uppercase={uppercase}
                >
                  {secondary}
                </ContentText>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export { evaBadgeVariants }
