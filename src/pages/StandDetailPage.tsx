import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { mockStands } from "@/data/mock-data";
import { mockEvents } from "@/data/mock-events";
import { ArrowLeft, Store, Image as ImageIcon, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock stand components data
const standComponents: Record<string, { name: string; dimensions: string; quantity: number; weight: string }[]> = {
  BS: [
    { name: "Ścianka główna", dimensions: "200x250 cm", quantity: 1, weight: "15 kg" },
    { name: "Lada", dimensions: "120x60x100 cm", quantity: 1, weight: "25 kg" },
    { name: "Regał na testery", dimensions: "80x40x180 cm", quantity: 2, weight: "12 kg" },
    { name: "Monitor 55\"", dimensions: "125x72 cm", quantity: 1, weight: "18 kg" },
    { name: "Oświetlenie LED", dimensions: "—", quantity: 4, weight: "2 kg" },
    { name: "Krzesło barowe", dimensions: "—", quantity: 2, weight: "5 kg" },
  ],
  MUA: [
    { name: "Stanowisko makijażowe", dimensions: "100x60x200 cm", quantity: 2, weight: "20 kg" },
    { name: "Lustro LED", dimensions: "60x80 cm", quantity: 2, weight: "8 kg" },
    { name: "Stołek", dimensions: "—", quantity: 2, weight: "4 kg" },
    { name: "Organizer na kosmetyki", dimensions: "40x30x25 cm", quantity: 2, weight: "3 kg" },
  ],
  MUC: [
    { name: "Moduł ścienny", dimensions: "150x220 cm", quantity: 2, weight: "18 kg" },
    { name: "Półka ekspozycyjna", dimensions: "100x30 cm", quantity: 4, weight: "6 kg" },
    { name: "Oświetlenie", dimensions: "—", quantity: 6, weight: "1.5 kg" },
  ],
};

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
  const components = standComponents[stand.shortCode] || [];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-5xl">
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

      {/* Photos + PDF side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Photos */}
        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <ImageIcon className="h-5 w-5" /> Zdjęcia
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[4/3] rounded-lg bg-muted/60 flex items-center justify-center">
                <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
              </div>
            ))}
          </div>
        </div>

        {/* PDF placeholder */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Dokumentacja PDF</h2>
          <div className="aspect-[3/4] rounded-xl bg-muted/40 border border-border flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <Package className="h-10 w-10 text-muted-foreground/30" />
            <p className="text-sm">Brak pliku PDF</p>
            <p className="text-xs text-muted-foreground/60">Prześlij PDF aby wyświetlić podgląd</p>
          </div>
        </div>
      </div>

      {/* Stand components table */}
      {components.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Skład stoiska ({components.length} elementów)</h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">LP</TableHead>
                  <TableHead>Nazwa elementu</TableHead>
                  <TableHead>Wymiary</TableHead>
                  <TableHead className="text-center w-16">Szt.</TableHead>
                  <TableHead className="w-20">Waga</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {components.map((c, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell className="text-muted-foreground">{c.dimensions}</TableCell>
                    <TableCell className="text-center">{c.quantity}</TableCell>
                    <TableCell className="text-muted-foreground">{c.weight}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

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
