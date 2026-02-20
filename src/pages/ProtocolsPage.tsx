import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function ProtocolsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <h1 className="text-2xl font-bold">Protokoły</h1>
      <div className="bg-card border border-border rounded-xl p-10 flex flex-col items-center gap-4 text-center">
        <FileText className="h-12 w-12 text-muted-foreground/40" />
        <p className="text-muted-foreground">Tutaj będą wyświetlane protokoły z wyjazdów.</p>
        <p className="text-sm text-muted-foreground/60">Protokoły będą powiązane z kartami eventów.</p>
      </div>
    </motion.div>
  );
}
