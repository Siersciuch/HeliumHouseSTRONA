

## Wiecej gwiazdek + Mglawice (Nebula Glow)

### 1. SpaceBackground.tsx -- wiecej gwiazdek i mglawice

**Gwiazdki:**
- Zwiekszyc liczbe z 120 do **250**
- Dodac roznicowanie jasnosci -- czesc gwiazdek bardziej przygaszonych (`bg-foreground/30`), czesc jasniejszych
- Kilka wiekszych gwiazdek (3-4px) jako "bliskie gwiazdy"

**Mglawice (3 plamy nebula):**
- 3 duze `div` z `radial-gradient` w kolorach petrol-blue, purple i emerald
- Kazdy z `blur(120px)`, niska opacity (~10-15%), `mix-blend-mode: screen` (dark) / `multiply` (light)
- Animowane wolnym dryftem (`@keyframes nebula-drift-1/2/3`) -- przesuniecia i lekka zmiana skali w cyklach 30-50s
- W trybie jasnym mglawice sa jeszcze bardziej subtelne (opacity ~5-8%)

### 2. index.css -- nowe keyframes

Dodanie 3 keyframes dla mglawic:
- `nebula-drift-1`: ruch po przekatnej + scale, 35s
- `nebula-drift-2`: ruch kolowy, 45s  
- `nebula-drift-3`: wolny drift pionowy, 30s

Plus klasy `.animate-nebula-1/2/3`

### Pliki do edycji

| Plik | Zmiany |
|------|--------|
| `src/components/SpaceBackground.tsx` | 250 gwiazdek, 3 mglawice z radial-gradient + blur + drift |
| `src/index.css` | 3 nowe keyframes `nebula-drift-*` i klasy animacji |

