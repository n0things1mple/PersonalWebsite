import { useEffect, useState, useCallback } from "react";
import { cn } from "../../lib/utils";

interface TypewriterEffectProps {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export function TypewriterEffect({
  words,
  className,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseTime = 2000,
}: TypewriterEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const fullWord = words[currentWordIndex];

    if (!isDeleting) {
      // 打字中
      setCurrentText(fullWord.substring(0, currentText.length + 1));
      if (currentText.length + 1 === fullWord.length) {
        // 打完了，暂停后开始删除
        setTimeout(() => setIsDeleting(true), pauseTime);
        return;
      }
    } else {
      // 删除中
      setCurrentText(fullWord.substring(0, currentText.length - 1));
      if (currentText.length - 1 === 0) {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        return;
      }
    }
  }, [currentText, isDeleting, currentWordIndex, words, pauseTime]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, deletingSpeed, typingSpeed]);

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span>{currentText}</span>
      <span
        className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse"
        style={{ backgroundColor: "#e2a63d" }}
      />
    </span>
  );
}
