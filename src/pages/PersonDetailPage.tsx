import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { mockPeople } from "@/data/mock-data";
import { mockEvents } from "@/data/mock-events";
import { ArrowLeft, Phone, Mail, MapPin, Shield, Key, Car, IdCard, Smartphone, Clock, StickyNote, ShieldCheck, UserCheck, Warehouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminTable } from "@/components/AdminTable";
import { EditableCell } from "@/components/EditableCell";
import { addDays, format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";

// Billing months: 26th prev → 25th current — reversed order (April first, January last)
const billingMonths = [
  { label: "Kwiecień", startMonth: 3, startDay: 26, endMonth: 4, endDay: 25 },
  { label: "Marzec", startMonth: 2, startDay: 26, endMonth: 3, endDay: 25 },
  { label: "Luty", startMonth: 1, startDay: 26, endMonth: 2, endDay: 25 },
  { label: "Styczeń", startMonth: 0, startDay: 26, endMonth: 1, endDay: 25 },
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
  const { user, impersonate, isImpersonating, realUser } = useAuth();
  const person = mockPeople.find((p) => p.id === id);
  const isAdmin = isImpersonating ? realUser?.role === "admin" : user?.role === "admin";

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
  const compactMonths = ["Marzec", "Kwiecień"];

  const infoItems: { icon: React.ReactNode; label: string; value: string; highlight?: boolean }[] = [
    { icon: <Phone className="h-4 w-4 text-muted-foreground" />, label: "Telefon", value: person.phone || "—" },
    { icon: <Mail className="h-4 w-4 text-muted-foreground" />, label: "Email", value: person.email || "—" },
    { icon: <MapPin className="h-4 w-4 text-muted-foreground" />, label: "Miasto", value: person.city || "—" },
    { icon: <Car className="h-4 w-4 text-muted-foreground" />, label: "Prawo jazdy", value: person.drivingLicense || "—" },
    { icon: <IdCard className="h-4 w-4 text-muted-foreground" />, label: "Upr. elektryczne", value: person.electricalCert ? "Tak" : "Nie" },
    { icon: <IdCard className="h-4 w-4 text-muted-foreground" />, label: "Upr. wysokościowe", value: person.heightCert ? "Tak" : "Nie" },
    { icon: <Key className="h-4 w-4 text-warning" />, label: "Klucze magazynu", value: person.hasKeys ? "Tak" : "Nie" },
    { icon: <ShieldCheck className="h-4 w-4 text-muted-foreground" />, label: "2FA", value: person.twoFA ? "Tak" : "Nie" },
    { icon: <Smartphone className="h-4 w-4 text-muted-foreground" />, label: "Urządzenia", value: person.devices || "—" },
    { icon: <Clock className="h-4 w-4 text-muted-foreground" />, label: "Ost. logowanie", value: person.lastLogin || "—" },
  ];

  if (person.isAdmin) {
    infoItems.push({ icon: <Shield className="h-4 w-4" />, label: "Rola", value: "Admin", highlight: true });
  }
  if (person.notes) {
    infoItems.push({ icon: <StickyNote className="h-4 w-4 text-muted-foreground" />, label: "Uwagi", value: person.notes });
  }

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
        {isAdmin && (
          <Button
            variant="destructive"
            size="lg"
            className="font-bold text-sm gap-2"
            onClick={() => {
              impersonate(person.id);
              navigate("/");
            }}
          >
            <UserCheck className="h-5 w-5" />
            Zaloguj się jako ta osoba
          </Button>
        )}
      </div>

      {/* Warehouse work button */}
      <Button
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg py-6"
        onClick={() => navigate("/warehouse-work")}
      >
        <Warehouse className="h-5 w-5 mr-2" />
        Rozpocznij pracę na magazynie
      </Button>

      {/* Person info as editable table */}
      <div className="bg-card border border-border rounded-xl">
        <AdminTable>
          <TableBody>
            {infoItems.map((item, i) => (
              <TableRow key={i}>
                <EditableCell value={item.label} className="font-medium text-muted-foreground w-[200px] whitespace-nowrap text-sm">
                  <span className="flex items-center gap-2">{item.icon} {item.label}</span>
                </EditableCell>
                <EditableCell
                  value={item.value}
                  className={`text-sm ${item.highlight ? "text-emerald-400" : ""}`}
                />
              </TableRow>
            ))}
          </TableBody>
        </AdminTable>
      </div>

      {/* Monthly billing tables */}
      {billingMonths.map((bm) => {
        const days = getBillingDays(bm, year);
        const isCompact = compactMonths.includes(bm.label);
        return (
          <div key={bm.label} className="space-y-2">
            <h2 className="text-lg font-semibold">{bm.label} {year}</h2>
            <div className="bg-card border border-border rounded-xl">
              <AdminTable>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Data</TableHead>
                    <TableHead className="w-10">Dzień</TableHead>
                    <TableHead>Stoisko</TableHead>
                    <TableHead>Miasto</TableHead>
                    <TableHead>Klient</TableHead>
                    <TableHead>Pojazd</TableHead>
                    <TableHead className="w-16">Godz.</TableHead>
                    <TableHead className="w-16">Foto</TableHead>
                    <TableHead className="w-20">Status</TableHead>
                    <TableHead className="w-20">Wartość</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...days].reverse().map((day) => {
                    const dateStr = format(day, "yyyy-MM-dd");
                    const dayEvents = personEvents.filter((ev) => ev.date === dateStr);
                    const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                    const rowBg = isWeekend ? "bg-muted/30" : "";
                    const compactCls = isCompact ? "py-0.5" : "";

                    if (dayEvents.length === 0) {
                      return (
                        <TableRow key={dateStr} className={rowBg}>
                          <EditableCell value={format(day, "dd.MM")} className={`text-xs text-muted-foreground ${compactCls}`} />
                          <EditableCell value={DAYS_SHORT[day.getDay()]} className={`text-xs text-muted-foreground ${compactCls}`} />
                          <EditableCell value="—" colSpan={8} className={`text-xs text-muted-foreground/50 ${compactCls}`} />
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
                            <EditableCell value={format(day, "dd.MM")} className={`text-xs font-medium ${compactCls}`} rowSpan={dayEvents.length} />
                            <EditableCell value={DAYS_SHORT[day.getDay()]} className={`text-xs text-muted-foreground ${compactCls}`} rowSpan={dayEvents.length} />
                          </>
                        )}
                        <EditableCell value={ev.standShort} className={`text-xs font-medium ${compactCls}`} />
                        <EditableCell value={ev.city} className={`text-xs ${compactCls}`} />
                        <EditableCell value={ev.client} className={`text-xs text-muted-foreground ${compactCls}`} />
                        <EditableCell value={ev.vehicle} className={`text-xs text-muted-foreground ${compactCls}`} />
                        <EditableCell value={ev.time || "—"} className={`text-xs ${compactCls}`} />
                        <EditableCell value={ev.photos?.length ? `${ev.photos.length} zdjęć` : "—"} className={`text-xs ${compactCls}`} />
                        <EditableCell value={ev.status === "planned" ? "Plan" : ev.status === "in-progress" ? "W trakcie" : ev.status === "completed" ? "OK" : "Anul."} className={compactCls}>
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                            ev.status === "completed" ? "bg-emerald-500/20 text-emerald-400" :
                            ev.status === "in-progress" ? "bg-orange-400/20 text-orange-400" :
                            ev.status === "cancelled" ? "bg-destructive/20 text-destructive" :
                            "bg-sky-400/20 text-sky-400"
                          }`}>
                            {ev.status === "planned" ? "Plan" : ev.status === "in-progress" ? "W trakcie" : ev.status === "completed" ? "OK" : "Anul."}
                          </span>
                        </EditableCell>
                        <EditableCell value="" className={`text-xs ${compactCls}`} />
                      </TableRow>
                    ));
                  })}
                </TableBody>
              </AdminTable>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
