

## Kosmiczne tlo + efektowne interakcje + Dashboard w menu

### 1. Nowe tlo: Animated Space Background

Zastapienie obecnego `OilSlickBackground` nowym komponentem `SpaceBackground.tsx` -- animowana przestrzen kosmiczna dzialajaca w **obu trybach** (jasnym i ciemnym).

**Elementy:**
- ~120 malych gwiazdek (biale kropki 1-3px) z losowymi pozycjami, rozlozonych po calym ekranie
- Kazda gwiazdka ma animacje `twinkle` (pulsowanie opacity) z losowym opoznieniem i czasem trwania (2-8s)
- Co ~12 sekund przeleci "shooting star" -- cienka linia z gradientem, animowana po przekatnej
- Tryb jasny: gwiazdki sa jasnoszare/srebrne na jasnym tle, delikatne ale widoczne
- Tryb ciemny: biale gwiazdki na ciemnym tle, klasyczny kosmos
- Czyste CSS animacje, GPU-accelerated, `pointer-events: none`

**Nowe keyframes w `index.css`:**
- `@keyframes twinkle` -- opacity 0.1 do 1.0 i z powrotem
- `@keyframes shooting-star` -- translateX/Y z fade-in/out
- Usuniecie starych `oil-drift` keyframes

### 2. Efektowne interakcje hover -- "Unoszenie sie" i "Levitacja"

Na kazdym interaktywnym elemencie (karty, przyciski, wiersze tabel, kafelki nawigacji):

**Efekt "lewitacji" na kartach/kafelkach** (np. StandsPage, FleetPage):
- Na hover: `translateY(-6px)`, subtelny `box-shadow` z kolorowym glow poniżej (jakby element unosil sie nad powierzchnia)
- Cien sie rozszerza i staje bardziej rozmyty im wyzej element "wznosi sie"
- Plynna animacja `transition: transform 0.3s, box-shadow 0.3s`

**Efekt na przyciskach sidebar:**
- Hover: ikona lekko sie obraca (`rotate(5deg)`) + scale(1.1) + glow pod spodem
- Active state: silniejszy glow + lewy border accent

**Efekt na wierszach tabel:**
- Hover: wiersz unosi sie lekko (`translateY(-1px)`) + cien + lewy border accent
- Selected: mocniejsze podswietlenie z petrol glow

**Nowe klasy CSS w `index.css`:**
```
.hover-levitate -- unoszenie z cieniem
.hover-glow -- poswiatka pod elementem
.hover-rotate-icon -- lekki obrot ikony
```

### 3. Dashboard w menu glownym

Dodanie pozycji "Dashboard" na samej gorze listy nawigacji z ikona `LayoutDashboard`.

**Plik:** `src/components/AppLayout.tsx`
- Import `LayoutDashboard` z lucide-react
- Nowy wpis na poczatku `navItems`: `{ title: "Dashboard", url: "/", icon: LayoutDashboard }`
- Ustawienie `end: true` zeby podswietlal sie tylko na dokladnej sciezce `/`

### 4. Poprawa sidebar -- interaktywne przyciski nawigacji

**Plik:** `src/components/AppLayout.tsx`

Kazdy NavLink dostaje klasy efektow:
- `hover:translate-y-[-2px] hover:shadow-lg hover:shadow-primary/20`
- Ikona w `group-hover:rotate-[5deg] group-hover:scale-110 transition-transform`
- Aktywny stan: `border-l-3 border-primary bg-primary/15 shadow-glow`

### 5. Karty na stronach (StandsPage itp.) -- efekt lewitacji

**Plik:** `src/pages/StandsPage.tsx` (i inne strony z kafelkami)

Kazda karta dostaje:
- `hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/15 transition-all duration-300`
- Subtelny glow pod karta na hover
- `active:translate-y-0 active:shadow-md` -- klikniecie "wciska" karte z powrotem

---

### Pliki do edycji

| Plik | Zmiany |
|------|--------|
| `src/components/OilSlickBackground.tsx` | Kompletne przepisanie na `SpaceBackground` (gwiazdki + shooting star) |
| `src/index.css` | Usuniecie oil-drift keyframes, dodanie twinkle + shooting-star + hover-levitate + hover-glow utilities |
| `src/components/AppLayout.tsx` | Dodanie "Dashboard" do menu, import LayoutDashboard, hover efekty na NavLink (rotate ikony, glow, lewitacja) |
| `src/pages/StandsPage.tsx` | Efekt lewitacji na kartach stoisk |
| `src/components/ui/table.tsx` | Efekt lewitacji na wierszach tabeli (hover translateY + cien) |

