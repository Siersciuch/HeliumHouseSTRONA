import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { mockPeople } from "@/data/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Key, Car, Shield, ChevronRight } from "lucide-react";

export default function PeoplePage() {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <h1 className="text-2xl font-bold">Ludzie</h1>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imię i nazwisko</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>Miasto</TableHead>
              <TableHead>Prawo jazdy</TableHead>
              <TableHead className="text-center">Klucze</TableHead>
              <TableHead className="text-center">Admin</TableHead>
              <TableHead className="text-center">Wyjazdy</TableHead>
              <TableHead className="w-8"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPeople.map((p) => (
              <TableRow
                key={p.id}
                className="cursor-pointer hover:bg-accent/30"
                onClick={() => navigate(`/people/${p.id}`)}
              >
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full gradient-petrol flex items-center justify-center text-xs font-bold text-white shrink-0">
                      {p.firstName.charAt(0)}{p.lastName.charAt(0)}
                    </div>
                    <span className="font-medium">{p.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{p.phone || "—"}</TableCell>
                <TableCell className="text-muted-foreground">{p.city || "—"}</TableCell>
                <TableCell className="text-muted-foreground">{p.drivingLicense || "—"}</TableCell>
                <TableCell className="text-center">
                  {p.hasKeys && <Key className="h-4 w-4 text-warning mx-auto" />}
                </TableCell>
                <TableCell className="text-center">
                  {p.isAdmin && <Shield className="h-4 w-4 text-emerald-400 mx-auto" />}
                </TableCell>
                <TableCell className="text-center">
                  <span className="flex items-center justify-center gap-1 text-muted-foreground">
                    <Car className="h-3.5 w-3.5" />{p.trips.length}
                  </span>
                </TableCell>
                <TableCell>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}