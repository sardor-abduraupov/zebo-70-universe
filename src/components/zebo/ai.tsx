import { useEffect, useState } from "react";
import { AppScreen, Panel, BigButton } from "./shell";

const DIALOGS: { q: string; a: string }[] = [
  {
    q: "Что делать, если я не голоден?",
    a: "Система не обнаружила такую возможность. Рекомендуется поесть. Ещё одну тарелку.",
  },
  {
    q: "Кто главный человек в семье?",
    a: "Выполняется анализ… Результат очевиден: Зебо Буви. Других вариантов база данных не содержит.",
  },
  {
    q: "Сколько мне лет на самом деле?",
    a: "По документам — 70. По энергии — 35. По мудрости — 300. Среднее значение системе недоступно.",
  },
  {
    q: "Гости придут неожиданно. Что делать?",
    a: "Протокол «Дастархан» активирован. Расчётное время готовности стола: 12 минут. Паника не требуется.",
  },
  {
    q: "Кто лучше всех готовит?",
    a: "Поиск конкурентов… Конкуренты не найдены. Кухня Зебо Мирзахакимовой признана эталоном.",
  },
  {
    q: "Что делать, если внуки шумят?",
    a: "Это не ошибка. Это признак того, что дом живой. Рекомендуется улыбнуться и накрыть чай.",
  },
  {
    q: "Как дожить до 100 лет?",
    a: "Инструкция уже написана вами. Система лишь копирует ваш алгоритм: любовь, движение, чай и смех каждый день.",
  },
  {
    q: "Я устала. Это нормально?",
    a: "Да. Система рекомендует режим «отдых»: мягкое кресло, тёплый чай и 7 звонков от тех, кто вас любит.",
  },
];

export function ZeboAI({ onBack }: { onBack: () => void }) {
  const [history, setHistory] = useState<{ q: string; a: string }[]>([]);
  const [typing, setTyping] = useState<string | null>(null);
  const [shown, setShown] = useState("");

  useEffect(() => {
    if (typing === null) return;
    let i = 0;
    const t = setInterval(() => {
      i += 2;
      setShown(typing.slice(0, i));
      if (i >= typing.length) clearInterval(t);
    }, 22);
    return () => clearInterval(t);
  }, [typing]);

  const ask = (d: { q: string; a: string }) => {
    setHistory((h) => [...h, d]);
    setTyping(d.a);
    setShown("");
  };

  const available = DIALOGS.filter((d) => !history.some((h) => h.q === d.q));

  return (
    <AppScreen title="Зебо AI" subtitle="Умный помощник, который всегда на стороне Зебо Буви" onBack={onBack} accent="AI · ONLINE">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel className="min-h-[420px]">
          <div className="mb-6 flex items-center gap-4">
            <span className="relative flex h-5 w-5">
              <span className="absolute inline-flex h-full w-full animate-[pulse-ring_3.2s_ease-out_infinite] rounded-full bg-emerald" />
              <span className="relative inline-flex h-5 w-5 rounded-full bg-emerald" />
            </span>
            <span className="text-lg font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Система на связи
            </span>
          </div>

          {history.length === 0 ? (
            <p className="text-2xl leading-relaxed text-cream/85 md:text-3xl">
              Здравствуйте, Зебо Буви. Я ваш личный помощник. Выберите вопрос справа — я отвечу
              честно, но с уважением.
            </p>
          ) : (
            <div className="space-y-7">
              {history.map((h, i) => (
                <div key={h.q} className="animate-[rise_0.4s_ease-out] space-y-3">
                  <p className="ml-auto w-fit max-w-[85%] rounded-3xl rounded-br-md bg-secondary px-6 py-4 text-xl md:text-2xl">
                    {h.q}
                  </p>
                  <p className="w-fit max-w-[92%] rounded-3xl rounded-bl-md border border-gold/40 bg-background/40 px-6 py-5 text-xl leading-relaxed text-cream md:text-2xl">
                    {i === history.length - 1 ? shown : h.a}
                    {i === history.length - 1 && shown.length < h.a.length ? (
                      <span className="ml-1 inline-block h-6 w-3 animate-pulse bg-gold align-middle" />
                    ) : null}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Panel>

        <div className="space-y-4">
          <p className="text-lg uppercase tracking-[0.3em] text-muted-foreground">Выберите вопрос</p>
          {available.map((d) => (
            <button
              key={d.q}
              type="button"
              onClick={() => ask(d)}
              className="focus-gold tap-card surface-panel block w-full rounded-2xl px-6 py-5 text-left text-xl font-semibold text-cream md:text-2xl"
            >
              {d.q}
            </button>
          ))}
          {available.length === 0 ? (
            <BigButton variant="outline" onClick={() => setHistory([])} className="w-full">
              Начать разговор заново
            </BigButton>
          ) : null}
        </div>
      </div>
    </AppScreen>
  );
}
