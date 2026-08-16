import { useState } from "react";
import { AppScreen, Panel, BigButton } from "./shell";

type Q = { question: string; options: string[]; correct: number; reaction: string };

const GUESS: Q[] = [
  {
    question: "Что выберет Зебо Буви в гостях?",
    options: ["Накормить всех", "Сесть отдыхать"],
    correct: 0,
    reaction: "Конечно! Сначала все сыты, потом всё остальное.",
  },
  {
    question: "Чай или кофе?",
    options: ["Чай", "Кофе"],
    correct: 0,
    reaction: "Чай. И обязательно горячий, и обязательно с разговором.",
  },
  {
    question: "Что скажет Зебо Буви, если вы съели одну тарелку?",
    options: ["«Молодец, хватит»", "«Ещё немножко!»"],
    correct: 1,
    reaction: "«Ещё немножко» — это официальная единица измерения в этом доме.",
  },
  {
    question: "Кто первым узнаёт все новости семьи?",
    options: ["Зебо Буви", "Интернет"],
    correct: 0,
    reaction: "Скорость связи Зебо Буви превышает скорость интернета.",
  },
];

const QUIZ: Q[] = [
  {
    question: "Сколько лет исполняется Зебо Мирзахакимовой?",
    options: ["60", "70", "80"],
    correct: 1,
    reaction: "70 — и это только официальная версия.",
  },
  {
    question: "Главный секрет её силы?",
    options: ["Терпение и любовь", "Секретная формула", "Магия"],
    correct: 0,
    reaction: "Терпение и любовь. Работает лучше любой магии.",
  },
  {
    question: "Что происходит в доме, когда приходят внуки?",
    options: ["Тишина", "Праздник", "Уборка"],
    correct: 1,
    reaction: "Праздник. Всегда праздник.",
  },
  {
    question: "Что никогда не бывает пустым в её доме?",
    options: ["Стол", "Кошелёк", "Календарь"],
    correct: 0,
    reaction: "Стол. Это закон физики этого дома.",
  },
];

const ALL = [...GUESS, ...QUIZ];

export function Games({ onBack }: { onBack: () => void }) {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  const done = i >= ALL.length;
  const q = ALL[Math.min(i, ALL.length - 1)];
  const percent = Math.round((score / ALL.length) * 100);

  const pick = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.correct) setScore((s) => s + 1);
  };

  const next = () => {
    setPicked(null);
    setI((v) => v + 1);
  };

  const reset = () => {
    setI(0);
    setScore(0);
    setPicked(null);
  };

  const verdict =
    percent >= 90
      ? "Вы знаете Зебо Буви лучше всех. Вам можно доверить ключи от кухни."
      : percent >= 60
        ? "Очень хорошо! Но ещё пара чаепитий — и будет идеально."
        : "Требуется срочный визит в гости. Желательно с аппетитом.";

  return (
    <AppScreen title="Игры" subtitle="Насколько хорошо вы знаете Зебо Буви?" onBack={onBack} accent={`Очки: ${score}`}>
      {!done ? (
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="flex items-center gap-5">
            <div className="h-4 flex-1 overflow-hidden rounded-full bg-secondary">
              <div
                className="gold-fill h-full rounded-full transition-all duration-500"
                style={{ width: `${(i / ALL.length) * 100}%` }}
              />
            </div>
            <span className="text-xl font-bold text-gold">
              {i + 1} / {ALL.length}
            </span>
          </div>

          <Panel>
            <h2 className="text-3xl font-black leading-tight md:text-5xl">{q.question}</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {q.options.map((o, idx) => {
                const state =
                  picked === null
                    ? "surface-panel tap-card text-cream"
                    : idx === q.correct
                      ? "gold-fill"
                      : idx === picked
                        ? "border-2 border-destructive/70 text-cream/70"
                        : "opacity-40 text-cream/60 border border-border";
                return (
                  <button
                    key={o}
                    type="button"
                    onClick={() => pick(idx)}
                    className={`focus-gold min-h-28 rounded-3xl px-8 py-7 text-2xl font-bold transition-all md:text-3xl ${state}`}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
            {picked !== null ? (
              <div className="mt-10 animate-[rise_0.4s_ease-out] space-y-6">
                <p className="text-2xl text-cream/90 md:text-3xl">
                  {picked === q.correct ? "✦ Верно! " : "✦ Почти! "}
                  {q.reaction}
                </p>
                <BigButton onClick={next}>Дальше →</BigButton>
              </div>
            ) : null}
          </Panel>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl animate-[rise_0.6s_ease-out] text-center">
          <Panel>
            <p className="text-xl uppercase tracking-[0.35em] text-muted-foreground">Результат</p>
            <p className="my-6 font-display text-8xl font-black md:text-[11rem]">
              <span className="gold-text">{percent}%</span>
            </p>
            <div className="mx-auto h-5 max-w-xl overflow-hidden rounded-full bg-secondary">
              <div className="gold-fill h-full" style={{ width: `${percent}%` }} />
            </div>
            <p className="mt-8 text-2xl leading-relaxed text-cream/90 md:text-3xl">{verdict}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-5">
              <BigButton onClick={reset}>Играть снова</BigButton>
              <BigButton variant="outline" onClick={onBack}>
                На главный экран
              </BigButton>
            </div>
          </Panel>
        </div>
      )}
    </AppScreen>
  );
}
