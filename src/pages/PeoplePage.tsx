import { motion } from "framer-motion";
import { mockPeople } from "@/data/mock-data";
import { Phone, Mail, MapPin, Car, Shield } from "lucide-react";

export default function PeoplePage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <h1 className="text-2xl font-bold">Ludzie</h1>
      <div className="grid gap-3 sm:grid-cols-2">
        {mockPeople.map((p) => (
          <div key={p.id} className="bg-card border border-border rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full gradient-petrol flex items-center justify-center text-sm font-bold text-white">
                  {p.firstName.charAt(0)}{p.lastName.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{p.name}</p>
                  <div className="flex items-center gap-2">
                    {p.isAdmin && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">Admin</span>
                    )}
                    {p.drivingLicense && (
                      <span className="text-xs text-muted-foreground">kat. {p.drivingLicense}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              {p.phone && <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" />{p.phone}</p>}
              {p.email && <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" />{p.email}</p>}
              {p.city && <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{p.city}</p>}
              <p className="flex items-center gap-2"><Car className="h-3.5 w-3.5" />{p.trips.length} wyjazdów</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
