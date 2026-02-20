import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { mockPeople } from "@/data/mock-data";
import { TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Key, Shield, ChevronRight, Check, X } from "lucide-react";
import { EditableCell } from "@/components/EditableCell";
import { useAuth } from "@/contexts/AuthContext";
import { TableCell } from "@/components/ui/table";
import { AdminTable } from "@/components/AdminTable";

export default function PeoplePage() {
  const navigate = useNavigate();
  const { user, isImpersonating, realUser } = useAuth();
  const isAdmin = isImpersonating ? realUser?.role === "admin" : user?.role === "admin";

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <AdminTable>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 text-center">LP</TableHead>
                <TableHead>Imię</TableHead>
                <TableHead>Nazwisko</TableHead>
                <TableHead>Telefon</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-center">Klucze mag.</TableHead>
                <TableHead>Prawo jazdy</TableHead>
                <TableHead>Miasto</TableHead>
                <TableHead className="text-center">Upr. elektr.</TableHead>
                <TableHead className="text-center">Upr. wysok.</TableHead>
                <TableHead className="text-center">2FA</TableHead>
                <TableHead>Urządzenia</TableHead>
                <TableHead>Ost. logowania</TableHead>
                <TableHead>Uwagi</TableHead>
                <TableHead className="text-center">Admin</TableHead>
                <TableHead className="w-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPeople.map((p, index) => (
                <TableRow
                  key={p.id}
                  className="cursor-pointer hover:bg-accent/30"
                  onDoubleClick={(e) => {
                    if ((e.target as HTMLElement).tagName === "INPUT") return;
                    navigate(`/people/${p.id}`);
                  }}
                >
                  <TableCell className="text-center text-muted-foreground font-mono text-sm">{index + 1}</TableCell>
                  <EditableCell value={p.firstName} className="font-medium" />
                  <EditableCell value={p.lastName || "—"} className="font-medium" />
                  <EditableCell value={p.phone || "—"} className="text-muted-foreground" />
                  <EditableCell value={p.email || "—"} className="text-muted-foreground text-xs" />
                  <EditableCell value={p.hasKeys ? "Tak" : "Nie"} className="text-center">
                    {p.hasKeys ? <Key className="h-4 w-4 text-warning mx-auto" /> : <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />}
                  </EditableCell>
                  <EditableCell value={p.drivingLicense || "—"} className="text-muted-foreground" />
                  <EditableCell value={p.city || "—"} className="text-muted-foreground" />
                  <EditableCell value={p.electricalCert ? "Tak" : "Nie"} className="text-center">
                    {p.electricalCert ? <Check className="h-4 w-4 text-emerald-400 mx-auto" /> : <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />}
                  </EditableCell>
                  <EditableCell value={p.heightCert ? "Tak" : "Nie"} className="text-center">
                    {p.heightCert ? <Check className="h-4 w-4 text-emerald-400 mx-auto" /> : <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />}
                  </EditableCell>
                  <EditableCell value={p.twoFA ? "Tak" : "Nie"} className="text-center">
                    {p.twoFA ? <Check className="h-4 w-4 text-emerald-400 mx-auto" /> : <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />}
                  </EditableCell>
                  <EditableCell value={p.devices || "—"} className="text-muted-foreground text-xs" />
                  <EditableCell value={p.lastLogin || "—"} className="text-muted-foreground text-xs" />
                  <EditableCell value={p.notes || "—"} className="text-muted-foreground text-xs" />
                  <EditableCell value={p.isAdmin ? "Tak" : "Nie"} className="text-center">
                    {p.isAdmin ? <Shield className="h-4 w-4 text-emerald-400 mx-auto" /> : <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />}
                  </EditableCell>
                  <TableCell>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </AdminTable>
        </div>
      </div>
    </motion.div>
  );
}
