

# 🎈 Helium House OPS — Plan Implementacji

## Wizja
System operacyjny do zarządzania eventami balonowymi. Frontend React gotowy do eksportu na własny serwer, komunikujący się z Twoim backendem przez REST API. Na start dane mockowane — łatwe do podpięcia pod prawdziwe API.

---

## Faza 1: Fundament — Layout, Login, Motyw

### Ekran logowania
- Logo Helium House (przesłany plik)
- Formularz login + hasło
- Wymuszenie zmiany hasła przy pierwszym logowaniu
- Po zalogowaniu → Dashboard

### Layout aplikacji (styl ChatGPT)
- Lewy sidebar wysuwany/zwijany (drawer) z logo Helium House
- Na mobile: wysuwa się z lewej jako overlay
- Pozycje menu: Dashboard, Eventy, Ludzie, Flota, Testery, Stoiska, Baza Wiedzy, Grafik (tylko admin)
- Przełącznik trybu dziennego/nocnego (zapamiętywany w localStorage)

### Styl wizualny
- Perłowo-metaliczne akcenty, benzynowe refleksy (gradienty CSS)
- Mikro-animacje: hover, tap, slide transitions
- Ciemny motyw jako domyślny, jasny jako alternatywa
- Typografia czytelna, "operacyjna" — nie marketingowa

---

## Faza 2: Dashboard — Kalendarz z Samochodzkami

### Kalendarz kafli (2/3 ekranu)
- Kafle dni ułożone pionowo: WCZORAJ na dole, DZIŚ/JUTRO/POJUTRZE wyżej (2x większe), dalsze dni u góry
- Kolory kafli: szary (wczoraj), zielony (dziś), żółty (jutro/pojutrze), jasnoniebieski (dalsze)
- Każdy kafel: numer dnia + dzień tygodnia + samochodziki wyjazdów

### Samochodziki (ikony busów)
- Każdy wyjazd = 1 biały bus z napisem: skrót stoiska + miejscowość
- Jeśli z przyczepą → dodatkowa ikonka przyczepy przy busie
- Kliknięcie w busa → otwiera panel szczegółów po prawej

### Panel szczegółów eventu (1/3 ekranu)
- Aktualny stan karty eventu (dane z etapów)
- Akcje: zmiana statusu, dodanie zdjęć, protokół
- Przycisk "Synchronizuj dane do reszty" (admin)
- Na mobile: pełnoekranowy slide-over

---

## Faza 3: Karta Eventu

### Pełna karta eventu
- Wszystkie pola wg KARTA_EVENTU_MAPA (klient, lokalizacja, stoisko, ekipa, auto, testery, uwagi)
- Statusy etapowe z kolorowym oznaczeniem
- Sekcja zdjęć dowodowych (upload + galeria)
- Protokół zdawczo-odbiorczy
- Przycisk synchronizacji danych do powiązanych modułów

---

## Faza 4: Moduły zarządzania

### Ludzie (Ekipa)
- Lista osób z rolami i danymi kontaktowymi
- Karta osobowa z historią wyjazdów
- Admin: przycisk "Zaloguj się jako ta osoba" (impersonacja)

### Flota (Auta + Przyczepy)
- Lista pojazdów ze statusem i przeglądami
- Historia wyjazdów pojazdu
- Oznaczenie dostępności

### Testery
- Lista testerów z numerami seryjnymi
- Status: dostępny / zarezerwowany / w serwisie
- Powiązanie z eventami (blokada na czas wyjazdu)

### Stoiska
- Lista stoisk z opisami i parametrami
- Podstrona stoiska: galeria zdjęć (lightbox) + podgląd PDF-ów (duże okno z zoom/scroll)

---

## Faza 5: Baza Wiedzy i Admin

### Baza wiedzy
- Katalogi stoisk z PDF-ami i zdjęciami
- Przeglądarka PDF w overlay (zoom, pełny ekran)
- Galeria zdjęć z miniaturami i powiększeniem

### Panel admina
- Grafik (import/wyświetlenie arkusza)
- Impersonacja użytkowników
- Synchronizacja danych z karty eventu do pozostałych modułów

---

## Architektura techniczna
- **Frontend**: React + TypeScript + Tailwind + shadcn/ui
- **Dane na start**: Mockowane w plikach JSON — gotowe do zamiany na fetch() z Twojego API
- **Serwis API**: Warstwa abstrakcji (np. `api/events.ts`) — podmiana endpointów w jednym miejscu
- **Offline**: Dane cache'owane w localStorage/IndexedDB dla podstawowej dostępności
- **Eksport**: Cały build (`npm run build`) do wrzucenia na Twój serwer

