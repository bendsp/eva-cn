# Historical badge design QA

This records the August 30, 2026 implementation. The old lab interface and its controls have since been replaced by DialKit. Use `pnpm check`, `pnpm test:consumer`, and `pnpm test` for the current verification gates. The conclusions below apply only to the historical captures.

# EvaBadge design QA

## Evidence

- Source visual truth: three Evangelion interface crops and two user captures of the previous implementation, preserved inside the combined comparison at their original aspect ratios.
- Implementation evidence: four live-browser captures at the 1280 × 720 CSS px browser viewport, covering the lab controls, default output, square two-level output, and tightened reference forms.
- Durable combined comparison: `/Users/ben/Documents/Codex/2026-08-30/i/outputs/eva-badge-lab-design-qa.png` at 1800 × 1520 px
- Content-sized comparison: `/Users/ben/Documents/Codex/2026-08-30/i/outputs/eva-auto-badge-design-qa.png` at 1760 × 1470 px, pairing the three source crops with one-level, two-level, and Japanese square-frame browser captures.
- Width-regression comparison: `/Users/ben/Documents/Codex/2026-08-30/i/outputs/eva-auto-badge-width-regression-comparison.png` at 1459 × 777 px, pairing the reported 46 × 127 px collapse with the corrected 321 × 127 px large two-level state.
- Browser viewport: 1280 × 720 CSS px at device pixel ratio 2.
- State: `/components/eva-badge`, with the lab in its default state, its square two-level state, and the static reference grid.
- Primary interactions tested: text entry; tone, language, and preset selects; square and rounded corners; alignment, tracking, level, separator, emphasis, and casing toggles; all eight geometry sliders; preset reset after custom sizing.
- Boundary testing: a square two-level badge at the minimum 120 × 40 px frame and zero padding retained zero frame overflow and contained both transformed text rectangles. The lab now constrains impossible inset/gap/rule combinations to preserve nonzero text zones, and horizontally scrolls rather than silently shrinking requested widths on narrow screens.
- Browser errors checked: the browser log contained only React DevTools and hot-reload informational messages. The production build also completed without errors.
- Intrinsic sizing behavior: `WARNING` rendered at 191 × 57 px. Adding the shorter `RED` level preserved the 191 px width and increased height to 76 px. Replacing it with a longer secondary label expanded the frame to 420 × 76 px. Adding the separator changed only the height, to 81 px.
- Width regression: the reported frame measured exactly 46 px, equal to two 18 px paddings plus two 5 px borders. The corrected large two-level badge measures 321 × 127 px. Its inline styles now enforce `contain: none` and `container-type: normal`, preventing the containment mode seen in the reported Brave state from removing text from intrinsic width. A shorter second line leaves the primary line in control at 303 px; a longer line expands the frame to 569 px without changing its 127 px height.

## Comparison

- Fonts and typography: English badge levels use the Archivo-backed `eva-interface` role; the Japanese example resolves the Noto Sans JP interface role. The new `horizontalScale` control defaults to 0.86, making Archivo closer to the condensed screen lettering while preserving automatic fit.
- Spacing and layout rhythm: `size` controls the complete frame, while width, height, padding, border width, radius, gap, and separator thickness provide exact overrides. Preset padding and radii are smaller than the previous pass. Square frames remove radius from both the border and divider.
- Colors and tokens: the examples use `eva-critical`, `eva-terminal`, `eva-amber`, `eva-paper`, and `eva-data`. Frames and text resolve to the same tone.
- Image quality and assets: EvaBadge contains no raster assets. The source glow, blur, and topographic texture belong to the surrounding footage, so the reusable component does not bake them in.
- Copy and content: `UNKNOWN`, `TOKYO-3 / TOPOGRAPHICAL MAP`, and `17TH / ANGEL` reproduce the three supplied forms.
- Full-view and focused comparison: the combined comparison shows the reference crops and previous excessive-padding states above focused captures of the new lab, default output, square output, and static forms. The output captures keep typography and frame geometry readable without another crop.

## Comparison history

1. The first pass used the site’s generic border color instead of the badge tone. The component now sets its frame to `currentColor`; the second capture shows matching frame and text colors.
2. The first amber example put `17TH ANGEL` on one line. The component now supports `emphasis="secondary"`; the final capture shows the smaller `17TH` level above the dominant `ANGEL` level.
3. The initial sizing API changed only the type scale, so long strings escaped their frames. EvaBadge now gives each level a measured zone and uniformly scales the interface text to fit its available width and height.
4. Container-relative border and padding values were initially resolved against the parent container, which made the small preset unusably cramped. Preset-specific frame tokens now keep `sm`, `md`, and `lg` legible while inner gaps and rules remain proportional.
5. The next pass still left too much optical space around wide interface labels. Preset padding and radii are now tighter, and horizontal scaling lets the fitted type grow vertically without escaping the frame.
6. Consumers previously had to combine preset classes and generic style overrides to explore geometry. The component now exposes explicit frame, divider, alignment, tracking, casing, and optical-width props; the documentation lab drives those same props live.
7. The component previously offered rounded frames only. `shape="square"` now hardens both the outer frame and optional separator, with a dedicated lab control and static example.
8. Extreme lab values could previously consume the entire content box, while narrow screens could cap a requested width without saying so. The lab now enforces a remaining-content budget, resets auto gap and rule values with presets, and preserves exact requested widths inside a scrollable preview.
9. The content-sized model replaced the original fixed-frame EvaBadge. Its widest label defines the frame width; type size, padding, gap, rule, and border define the height. The lab exposes those inputs without width or height controls.
10. Horizontal type scaling originally left the intrinsic layout width unchanged. EvaBadge now measures each rendered text level and applies the same scale to its layout width, so the border hugs the visible letters.
11. Inline-size containment could collapse the frame to padding and borders while leaving its height intact. EvaBadge now rejects containment on its outer frame, and the post-fix capture shows both text levels contained at 321 × 127 px.

## Findings

No actionable P0, P1, or P2 differences remain. Browser geometry checks confirmed zero frame overflow and placed every transformed text rectangle inside its zone for the lab output and all seven static examples.

P3 follow-up: glow and textured backgrounds could be separate effects or layout treatments later. They should not be part of the base badge.

final result: passed
