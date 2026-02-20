import React, { useMemo, useRef, useEffect, useCallback } from "react";
import { addDays, format, isToday, isTomorrow, isYesterday, getDay, startOfYear, endOfYear, differenceInDays } from "date-fns";
import { pl } from "date-fns/locale";
import { motion } from "framer-motion";
import { getEventsByDate, type EventTrip } from "@/data/mock-events";
import { Truck as TruckIcon, ArrowRight } from "lucide-react";

const DAYS_SHORT = ["Ndz", "Pon", "Wt", "Śr", "Czw", "Pt", "Sob"];

function isDayAfterTomorrow(date: Date): boolean {
  const dat = addDays(new Date(), 2);
  return format(date, "yyyy-MM-dd") === format(dat, "yyyy-MM-dd");
}

type TileSize = "large" | "medium" | "small";

function getTileSize(date: Date): TileSize {
  if (isToday(date)) return "large";
  if (isTomorrow(date) || isDayAfterTomorrow(date)) return "medium";
  return "small";
}

function getTileBgClass(date: Date): string {
  if (isYesterday(date)) return "border-muted-foreground/30 bg-muted/70";
  if (isToday(date)) return "border-emerald-500/60 bg-emerald-500/30";
  if (isTomorrow(date) || isDayAfterTomorrow(date)) return "border-orange-400/60 bg-orange-400/25";
  const today = new Date();
  if (date > today) return "border-sky-400/40 bg-sky-400/20";
  return "border-border/40 bg-muted/50";
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
  const bgClass = getTileBgClass(date);
  const dayNum = format(date, "d");
  const monthName = format(date, "LLLL", { locale: pl });
  const dayShort = DAYS_SHORT[getDay(date)];

  const minH = size === "large" ? "min-h-[156px]" : size === "medium" ? "min-h-[120px]" : "min-h-[72px]";
  const padding = size === "large" ? "p-5" : size === "medium" ? "p-4" : "p-3";

  return (
    <div className={`rounded-xl border ${bgClass} ${minH} ${padding} transition-all flex gap-4`}>
      {/* Date column — vertical stack */}
      <div className="flex flex-col items-start shrink-0 w-16">
        <span className={`font-bold leading-none ${size === "large" ? "text-3xl" : size === "medium" ? "text-2xl" : "text-xl"}`}>
          {dayNum}
        </span>
        <span className={`${size === "large" ? "text-sm" : "text-xs"} text-foreground/70 capitalize`}>{monthName}</span>
        <span className={`${size === "large" ? "text-xs" : "text-[11px]"} text-foreground/50`}>{dayShort}</span>
        {isToday(date) && (
          <span className="text-[10px] font-semibold bg-emerald-600/30 text-emerald-300 rounded-full px-2 py-0.5 mt-1">DZIŚ</span>
        )}
        {isTomorrow(date) && (
          <span className="text-[10px] font-semibold bg-orange-500/30 text-orange-300 rounded-full px-2 py-0.5 mt-1">JUTRO</span>
        )}
        {isDayAfterTomorrow(date) && (
          <span className="text-[10px] font-semibold bg-orange-500/30 text-orange-300 rounded-full px-2 py-0.5 mt-1">POJUTRZE</span>
        )}
      </div>

      {/* Bus chips — pushed right */}
      <div className="flex-1 flex flex-wrap gap-2 items-start justify-end content-start">
        {events.map((ev) => (
          <BusChip key={ev.id} event={ev} onClick={() => onSelectEvent?.(ev)} />
        ))}
      </div>
    </div>
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const yesterdayRef = useRef<HTMLDivElement>(null);

  const days = useMemo(() => {
    const now = new Date();
    const yearStart = startOfYear(now);
    const yearEnd = endOfYear(now);
    const totalDays = differenceInDays(yearEnd, yearStart) + 1;

    const result: { date: Date; events: EventTrip[] }[] = [];
    for (let i = totalDays - 1; i >= 0; i--) {
      const d = addDays(yearStart, i);
      const dateStr = format(d, "yyyy-MM-dd");
      result.push({ date: d, events: getEventsByDate(dateStr) });
    }
    return result;
  }, []);

  const scrollToHome = useCallback(() => {
    if (yesterdayRef.current) {
      yesterdayRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (yesterdayRef.current) {
      yesterdayRef.current.scrollIntoView({ block: "end" });
    }
  }, []);

  useEffect(() => {
    const handler = () => scrollToHome();
    window.addEventListener("scroll-to-today", handler);
    return () => window.removeEventListener("scroll-to-today", handler);
  }, [scrollToHome]);

  return (
    <div className="flex gap-4 h-[calc(100vh-5rem)]">
      {/* Calendar tiles — 3/4 */}
      <div
        ref={scrollRef}
        className="w-3/4 overflow-y-auto pr-2 space-y-1.5"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {days.map(({ date, events }) => (
          <div key={format(date, "yyyy-MM-dd")} ref={isYesterday(date) ? yesterdayRef : undefined}>
            <DayTile
              date={date}
              size={getTileSize(date)}
              events={events}
              onSelectEvent={setSelectedEvent}
            />
          </div>
        ))}
      </div>

      {/* Detail panel — 1/4 */}
      <div className="w-1/4 bg-card border border-border rounded-xl p-4 overflow-y-auto">
        <EventDetailPanel event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      </div>
    </div>
  );
}