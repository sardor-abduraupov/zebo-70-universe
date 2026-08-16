import { useState } from "react";
import { AppScreen, Panel, BigButton } from "./shell";

/**
 * СЕКРЕТ — финальный экран.
 * Замените текст в SECRET_TEXT на личное послание.
 */
const SECRET_TITLE = "Зебо Буви, это для вас";
const SECRET_TEXT = [
  "Здесь будет личное послание — впишите свои слова вместо этого текста.",
  "Всё, что есть в нашей семье, началось с вас: этот дом, этот стол, эти голоса и этот смех.",
  "Спасибо за семьдесят лет тепла. Мы вас очень любим.",
];
const SECRET_SIGN = "С любовью, ваша семья";

export function Secret({ onBack }: { onBack: () => void }) {
  const [held, setHeld] = useState(0);
  const [open, setOpen] = useState(false);

  const press = () => {
    const next = held + 1;
    setHeld(next);
    if (next >= 3) setOpen(true);
  };

  return (
    <AppScreen title="Секрет" subtitle={open ? "Доступ открыт" : "Доступ ограничен"} onBack={onBack} accent={open ? "UNLOCKED" : "LOCKED"}>
      {!open ? (
        <div className="mx-auto max-w-3xl text-center">
          <Panel>
            <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full border-2 border-gold/50 text-6xl text-gold">
              ⌘
            </div>
            <h2 className="text-4xl font-black md:text-6xl">
              <span className="gold-text">Раздел закрыт</span>
            </h2>
            <p className="mt-6 text-2xl leading-relaxed text-cream/85">
              Чтобы открыть, нажмите ключ три раза. Система должна убедиться, что вы — это вы.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`h-5 w-5 rounded-full transition-all ${held > i ? "bg-gold" : "bg-secondary"}`}
                />
              ))}
            </div>
            <div className="mt-10">
              <BigButton onClick={press}>Нажать ключ ({held}/3)</BigButton>
            </div>
          </Panel>
        </div>
      ) : (
        <div className="mx-auto max-w-4xl animate-[rise_0.9s_ease-out] text-center">
          <div className="surface-panel relative overflow-hidden rounded-[2.5rem] px-8 py-16 md:px-16 md:py-24">
            <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(80%_60%_at_50%_0%,color-mix(in_oklab,var(--gold)_35%,transparent),transparent)]" />
            <div className="relative">
              <p className="text-xl uppercase tracking-[0.4em] text-muted-foreground">70.0 · Финал</p>
              <h2 className="mt-6 font-display text-5xl font-black leading-tight md:text-7xl">
                <span className="gold-text">{SECRET_TITLE}</span>
              </h2>
              <div className="mx-auto mt-12 max-w-3xl space-y-7">
                {SECRET_TEXT.map((t) => (
                  <p key={t} className="text-2xl leading-relaxed text-cream/90 md:text-3xl">
                    {t}
                  </p>
                ))}
              </div>
              <p className="mt-14 font-display text-3xl text-gold md:text-4xl">{SECRET_SIGN}</p>
            </div>
          </div>
        </div>
      )}
    </AppScreen>
  );
}
