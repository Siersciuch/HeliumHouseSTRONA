import { motion } from "framer-motion";
import { mockStands } from "@/data/mock-data";
import { Store, Ruler, Weight, Truck as TruckIcon } from "lucide-react";

export default function StandsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <h1 className="text-2xl font-bold">Stoiska</h1>
      <div className="grid gap-4">
        {mockStands.map((s) => (
          <div key={s.id} className="bg-card border border-border rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-3">
              <Store className="h-6 w-6 text-foreground" />
              <div>
                <p className="font-semibold text-foreground text-lg">{s.shortCode} — {s.fullName}</p>
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Ruler className="h-3.5 w-3.5" />{s.dimensions}</span>
              <span className="flex items-center gap-1.5"><Weight className="h-3.5 w-3.5" />{s.weight}</span>
              {s.needsTrailer && (
                <span className="flex items-center gap-1.5 text-orange-400"><TruckIcon className="h-3.5 w-3.5" />Wymaga przyczepy</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
