# Ink and TeaUI scroll comparison

Two runnable implementations of the same two-axis scrolling demo:

- `apps/ink/index.tsx` — Ink implementation
- `apps/teaui/index.tsx` — TeaUI implementation
- `comparison.html` — visual side-by-side explanation

## Install

Run once from this directory:

```bash
pnpm install
```

The root `postinstall` installs each app independently. This is intentional: the current TeaUI release uses React 18, while the current Ink release uses React 19.

## Run

```bash
pnpm ink
pnpm teaui
```

Both versions use the same controls:

- `↑` / `↓`: scroll one row
- `←` / `→`: scroll two columns
- `q`: quit

TeaUI additionally gets mouse-wheel scrolling from `Scrollable`.

## Implementation note

Ink's unreleased `master` example uses its new `contentOffsetX` and `contentOffsetY` props. The runnable Ink app here targets the published `ink@7.1.1` package and reproduces those offsets with relative positioning. Its behavior and content match the upstream example.

The TeaUI version is intentionally smaller: a bordered `Box` contains `Scrollable`, `Scrollable` fills the space above a normal `Text` footer, and arrow keys call `scrollBy()` through a ref. There is no measurement hook, scroll state, clamp math, or resize handler in application code.
