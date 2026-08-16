import { AppScreen, Panel } from "./shell";

const FACTS = [
  { k: "Годы", v: "70", d: "Официальная версия системы" },
  { k: "Гостей накормлено", v: "∞", d: "Счётчик переполнен" },
  { k: "Чашек чая", v: "127 400", d: "И это только за последние годы" },
  { k: "Уровень терпения", v: "MAX", d: "Аппаратное ограничение снято" },
];

const RULES = [
  "Голодным из этого дома никто не уходит.",
  "Любая проблема сначала обсуждается за чаем.",
  "Слово Зебо Буви — финальная версия правды.",
  "Дом всегда открыт. Особенно неожиданно.",
  "Кто помогает на кухне — получает лучший кусок.",
];

export function MyWorld({ onBack }: { onBack: () => void }) {
  return (
    <AppScreen title="Мой мир" subtitle="Вселенная Зебо Мирзахакимовой в цифрах и правилах" onBack={onBack}>
      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {FACTS.map((f) => (
            <div key={f.k} className="surface-panel tap-card rounded-3xl p-8">
              <p className="text-lg uppercase tracking-[0.25em] text-muted-foreground">{f.k}</p>
              <p className="mt-3 font-display text-6xl font-black">
                <span className="gold-text">{f.v}</span>
              </p>
              <p className="mt-3 text-lg text-cream/70">{f.d}</p>
            </div>
          ))}
        </div>
        <Panel>
          <h2 className="text-3xl font-black md:text-5xl">
            <span className="gold-text">Законы этого дома</span>
          </h2>
          <ol className="mt-8 space-y-5">
            {RULES.map((r, i) => (
              <li key={r} className="flex items-start gap-5 text-2xl leading-relaxed text-cream/90 md:text-3xl">
                <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-gold/50 text-xl font-black text-gold">
                  {i + 1}
                </span>
                {r}
              </li>
            ))}
          </ol>
        </Panel>
      </div>
    </AppScreen>
  );
}
