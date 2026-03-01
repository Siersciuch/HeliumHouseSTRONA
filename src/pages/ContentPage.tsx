import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { mockBrandContent, type BrandContent } from "@/data/mock-data";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminTable } from "@/components/AdminTable";
import { Download, Plus, Trash2 } from "lucide-react";
import { EditableCell } from "@/components/EditableCell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";

const CONTENTS_BASE = "/kontenty";
const STORAGE_KEY = "hh_brand_content";

type ResolvedLinks = Record<string, { pionUrl: string | null; poziomUrl: string | null }>;

function safeUUID() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c: any = globalThis.crypto;
  if (c?.randomUUID) return c.randomUUID();
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function normalizeBrand(brand: string) {
  return brand.trim().replace(/\s+/g, " ");
}

function candidateUrls(brandRaw: string, orientation: "pion" | "poziom") {
  const brand = normalizeBrand(brandRaw);
  const bUnd = brand.replace(/\s+/g, "_");
  const bDash = brand.replace(/\s+/g, "-");

  const filenames = [
    // najbardziej naturalne, jak mówimy: "Douglas pion"
    `${brand} ${orientation}.mp4`,
    // bez spacji między marką i orientacją
    `${brand}_${orientation}.mp4`,
    // gdy w nazwie marki były spacje
    `${bUnd}_${orientation}.mp4`,
    `${bDash}-${orientation}.mp4`,
  ];

  // encodeURI ogarnia spacje na %20, ale zostawia / i inne “bezpieczne” znaki
  return filenames.map((name) => encodeURI(`${CONTENTS_BASE}/${name}`));
}

async function urlExists(url: string) {
  try {
    const head = await fetch(url, { method: "HEAD" });
    if (head.ok) return true;

    // Niektóre hosty nie lubią HEAD. Spróbujmy minimalnego GET-a.
    if (head.status === 405 || head.status === 403) {
      const res = await fetch(url, { method: "GET", headers: { Range: "bytes=0-0" } });
      return res.ok || res.status === 206;
    }

    return false;
  } catch {
    return false;
  }
}

async function firstExisting(urls: string[]) {
  for (const u of urls) {
    if (await urlExists(u)) return u;
  }
  return null;
}

function loadStoredBrandContent(): BrandContent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return mockBrandContent;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return mockBrandContent;

    return parsed
      .filter((x) => x && typeof x === "object")
      .map((x) => ({
        id: String(x.id ?? safeUUID()),
        brand: normalizeBrand(String(x.brand ?? "")),
        notes: typeof x.notes === "string" ? x.notes : undefined,
      }))
      .filter((x) => x.brand);
  } catch {
    return mockBrandContent;
  }
}

export default function ContentPage() {
  const { user, isImpersonating, realUser } = useAuth();
  const isAdmin = isImpersonating ? realUser?.role === "admin" : user?.role === "admin";

  const [items, setItems] = useState<BrandContent[]>(() => {
    if (typeof window === "undefined") return mockBrandContent;
    return loadStoredBrandContent();
  });

  const [newBrand, setNewBrand] = useState("");
  const [newNotes, setNewNotes] = useState("");

  const [resolved, setResolved] = useState<ResolvedLinks>({});

  // Persist items
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  // Resolve which files actually exist (pion/poziom) for every brand
  const urlCandidates = useMemo(() => {
    return items.map((it) => ({
      id: it.id,
      pion: candidateUrls(it.brand, "pion"),
      poziom: candidateUrls(it.brand, "poziom"),
    }));
  }, [items]);

  useEffect(() => {
    let alive = true;

    const run = async () => {
      const results = await Promise.all(
        urlCandidates.map(async (c) => {
          const [pionUrl, poziomUrl] = await Promise.all([firstExisting(c.pion), firstExisting(c.poziom)]);
          return { id: c.id, pionUrl, poziomUrl };
        }),
      );
      if (!alive) return;

      const map: ResolvedLinks = {};
      results.forEach((r) => {
        map[r.id] = { pionUrl: r.pionUrl, poziomUrl: r.poziomUrl };
      });
      setResolved(map);
    };

    run();

    return () => {
      alive = false;
    };
  }, [urlCandidates]);

  const addBrand = () => {
    const brand = normalizeBrand(newBrand);
    if (!brand) {
      toast("Podaj nazwę marki", { description: "Np. Douglas, ISL, Lancome…" });
      return;
    }

    const already = items.some((x) => normalizeBrand(x.brand).toLowerCase() === brand.toLowerCase());
    if (already) {
      toast("Taka marka już istnieje", { description: brand });
      return;
    }

    setItems((prev) => [
      ...prev,
      {
        id: safeUUID(),
        brand,
        notes: newNotes.trim() ? newNotes.trim() : undefined,
      },
    ]);
    setNewBrand("");
    setNewNotes("");
  };

  const updateItem = (id: string, patch: Partial<BrandContent>) => {
    setItems((prev) =>
      prev
        .map((x) => (x.id === id ? { ...x, ...patch, brand: patch.brand ? normalizeBrand(patch.brand) : x.brand } : x))
        .filter((x) => x.brand),
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Kontenty</h1>
        <p className="text-sm text-muted-foreground">
          Wrzucasz pliki MP4 do <span className="font-medium">public/kontenty</span> i nazywasz je np.{" "}
          <span className="font-medium">Douglas pion.mp4</span> / <span className="font-medium">Douglas poziom.mp4</span>{" "}
          (apka ogarnie też warianty z <span className="font-medium">_</span> albo <span className="font-medium">-</span>).
        </p>
      </div>

      {isAdmin ? (
        <div className="bg-card border border-border rounded-xl p-3">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr_auto] gap-2 items-end">
            <div>
              <label className="text-xs text-muted-foreground">Marka</label>
              <Input value={newBrand} onChange={(e) => setNewBrand(e.target.value)} placeholder="Np. Douglas" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Uwagi</label>
              <Input
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                placeholder="(opcjonalnie) np. wersja z 2026-02-28"
              />
            </div>
            <Button onClick={addBrand} className="md:w-auto w-full">
              <Plus className="h-4 w-4" /> Dodaj
            </Button>
          </div>
        </div>
      ) : null}

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <AdminTable>
          <TableHeader>
            <TableRow>
              <TableHead className="w-14">LP</TableHead>
              <TableHead>Marka</TableHead>
              <TableHead className="text-center w-24">Pion</TableHead>
              <TableHead className="text-center w-24">Poziom</TableHead>
              <TableHead>Uwagi</TableHead>
              {isAdmin ? <TableHead className="w-16" /> : null}
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={isAdmin ? 6 : 5} className="text-center text-muted-foreground py-8">
                  Brak marek. {isAdmin ? "Dodaj pierwszą u góry." : ""}
                </TableCell>
              </TableRow>
            ) : null}

            {items.map((c, i) => {
              const links = resolved[c.id];
              const pionUrl = links?.pionUrl ?? null;
              const poziomUrl = links?.poziomUrl ?? null;

              return (
                <TableRow key={c.id}>
                  <TableCell className="text-muted-foreground">{i + 1}</TableCell>

                  <EditableCell
                    value={c.brand}
                    className="font-medium"
                    onSave={(v) => updateItem(c.id, { brand: v })}
                  />

                  <TableCell className="text-center">
                    {pionUrl ? (
                      <a
                        href={pionUrl}
                        className="inline-flex items-center justify-center gap-1 text-xs text-primary hover:underline"
                        download
                      >
                        <Download className="h-3.5 w-3.5" /> Pobierz
                      </a>
                    ) : null}
                  </TableCell>

                  <TableCell className="text-center">
                    {poziomUrl ? (
                      <a
                        href={poziomUrl}
                        className="inline-flex items-center justify-center gap-1 text-xs text-primary hover:underline"
                        download
                      >
                        <Download className="h-3.5 w-3.5" /> Pobierz
                      </a>
                    ) : null}
                  </TableCell>

                  <EditableCell
                    value={c.notes ?? ""}
                    className="text-muted-foreground text-sm"
                    onSave={(v) => updateItem(c.id, { notes: v.trim() ? v : undefined })}
                  />

                  {isAdmin ? (
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(c.id)}
                        title="Usuń markę"
                        className="h-9 w-9"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  ) : null}
                </TableRow>
              );
            })}
          </TableBody>
        </AdminTable>
      </div>
    </motion.div>
  );
}
