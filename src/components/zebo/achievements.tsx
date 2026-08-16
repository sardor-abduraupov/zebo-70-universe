import { AppScreen, Panel } from "./shell";

const ITEMS = [
  { icon: "★", title: "70 лет", desc: "Главное достижение. Разблокировано сегодня.", p: 100, hero: true },
  { icon: "◎", title: "Мастер плова", desc: "Кулинарный уровень: недостижимый.", p: 100 },
  { icon: "✦", title: "Хранительница историй", desc: "Рассказано больше историй, чем в любой книге.", p: 100 },
  { icon: "♥", title: "Центр притяжения", desc: "Все дороги семьи ведут к вашему столу.", p: 100 },
  { icon: "☕", title: "Бесконечный чайник", desc: "Чай никогда не заканчивается. Проверено гостями.", p: 96 },
  { icon: "☎", title: "Быстрее интернета", desc: "Новости семьи узнаёте первой.", p: 92 },
  { icon: "✿", title: "Терпение уровня 100", desc: "Выдержала всех внуков одновременно.", p: 88 },
  { icon: "∞", title: "Курс на 100 лет", desc: "Прогресс идёт по плану. Не останавливайтесь.", p: 70 },
];

export function Achievements({ onBack }: { onBack: () => void }) {
  const total = Math.round(ITEMS.reduce((a, b) => a + b.p, 0) / ITEMS.length);

  return (
    <AppScreen title="Достижения" subtitle="Награды, заработанные за 70 лет" onBack={onBack} accent={`Общий прогресс: ${total}%`}>
      <div className="space-y-8">
        <Panel className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 animate-[shimmer_3.4s_linear_infinite] opacity-25 [background:linear-gradient(100deg,transparent_35%,color-mix(in_oklab,var(--gold)_60%,transparent)_50%,transparent_65%)] [background-size:200%_100%]" />
          <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            <div className="gold-fill flex h-40 w-40 shrink-0 items-center justify-center rounded-full text-7xl shadow-[var(--shadow-gold)]">
              ★
            </div>
            <div>
              <p className="text-xl uppercase tracking-[0.35em] text-muted-foreground">Легендарная награда</p>
              <h2 className="mt-2 font-display text-6xl font-black md:text-8xl">
                <span className="gold-text">70 ЛЕТ</span>
              </h2>
              <p className="mt-4 max-w-2xl text-2xl text-cream/85">
                Зебо Мирзахакимова. Достижение получено за семьдесят лет любви, терпения и
                бесконечного гостеприимства.
              </p>
            </div>
          </div>
        </Panel>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {ITEMS.filter((i) => !i.hero).map((it) => (
            <div key={it.title} className="surface-panel tap-card rounded-3xl p-7">
              <div className="flex items-start gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-gold/50 text-3xl text-gold">
                  {it.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-2xl font-black text-cream">{it.title}</h3>
                  <p className="mt-2 text-lg leading-relaxed text-muted-foreground">{it.desc}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-secondary">
                  <div className="gold-fill h-full rounded-full" style={{ width: `${it.p}%` }} />
                </div>
                <span className="text-lg font-bold text-gold">{it.p}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppScreen>
  );
}
