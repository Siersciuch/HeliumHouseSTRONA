import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { mockStands } from "@/data/mock-data";
import { Store } from "lucide-react";

export default function StandsPage() {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <h1 className="text-2xl font-bold">Stoiska</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {mockStands.map((s) => (
          <button
            key={s.id}
            onClick={() => navigate(`/stands/${s.id}`)}
            className="bg-card border border-border rounded-xl p-5 space-y-3 text-left hover-levitate hover:border-primary/40 group"
          >
            {/* Thumbnail placeholder */}
            <div className="w-full aspect-[16/9] rounded-lg bg-muted/60 flex items-center justify-center overflow-hidden">
              <Store className="h-10 w-10 text-muted-foreground/40" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{s.shortCode}</p>
              <p className="text-sm text-muted-foreground">{s.fullName}</p>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}