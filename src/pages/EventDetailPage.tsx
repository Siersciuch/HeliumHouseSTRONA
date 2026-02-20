import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { mockEvents, type EventTrip } from "@/data/mock-events";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableBody, TableRow } from "@/components/ui/table";
import { AdminTable } from "@/components/AdminTable";
import { EditableCell } from "@/components/EditableCell";

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

function AlarmVal({ items }: { items: string[] }) {
  if (!items || items.length === 0) return <span className="text-emerald-400 text-xs">Komplet</span>;
  return (
    <span className="flex items-center gap-1.5 text-destructive">
      <AlertTriangle className="h-3.5 w-3.5" />
      <span className="text-xs">{items.join(", ")}</span>
    </span>
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

  const eventName = ev.eventName || [ev.date, ev.standShort, ev.shopLocation || ev.city].filter(Boolean).join(" ");

  const rows: { label: string; value: string; isAlarm?: boolean; alarmItems?: string[] }[] = [
    { label: "ID eventu", value: ev.id },
    { label: "Data realizacji", value: ev.date },
    { label: "Rodzaj eventu", value: ev.standShort || "—" },
    { label: "Sklep / lokalizacja", value: ev.shopNumber ? `${ev.shopNumber} — ${ev.shopLocation}` : (ev.shopLocation || "—") },
    { label: "Nazwa eventu / katalog", value: eventName },
    { label: "Miejscowość i dokładny adres", value: [ev.city, ev.address].filter(Boolean).join(", ") || "—" },
    { label: "Telefony do sklepu", value: ev.shopPhones?.join(", ") || "—" },
    { label: "Opis lokalizacji", value: ev.locationDescription || "—" },
    { label: "Opis eventu", value: ev.eventDescription || "—" },
    { label: "Czas trwania eventu", value: ev.dateFrom && ev.dateTo ? `${ev.dateFrom} — ${ev.dateTo}` : "—" },
    { label: "Marki", value: ev.brands?.join(", ") || "—" },
    { label: "Testery do zabrania", value: ev.testers?.join(", ") || "—" },
    { label: "Brakujące testery", value: ev.missingTesters?.join(", ") || "", isAlarm: true, alarmItems: ev.missingTesters },
    { label: "Kontenty marek", value: ev.brandContents?.join(", ") || "—" },
    { label: "Brakujące kontenty", value: ev.missingContents?.join(", ") || "", isAlarm: true, alarmItems: ev.missingContents },
    { label: "Godz. startu — RAMPA", value: ev.startTimeRamp || "—" },
    { label: "Godz. startu — SKLEP", value: ev.startTimeShop || "—" },
    { label: "Samochody, przyczepy", value: ev.vehicles?.join(", ") || "—" },
    { label: "Czas nieobecności samochodów", value: ev.vehicleAbsenceFrom && ev.vehicleAbsenceTo ? `${ev.vehicleAbsenceFrom} → ${ev.vehicleAbsenceTo}` : "—" },
    { label: "Długość całej trasy", value: ev.routeLength || "—" },
    { label: "Czy rozładowujemy samochód", value: ev.unloadType || "—" },
    { label: "Ekipa", value: ev.crew?.join(", ") || "—" },
    { label: "Foty", value: ev.photos?.join(", ") || "—" },
    { label: "Foto-stoisko", value: ev.boothPhotos?.join(", ") || "—" },
    { label: "Foty tankowanie", value: ev.fuelPhotos?.join(", ") || "—" },
    { label: "Szpilka do rampy", value: ev.rampPin || "—" },
    { label: "Pogoda na trasie", value: ev.weatherOnRoute || "—" },
    { label: "PROTOKÓŁ", value: "—" },
    { label: "Opis drogi z rampy", value: ev.rampPathDescription || "—" },
    { label: "Uwagi ogólne", value: ev.notes || "—" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/events")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold">{eventName}</h1>
          <p className="text-muted-foreground">{ev.client || "Brak klienta"}</p>
        </div>
        <span className={`text-xs font-medium px-3 py-1.5 rounded-full border ${statusClass(ev.status)}`}>
          {statusLabel(ev.status)}
        </span>
      </div>

      {/* Full data table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <AdminTable>
          <TableBody>
            {rows.map((row, i) => {
              const isSection = row.label === "PROTOKÓŁ";
              return (
                <TableRow key={i} className={isSection ? "bg-muted/50" : ""}>
                  <EditableCell
                    value={row.label}
                    className="font-medium text-muted-foreground w-[240px] whitespace-nowrap text-sm py-2.5 px-4"
                  />
                  <EditableCell
                    value={isSection ? "—" : row.value}
                    className="text-sm py-2.5 px-4"
                  >
                    {row.isAlarm ? <AlarmVal items={row.alarmItems || []} /> : undefined}
                  </EditableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </AdminTable>
      </div>
    </motion.div>
  );
}
