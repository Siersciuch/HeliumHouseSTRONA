import { motion } from "framer-motion";
import { mockPeople } from "@/data/mock-data";
import { Phone, Mail, Briefcase } from "lucide-react";

const roleColor: Record<string, string> = {
  kierownik: "bg-emerald-500/20 text-emerald-400",
  montażysta: "bg-sky-400/20 text-sky-400",
  kierowca: "bg-orange-400/20 text-orange-400",
};

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
                  {p.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{p.name}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${roleColor[p.role] || "bg-muted text-muted-foreground"}`}>
                    {p.role}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" />{p.phone}</p>
              <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" />{p.email}</p>
              <p className="flex items-center gap-2"><Briefcase className="h-3.5 w-3.5" />{p.trips.length} wyjazdów</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
