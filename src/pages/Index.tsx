import React, { useMemo } from "react";
import { addDays, format, isToday, isTomorrow, isYesterday, getDay } from "date-fns";
import { pl } from "date-fns/locale";
import { motion } from "framer-motion";
import { getEventsByDate, type EventTrip } from "@/data/mock-events";
import { Truck as TruckIcon, ArrowRight } from "lucide-react";

const DAYS_PL = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

function getDayLabel(date: Date): string {
  if (isYesterday(date)) return "Wczoraj";
  if (isToday(date)) return "Dziś";
  if (isTomorrow(date)) return "Jutro";
  // Check day after tomorrow
  const dayAfterTomorrow = addDays(new Date(), 2);
  if (format(date, "yyyy-MM-dd") === format(dayAfterTomorrow, "yyyy-MM-dd")) return "Pojutrze";
  return DAYS_PL[getDay(date)];
}

type TileSize = "large" | "medium" | "small";

function getTileSize(date: Date): TileSize {
  if (isToday(date)) return "large";
  if (isTomorrow(date) || format(date, "yyyy-MM-dd") === format(addDays(new Date(), 2), "yyyy-MM-dd")) return "medium";
  return "small";
}

function getTileBgClass(date: Date): string {
  if (isYesterday(date)) return "bg-muted/60 border-muted-foreground/20";
  if (isToday(date)) return "border-success/50 bg-success/10";
  if (isTomorrow(date) || format(date, "yyyy-MM-dd") === format(addDays(new Date(), 2), "yyyy-MM-dd"))
    return "border-warning/40 bg-warning/8";
  return "border-primary/20 bg-primary/5";
}

function getStatusColor(status: EventTrip["status"]): string {
  switch (status) {
    case "completed": return "bg-success/20 text-success";
    case "in-progress": return "bg-warning/20 text-warning";
    case "cancelled": return "bg-destructive/20 text-destructive";
    default: return "bg-primary/15 text-primary";
  }
}

interface BusChipProps {
  event: EventTrip;
  onClick?: () => void;
}

function BusChip({ event, onClick }: BusChipProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 bg-card border border-border rounded-lg px-2.5 py-1.5 hover:shadow-glow hover:border-primary/40 transition-all text-left group"
    >
      <TruckIcon className="h-4 w-4 text-foreground shrink-0" />
      <span className="text-xs font-semibold text-foreground">{event.standShort}</span>
      <span className="text-xs text-muted-foreground">{event.city}</span>
      {event.hasTrailer && (
        <span className="text-[10px] bg-muted rounded px-1 py-0.5 text-muted-foreground">+P</span>
      )}
      <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
    </button>
  );
}

interface DayTileProps {
  date: Date;
  size: TileSize;
  events: EventTrip[];
  onSelectEvent?: (event: EventTrip) => void;
}

function DayTile({ date, size, events, onSelectEvent }: DayTileProps) {
  const label = getDayLabel(date);
  const bgClass = getTileBgClass(date);
  const dayNum = format(date, "d");
  const monthName = format(date, "LLLL", { locale: pl });

  const minH = size === "large" ? "min-h-[180px]" : size === "medium" ? "min-h-[120px]" : "min-h-[90px]";
  const padding = size === "large" ? "p-5" : size === "medium" ? "p-4" : "p-3";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border ${bgClass} ${minH} ${padding} transition-all`}
    >
      <div className="flex items-baseline gap-3 mb-3">
        <span className={`font-bold ${size === "large" ? "text-3xl" : size === "medium" ? "text-2xl" : "text-xl"}`}>
          {dayNum}
        </span>
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-xs text-muted-foreground/60">{monthName}</span>
      </div>

      {events.length > 0 ? (
        <div className={`flex flex-wrap gap-2 ${size === "small" ? "gap-1.5" : ""}`}>
          {events.map((ev) => (
            <BusChip key={ev.id} event={ev} onClick={() => onSelectEvent?.(ev)} />
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground/50 italic">Brak wyjazdów</p>
      )}
    </motion.div>
  );
}

interface EventDetailPanelProps {
  event: EventTrip | null;
  onClose: () => void;
}

function EventDetailPanel({ event, onClose }: EventDetailPanelProps) {
  if (!event) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        Kliknij na busa, aby zobaczyć szczegóły
      </div>
    );
  }

  return (
    <motion.div
      key={event.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">{event.standShort} — {event.city}</h3>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-sm">✕</button>
      </div>

      <div className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
        {event.status === "planned" ? "Zaplanowany" :
         event.status === "in-progress" ? "W trakcie" :
         event.status === "completed" ? "Zakończony" : "Anulowany"}
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Klient</p>
          <p className="font-medium">{event.client}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Ekipa</p>
          <p>{event.crew.join(", ")}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Pojazd</p>
          <p>{event.vehicle}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Testery</p>
          <p>{event.testers.join(", ")}</p>
        </div>
        {event.hasTrailer && (
          <div className="flex items-center gap-2 text-xs bg-muted/50 rounded-lg px-3 py-2">
            <TruckIcon className="h-3.5 w-3.5" />
            <span>Z przyczepą</span>
          </div>
        )}
        {event.notes && (
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Uwagi</p>
            <p className="text-sm">{event.notes}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const [selectedEvent, setSelectedEvent] = React.useState<EventTrip | null>(null);

  // Generate days: yesterday, today, +5 more days
  const days = useMemo(() => {
    const today = new Date();
    const result: { date: Date; events: EventTrip[] }[] = [];
    for (let i = -1; i <= 6; i++) {
      const d = addDays(today, i);
      const dateStr = format(d, "yyyy-MM-dd");
      result.push({ date: d, events: getEventsByDate(dateStr) });
    }
    return result;
  }, []);

  return (
    <div className="flex gap-4 h-[calc(100vh-5rem)]">
      {/* Calendar tiles — 2/3 */}
      <div className="w-2/3 overflow-y-auto pr-2 space-y-3 scrollbar-thin">
        <h1 className="text-xl font-bold sticky top-0 bg-background/80 backdrop-blur-sm py-2 z-10">Kalendarz</h1>
        {days.map(({ date, events }) => (
          <DayTile
            key={format(date, "yyyy-MM-dd")}
            date={date}
            size={getTileSize(date)}
            events={events}
            onSelectEvent={setSelectedEvent}
          />
        ))}
      </div>

      {/* Detail panel — 1/3 */}
      <div className="w-1/3 bg-card border border-border rounded-xl p-5 overflow-y-auto">
        <EventDetailPanel event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      </div>
    </div>
  );
}
