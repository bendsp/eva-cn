import { ComponentPage } from "@/components/component-page"
import { EvaSegmentDisplayLab } from "@/components/component-labs"

export const metadata = { title: "EvaSegmentDisplay" }

export default function Page() {
  return <ComponentPage
    name="EvaSegmentDisplay"
    item="eva-segment-display"
    description={"Seven-segment readouts for clocks, counters, and numeric values."}
    notes={"Pass a formatted string. Digits, colon, decimal point, and minus are visible; spaces and unsupported characters reserve blank positions. Timer and formatting logic belong in your app. Coupled geometry limits prevent intersecting segments. Copy JSX contains the applied geometry, which may be clamped from the controls."}
    props={[
  {
    "name": "value",
    "default": "required",
    "description": "String to display. aria-label defaults to the supplied value."
  },
  {
    "name": "size / digitSize",
    "default": "md / preset",
    "description": "sm, md, lg presets, or a CSS digit height override."
  },
  {
    "name": "tone",
    "default": "amber",
    "description": "inherit, paper, critical, amber, terminal, or data."
  },
  {
    "name": "digitWidth",
    "default": "60",
    "description": "Clamped to 32 to 100 geometry units."
  },
  {
    "name": "segmentThickness",
    "default": "10",
    "description": "Clamped to 3 to 20 units and at most 30% of digit width."
  },
  {
    "name": "segmentGap",
    "default": "1",
    "description": "Clamped to a non-intersecting gap up to 8 units."
  },
  {
    "name": "characterGap",
    "default": "8",
    "description": "Clamped to 0 to 40 units."
  },
  {
    "name": "ghostOpacity",
    "default": "0.08",
    "description": "Inactive segments; 0 hides them, 1 makes them fully opaque."
  },
  {
    "name": "aria-label / HTML attributes",
    "default": "value / \u2014",
    "description": "Override the spoken value, plus standard span attributes and styling."
  }
]}
  >
    <EvaSegmentDisplayLab />
  </ComponentPage>
}
