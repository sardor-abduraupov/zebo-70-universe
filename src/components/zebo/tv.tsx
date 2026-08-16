import { useEffect, useState } from "react";
import { AppScreen } from "./shell";

type Channel = {
  id: string;
  name: string;
  headline: string;
  body: string[];
  tint: string;
  badge: string;
};

const CHANNELS: Channel[] = [
  {
    id: "news",
    name: "ЗЕБО НОВОСТИ",
    headline: "Главная новость дня: Зебо Мирзахакимовой — 70 лет",
    body: [
      "В доме зафиксирован рекордный уровень счастья за последние 70 лет.",
      "По данным наших корреспондентов, стол накрыт, чай горячий, все на месте.",
      "Эксперты подтверждают: энергия юбиляра превышает норму в 3 раза.",
    ],
    tint: "var(--gold)",
    badge: "ПРЯМОЙ ЭФИР",
  },
  {
    id: "weather",
    name: "ПОГОДА",
    headline: "Прогноз на ближайшие 30 лет",
    body: [
      "Сегодня: тепло. Ощущается как объятие.",
      "Завтра: солнечно, местами смех детей.",
      "На неделе: возможны внезапные гости и обильные осадки в виде плова.",
    ],
    tint: "var(--emerald)",
    badge: "МЕТЕОСЛУЖБА",
  },
  {
    id: "special",
    name: "СПЕЦВЫПУСК",
    headline: "70 лет: как один человек держит целую вселенную",
    body: [
      "Мы поговорили с теми, кто вырос рядом. Все сказали одно и то же слово: тепло.",
      "Историки утверждают, что дом Зебо Буви — центр притяжения семьи.",
      "Расследование продолжается. Пока ясно одно: без неё ничего бы не было.",
    ],
    tint: "var(--rose)",
    badge: "ЭКСКЛЮЗИВ",
  },
  {
    id: "ads",
    name: "РЕКЛАМА",
    headline: "Новинка: «Зебо-чай» — заваривается любовью",
    body: [
      "Один глоток — и вы уже рассказываете всё, что случилось за год.",
      "Побочные эффекты: желание остаться подольше.",
      "Спрашивайте на кухне у Зебо Буви. Бесплатно. Всегда.",
    ],
    tint: "var(--accent)",
    badge: "РЕКЛАМА",
  },
  {
    id: "show",
    name: "ШОУ",
    headline: "«Угадай, кто прав» — вечное шоу семьи",
    body: [
      "Правила простые: спорят все, права всегда Зебо Буви.",
      "Сезон 70-й. Рейтинги рекордные.",
      "Финал сегодня вечером за большим столом.",
    ],
    tint: "var(--chart-4)",
    badge: "ШОУ",
  },
];

const TICKER =
  "ЗЕБО 70.0 · СЕГОДНЯ ГЛАВНЫЙ ДЕНЬ ГОДА · ЗЕБО МИРЗАХАКИМОВОЙ — 70 · СТОЛ НАКРЫТ · ЧАЙ ГОРЯЧИЙ · ВСЕ В СБОРЕ · ";

export function ZeboTV({ onBack }: { onBack: () => void }) {
  const [idx, setIdx] = useState(0);
  const [flash, setFlash] = useState(false);
  const ch = CHANNELS[idx]!;

  useEffect(() => {
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 380);
    return () => clearTimeout(t);
  }, [idx]);

  return (
    <AppScreen title="Телеканал Зебо" subtitle="Пять программ. Один главный герой." onBack={onBack} accent="TV · HD">
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div
          className="surface-panel relative overflow-hidden rounded-[2rem]"
          style={{ borderColor: `color-mix(in oklab, ${ch.tint} 50%, transparent)` }}
        >
          {flash ? <div className="absolute inset-0 z-20 bg-cream/80" /> : null}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 opacity-20"
            style={{ background: `linear-gradient(180deg, ${ch.tint}, transparent)` }}
          />
          <div className="relative z-10 flex items-center justify-between gap-4 px-7 pt-7 md:px-10">
            <div className="flex items-center gap-4">
              <div
                className="rounded-xl px-4 py-2 font-display text-lg font-black tracking-tight"
                style={{ background: ch.tint, color: "var(--primary-foreground)" }}
              >
                ZEBO TV
              </div>
              <span className="text-lg font-bold uppercase tracking-[0.3em] text-cream/80">
                {ch.name}
              </span>
            </div>
            <span className="flex items-center gap-2 rounded-full border border-destructive/60 px-4 py-2 text-sm font-bold uppercase tracking-widest text-cream">
              <span className="h-3 w-3 animate-pulse rounded-full bg-destructive" />
              {ch.badge}
            </span>
          </div>

          <div key={ch.id} className="animate-[rise_0.5s_ease-out] px-7 py-12 md:px-14 md:py-20">
            <h2 className="text-4xl font-black leading-[1.05] md:text-6xl">
              <span style={{ color: ch.tint }}>{ch.headline}</span>
            </h2>
            <div className="mt-10 space-y-5">
              {ch.body.map((b) => (
                <p key={b} className="text-2xl leading-relaxed text-cream/90 md:text-3xl">
                  {b}
                </p>
              ))}
            </div>
          </div>

          <div className="relative z-10 overflow-hidden border-t border-border bg-background/70 py-4">
            <div className="animate-[ticker_26s_linear_infinite] whitespace-nowrap text-xl font-bold tracking-widest text-gold">
              {TICKER + TICKER}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-lg uppercase tracking-[0.3em] text-muted-foreground">Программы</p>
          {CHANNELS.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setIdx(i)}
              className={`focus-gold block w-full rounded-2xl border-2 px-6 py-5 text-left text-xl font-bold transition-all md:text-2xl ${
                i === idx
                  ? "gold-fill border-transparent"
                  : "surface-panel tap-card border-border text-cream"
              }`}
            >
              <span className="mr-3 opacity-60">{String(i + 1).padStart(2, "0")}</span>
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </AppScreen>
  );
}
