import { motion } from "framer-motion";

const placeholder = (title: string, desc: string) => () => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
    <h1 className="text-2xl font-bold">{title}</h1>
    <p className="text-muted-foreground">{desc}</p>
    <div className="bg-card border border-border rounded-xl p-12 flex items-center justify-center min-h-[400px] text-muted-foreground">
      W budowie...
    </div>
  </motion.div>
);

export const EventsPage = placeholder("Eventy", "Lista wszystkich eventów");
export const PeoplePage = placeholder("Ludzie", "Zarządzanie ekipą");
export const FleetPage = placeholder("Flota", "Pojazdy i przyczepy");
export const TestersPage = placeholder("Testery", "Sprzęt testowy");
export const StandsPage = placeholder("Stoiska", "Katalog stoisk");
export const KnowledgePage = placeholder("Baza Wiedzy", "Dokumentacja i materiały");
export const SchedulePage = placeholder("Grafik", "Harmonogram pracy");
