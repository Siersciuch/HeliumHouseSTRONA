import { motion } from "framer-motion";
import { mockBrandContent } from "@/data/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from "lucide-react";

export default function ContentPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <h1 className="text-2xl font-bold">Kontenty</h1>
      <p className="text-sm text-muted-foreground">Spis kontentów wideo marek do monitorów (pion / poziom)</p>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table>
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
                <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                <TableCell className="font-medium">{c.brand}</TableCell>
                <TableCell className="text-center">
                  {c.hasVertical ? (
                    <a href="#" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                      <Download className="h-3.5 w-3.5" /> Pobierz
                    </a>
                  ) : null}
                </TableCell>
                <TableCell className="text-center">
                  {c.hasHorizontal ? (
                    <a href="#" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                      <Download className="h-3.5 w-3.5" /> Pobierz
                    </a>
                  ) : null}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {!c.hasVertical && !c.hasHorizontal ? "brak" : !c.hasVertical ? "brak pionu" : !c.hasHorizontal ? "brak poziomu" : c.notes || "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
