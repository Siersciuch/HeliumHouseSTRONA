import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { mockPeople } from "@/data/mock-data";
import { mockEvents } from "@/data/mock-events";
import { ArrowLeft, Phone, Mail, MapPin, Shield, Key, Car, IdCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { addDays, format, getDaysInMonth } from "date-fns";
import { pl } from "date-fns/locale";

// Billing months: 26th prev → 25th current
const billingMonths = [
  { label: "Styczeń", startMonth: 0, startDay: 26, endMonth: 1, endDay: 25 },
  { label: "Luty", startMonth: 1, startDay: 26, endMonth: 2, endDay: 25 },
  { label: "Marzec", startMonth: 2, startDay: 26, endMonth: 3, endDay: 25 },
  { label: "Kwiecień", startMonth: 3, startDay: 26, endMonth: 4, endDay: 25 },
];

function getBillingDays(bm: typeof billingMonths[0], year: number) {
  const days: Date[] = [];
  const start = new Date(year, bm.startMonth, bm.startDay);
  const end = new Date(year, bm.endMonth, bm.endDay);
  let d = new Date(start);
  while (d <= end) {
    days.push(new Date(d));
    d = addDays(d, 1);
  }
  return days;
}

const DAYS_SHORT = ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "Sb"];

export default function PersonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const person = mockPeople.find((p) => p.id === id);

  if (!person) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-muted-foreground">Nie znaleziono osoby.</p>
        <Button variant="outline" onClick={() => navigate("/people")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Wróć do listy
        </Button>
      </div>
    );
  }

  const personEvents = mockEvents.filter((ev) => person.trips.includes(ev.id));
  const year = new Date().getFullYear();

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/people")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="h-12 w-12 rounded-full gradient-petrol flex items-center justify-center text-lg font-bold text-white">
          {person.firstName.charAt(0)}{person.lastName.charAt(0) || ""}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{person.name}</h1>
        </div>
      </div>

      {/* All person info */}
      <div className="bg-card border border-border rounded-xl p-5 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
        {person.phone && (
          <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" />{person.phone}</div>
        )}
        {person.email && (
          <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" />{person.email}</div>
        )}
        {person.city && (
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" />{person.city}</div>
        )}
        {person.drivingLicense && (
          <div className="flex items-center gap-2"><Car className="h-4 w-4 text-muted-foreground" />Prawo jazdy: {person.drivingLicense}</div>
        )}
        {person.isAdmin && (
          <div className="flex items-center gap-2 text-emerald-400"><Shield className="h-4 w-4" /> Admin</div>
        )}
        {person.hasKeys && (
          <div className="flex items-center gap-2 text-warning"><Key className="h-4 w-4" /> Klucze</div>
        )}
        {person.electricalCert && (
          <div className="flex items-center gap-2"><IdCard className="h-4 w-4 text-muted-foreground" /> Uprawnienia elektryczne</div>
        )}
        {person.heightCert && (
          <div className="flex items-center gap-2"><IdCard className="h-4 w-4 text-muted-foreground" /> Praca na wysokości</div>
        )}
      </div>

      {/* Monthly billing tables */}
      {billingMonths.map((bm) => {
        const days = getBillingDays(bm, year);
        return (
          <div key={bm.label} className="space-y-2">
            <h2 className="text-lg font-semibold">{bm.label} {year}</h2>
            <div className="bg-card border border-border rounded-xl overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Data</TableHead>
                    <TableHead className="w-10">Dzień</TableHead>
                    <TableHead>Stoisko</TableHead>
                    <TableHead>Miasto</TableHead>
                    <TableHead>Klient</TableHead>
                    <TableHead>Pojazd</TableHead>
                    <TableHead className="w-20">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {days.map((day) => {
                    const dateStr = format(day, "yyyy-MM-dd");
                    const dayEvents = personEvents.filter((ev) => ev.date === dateStr);
                    const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                    const rowBg = isWeekend ? "bg-muted/30" : "";

                    if (dayEvents.length === 0) {
                      return (
                        <TableRow key={dateStr} className={rowBg}>
                          <TableCell className="text-xs text-muted-foreground">{format(day, "dd.MM")}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{DAYS_SHORT[day.getDay()]}</TableCell>
                          <TableCell colSpan={5} className="text-xs text-muted-foreground/50">—</TableCell>
                        </TableRow>
                      );
                    }

                    return dayEvents.map((ev, idx) => (
                      <TableRow
                        key={`${dateStr}-${ev.id}`}
                        className={`${rowBg} cursor-pointer hover:bg-accent/30`}
                        onClick={() => navigate(`/events/${ev.id}`)}
                      >
                        {idx === 0 && (
                          <>
                            <TableCell className="text-xs font-medium" rowSpan={dayEvents.length}>{format(day, "dd.MM")}</TableCell>
                            <TableCell className="text-xs text-muted-foreground" rowSpan={dayEvents.length}>{DAYS_SHORT[day.getDay()]}</TableCell>
                          </>
                        )}
                        <TableCell className="text-xs font-medium">{ev.standShort}</TableCell>
                        <TableCell className="text-xs">{ev.city}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{ev.client}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{ev.vehicle}</TableCell>
                        <TableCell>
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                            ev.status === "completed" ? "bg-emerald-500/20 text-emerald-400" :
                            ev.status === "in-progress" ? "bg-orange-400/20 text-orange-400" :
                            ev.status === "cancelled" ? "bg-destructive/20 text-destructive" :
                            "bg-sky-400/20 text-sky-400"
                          }`}>
                            {ev.status === "planned" ? "Plan" : ev.status === "in-progress" ? "W trakcie" : ev.status === "completed" ? "OK" : "Anul."}
                          </span>
                        </TableCell>
                      </TableRow>
                    ));
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
