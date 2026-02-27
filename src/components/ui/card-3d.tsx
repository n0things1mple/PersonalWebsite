import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function Card3D({ children, className, containerClassName }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    setRotateX(-y / 15);
    setRotateY(x / 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className={cn("perspective-[1000px]", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={ref}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "relative transform-gpu rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]",
          className
        )}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** 3D 卡片内的浮起元素 — 放在 Card3D 内部使用 */
export function CardFloat({
  children,
  className,
  offset = 30,
}: {
  children: ReactNode;
  className?: string;
  offset?: number;
}) {
  return (
    <div
      className={cn("", className)}
      style={{ transform: `translateZ(${offset}px)`, transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
