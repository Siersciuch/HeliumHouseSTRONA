import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";
import { mockPeople } from "@/data/mock-data";
import { addDays, format, getDay } from "date-fns";

const DAYS_PL_SHORT = ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "Sb"];

export default function SchedulePage() {
  const today = new Date();
  const next14 = Array.from({ length: 14 }, (_, i) => addDays(today, i));

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex items-center gap-3">
        <CalendarClock className="h-6 w-6 text-foreground" />
        <h1 className="text-2xl font-bold">Grafik</h1>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-3 font-semibold text-foreground sticky left-0 bg-card z-10">Osoba</th>
              {next14.map((d) => (
                <th key={format(d, "MM-dd")} className="px-3 py-3 text-center font-medium text-muted-foreground min-w-[52px]">
                  <div>{format(d, "d")}</div>
                  <div className="text-[10px]">{DAYS_PL_SHORT[getDay(d)]}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockPeople.map((p) => (
              <tr key={p.id} className="border-b border-border/50">
                <td className="px-4 py-3 font-medium text-foreground sticky left-0 bg-card z-10 whitespace-nowrap">{p.name}</td>
                {next14.map((d, i) => {
                  const hasEvent = i < 5 && p.trips.length > i;
                  return (
                    <td key={format(d, "MM-dd")} className="px-3 py-3 text-center">
                      {hasEvent ? (
                        <span className="inline-block h-3 w-3 rounded-full bg-emerald-500/60" />
                      ) : (
                        <span className="inline-block h-3 w-3 rounded-full bg-muted/40" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
