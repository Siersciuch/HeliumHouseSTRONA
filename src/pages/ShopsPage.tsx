import { motion } from "framer-motion";
import { mockShops } from "@/data/mock-shops";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";

export default function ShopsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <h1 className="text-2xl font-bold">Sklepy Douglas</h1>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
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
                  <TableCell className="font-medium">{s.branchNo}</TableCell>
                  <TableCell className="font-medium">{s.gallery}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{s.address}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{s.postalCode}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{s.phone}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{s.email}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{s.phone2 || "—"}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{s.hours}</TableCell>
                  <TableCell className="text-center">
                    {s.hasElevator ? <Check className="h-4 w-4 text-emerald-400 mx-auto" /> : <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{s.distance}</TableCell>
                  <TableCell className="text-muted-foreground">{s.travelTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  );
}
