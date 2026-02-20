import { useMemo } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

export default function SpaceBackground() {
  const stars = useMemo<Star[]>(() => {
    const rng = seededRandom(42);
    return Array.from({ length: 250 }, () => {
      const brightness = rng();
      return {
        x: rng() * 100,
        y: rng() * 100,
        size: brightness > 0.92 ? 2.5 + rng() * 1.5 : 1 + rng() * 2,
        delay: rng() * 6,
        duration: 2 + rng() * 4,
        opacity: brightness > 0.85 ? 0.7 + rng() * 0.3 : 0.2 + rng() * 0.4,
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Stars */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-foreground/60 dark:bg-white animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            opacity: star.opacity,
          }}
        />
      ))}

      {/* Nebula 1 - petrol blue, top-left */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full animate-nebula-1 mix-blend-screen dark:mix-blend-screen opacity-[0.06] dark:opacity-[0.12]"
        style={{
          top: "10%",
          left: "5%",
          background: "radial-gradient(circle, hsl(195 80% 40% / 0.6) 0%, hsl(195 80% 35% / 0.2) 40%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      {/* Nebula 2 - purple, center-right */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full animate-nebula-2 mix-blend-screen dark:mix-blend-screen opacity-[0.05] dark:opacity-[0.10]"
        style={{
          top: "40%",
          right: "10%",
          background: "radial-gradient(circle, hsl(260 65% 55% / 0.6) 0%, hsl(260 60% 50% / 0.2) 40%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      {/* Nebula 3 - emerald, bottom-left */}
      <div
        className="absolute w-[550px] h-[550px] rounded-full animate-nebula-3 mix-blend-screen dark:mix-blend-screen opacity-[0.05] dark:opacity-[0.11]"
        style={{
          bottom: "5%",
          left: "25%",
          background: "radial-gradient(circle, hsl(160 60% 45% / 0.5) 0%, hsl(160 55% 40% / 0.2) 40%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      {/* Shooting star */}
      <div className="absolute animate-shooting-star opacity-0">
        <div className="w-[80px] h-[2px] bg-gradient-to-r from-transparent via-foreground/40 dark:via-white/60 to-transparent rounded-full" />
      </div>
    </div>
  );
}
