import React, { useMemo, useRef, useEffect, useCallback } from "react";
import { addDays, format, isToday, isTomorrow, isYesterday, getDay, startOfYear, endOfYear, differenceInDays } from "date-fns";
import { pl } from "date-fns/locale";
import { motion } from "framer-motion";
import { getEventsByDate, type EventTrip } from "@/data/mock-events";
import { Truck as TruckIcon, Play, FileText, Warehouse } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { mockPeople } from "@/data/mock-data";
import busImage from "@/assets/bus.png";

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

interface BusChipProps {
  event: EventTrip;
  onClick?: () => void;
}

function BusChip({ event, onClick }: BusChipProps) {
  return (
    <button
      onClick={onClick}
      className="relative hover:scale-105 hover:shadow-glow transition-all group"
      style={{ width: 240, height: 104 }}
    >
      <img src={busImage} alt="Bus" className="w-full h-full object-contain" />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ paddingBottom: 6 }}>
        <span className="text-base font-bold leading-tight text-gray-800 drop-shadow-sm">{event.standShort}</span>
        <span className="text-sm leading-tight text-gray-600 drop-shadow-sm">{event.city}</span>
      </div>
      {event.hasTrailer && (
        <span className="absolute -top-1.5 -right-1.5 text-xs font-bold bg-primary text-primary-foreground rounded px-1.5 py-0.5 shadow">+P</span>
      )}
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
      <div className="flex flex-col items-start shrink-0 w-16">
        <span className={`font-bold leading-none ${size === "large" ? "text-3xl" : size === "medium" ? "text-2xl" : "text-xl"}`}>
          {dayNum}
        </span>
        <span className={`${size === "large" ? "text-base" : size === "medium" ? "text-sm" : "text-xs"} text-foreground/70 capitalize`}>{monthName}</span>
        <span className={`${size === "large" ? "text-sm" : size === "medium" ? "text-xs" : "text-[11px]"} text-foreground/50`}>{dayShort}</span>
        {isToday(date) && (
          <span className="text-[10px] font-semibold bg-emerald-600/30 text-emerald-300 rounded-full px-2 py-0.5 mt-1">DZIŚ</span>
        )}
        {isTomorrow(date) && (
          <span className="text-[10px] font-semibold bg-orange-500/30 text-orange-300 rounded-full px-2 py-0.5 mt-1">JUTRO</span>
        )}
      </div>

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
  const navigate = useNavigate();
  const { user, isImpersonating, realUser } = useAuth();
  const isAdmin = isImpersonating ? realUser?.role === "admin" : user?.role === "admin";

  // Check if current user is assigned to this event's trip
  const isAssigned = useMemo(() => {
    if (!event || !user) return false;
    if (isAdmin) return true;
    // Check by matching user name to event crew
    if (event.crew.includes(user.name)) return true;
    // Check by matching user to person trips
    const person = mockPeople.find((p) => p.name === user.name);
    if (person && person.trips.includes(event.id)) return true;
    return false;
  }, [event, user, isAdmin]);

  if (!event) {
    return (
      <div className="space-y-3">
          <Button
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-sm py-5"
          onClick={() => navigate("/warehouse-work")}
        >
          <Warehouse className="h-5 w-5 mr-2" />
          Rozpocznij pracę na magazynie
        </Button>
        <Button
          className="w-full font-medium gradient-petrol text-white hover:opacity-90"
          onClick={() => navigate("/protocols")}
        >
          <FileText className="h-5 w-5 mr-2" />
          Generuj protokół
        </Button>
        <div className="flex items-center justify-center flex-1 text-muted-foreground text-sm pt-8">
          Kliknij na busa, aby zobaczyć szczegóły
        </div>
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

      {isAssigned && (
        <Button
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-base py-6"
          onClick={() => navigate("/trip-started")}
        >
          <Play className="h-5 w-5 mr-2" />
          Rozpocznij przejazd
        </Button>
      )}

      <div className="space-y-3 text-sm">
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Nazwa eventu</p>
          <p className="font-medium">{event.eventName || `${event.standShort} ${event.city}`}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Godziny</p>
          <p>{event.time || "—"}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Adres</p>
          <p>{event.address || "—"}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Telefon</p>
          <p>{event.shopPhones?.length ? event.shopPhones.join(", ") : "—"}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Kod pocztowy / dane</p>
          <p>{event.locationDescription || "—"}</p>
        </div>
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
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto pr-2 space-y-1.5"
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

      <div className="w-64 shrink-0 bg-card border border-border rounded-xl p-4 overflow-y-auto">
        <EventDetailPanel event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      </div>
    </div>
  );
}
