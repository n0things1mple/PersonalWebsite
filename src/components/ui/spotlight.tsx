import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

interface SpotlightProps {
  className?: string;
  size?: number;
}

export function Spotlight({ className, size = 400 }: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      container.style.setProperty("--spotlight-x", `${mouseRef.current.x}px`);
      container.style.setProperty("--spotlight-y", `${mouseRef.current.y}px`);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0 z-[2] overflow-hidden", className)}
    >
      <div
        className="absolute opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: "var(--spotlight-x, 50%)",
          top: "var(--spotlight-y, 50%)",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(236, 72, 153, 0.08) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
    </div>
  );
}
