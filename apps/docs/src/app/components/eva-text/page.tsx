import { ComponentPage } from "@/components/component-page"
import { TypographyLab } from "@/components/component-labs"

export const metadata = { title: "EvaText" }

export default function Page() {
  return <ComponentPage
    name="EvaText"
    item="eva-text"
    description={"Display typography for headings, labels, and data in English and Japanese."}
    notes={"Without fit, horizontalScale changes the visible shape and preserves the natural layout width. With fit, a single line shrinks to its parent and reserves its scaled size. Use normal, unscaled text for wrapping body copy. Standard HTML attributes, style, event handlers, and a ref are supported."}
    props={[
  {
    "name": "as",
    "default": "span",
    "description": "span, p, div, h1, h2, or h3. Choose the semantic element your content needs."
  },
  {
    "name": "variant",
    "default": "interface",
    "description": "title, interface, roman, or data."
  },
  {
    "name": "lang",
    "default": "en",
    "description": "en or ja; selects the font family and language attribute."
  },
  {
    "name": "horizontalScale",
    "default": "1",
    "description": "Positive horizontal scale. Invalid values fall back to 1."
  },
  {
    "name": "fit",
    "default": "false",
    "description": "Shrink one line to the parent content width; never enlarge it."
  },
  {
    "name": "tracking",
    "default": "normal",
    "description": "tight, normal, or wide."
  },
  {
    "name": "uppercase",
    "default": "title only",
    "description": "Overrides the uppercase default for title typography."
  },
  {
    "name": "style / className",
    "default": "\u2014",
    "description": "Set size and appearance. Internal fitting styles take precedence."
  },
  {
    "name": "ref / HTML attributes",
    "default": "\u2014",
    "description": "Heading anchors, ARIA labels, event handlers, and element access."
  }
]}
  >
    <TypographyLab />
  </ComponentPage>
}
