import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { mockPeople } from "@/data/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Key, Shield, ChevronRight, Check, X } from "lucide-react";

export default function PeoplePage() {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imię</TableHead>
                <TableHead>Nazwisko</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefon</TableHead>
                <TableHead>Miasto</TableHead>
                <TableHead>Prawo jazdy</TableHead>
                <TableHead className="text-center">Upr. elektr.</TableHead>
                <TableHead className="text-center">Upr. wysok.</TableHead>
                <TableHead className="text-center">Klucze mag.</TableHead>
                <TableHead className="text-center">2FA</TableHead>
                <TableHead>Urządzenia</TableHead>
                <TableHead>Ost. logowania</TableHead>
                <TableHead>Uwagi</TableHead>
                <TableHead className="text-center">Admin</TableHead>
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
                  <TableCell className="font-medium">{p.firstName}</TableCell>
                  <TableCell className="font-medium">{p.lastName || "—"}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{p.email || "—"}</TableCell>
                  <TableCell className="text-muted-foreground">{p.phone || "—"}</TableCell>
                  <TableCell className="text-muted-foreground">{p.city || "—"}</TableCell>
                  <TableCell className="text-muted-foreground">{p.drivingLicense || "—"}</TableCell>
                  <TableCell className="text-center">
                    {p.electricalCert ? <Check className="h-4 w-4 text-emerald-400 mx-auto" /> : <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />}
                  </TableCell>
                  <TableCell className="text-center">
                    {p.heightCert ? <Check className="h-4 w-4 text-emerald-400 mx-auto" /> : <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />}
                  </TableCell>
                  <TableCell className="text-center">
                    {p.hasKeys ? <Key className="h-4 w-4 text-warning mx-auto" /> : <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />}
                  </TableCell>
                  <TableCell className="text-center">
                    {p.twoFA ? <Check className="h-4 w-4 text-emerald-400 mx-auto" /> : <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">{p.devices || "—"}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{p.lastLogin || "—"}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{p.notes || "—"}</TableCell>
                  <TableCell className="text-center">
                    {p.isAdmin ? <Shield className="h-4 w-4 text-emerald-400 mx-auto" /> : <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />}
                  </TableCell>
                  <TableCell>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  );
}
