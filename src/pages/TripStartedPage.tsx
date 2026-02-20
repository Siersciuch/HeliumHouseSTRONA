import { motion } from "framer-motion";

export default function TripStartedPage() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-5rem)]">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="text-5xl font-bold text-foreground"
      >
        To se jedź!
      </motion.h1>
    </div>
  );
}
