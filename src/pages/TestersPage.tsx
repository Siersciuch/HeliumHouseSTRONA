import { motion } from "framer-motion";
import { mockTesters } from "@/data/mock-data";
import { FlaskConical } from "lucide-react";

const statusColor: Record<string, string> = {
  "dostępny": "bg-emerald-500/20 text-emerald-400",
  "zarezerwowany": "bg-orange-400/20 text-orange-400",
  "serwis": "bg-destructive/20 text-destructive",
};

export default function TestersPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <h1 className="text-2xl font-bold">Testery</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {mockTesters.map((t) => (
          <div key={t.id} className="bg-card border border-border rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FlaskConical className="h-5 w-5 text-foreground" />
                <div>
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.serial}</p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[t.status]}`}>
                {t.status}
              </span>
            </div>
            {t.assignedEvent && (
              <p className="text-xs text-muted-foreground">Przypisany do eventu: {t.assignedEvent}</p>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
