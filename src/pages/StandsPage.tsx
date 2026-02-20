import { motion } from "framer-motion";
import { mockStands } from "@/data/mock-data";
import { Store } from "lucide-react";

export default function StandsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <h1 className="text-2xl font-bold">Stoiska</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {mockStands.map((s) => (
          <div key={s.id} className="bg-card border border-border rounded-xl p-5 space-y-2">
            <div className="flex items-center gap-3">
              <Store className="h-5 w-5 text-foreground shrink-0" />
              <div>
                <p className="font-semibold text-foreground">{s.shortCode}</p>
                <p className="text-sm text-muted-foreground">{s.fullName}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{s.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
