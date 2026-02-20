import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { mockPeople } from "@/data/mock-data";
import { mockEvents } from "@/data/mock-events";
import { ArrowLeft, Phone, Mail, MapPin, Car, Shield, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function PersonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const person = mockPeople.find((p) => p.id === id);

  if (!person) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-muted-foreground">Nie znaleziono osoby.</p>
        <Button variant="outline" onClick={() => navigate("/people")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Wróć do listy
        </Button>
      </div>
    );
  }

  const personEvents = mockEvents.filter((ev) => person.trips.includes(ev.id));

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/people")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="h-12 w-12 rounded-full gradient-petrol flex items-center justify-center text-lg font-bold text-white">
          {person.firstName.charAt(0)}{person.lastName.charAt(0)}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{person.name}</h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {person.isAdmin && <span className="flex items-center gap-1 text-emerald-400"><Shield className="h-3.5 w-3.5" /> Admin</span>}
            {person.hasKeys && <span className="flex items-center gap-1 text-warning"><Key className="h-3.5 w-3.5" /> Klucze</span>}
            {person.drivingLicense && <span>Kat. {person.drivingLicense}</span>}
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-2 text-sm">
        {person.phone && <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" />{person.phone}</p>}
        {person.email && <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" />{person.email}</p>}
        {person.city && <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" />{person.city}</p>}
      </div>

      {/* Trips table */}
      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Car className="h-5 w-5" /> Wyjazdy ({personEvents.length})
        </h2>
        {personEvents.length > 0 ? (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Rodzaj</TableHead>
                  <TableHead>Miasto</TableHead>
                  <TableHead>Klient</TableHead>
                  <TableHead>Pojazd</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {personEvents.map((ev) => (
                  <TableRow key={ev.id} className="cursor-pointer hover:bg-accent/30" onClick={() => navigate(`/events/${ev.id}`)}>
                    <TableCell className="font-medium">{ev.date}</TableCell>
                    <TableCell>{ev.standShort}</TableCell>
                    <TableCell>{ev.city}</TableCell>
                    <TableCell className="text-muted-foreground">{ev.client}</TableCell>
                    <TableCell className="text-muted-foreground">{ev.vehicle.split("(")[0].trim()}</TableCell>
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