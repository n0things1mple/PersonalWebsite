import { type ReactNode } from "react";
import { cn } from "../../lib/utils";

interface AuroraBackgroundProps {
  children?: ReactNode;
  className?: string;
}

export function AuroraBackground({ children, className }: AuroraBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* 极光层 */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute -top-1/2 -left-1/4 h-[200%] w-[150%] animate-[aurora_13s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124, 58, 237, 0.3), transparent 70%), " +
              "radial-gradient(ellipse 60% 40% at 70% 50%, rgba(236, 72, 153, 0.15), transparent 60%), " +
              "radial-gradient(ellipse 50% 60% at 30% 80%, rgba(6, 182, 212, 0.2), transparent 60%)",
          }}
        />
        <div
          className="absolute -top-1/2 -right-1/4 h-[200%] w-[150%] animate-[aurora2_17s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 60% 30%, rgba(124, 58, 237, 0.2), transparent 60%), " +
              "radial-gradient(ellipse 50% 70% at 20% 60%, rgba(236, 72, 153, 0.1), transparent 50%)",
          }}
        />
      </div>
      {/* 噪点纹理叠加 */}
      <div className="absolute inset-0 z-[1] opacity-20 mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* 内容 */}
      <div className="relative z-10">{children}</div>
      <style>{`
        @keyframes aurora {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(2%, -3%) rotate(1deg); }
          66% { transform: translate(-1%, 2%) rotate(-1deg); }
        }
        @keyframes aurora2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-3%, 1%) rotate(-1deg); }
          50% { transform: translate(1%, -2%) rotate(1deg); }
          75% { transform: translate(2%, 3%) rotate(-0.5deg); }
        }
      `}</style>
    </div>
  );
}
