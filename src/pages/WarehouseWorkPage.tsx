import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Camera, Clock, Square } from "lucide-react";
import { format } from "date-fns";

export default function WarehouseWorkPage() {
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleStart = () => {
    setStarted(true);
    setStartTime(new Date());
  };

  const handleAddPhoto = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      setPhotos((prev) => [...prev, url]);
    });
    e.target.value = "";
  };

  const handleFinish = () => {
    setEndTime(new Date());
    setFinished(true);
  };

  if (!started) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-5rem)]">
        <Button
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-xl px-12 py-8"
          onClick={handleStart}
        >
          <Clock className="h-6 w-6 mr-3" />
          Rozpocznij pracę na magazynie
        </Button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] gap-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-2">
          <p className="text-2xl font-bold">Praca zakończona</p>
          <p className="text-muted-foreground">
            {startTime && format(startTime, "HH:mm")} — {endTime && format(endTime, "HH:mm")}
          </p>
          <p className="text-muted-foreground">Zdjęcia: {photos.length}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-6 py-8">
      {/* Start time display */}
      <div className="bg-yellow-500 text-black rounded-xl px-6 py-4 text-center">
        <p className="text-sm font-medium">Rozpoczęto pracę na magazynie</p>
        <p className="text-3xl font-bold">{startTime && format(startTime, "HH:mm")}</p>
      </div>

      {/* Photo grid */}
      <div className="grid grid-cols-2 gap-4">
        {photos.map((photo, i) => (
          <div key={i} className="aspect-square rounded-xl border border-border overflow-hidden bg-muted">
            <img src={photo} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
        {/* Always show "add photo" square */}
        <button
          onClick={handleAddPhoto}
          className="aspect-square rounded-xl border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
        >
          <Camera className="h-8 w-8" />
          <span className="text-sm font-medium">Dodaj fotę</span>
        </button>
        {photos.length < 2 && (
          <button
            onClick={handleAddPhoto}
            className="aspect-square rounded-xl border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <Camera className="h-8 w-8" />
            <span className="text-sm font-medium">Dodaj fotę</span>
          </button>
        )}
      </div>

      <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />

      {/* Finish button */}
      <Button
        className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold text-lg py-6"
        onClick={handleFinish}
      >
        <Square className="h-5 w-5 mr-2" />
        Zakończ pracę
      </Button>
    </motion.div>
  );
}
