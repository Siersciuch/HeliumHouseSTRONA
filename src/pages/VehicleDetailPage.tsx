import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { mockVehicles } from "@/data/mock-data";
import { mockEvents } from "@/data/mock-events";
import { ArrowLeft, Truck as TruckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EditableCell } from "@/components/EditableCell";

const statusColor: Record<string, string> = {
  "dostępny": "bg-emerald-500/20 text-emerald-400",
  "w trasie": "bg-orange-400/20 text-orange-400",
  "serwis": "bg-destructive/20 text-destructive",
};

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const vehicle = mockVehicles.find((v) => v.id === id);

  if (!vehicle) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-muted-foreground">Nie znaleziono pojazdu.</p>
        <Button variant="outline" onClick={() => navigate("/fleet")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Wróć do listy
        </Button>
      </div>
    );
  }

  const vehicleEvents = mockEvents.filter((ev) => vehicle.trips.includes(ev.id));

  const infoRows: { label: string; value: string }[] = [
    { label: "Nazwa/ID", value: vehicle.name },
    { label: "Rejestracja", value: vehicle.plate },
    { label: "Rocznik", value: vehicle.year },
    { label: "Przebieg (km)", value: vehicle.mileage },
    { label: "Przegląd do", value: vehicle.inspectionUntil },
    { label: "Ubezpieczenie do", value: vehicle.insuranceUntil },
    { label: "Serwis/olej", value: vehicle.serviceOil },
    { label: "DO NAPRAWY (opis)", value: vehicle.repairDescription },
    { label: "Status naprawy", value: vehicle.repairStatus },
    { label: "Uwagi", value: vehicle.notes },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/fleet")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <TruckIcon className="h-6 w-6 text-foreground" />
        <div>
          <h1 className="text-2xl font-bold">{vehicle.name}</h1>
          <p className="text-muted-foreground">{vehicle.plate || "Brak rejestracji"}</p>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ml-auto ${statusColor[vehicle.status]}`}>
          {vehicle.status}
        </span>
      </div>

      {/* Vehicle info table */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Dane pojazdu</h2>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <Table className="admin-table">
            <TableHeader>
              <TableRow>
                {infoRows.map((r) => (
                  <TableHead key={r.label}>{r.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                {infoRows.map((r) => (
                  <EditableCell key={r.label} value={r.value || "—"} />
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Trip history table */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Historia wyjazdów ({vehicleEvents.length})</h2>
        {vehicleEvents.length > 0 ? (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <Table className="admin-table">
              <TableHeader>
                <TableRow>
                  <TableHead>LP</TableHead>
                  <TableHead>Nazwa eventu</TableHead>
                  <TableHead>Sklep/Lokalizacja</TableHead>
                  <TableHead>Długość trasy (km)</TableHead>
                  <TableHead>Osoby które jechały</TableHead>
                  <TableHead>Foty licznika start/stop</TableHead>
                  <TableHead>Foty tankowanie</TableHead>
                  <TableHead>Uwagi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicleEvents.map((ev, idx) => (
                  <TableRow key={ev.id} className="cursor-pointer hover:bg-accent/30" onClick={() => navigate(`/events/${ev.id}`)}>
                    <EditableCell value={String(idx + 1)} />
                    <EditableCell value={ev.eventName || `${ev.date} ${ev.standShort} ${ev.city}`} className="font-medium" />
                    <EditableCell value={ev.shopLocation || ev.city || "—"} />
                    <EditableCell value={ev.routeLength || "—"} />
                    <EditableCell value={ev.crew.length ? ev.crew.join(", ") : "—"} className="text-muted-foreground" />
                    <EditableCell value={ev.photos.length ? ev.photos.join(", ") : "—"} />
                    <EditableCell value={ev.fuelPhotos.length ? ev.fuelPhotos.join(", ") : "—"} />
                    <EditableCell value={ev.notes || "—"} />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">Brak wpisanych wyjazdów</p>
        )}
      </div>
    </motion.div>
  );
}
