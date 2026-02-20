

## Plan: Poprawki wizualne, czyszczenie danych + info o eksporcie kodu

### 1. Grafik -- tylko dla adminow

Grafik juz ma `adminOnly: true` w konfiguracji menu. Zweryfikuje, ze logika filtrowania w `visibleItems` prawidlowo ukrywa ten element dla zwyklych uzytkownikow (crew). Aktualnie warunek: `!item.adminOnly || effectiveRole === "admin" || isImpersonating` -- przy impersonacji nadal widoczny. Poprawka: ukryc Grafik rowniez podczas impersonacji (bo wtedy uzytkownik jest "crew").

**Plik:** `src/components/AppLayout.tsx`
- Zmiana warunku filtrowania: `!item.adminOnly || user?.role === "admin"` (realUser, nie effectiveRole)

### 2. Flota -- samochody od lewej strony

Aktualnie karty pojazdow sa w gridzie `sm:grid-cols-2 lg:grid-cols-3`. Zmiana na uklad od lewej -- karty beda wyrownane do lewej, zachowujac grid ale z `justify-start`.

**Plik:** `src/pages/FleetPage.tsx`
- Dodanie `hover-levitate` do kart pojazdow (efekt lewitacji)
- Upewnienie sie, ze grid wyswietla karty od lewej

### 3. Wyczyszczenie danych testowych eventow

Oproznienie tablicy `mockEvents` w `src/data/mock-events.ts` -- zostanie pusta tablica `[]`. Interfejs `EventTrip` i funkcja `getEventsByDate` pozostana bez zmian.

**Plik:** `src/data/mock-events.ts`
- `export const mockEvents: EventTrip[] = [];`

### 4. Dopracowanie WSZYSTKICH tabel -- premium styling

Tabele wystepuja na stronach: Eventy, Ekipa (People), Testery, Sklepy (Shops), Kontenty (Content), Grafik (Schedule).

**Zmiany globalne w `src/components/ui/table.tsx`:**
- `Table` wrapper: dodanie `bg-card backdrop-blur-xl` -- solidne tlo dla czytelnosci
- `TableHead`: gradient header `bg-gradient-to-r from-muted/80 to-muted/40`, gorny/dolny border, sticky pozycja
- `TableRow`: naprzemienne kolorowanie wierszy (`even:bg-muted/20`), hover z lewym border accent (`hover:shadow-[inset_3px_0_0_hsl(var(--primary))]`), plynna animacja
- `TableCell`: lekko wieksze padding, subtelne prawe bordery

**Dodatkowe style w `src/index.css`:**
- `.admin-table` dostaje solidne tlo `bg-card` 
- Naprzemienne wiersze: `tbody tr:nth-child(even)` z `bg-muted/15`
- Hover na wierszu: lewy accent border + lekkie podswietlenie
- Selected row: mocniejszy glow

### 5. Efekt lewitacji na kartach na pozostalych stronach

- **FleetPage.tsx**: dodanie `hover-levitate` do kart pojazdow
- **StandsPage.tsx**: juz ma `hover-levitate` -- OK
- Karty na Dashboardzie (Index.tsx) -- detail panel juz ma efekty

### 6. Info: jak pobrac kod na wlasny hosting

Kod mozna pobrac na dwa sposoby:
- **GitHub**: Polacz konto GitHub w Settings -> GitHub, a nastepnie caly kod zostanie zsynchronizowany do repozytorium, skad mozna go sciagnac i wrzucic na dowolny serwer
- **Pobieranie**: Po polaczeniu z GitHubem, sklonuj repo i uruchom `npm install && npm run build` -- folder `dist/` to gotowa aplikacja do wrzucenia na hosting (np. PHP/Apache/Nginx jako statyczne pliki)

---

### Pliki do edycji

| Plik | Zmiany |
|------|--------|
| `src/components/AppLayout.tsx` | Poprawka warunku adminOnly dla Grafiku |
| `src/data/mock-events.ts` | Wyczyszczenie mockEvents do pustej tablicy |
| `src/pages/FleetPage.tsx` | Dodanie hover-levitate, wyrownanie do lewej |
| `src/components/ui/table.tsx` | Premium styling: gradient header, alternating rows, hover effects, solidne tlo |
| `src/index.css` | Admin-table solid bg, alternating rows, hover accent |

