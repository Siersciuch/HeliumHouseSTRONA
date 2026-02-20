import { motion } from "framer-motion";
import { mockTesters } from "@/data/mock-data";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EditableCell } from "@/components/EditableCell";

const statusColor: Record<string, string> = {
  "dostępny": "bg-emerald-500/20 text-emerald-400",
  "na wyjeździe": "bg-orange-400/20 text-orange-400",
  "brak": "bg-destructive/20 text-destructive",
};

const categories = ["BS", "MUA", "MUC", "POP", "HSPA", "DBT"] as const;

export default function TestersPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h1 className="text-2xl font-bold">Testery — Magazyn</h1>
      {categories.map((cat) => {
        const items = mockTesters.filter((t) => t.category === cat);
        if (items.length === 0) return null;
        return (
          <div key={cat} className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground/80">{cat}</h2>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <Table className="admin-table">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">LP</TableHead>
                    <TableHead className="w-36">Nazwa</TableHead>
                    <TableHead className="text-center w-16">Szt.</TableHead>
                    <TableHead className="text-center w-16">Poza mag.</TableHead>
                    <TableHead className="min-w-[200px]">NFC</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Uwagi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((t, i) => (
                    <TableRow key={t.id}>
                      <EditableCell value={String(i + 1)} className="text-muted-foreground" />
                      <EditableCell value={t.name} className="font-medium" />
                      <EditableCell value={t.quantity > 0 ? String(t.quantity) : "—"} className="text-center" />
                      <EditableCell value={t.outCount > 0 ? String(t.outCount) : "—"} className="text-center" />
                      <EditableCell value={t.nfcCode || "—"} className="text-muted-foreground font-mono text-xs" />
                      <EditableCell value={t.assignedEvent || "—"} className="text-muted-foreground" />
                      <EditableCell value={t.status} className="">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[t.status]}`}>
                          {t.status}
                        </span>
                      </EditableCell>
                      <EditableCell value={t.notes || "—"} className="text-muted-foreground text-xs" />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
