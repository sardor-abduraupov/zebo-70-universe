import { useState } from "react";
import { AppScreen, Panel } from "./shell";

/**
 * ГАЛАКТИКА СЕМЬИ — demo-данные.
 * Замените name/role на реальные имена, когда будете готовы.
 */
type Node = { id: string; name: string; role: string; note: string };

const ORBIT_1: Node[] = [
  { id: "o1", name: "Имя · дети", role: "Первая орбита", note: "Здесь позже появится имя." },
  { id: "o2", name: "Имя · дети", role: "Первая орбита", note: "Здесь позже появится имя." },
  { id: "o3", name: "Имя · дети", role: "Первая орбита", note: "Здесь позже появится имя." },
  { id: "o4", name: "Имя · дети", role: "Первая орбита", note: "Здесь позже появится имя." },
];

const ORBIT_2: Node[] = [
  { id: "g1", name: "Имя · внуки", role: "Вторая орбита", note: "Место для имени внука/внучки." },
  { id: "g2", name: "Имя · внуки", role: "Вторая орбита", note: "Место для имени внука/внучки." },
  { id: "g3", name: "Имя · внуки", role: "Вторая орбита", note: "Место для имени внука/внучки." },
  { id: "g4", name: "Имя · внуки", role: "Вторая орбита", note: "Место для имени внука/внучки." },
  { id: "g5", name: "Имя · внуки", role: "Вторая орбита", note: "Место для имени внука/внучки." },
  { id: "g6", name: "Имя · внуки", role: "Вторая орбита", note: "Место для имени внука/внучки." },
  { id: "g7", name: "Имя · внуки", role: "Вторая орбита", note: "Место для имени внука/внучки." },
  { id: "g8", name: "Имя · внуки", role: "Вторая орбита", note: "Место для имени внука/внучки." },
];

const CENTER: Node = {
  id: "center",
  name: "Зебо Мирзахакимова",
  role: "Центр галактики",
  note: "Всё, что вращается вокруг — держится на ней.",
};

export function FamilyGalaxy({ onBack }: { onBack: () => void }) {
  const [sel, setSel] = useState<Node>(CENTER);

  const place = (i: number, total: number, r: number) => {
    const a = (i / total) * Math.PI * 2 - Math.PI / 2;
    return { left: `${50 + Math.cos(a) * r}%`, top: `${50 + Math.sin(a) * r}%` };
  };

  return (
    <AppScreen title="Моя семья" subtitle="Галактика, у которой одно солнце" onBack={onBack} accent="ДЕМО-СТРУКТУРА">
      <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="surface-panel relative aspect-square w-full overflow-hidden rounded-[2rem]">
          <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_50%_50%,color-mix(in_oklab,var(--gold)_25%,transparent),transparent_60%)]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/25" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[84%] w-[84%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/15" />

          <button
            type="button"
            onClick={() => setSel(CENTER)}
            className="focus-gold absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          >
            <span className="absolute inset-0 animate-[pulse-ring_3.2s_ease-out_infinite] rounded-full bg-gold/40" />
            <span className="gold-fill relative flex h-32 w-32 flex-col items-center justify-center rounded-full px-2 text-center text-sm font-black leading-tight shadow-[var(--shadow-gold)] transition hover:scale-105 md:h-44 md:w-44 md:text-lg">
              ЗЕБО
              <br />
              БУВИ
            </span>
          </button>

          {ORBIT_1.map((n, i) => (
            <button
              key={n.id}
              type="button"
              onClick={() => setSel(n)}
              style={place(i, ORBIT_1.length, 26)}
              className={`focus-gold absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 px-4 py-3 text-xs font-bold transition-all hover:scale-110 md:text-base ${
                sel.id === n.id ? "border-gold bg-gold/20 text-gold" : "border-cream/30 bg-background/70 text-cream/80"
              }`}
            >
              ●
            </button>
          ))}

          {ORBIT_2.map((n, i) => (
            <button
              key={n.id}
              type="button"
              onClick={() => setSel(n)}
              style={place(i, ORBIT_2.length, 42)}
              className={`focus-gold absolute z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 animate-[float_7s_ease-in-out_infinite] rounded-full transition-all hover:scale-150 md:h-8 md:w-8 ${
                sel.id === n.id ? "bg-gold" : "bg-cream/45"
              }`}
              aria-label={n.name}
            />
          ))}
        </div>

        <div className="space-y-6">
          <Panel>
            <p className="text-lg uppercase tracking-[0.3em] text-muted-foreground">{sel.role}</p>
            <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
              <span className="gold-text">{sel.name}</span>
            </h2>
            <p className="mt-6 text-2xl leading-relaxed text-cream/85">{sel.note}</p>
          </Panel>
          <Panel>
            <p className="text-xl leading-relaxed text-cream/80">
              Нажимайте на звёзды: первая орбита — дети, вторая — внуки. Имена можно добавить
              позже — структура уже готова.
            </p>
          </Panel>
        </div>
      </div>
    </AppScreen>
  );
}
