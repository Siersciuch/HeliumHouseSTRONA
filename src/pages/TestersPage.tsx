import { motion } from "framer-motion";
import { mockTesters, type Tester } from "@/data/mock-data";
import { FlaskConical } from "lucide-react";

const statusColor: Record<string, string> = {
  "dostępny": "bg-emerald-500/20 text-emerald-400",
  "na wyjeździe": "bg-orange-400/20 text-orange-400",
  "brak": "bg-destructive/20 text-destructive",
};

const categories = ["BS", "MUA", "MUC"] as const;

export default function TestersPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h1 className="text-2xl font-bold">Testery — Magazyn</h1>
      {categories.map((cat) => {
        const items = mockTesters.filter((t) => t.category === cat);
        if (items.length === 0) return null;
        return (
          <div key={cat} className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground/80">{cat}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((t) => (
                <div key={t.id} className="bg-card border border-border rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FlaskConical className="h-5 w-5 text-foreground" />
                      <div>
                        <p className="font-semibold text-foreground">{t.brand}</p>
                        <p className="text-xs text-muted-foreground">Ilość: {t.quantity} szt. {t.outCount > 0 && `(${t.outCount} na wyjeździe)`}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[t.status]}`}>
                      {t.status}
                    </span>
                  </div>
                  {t.assignedEvent && (
                    <p className="text-xs text-muted-foreground">Event: {t.assignedEvent}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
