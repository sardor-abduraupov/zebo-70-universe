import type { ReactNode } from "react";

export function BigButton({
  children,
  onClick,
  variant = "solid",
  disabled,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "solid" | "ghost" | "outline";
  disabled?: boolean;
  className?: string;
}) {
  const base =
    "focus-gold select-none rounded-2xl px-7 py-5 text-xl md:text-2xl font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed";
  const styles =
    variant === "solid"
      ? "gold-fill shadow-[var(--shadow-gold)] hover:brightness-110 active:scale-[0.98]"
      : variant === "outline"
        ? "border-2 border-gold/60 text-gold hover:bg-gold/10 active:scale-[0.98]"
        : "text-cream/80 hover:text-gold hover:bg-secondary/60 active:scale-[0.98]";
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}

export function AppScreen({
  title,
  subtitle,
  onBack,
  children,
  accent,
}: {
  title: string;
  subtitle?: string;
  onBack: () => void;
  children: ReactNode;
  accent?: string;
}) {
  return (
    <div className="deep-bg grain-overlay min-h-screen animate-[rise_0.5s_ease-out]">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center gap-5 px-5 py-4 md:px-10 md:py-6">
          <button
            type="button"
            onClick={onBack}
            className="focus-gold flex items-center gap-3 rounded-2xl border-2 border-border px-5 py-3 text-lg font-semibold text-cream transition-all hover:border-gold hover:text-gold md:text-xl"
          >
            <span aria-hidden className="text-2xl">
              ←
            </span>
            Назад
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-black uppercase tracking-tight md:text-4xl">
              <span className="gold-text">{title}</span>
            </h1>
            {subtitle ? (
              <p className="truncate text-base text-muted-foreground md:text-lg">{subtitle}</p>
            ) : null}
          </div>
          <div className="ml-auto hidden text-right text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground lg:block">
            {accent ?? "ЗЕБО 70.0"}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1600px] px-5 py-8 md:px-10 md:py-14">{children}</main>
    </div>
  );
}

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`surface-panel rounded-3xl p-7 md:p-10 ${className}`}>{children}</div>;
}
