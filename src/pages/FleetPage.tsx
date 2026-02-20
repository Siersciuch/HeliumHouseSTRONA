import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { mockVehicles } from "@/data/mock-data";
import { Truck as TruckIcon, Calendar, Wrench, ChevronRight } from "lucide-react";

const statusColor: Record<string, string> = {
  "dostępny": "bg-emerald-500/20 text-emerald-400",
  "w trasie": "bg-orange-400/20 text-orange-400",
  "serwis": "bg-destructive/20 text-destructive",
};

const typeLabel: Record<string, string> = {
  bus: "Bus",
  przyczepa: "Przyczepa",
  autobus: "Autobus",
  "samochód": "Samochód",
};

export default function FleetPage() {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <h1 className="text-2xl font-bold">Flota</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {mockVehicles.map((v) => (
          <div
            key={v.id}
            className="bg-card border border-border rounded-xl p-5 space-y-3 cursor-pointer hover:border-primary/40 hover:shadow-glow transition-all group"
            onClick={() => navigate(`/fleet/${v.id}`)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TruckIcon className="h-6 w-6 text-foreground" />
                <div>
                  <p className="font-semibold text-foreground">{v.name}</p>
                  <p className="text-sm text-muted-foreground">{typeLabel[v.type]}{v.plate ? ` · ${v.plate}` : ""}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[v.status]}`}>
                  {v.status}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{v.trips.length} wyjazdów</span>
              <span className="flex items-center gap-1.5"><Wrench className="h-3.5 w-3.5" />Serwis: {v.nextService || "—"}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
