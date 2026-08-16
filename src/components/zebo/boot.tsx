import { useEffect, useState } from "react";

const LINES = [
  "Инициализация ядра тепла…",
  "Проверка запасов гостеприимства… ОК",
  "Загрузка семейной памяти… 100%",
  "Синхронизация с сердцами близких… ОК",
  "Подключение модуля «плов» … ОК",
];

export function BootSequence({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep((s) => s + 1), 700);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setProgress((p) => Math.min(100, p + 2)), 60);
    return () => clearInterval(t);
  }, []);

  const phase2 = step >= LINES.length;

  return (
    <div className="deep-bg grain-overlay flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center">
      {!phase2 ? (
        <div className="w-full max-w-2xl">
          <div className="mb-10 font-display text-3xl font-black tracking-[0.35em] text-gold md:text-5xl">
            ЗЕБО<span className="text-cream">70.0</span>
          </div>
          <ul className="space-y-3 text-left text-lg text-muted-foreground md:text-2xl">
            {LINES.slice(0, step + 1).map((l) => (
              <li key={l} className="animate-[rise_0.4s_ease-out]">
                <span className="mr-3 text-gold">›</span>
                {l}
              </li>
            ))}
          </ul>
          <div className="mt-12 h-3 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="gold-fill h-full rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="animate-[rise_0.8s_ease-out] space-y-8">
          <div className="font-display text-6xl font-black leading-[0.9] md:text-[10rem]">
            <span className="gold-text">ЗЕБО 70.0</span>
          </div>
          <div className="space-y-3 text-xl md:text-3xl">
            <p>
              <span className="text-muted-foreground">Пользователь: </span>
              <span className="font-bold text-cream">Зебо Мирзахакимова</span>
            </p>
            <p>
              <span className="text-muted-foreground">Возраст: </span>
              <span className="font-bold text-cream">70</span>
            </p>
            <p>
              <span className="text-muted-foreground">Статус: </span>
              <span className="font-black text-gold">ЛЕГЕНДАРНЫЙ</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onDone}
            className="focus-gold gold-fill mt-6 animate-[float_5s_ease-in-out_infinite] rounded-full px-14 py-6 text-2xl font-black uppercase tracking-widest shadow-[var(--shadow-gold)] transition hover:brightness-110 md:text-3xl"
          >
            Войти в систему
          </button>
        </div>
      )}
      {!phase2 ? (
        <button
          type="button"
          onClick={onDone}
          className="focus-gold mt-14 text-base uppercase tracking-[0.3em] text-muted-foreground transition hover:text-gold"
        >
          Пропустить
        </button>
      ) : null}
    </div>
  );
}
