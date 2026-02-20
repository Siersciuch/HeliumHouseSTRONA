import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { mockEvents, type EventTrip } from "@/data/mock-events";
import { mockStands } from "@/data/mock-data";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Truck as TruckIcon,
  FlaskConical,
  Store,
  StickyNote,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    case "completed": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "in-progress": return "bg-orange-400/20 text-orange-400 border-orange-400/30";
    case "cancelled": return "bg-destructive/20 text-destructive border-destructive/30";
    default: return "bg-sky-400/20 text-sky-400 border-sky-400/30";
  }
}

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const ev = mockEvents.find((e) => e.id === id);

  if (!ev) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-muted-foreground">Nie znaleziono eventu.</p>
        <Button variant="outline" onClick={() => navigate("/events")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Wróć do listy
        </Button>
      </div>
    );
  }

  const stand = mockStands.find((s) => s.shortCode === ev.standShort);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/events")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold">{ev.date} — {ev.city}</h1>
          <p className="text-muted-foreground">{ev.client}</p>
        </div>
        <span className={`text-xs font-medium px-3 py-1.5 rounded-full border ${statusClass(ev.status)}`}>
          {statusLabel(ev.status)}
        </span>
      </div>

      {/* Info grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Section icon={Calendar} title="Data i godzina">
          <div className="space-y-1 text-sm">
            <p className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5 text-muted-foreground" /> {ev.date}</p>
            <p className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-muted-foreground" /> {ev.time}</p>
          </div>
        </Section>

        <Section icon={MapPin} title="Lokalizacja">
          <div className="space-y-1 text-sm">
            <p>{ev.city}</p>
            <p className="text-muted-foreground">{ev.client}</p>
          </div>
        </Section>

        <Section icon={Store} title="Stoisko">
          <div className="space-y-1 text-sm">
            <p className="font-medium">{ev.standShort}{stand ? ` — ${stand.fullName}` : ""}</p>
            {stand && (
              <>
                <p className="text-muted-foreground">{stand.dimensions} · {stand.weight}</p>
                {stand.needsTrailer && (
                  <span className="inline-block text-xs bg-orange-400/20 text-orange-400 px-2 py-0.5 rounded-full">
                    Wymaga przyczepy
                  </span>
                )}
              </>
            )}
          </div>
        </Section>

        <Section icon={TruckIcon} title="Pojazd">
          <p className="text-sm font-medium">{ev.vehicle}</p>
          {ev.hasTrailer && (
            <span className="inline-block mt-1 text-xs bg-sky-400/20 text-sky-400 px-2 py-0.5 rounded-full">
              + przyczepa
            </span>
          )}
        </Section>

        <Section icon={Users} title="Ekipa">
          <ul className="space-y-1 text-sm">
            {ev.crew.map((name) => (
              <li key={name} className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {name.charAt(0)}
                </div>
                {name}
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={FlaskConical} title="Testery">
          <div className="flex flex-wrap gap-2">
            {ev.testers.map((t) => (
              <span key={t} className="text-xs bg-muted px-2.5 py-1 rounded-full font-mono">{t}</span>
            ))}
          </div>
        </Section>
      </div>

      {/* Notes */}
      {ev.notes && (
        <Section icon={StickyNote} title="Notatki">
          <p className="text-sm text-muted-foreground">{ev.notes}</p>
        </Section>
      )}
    </motion.div>
  );
}
