import { motion } from "framer-motion";

const DashboardPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Kalendarz wyjazdów — wkrótce z samochodzkami 🚐</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Dziś</p>
          <p className="text-3xl font-bold mt-2 text-gradient-petrol">2</p>
          <p className="text-sm text-muted-foreground mt-1">aktywne wyjazdy</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Ten tydzień</p>
          <p className="text-3xl font-bold mt-2">5</p>
          <p className="text-sm text-muted-foreground mt-1">zaplanowanych</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Ekipa</p>
          <p className="text-3xl font-bold mt-2">3</p>
          <p className="text-sm text-muted-foreground mt-1">dostępnych osób</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 min-h-[300px] flex items-center justify-center text-muted-foreground">
        <p>Kalendarz z kaflami i samochodzkami — Faza 2</p>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
