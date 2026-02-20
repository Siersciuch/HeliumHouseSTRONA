

## Fix: Settlement Tables - Proper 12-Column Grid

### Problem
Empty day rows use `colSpan={11}`, merging 11 columns into a single cell. This makes the table look like it has no column separators and prevents individual cell editing.

### Solution
Remove all `colSpan` usage. Every row (whether it has events or not) will render all 12 individual `EditableCell` components, each with its own borders.

### Changes

**File: `src/pages/PersonDetailPage.tsx`**

Replace the empty-day row (lines 169-173) so that instead of:
```
<EditableCell value="—" colSpan={11} />
```
it renders 11 separate cells:
```
<EditableCell value="—" />  // Nazwa eventu
<EditableCell value="—" />  // Sklep
<EditableCell value="—" />  // Lokalizacja
<EditableCell value="—" />  // Miasto
<EditableCell value="—" />  // Samochod
<EditableCell value="—" />  // Km
<EditableCell value="—" />  // Magazyn
<EditableCell value="—" />  // Godz.
<EditableCell value="—" />  // Foty
<EditableCell value="—" />  // Uwagi
<EditableCell value="—" />  // Kwota
```

This ensures every row always has exactly 12 cells with full vertical and horizontal borders, creating a proper spreadsheet-like grid with over 30 rows per month (matching the billing period days). Only admins can edit cell content via double-click.

