import { motion } from "framer-motion";
import { FileText, Image, Film } from "lucide-react";

const mockContent = [
  { id: "c1", title: "Zdjęcia stoiska MUA — Kraków", type: "gallery" as const, items: 24, date: "2026-02-18" },
  { id: "c2", title: "Instrukcja montażu LED Wall", type: "document" as const, items: 1, date: "2026-02-10" },
  { id: "c3", title: "Film promocyjny BAL", type: "video" as const, items: 1, date: "2026-01-28" },
  { id: "c4", title: "Zdjęcia z eventu Wrocław", type: "gallery" as const, items: 36, date: "2026-02-15" },
  { id: "c5", title: "Katalog stoisk 2026", type: "document" as const, items: 1, date: "2026-01-05" },
];

const typeIcon = { gallery: Image, document: FileText, video: Film };
const typeLabel = { gallery: "Galeria", document: "Dokument", video: "Wideo" };
const typeColor = { gallery: "bg-sky-400/20 text-sky-400", document: "bg-emerald-500/20 text-emerald-400", video: "bg-orange-400/20 text-orange-400" };

export default function ContentPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <h1 className="text-2xl font-bold">Kontenty</h1>
      <div className="grid gap-3">
        {mockContent.map((c) => {
          const Icon = typeIcon[c.type];
          return (
            <div key={c.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
              <Icon className="h-5 w-5 text-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground">{c.title}</p>
                <p className="text-sm text-muted-foreground">{c.date} · {c.items} {c.type === "gallery" ? "zdjęć" : "plik"}</p>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${typeColor[c.type]}`}>
                {typeLabel[c.type]}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
