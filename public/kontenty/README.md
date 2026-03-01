# Kontenty (pliki statyczne)

Wrzuć tu pliki MP4 wykorzystywane w zakładce **Kontenty**.

## Nazewnictwo plików (ważne)
Aplikacja szuka plików automatycznie po **nazwie marki** i orientacji:

- `MARKA pion.mp4`
- `MARKA poziom.mp4`

Dodatkowo (dla wygody) apka ogarnia też warianty:
- `MARKA_pion.mp4` / `MARKA_poziom.mp4`
- `MARKA-pion.mp4` / `MARKA-poziom.mp4`

## Przykłady

```
public/kontenty/Douglas pion.mp4
public/kontenty/Douglas poziom.mp4

public/kontenty/Lancome_pion.mp4
public/kontenty/Lancome_poziom.mp4

public/kontenty/ISL-pion.mp4
public/kontenty/ISL-poziom.mp4
```

W przeglądarce będą one dostępne pod URL-ami:

- `/kontenty/Douglas%20pion.mp4`
- `/kontenty/Douglas%20poziom.mp4`
- `/kontenty/Lancome_pion.mp4`
- itd.
