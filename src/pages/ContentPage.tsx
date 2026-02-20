import { motion } from "framer-motion";
import { mockBrandContent } from "@/data/mock-data";
import { TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminTable } from "@/components/AdminTable";
import { Download } from "lucide-react";
import { EditableCell } from "@/components/EditableCell";

export default function ContentPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <h1 className="text-2xl font-bold">Kontenty</h1>
      <p className="text-sm text-muted-foreground">Spis kontentów wideo marek do monitorów (pion / poziom)</p>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <AdminTable>
          <TableHeader>
            <TableRow>
              <TableHead>LP</TableHead>
              <TableHead>Marka</TableHead>
              <TableHead className="text-center">Pion</TableHead>
              <TableHead className="text-center">Poziom</TableHead>
              <TableHead>Uwagi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockBrandContent.map((c, i) => (
              <TableRow key={c.id}>
                <EditableCell value={String(i + 1)} className="text-muted-foreground" />
                <EditableCell value={c.brand} className="font-medium" />
                <EditableCell value={c.hasVertical ? "Pobierz" : "brak"} className="text-center">
                  {c.hasVertical ? (
                    <a href="#" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                      <Download className="h-3.5 w-3.5" /> Pobierz
                    </a>
                  ) : null}
                </EditableCell>
                <EditableCell value={c.hasHorizontal ? "Pobierz" : "brak"} className="text-center">
                  {c.hasHorizontal ? (
                    <a href="#" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                      <Download className="h-3.5 w-3.5" /> Pobierz
                    </a>
                  ) : null}
                </EditableCell>
                <EditableCell
                  value={!c.hasVertical && !c.hasHorizontal ? "brak" : !c.hasVertical ? "brak pionu" : !c.hasHorizontal ? "brak poziomu" : c.notes || "—"}
                  className="text-muted-foreground text-sm"
                />
              </TableRow>
            ))}
          </TableBody>
        </AdminTable>
      </div>
    </motion.div>
  );
}
