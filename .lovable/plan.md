

## Fix: Make Oil Slick Background Visible + Full Visual Overhaul

### Root Cause
The oil slick background component exists and animations are defined, but the main layout wrapper has `bg-background` (a solid opaque color) that completely covers it. The sidebar has `bg-sidebar` (also opaque). The background is rendering behind these opaque layers and is invisible.

### Fix Strategy
Make the main content area and sidebar semi-transparent so the oil slick shines through, while keeping readability. Also implement the remaining visual improvements from the previous plan.

---

### Changes

**1. AppLayout.tsx -- Make layers translucent (dark mode)**

- Main wrapper: change `bg-background` to `bg-background/80` or use `bg-transparent` in dark mode
- Sidebar: change `bg-sidebar` to `bg-sidebar/90 backdrop-blur-md` so the oil slick subtly shows through with a frosted glass effect
- Mobile header: add `backdrop-blur` and semi-transparent background
- Main content area: make background semi-transparent in dark mode

**2. AppLayout.tsx -- Unique sidebar icons**

Replace duplicate icons:
- Stoiska: `Tent` instead of `Store`
- Sklepy: `ShoppingBag` instead of `Store`
- Kontenty: `Image` instead of `FileText`
- Protokoly: `ClipboardList` instead of `FileText`
- Increase icon size from `h-5 w-5` to `h-6 w-6`

**3. AppLayout.tsx -- Sidebar hover effects**

- Add glow/scale micro-animation on nav item hover
- Active item gets a gradient left border accent

**4. Index.tsx -- Button fixes**

- "Rozpocznij prace na magazynie": reduce font to `text-xs` or `text-sm`
- "Generuj protokol": add gradient background styling

**5. index.css -- Global visual enhancements**

- Add nav item glow hover utility class
- Enhanced table header gradient styling
- Row hover glow effect for tables
- Smooth global transitions on interactive elements

**6. table.tsx -- Premium table headers**

- Gradient background on `TableHead`
- Uppercase, letter-spacing, centered text
- Enhanced row hover with visible highlight

---

### Technical Details

| File | Changes |
|------|---------|
| `src/components/AppLayout.tsx` | Transparent backgrounds, unique icons, hover effects, larger icons |
| `src/pages/Index.tsx` | Button font fix, protocol button styling |
| `src/index.css` | Nav glow class, table styling, global transitions |
| `src/components/ui/table.tsx` | Premium header gradient, row hover enhancement |

The key fix is making the layout layers semi-transparent so the animated oil slick background becomes visible beneath the UI.

