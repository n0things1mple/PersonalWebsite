import { type ReactNode } from "react";
import { cn } from "../../lib/utils";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(180px,1fr)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoGridItemProps {
  title: string;
  description: string;
  icon?: ReactNode;
  image?: string;
  tags?: string[];
  href?: string;
  className?: string;
  children?: ReactNode;
}

export function BentoGridItem({
  title,
  description,
  icon,
  image,
  tags,
  href,
  className,
  children,
}: BentoGridItemProps) {
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href
    ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: href.startsWith("http") ? "noopener noreferrer" : undefined }
    : {};

  return (
    <Wrapper
      {...(wrapperProps as any)}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6 transition-all duration-300",
        "hover:border-[var(--color-accent-violet)] hover:shadow-[0_0_30px_rgba(124,58,237,0.12)]",
        href && "cursor-pointer",
        className
      )}
    >
      {/* 悬停渐变背景 */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(124, 58, 237, 0.08), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        {image && (
          <div className="mb-4 overflow-hidden rounded-xl">
            <img
              src={image}
              alt={title}
              className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
        {icon && <div className="mb-3 text-[var(--color-accent-violet)]">{icon}</div>}
        <h3 className="mb-2 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-accent-violet)]">
          {title}
        </h3>
        <p className="mb-3 flex-grow text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {description}
        </p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[var(--color-bg-elevated)] px-2.5 py-0.5 text-xs text-[var(--color-accent-cyan)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {children}
      </div>
    </Wrapper>
  );
}
