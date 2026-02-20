import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { mockEvents, type EventTrip } from "@/data/mock-events";
import { Calendar, Clock, MapPin, Users, Truck as TruckIcon, ChevronRight } from "lucide-react";

function statusLabel(s: EventTrip["status"]) {
  switch (s) {
    case "planned": return "Zaplanowany";
    case "in-progress": return "W trakcie";
    case "completed": return "Zakończony";
    case "cancelled": return "Anulowany";
  }
}

function statusClass(s: EventTrip["status"]) {
  switch (s) {
    case "completed": return "bg-emerald-500/20 text-emerald-400";
    case "in-progress": return "bg-orange-400/20 text-orange-400";
    case "cancelled": return "bg-destructive/20 text-destructive";
    default: return "bg-sky-400/20 text-sky-400";
  }
}

export default function EventsPage() {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <h1 className="text-2xl font-bold">Eventy</h1>
      <div className="grid gap-3">
        {mockEvents.map((ev) => (
          <button
            key={ev.id}
            onClick={() => navigate(`/events/${ev.id}`)}
            className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 text-left hover:border-primary/40 hover:bg-accent/30 transition-colors group w-full"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <TruckIcon className="h-5 w-5 text-foreground shrink-0" />
              <div className="min-w-0">
                <p className="font-semibold text-foreground">{ev.date} — {ev.standShort}</p>
                <p className="text-sm text-muted-foreground">{ev.client}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{ev.time}</span>
              <span className="flex items-center gap-1"><TruckIcon className="h-3.5 w-3.5" />{ev.vehicle.split("(")[0].trim()}</span>
              <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{ev.crew.join(", ")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${statusClass(ev.status)}`}>
                {statusLabel(ev.status)}
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
