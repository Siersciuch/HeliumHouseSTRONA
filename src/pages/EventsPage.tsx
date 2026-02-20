import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { mockEvents, type EventTrip } from "@/data/mock-events";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronRight, Plus, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableRow, TableHead, TableHeader } from "@/components/ui/table";
import { EditableCell } from "@/components/EditableCell";
import { AdminTable } from "@/components/AdminTable";


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
    case "completed": return "bg-emerald-500/20 text-emerald-400";
    case "in-progress": return "bg-orange-400/20 text-orange-400";
    case "cancelled": return "bg-destructive/20 text-destructive";
    default: return "bg-sky-400/20 text-sky-400";
  }
}

const eventFields: { key: keyof EventTrip; label: string }[] = [
  { key: "date", label: "Data" },
  { key: "standShort", label: "Rodzaj" },
  { key: "shopNumber", label: "Nr sklepu" },
  { key: "shopLocation", label: "Lokalizacja" },
  { key: "city", label: "Miasto" },
  { key: "address", label: "Adres" },
  { key: "eventDescription", label: "Opis eventu" },
  { key: "dateFrom", label: "Data od" },
  { key: "dateTo", label: "Data do" },
  { key: "startTimeRamp", label: "Start RAMPA" },
  { key: "startTimeShop", label: "Start SKLEP" },
  { key: "vehicle", label: "Samochód" },
  { key: "routeLength", label: "Długość trasy" },
  { key: "unloadType", label: "Rozładunek" },
  { key: "notes", label: "Uwagi" },
];

function EmptyEventForm() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <AdminTable>
        <TableBody>
          {eventFields.map((f) => (
            <TableRow key={f.key}>
              <EditableCell
                value={f.label}
                className="font-medium text-muted-foreground w-[180px] whitespace-nowrap text-sm py-2 px-3"
              />
              <EditableCell
                value=""
                className="text-sm py-2 px-3"
              />
            </TableRow>
          ))}
          <TableRow>
            <EditableCell value="Marki" className="font-medium text-muted-foreground w-[180px] text-sm py-2 px-3" />
            <EditableCell value="" className="text-sm py-2 px-3" />
          </TableRow>
          <TableRow>
            <EditableCell value="Testery" className="font-medium text-muted-foreground w-[180px] text-sm py-2 px-3" />
            <EditableCell value="" className="text-sm py-2 px-3" />
          </TableRow>
          <TableRow>
            <EditableCell value="Ekipa" className="font-medium text-muted-foreground w-[180px] text-sm py-2 px-3" />
            <EditableCell value="" className="text-sm py-2 px-3" />
          </TableRow>
        </TableBody>
      </AdminTable>
    </div>
  );
}

export default function EventsPage() {
  const navigate = useNavigate();
  const { user, isImpersonating, realUser } = useAuth();
  const isAdmin = isImpersonating ? realUser?.role === "admin" : user?.role === "admin";
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleExport = () => {
    const headers = eventFields.map((f) => f.label);
    headers.push("Marki", "Testery", "Ekipa", "Status");
    const rows = mockEvents.map((ev) => {
      const vals = eventFields.map((f) => {
        const v = ev[f.key];
        return Array.isArray(v) ? (v as string[]).join("; ") : String(v ?? "");
      });
      vals.push(
        ev.brands?.join("; ") || "",
        ev.testers?.join("; ") || "",
        ev.crew?.join("; ") || "",
        ev.status
      );
      return vals;
    });
    const csv = [headers.join("\t"), ...rows.map((r) => r.join("\t"))].join("\n");
    const blob = new Blob([csv], { type: "text/tab-separated-values;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "eventy.tsv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      console.log("Imported data:", text);
      // TODO: parse and merge into state
      alert("Dane zaimportowane (podgląd w konsoli). Pełna integracja wymaga backendu.");
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-bold">Eventy</h1>
        {isAdmin && (
          <div className="flex items-center gap-2 flex-wrap">
            <Button onClick={() => setShowAddDialog(true)} className="gap-1.5">
              <Plus className="h-4 w-4" /> Dodaj event
            </Button>
      <Button variant="outline" onClick={handleExport} className="gap-1.5">
              <Upload className="h-4 w-4" /> Eksportuj
            </Button>
            <Button variant="outline" asChild className="gap-1.5 cursor-pointer">
              <label>
                <Download className="h-4 w-4" /> Importuj
                <input type="file" accept=".tsv,.csv,.txt,.xlsx" onChange={handleImport} className="hidden" />
              </label>
            </Button>
          </div>
        )}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <AdminTable>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Data realizacji</TableHead>
              <TableHead>Rodzaj</TableHead>
              <TableHead>Samochód</TableHead>
              <TableHead>Ekipa</TableHead>
              <TableHead>Testery</TableHead>
              <TableHead>Godzina</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-8"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockEvents.map((ev) => (
              <TableRow
                key={ev.id}
                className="cursor-pointer hover:bg-accent/30"
                onClick={() => navigate(`/events/${ev.id}`)}
              >
                <EditableCell value={ev.id} className="text-muted-foreground font-mono text-xs" />
                <EditableCell value={ev.date} className="whitespace-nowrap" />
                <EditableCell value={ev.standShort} />
                <EditableCell value={ev.vehicle.split("(")[0].trim()} />
                <EditableCell value={ev.crew.join(", ")} />
                <EditableCell value={ev.testers?.join(", ") || "—"} />
                <EditableCell value={ev.time} />
                <td className="p-2">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${statusClass(ev.status)}`}>
                    {statusLabel(ev.status)}
                  </span>
                </td>
                <td className="p-2">
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </td>
              </TableRow>
            ))}
          </TableBody>
        </AdminTable>
      </div>

      {/* Add Event Dialog – dual form (montaż + demontaż) */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-4xl overflow-visible [&>button]:hidden">
          <DialogHeader>
            <DialogTitle>Dodaj event</DialogTitle>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-6">
            <EmptyEventForm />
            <EmptyEventForm />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Anuluj</Button>
            <Button onClick={() => { setShowAddDialog(false); alert("Event dodany (mock)."); }}>
              Zapisz eventy
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
