import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { mockStands } from "@/data/mock-data";
import { mockEvents } from "@/data/mock-events";
import { ArrowLeft, Store, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function StandDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const stand = mockStands.find((s) => s.id === id);

  if (!stand) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-muted-foreground">Nie znaleziono stoiska.</p>
        <Button variant="outline" onClick={() => navigate("/stands")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Wróć do listy
        </Button>
      </div>
    );
  }

  const standEvents = mockEvents.filter((ev) => ev.standShort === stand.shortCode);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/stands")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Store className="h-6 w-6 text-foreground" />
        <div>
          <h1 className="text-2xl font-bold">{stand.shortCode}</h1>
          <p className="text-muted-foreground">{stand.fullName}</p>
        </div>
      </div>

      {/* Description */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Opis</h2>
        <p className="text-sm">{stand.description}</p>
      </div>

      {/* Photos placeholder */}
      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <ImageIcon className="h-5 w-5" /> Zdjęcia
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-[4/3] rounded-lg bg-muted/60 flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
            </div>
          ))}
        </div>
      </div>

      {/* Trips table */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Historia wyjazdów ({standEvents.length})</h2>
        {standEvents.length > 0 ? (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Miasto</TableHead>
                  <TableHead>Klient</TableHead>
                  <TableHead>Ekipa</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {standEvents.map((ev) => (
                  <TableRow key={ev.id} className="cursor-pointer hover:bg-accent/30" onClick={() => navigate(`/events/${ev.id}`)}>
                    <TableCell className="font-medium">{ev.date}</TableCell>
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
          <p className="text-muted-foreground text-sm">Brak wpisanych wyjazdów dla tego stoiska</p>
        )}
      </div>
    </motion.div>
  );
}