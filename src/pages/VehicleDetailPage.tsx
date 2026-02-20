import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { mockVehicles } from "@/data/mock-data";
import { mockEvents } from "@/data/mock-events";
import { ArrowLeft, Truck as TruckIcon, Wrench, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/fleet")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <TruckIcon className="h-6 w-6 text-foreground" />
        <div>
          <h1 className="text-2xl font-bold">{vehicle.name}</h1>
          <p className="text-muted-foreground">{typeLabel[vehicle.type]}{vehicle.plate ? ` · ${vehicle.plate}` : ""}</p>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ml-auto ${statusColor[vehicle.status]}`}>
          {vehicle.status}
        </span>
      </div>

      {/* Info */}
      <div className="bg-card border border-border rounded-xl p-5 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /> Wyjazdów: {vehicle.trips.length}</div>
        <div className="flex items-center gap-2"><Wrench className="h-4 w-4 text-muted-foreground" /> Następny serwis: {vehicle.nextService}</div>
        {vehicle.plate && <div className="flex items-center gap-2"><TruckIcon className="h-4 w-4 text-muted-foreground" /> Rejestracja: {vehicle.plate}</div>}
      </div>

      {/* Events table */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Historia wyjazdów ({vehicleEvents.length})</h2>
        {vehicleEvents.length > 0 ? (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Stoisko</TableHead>
                  <TableHead>Miasto</TableHead>
                  <TableHead>Klient</TableHead>
                  <TableHead>Ekipa</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicleEvents.map((ev) => (
                  <TableRow key={ev.id} className="cursor-pointer hover:bg-accent/30" onClick={() => navigate(`/events/${ev.id}`)}>
                    <TableCell className="font-medium">{ev.date}</TableCell>
                    <TableCell>{ev.standShort}</TableCell>
                    <TableCell>{ev.city}</TableCell>
                    <TableCell className="text-muted-foreground">{ev.client}</TableCell>
                    <TableCell className="text-muted-foreground">{ev.crew.join(", ")}</TableCell>
                    <TableCell>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        ev.status === "completed" ? "bg-emerald-500/20 text-emerald-400" :
                        ev.status === "in-progress" ? "bg-orange-400/20 text-orange-400" :
                        ev.status === "cancelled" ? "bg-destructive/20 text-destructive" :
                        "bg-sky-400/20 text-sky-400"
                      }`}>
                        {ev.status === "planned" ? "Zaplanowany" : ev.status === "in-progress" ? "W trakcie" : ev.status === "completed" ? "Zakończony" : "Anulowany"}
                      </span>
                    </TableCell>
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
