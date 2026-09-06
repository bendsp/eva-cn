# First release checklist

Release target: v0.1.0. The first release includes the five existing registry items. No npm publication is needed.

1. Run `pnpm install --frozen-lockfile`, `pnpm check`, and `pnpm build`.
2. Run `pnpm test:consumer`, install Playwright's Chromium/WebKit browsers, and run `pnpm test`.
3. Push the review branch. Verify that GitHub CI passes and that a public-ref consumer install succeeds using `EVA_REGISTRY_SOURCE='bendsp/eva-cn#REF' pnpm test:consumer`.
4. Review all five documentation pages on desktop and mobile. Check the DialKit controls, keyboard access, reset, JSX copying, light/dark previews, and navigation between labs.
5. Review the MIT license and supported-stack statement. Check the diff for unintended public API changes.
6. After approval, merge and tag v0.1.0. Publish release notes describing the component scope, installation, supported stack, and measurement behavior.
7. Deploy the docs on Railway using the repository root, build command `pnpm build`, and start command `pnpm --filter @eva-cn/docs exec next start --hostname 0.0.0.0 --port $PORT`.
8. Check the deployed pages and `/r/eva-badge.json`. Repeat the public registry consumer check against the release tag. Verify that transitive dependencies resolve to the intended released source.

GitHub source installation works independently of the docs host. Generated `/r` endpoints remain useful for inspection and URL-based installation. A passing local build does not establish deployment health.
