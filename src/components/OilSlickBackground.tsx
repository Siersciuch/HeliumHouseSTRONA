export default function OilSlickBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[hsl(225,25%,6%)] dark:block hidden">
      {/* Petrol-blue blob */}
      <div
        className="absolute w-[60vw] h-[60vw] rounded-full opacity-20 mix-blend-screen will-change-transform animate-oil-drift-1"
        style={{
          background: "radial-gradient(circle, hsl(195, 80%, 40%) 0%, transparent 70%)",
          filter: "blur(100px)",
          top: "10%",
          left: "15%",
        }}
      />
      {/* Emerald-green blob */}
      <div
        className="absolute w-[50vw] h-[50vw] rounded-full opacity-15 mix-blend-screen will-change-transform animate-oil-drift-2"
        style={{
          background: "radial-gradient(circle, hsl(160, 70%, 35%) 0%, transparent 70%)",
          filter: "blur(100px)",
          top: "40%",
          right: "10%",
        }}
      />
      {/* Deep purple blob */}
      <div
        className="absolute w-[55vw] h-[55vw] rounded-full opacity-[0.18] mix-blend-screen will-change-transform animate-oil-drift-3"
        style={{
          background: "radial-gradient(circle, hsl(270, 60%, 45%) 0%, transparent 70%)",
          filter: "blur(120px)",
          bottom: "5%",
          left: "30%",
        }}
      />
      {/* Subtle magenta accent */}
      <div
        className="absolute w-[40vw] h-[40vw] rounded-full opacity-[0.12] mix-blend-screen will-change-transform animate-oil-drift-4"
        style={{
          background: "radial-gradient(circle, hsl(320, 55%, 50%) 0%, transparent 70%)",
          filter: "blur(90px)",
          top: "60%",
          left: "5%",
        }}
      />
    </div>
  );
}
