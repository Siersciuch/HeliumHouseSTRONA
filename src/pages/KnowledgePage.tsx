import { motion } from "framer-motion";
import { BookOpen, FileText, Image } from "lucide-react";

const knowledgeItems = [
  { id: "k1", title: "Instrukcja montażu MUA", type: "pdf" as const, desc: "Pełna procedura montażu Muru z Balonów krok po kroku." },
  { id: "k2", title: "Schemat LED Wall", type: "pdf" as const, desc: "Schemat podłączeń elektrycznych i sterownika RGB." },
  { id: "k3", title: "Galeria referencji BAL", type: "gallery" as const, desc: "Zdjęcia z realizacji stoiska Balonowego na różnych eventach." },
  { id: "k4", title: "Checklist przed wyjazdem", type: "pdf" as const, desc: "Lista kontrolna wyposażenia busa przed każdym eventem." },
  { id: "k5", title: "Procedura bezpieczeństwa", type: "pdf" as const, desc: "Zasady BHP przy montażu stoisk na eventach." },
];

const typeIcon = { pdf: FileText, gallery: Image };
const typeColor = { pdf: "bg-emerald-500/20 text-emerald-400", gallery: "bg-sky-400/20 text-sky-400" };

export default function KnowledgePage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex items-center gap-3">
        <BookOpen className="h-6 w-6 text-foreground" />
        <h1 className="text-2xl font-bold">Baza Wiedzy</h1>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {knowledgeItems.map((k) => {
          const Icon = typeIcon[k.type];
          return (
            <div key={k.id} className="bg-card border border-border rounded-xl p-5 space-y-2 hover:border-primary/30 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Icon className="h-5 w-5 text-foreground" />
                  <p className="font-semibold text-foreground">{k.title}</p>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${typeColor[k.type]}`}>
                  {k.type === "pdf" ? "PDF" : "Galeria"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{k.desc}</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
