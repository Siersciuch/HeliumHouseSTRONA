

## Dynamic Iridescent Background -- "Oil Slick / Crow Feather" Effect

### Concept
A full-page animated background simulating gasoline iridescence on a dark puddle -- dark base with slowly shifting, morphing blobs of petrol-blue, emerald-green, and deep purple that drift and blend organically. Like the shimmer on crow feathers or oil on wet asphalt.

### Technical Approach

**New component: `src/components/OilSlickBackground.tsx`**

A dedicated React component using pure CSS animations (no canvas/WebGL for performance). The technique:
- A fixed full-screen `div` behind all content (`z-index: 0`, `position: fixed`)
- Multiple overlapping radial gradients with petrol/emerald/purple colors at low opacity (~15-25%)
- Each gradient blob animated independently via `@keyframes` that shift `background-position`, `scale`, and `opacity` over long durations (20-40 seconds) creating a slow, organic drift
- CSS `mix-blend-mode: screen` to create the iridescent color-mixing effect
- Dark base (`hsl(225, 25%, 6%)`) ensures colors appear as subtle sheens, not bright splashes
- Uses `filter: blur(80px)` on the blobs for that soft, diffused oil-on-water look

**Structure (3-4 animated layers):**
```text
Layer 0: Solid dark background (near-black)
Layer 1: Large petrol-blue blob, drifting slowly (30s cycle)
Layer 2: Emerald-green blob, different trajectory (25s cycle)
Layer 3: Deep purple/magenta blob, slowest drift (40s cycle)
```

Each layer is a `div` with a large radial gradient, absolutely positioned, animated with different `@keyframes` for position and scale. The blur and blend mode create the realistic oil-slick shimmer.

### Files to Create/Edit

| File | Action | Description |
|------|--------|-------------|
| `src/components/OilSlickBackground.tsx` | **Create** | New component with 3-4 animated gradient blobs |
| `src/index.css` | **Edit** | Add `@keyframes` for blob drift animations (3 sets) |
| `src/components/AppLayout.tsx` | **Edit** | Insert `<OilSlickBackground />` as first child inside the main wrapper, behind sidebar and content |

### CSS Keyframes (added to `src/index.css`)

Three keyframe sets for organic movement:
- `oil-drift-1`: Moves blob diagonally, scales up/down (30s, infinite)
- `oil-drift-2`: Circular path, counter-direction (25s, infinite)
- `oil-drift-3`: Slow vertical drift with scale pulse (40s, infinite)

### Integration in AppLayout

The background component renders as a fixed full-screen layer at `z-index: 0`. The sidebar gets `z-index: 1` (or higher via existing sticky/fixed positioning). Main content stays above naturally. The background is only active in dark mode; in light mode it either hides or switches to a subtle pearl shimmer.

### Performance Considerations
- Pure CSS animations (GPU-accelerated via `transform` and `opacity`)
- No JavaScript animation loops, no canvas, no requestAnimationFrame
- `will-change: transform` on animated layers
- `pointer-events: none` so it never interferes with clicks
- Minimal DOM: only 4 extra divs total

