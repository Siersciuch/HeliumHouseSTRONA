import { motion } from "framer-motion";
import { mockTesters } from "@/data/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>LP</TableHead>
                    <TableHead>Nazwa</TableHead>
                    <TableHead className="text-center">Ilość szt.</TableHead>
                    <TableHead className="text-center">Poza magazynem</TableHead>
                    <TableHead>NFC</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Uwagi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((t, i) => (
                    <TableRow key={t.id}>
                      <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                      <TableCell className="font-medium">{t.name}</TableCell>
                      <TableCell className="text-center">{t.quantity > 0 ? t.quantity : "—"}</TableCell>
                      <TableCell className="text-center">{t.outCount > 0 ? t.outCount : "—"}</TableCell>
                      <TableCell className="text-muted-foreground font-mono text-xs">{t.nfcCode || "—"}</TableCell>
                      <TableCell className="text-muted-foreground">{t.assignedEvent || "—"}</TableCell>
                      <TableCell>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[t.status]}`}>
                          {t.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">{t.notes || "—"}</TableCell>
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