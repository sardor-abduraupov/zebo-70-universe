import { useState } from "react";
import { AppScreen, Panel, BigButton } from "./shell";

const YEARS: Record<
  string,
  { title: string; sub: string; lines: string[]; stats: { k: string; v: string }[] }
> = {
  "80": {
    title: "ЗЕБО 80.0",
    sub: "Версия с расширенным модулем мудрости",
    lines: [
      "Дом всё такой же шумный. Просто теперь внуки приезжают на своих машинах.",
      "Рецепты записаны, но всё равно вкуснее получается только у вас.",
      "Ваш телефон по-прежнему самый занятой в семье.",
    ],
    stats: [
      { k: "Уровень энергии", v: "98%" },
      { k: "Накормлено людей", v: "∞" },
      { k: "Статус", v: "Легенда" },
    ],
  },
  "90": {
    title: "ЗЕБО 90.0",
    sub: "Режим главной хранительницы истории",
    lines: [
      "Ваши истории стали семейным архивом, который слушают затаив дыхание.",
      "Правнуки уверены, что вы знаете абсолютно всё. Они правы.",
      "Каждое ваше слово в этом доме — закон и одновременно объятие.",
    ],
    stats: [
      { k: "Рассказано историй", v: "9 000+" },
      { k: "Поколений рядом", v: "4" },
      { k: "Статус", v: "Эпоха" },
    ],
  },
  "100": {
    title: "ЗЕБО 100.0",
    sub: "Столетие тепла",
    lines: [
      "Сто лет — это не цифра. Это большая семья, которая существует, потому что вы были.",
      "В каждом доме этой семьи будет ваш чай, ваши слова и ваша интонация.",
      "Дети ваших внуков будут говорить: «У нас так принято» — и это будет ваше «принято».",
      "Вы — начало всего, что здесь есть. И это никогда не закончится.",
    ],
    stats: [
      { k: "Тепла передано", v: "100 лет" },
      { k: "Сердец согрето", v: "не счесть" },
      { k: "Статус", v: "Вечная" },
    ],
  },
};

export function Future({ onBack }: { onBack: () => void }) {
  const [year, setYear] = useState<string | null>(null);
  const data = year ? YEARS[year]! : null;

  return (
    <AppScreen title="Будущее" subtitle="Выберите версию системы" onBack={onBack} accent="FORECAST">
      {!data ? (
        <div className="grid gap-8 md:grid-cols-3">
          {Object.keys(YEARS).map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => setYear(y)}
              className="focus-gold tap-card surface-panel group relative overflow-hidden rounded-[2rem] px-8 py-16 text-center"
            >
              <div className="font-display text-8xl font-black md:text-9xl">
                <span className="gold-text">{y}</span>
              </div>
              <p className="mt-6 text-2xl font-semibold text-cream/80">лет</p>
              <p className="mt-2 text-lg text-muted-foreground">{YEARS[y]!.sub}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="animate-[rise_0.6s_ease-out] space-y-8">
          <Panel className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(70%_60%_at_50%_0%,color-mix(in_oklab,var(--gold)_35%,transparent),transparent)]" />
            <div className="relative">
              <p className="text-xl uppercase tracking-[0.35em] text-muted-foreground">{data.sub}</p>
              <h2 className="mt-4 font-display text-6xl font-black md:text-8xl">
                <span className="gold-text">{data.title}</span>
              </h2>
              <div className="mt-10 space-y-6">
                {data.lines.map((l) => (
                  <p key={l} className="max-w-4xl text-2xl leading-relaxed text-cream/90 md:text-3xl">
                    {l}
                  </p>
                ))}
              </div>
              <div className="mt-12 grid gap-5 md:grid-cols-3">
                {data.stats.map((s) => (
                  <div key={s.k} className="rounded-2xl border border-gold/30 bg-background/40 px-6 py-6">
                    <p className="text-base uppercase tracking-[0.25em] text-muted-foreground">{s.k}</p>
                    <p className="mt-2 text-4xl font-black text-gold">{s.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
          <BigButton variant="outline" onClick={() => setYear(null)}>
            ← Другие годы
          </BigButton>
        </div>
      )}
    </AppScreen>
  );
}
