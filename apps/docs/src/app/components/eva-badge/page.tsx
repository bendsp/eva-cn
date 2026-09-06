import { ComponentPage } from "@/components/component-page"
import { EvaBadgeLab } from "@/components/component-labs"

export const metadata = { title: "EvaBadge" }

export default function Page() {
  return <ComponentPage
    name="EvaBadge"
    item="eva-badge"
    description={"A label whose frame follows its content and shrinks as one complete unit."}
    notes={"The widest text level sets the width. A shorter second line adds height; a longer one also adds width. className and style affect the outer layout shell; frameClassName and frameStyle affect the visible frame. Labels remain visible before JavaScript loads, then refine their sizing after fonts and layout are measured."}
    props={[
  {
    "name": "children / secondary",
    "default": "required / absent",
    "description": "Primary and optional secondary content. An empty string creates an empty second level; omit it to remove that level."
  },
  {
    "name": "size",
    "default": "md",
    "description": "sm, md, or lg set coordinated typography and frame defaults."
  },
  {
    "name": "tone",
    "default": "amber",
    "description": "paper, critical, amber, terminal, or data."
  },
  {
    "name": "shape / cornerRadius",
    "default": "rounded / preset",
    "description": "Use square for sharp corners, or override the rounded radius."
  },
  {
    "name": "fontSize / secondaryFontSize",
    "default": "40 / 16 px at md",
    "description": "Override either text level. CSS font sizes are accepted."
  },
  {
    "name": "horizontalScale",
    "default": "0.86",
    "description": "Changes both letter shape and measured width."
  },
  {
    "name": "lang / secondaryLang",
    "default": "en / lang",
    "description": "en or ja for each text level."
  },
  {
    "name": "align / tracking",
    "default": "center / tight",
    "description": "start, center, end alignment; tight, normal, wide tracking."
  },
  {
    "name": "uppercase / emphasis",
    "default": "true / primary",
    "description": "emphasis=secondary swaps default font sizes."
  },
  {
    "name": "paddingInline / paddingBlock",
    "default": "12 / 5 px at md",
    "description": "Inner horizontal and vertical padding."
  },
  {
    "name": "borderWidth / gap",
    "default": "3 / 3 px at md",
    "description": "Frame thickness and space between levels."
  },
  {
    "name": "separator / separatorThickness",
    "default": "false / 2 px at md",
    "description": "An optional divider between levels."
  },
  {
    "name": "className / style",
    "default": "\u2014",
    "description": "Outer shell layout and spacing. Frame overrides use frameClassName / frameStyle."
  },
  {
    "name": "HTML attributes",
    "default": "\u2014",
    "description": "Standard div attributes and event handlers."
  }
]}
  >
    <EvaBadgeLab />
  </ComponentPage>
}
