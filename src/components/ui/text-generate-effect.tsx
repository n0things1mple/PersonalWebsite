import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  delay?: number;
}

export function TextGenerateEffect({
  words,
  className,
  delay = 0,
}: TextGenerateEffectProps) {
  const [started, setStarted] = useState(false);
  const characters = words.split("");

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span className={cn("inline-block", className)}>
      <AnimatePresence>
        {characters.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={
              started
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 10, filter: "blur(4px)" }
            }
            transition={{
              duration: 0.3,
              delay: i * 0.03,
              ease: "easeOut",
            }}
            className="inline-block"
            style={{ whiteSpace: char === " " ? "pre" : undefined }}
          >
            {char}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
}
