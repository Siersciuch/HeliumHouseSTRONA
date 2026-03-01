import { motion } from "framer-motion";
import { mockShops } from "@/data/mock-shops";
import { TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminTable } from "@/components/AdminTable";
import { Check, X } from "lucide-react";
import { EditableCell } from "@/components/EditableCell";

export default function ShopsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <h1 className="text-2xl font-bold">Sklepy Douglas</h1>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <AdminTable>
            <TableHeader>
              <TableRow>
                <TableHead className="w-14">Nr filii</TableHead>
                <TableHead>Galeria / Lokalizacja</TableHead>
                <TableHead>Adres</TableHead>
                <TableHead>Kod pocztowy</TableHead>
                <TableHead>Telefon</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefon 2</TableHead>
                <TableHead>Godziny otwarcia</TableHead>
                <TableHead className="text-center">Winda</TableHead>
                <TableHead>Odległość</TableHead>
                <TableHead>Czas dojazdu</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockShops.map((s) => (
                <TableRow key={s.id}>
                  <EditableCell value={String(s.branchNo)} className="font-medium" />
                  <EditableCell value={s.gallery} className="font-medium" />
                  <EditableCell value={s.address} className="text-muted-foreground text-xs" />
                  <EditableCell value={s.postalCode} className="text-muted-foreground text-xs" />
                  <EditableCell value={s.phone} className="text-muted-foreground text-xs" />
                  <EditableCell value={s.email} className="text-muted-foreground text-xs" />
                  <EditableCell value={s.phone2 || ""} className="text-muted-foreground text-xs" />
                  <EditableCell value={s.hours} className="text-muted-foreground text-xs" />
                  <EditableCell value={s.hasElevator ? "Tak" : "Nie"} className="text-center">
                    {s.hasElevator ? <Check className="h-4 w-4 text-emerald-400 mx-auto" /> : <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />}
                  </EditableCell>
                  <EditableCell value={s.distance} className="text-muted-foreground" />
                  <EditableCell value={s.travelTime} className="text-muted-foreground" />
                </TableRow>
              ))}
            </TableBody>
          </AdminTable>
        </div>
      </div>
    </motion.div>
  );
}
