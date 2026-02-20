import { useMemo } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
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
    return Array.from({ length: 120 }, () => ({
      x: rng() * 100,
      y: rng() * 100,
      size: 1 + rng() * 2.5,
      delay: rng() * 6,
      duration: 2 + rng() * 4,
    }));
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
          }}
        />
      ))}

      {/* Shooting star */}
      <div className="absolute animate-shooting-star opacity-0">
        <div className="w-[80px] h-[2px] bg-gradient-to-r from-transparent via-foreground/40 dark:via-white/60 to-transparent rounded-full" />
      </div>
    </div>
  );
}
