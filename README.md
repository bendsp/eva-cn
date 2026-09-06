# EVA-CN

Evangelion-inspired React components, distributed as a shadcn registry. Four components and a shared theme: typography, content-sized badges, seven-segment displays, and signal stripes.

## Install

The first release targets React 19, Tailwind CSS 4, TypeScript, and an initialized shadcn app. Next.js App Router is verified by the consumer test. Other React frameworks are not yet in the support matrix. There is no npm package to publish: shadcn copies the source into your app.

```sh
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add bendsp/eva-cn/eva-badge
```

```tsx
import { EvaBadge } from "@/components/ui/eva-badge"

<EvaBadge tone="critical" secondary="CONTAMINATION DETECTED" separator>
  WARNING
</EvaBadge>
```

The default shadcn alias is shown above. The CLI respects the aliases in your `components.json`.

Available items:

| Item | Use |
| --- | --- |
| `eva-theme` | Light/dark colors, semantic tokens, and English/Japanese font roles |
| `eva-text` | Display text with tracking, horizontal scaling, and optional single-line fitting |
| `eva-badge` | A frame sized by one or two text levels, with proportional shrinking |
| `eva-segment-display` | A formatted string drawn as seven-segment glyphs |
| `eva-stripe` | Decorative signal bands with optional motion |

Every component installs the theme automatically. The theme updates global shadcn semantic colors, fonts, and radius tokens and installs six Fontsource packages. Review these changes when adding it to an existing design. Fonts are served locally by your app. Add `className="dark"` to the HTML element for dark mode.

The docs playgrounds use DialKit. Adjust values, copy the generated JSX, or reset to the defaults. DialKit is a docs dependency only; it is not installed with the components.

## Component contracts

- `EvaText` supports `span`, `p`, `div`, `h1`, `h2`, and `h3`, standard HTML attributes, styles, and refs. Without `fit`, `horizontalScale` changes visible shape while preserving natural layout width. With `fit`, a single line reserves its scaled dimensions and shrinks to its parent's content width. Use unscaled text for wrapping paragraphs.
- `EvaBadge` sizes itself from the widest text level. It shrinks the complete frame inside narrow parents. Initial HTML stays visible before client measurement. `className`/`style` affect the outer shell; `frameClassName`/`frameStyle` affect the frame. Omit `secondary` to remove the second level; an empty string keeps an empty level.
- `EvaSegmentDisplay` draws `0-9`, `:`, `.`, and `-`. Other characters reserve blank positions. It does not format values or run timers. Geometry is clamped to avoid intersecting segments; `resolveEvaSegmentGeometry` exposes applied values and limits. Provide `aria-label` when the raw value is not the right spoken label.
- `EvaStripe` fills a parent with explicit dimensions. It is decorative and respects reduced motion. Use `motion={{ kind: "scroll", durationMs: 1200, direction: "forward" }}` to animate it. `resolveEvaStripeGeometry` exposes normalized values.

Full prop defaults and examples are on each component's docs page.

## Develop

Use Node.js 22 and the pnpm version declared in `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

The theme manifest at `packages/registry/registry/themes/registry.json` is canonical. `pnpm theme:build` generates the committed docs stylesheet. Never hand-edit `apps/docs/src/app/eva-theme.css`. Registry component source lives in `packages/registry/registry/ui`. Builds generate ignored JSON under `apps/docs/public/r`.

## Verify

```sh
pnpm check
pnpm build
pnpm test:consumer
pnpm exec playwright install chromium webkit
pnpm test
```

`check` validates theme parity, TypeScript, lint across docs and distributed components, and registry structure. `test:consumer` creates an independent Next.js app under ignored `.consumer`, installs all five candidate items through the shadcn CLI, and builds the result without workspace imports. Its temporary local registry serves the actual generated artifacts and redirects their transitive EVA dependencies to the same candidate source. Chromium and WebKit tests then exercise production builds of that consumer and the docs.

To verify a pushed GitHub revision instead of local artifacts:

```sh
EVA_REGISTRY_SOURCE='bendsp/eva-cn#YOUR_REF' pnpm test:consumer
pnpm test
```

CI runs these checks for pull requests and release branches. Browser traces are uploaded on failure. See [release checklist](RELEASING.md) for the final publication gates.

## License

Code is [MIT licensed](LICENSE). Fontsource fonts retain their respective licenses. This is an unofficial fan project, with no affiliation or endorsement from the creators or owners of Evangelion.
