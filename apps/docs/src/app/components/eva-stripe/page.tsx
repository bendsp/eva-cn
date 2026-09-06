import { ComponentPage } from "@/components/component-page"
import { EvaStripeLab } from "@/components/component-labs"

export const metadata = { title: "EvaStripe" }

export default function Page() {
  return <ComponentPage
    name="EvaStripe"
    item="eva-stripe"
    description={"Signal bands for frame edges, warning fields, and status regions."}
    notes={"Give the parent an explicit width and height. The stripe fills that space and is decorative, with no pointer input or screen-reader announcement. Scrolling respects reduced-motion preferences. resolveEvaStripeGeometry returns normalized angle, band, gap, and period values."}
    props={[
  {
    "name": "angle",
    "default": "-45",
    "description": "Visible band angle in degrees; normalized into the supported range."
  },
  {
    "name": "band / gap",
    "default": "12 / 8 px",
    "description": "Band width is clamped to 0.5 to 256 px; gap to 0 to 256 px."
  },
  {
    "name": "tone",
    "default": "amber",
    "description": "inherit, paper, critical, amber, terminal, or data."
  },
  {
    "name": "orientation",
    "default": "horizontal",
    "description": "horizontal or vertical selects the seamless scroll axis."
  },
  {
    "name": "motion",
    "default": "{ kind: \"none\" }",
    "description": "Use kind=scroll with optional direction=forward/reverse and durationMs."
  },
  {
    "name": "motion.durationMs",
    "default": "1200",
    "description": "Clamped to 100 to 60000 milliseconds."
  },
  {
    "name": "className / style",
    "default": "\u2014",
    "description": "Style the stripe; placement and dimensions belong to its parent."
  }
]}
  >
    <EvaStripeLab />
  </ComponentPage>
}
