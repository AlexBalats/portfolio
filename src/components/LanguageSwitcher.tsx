"use client";

import { useLocaleTransition } from "@/components/LocaleTransitionShell";

type LanguageSwitcherLabels = {
  label: string;
  english: string;
  ukrainian: string;
  switchToEnglish: string;
  switchToUkrainian: string;
};

export default function LanguageSwitcher({
  labels,
}: {
  labels: LanguageSwitcherLabels;
}) {
  const { currentLocale, isTransitioning, switchLocale } = useLocaleTransition();
  const nextLocale = currentLocale === "en" ? "uk" : "en";
  const buttonLabel =
    currentLocale === "en" ? labels.ukrainian : labels.english;
  const ariaLabel =
    currentLocale === "en"
      ? labels.switchToUkrainian
      : labels.switchToEnglish;

  return (
    <button
      type="button"
      className="group flex h-11 min-w-16 items-center justify-center rounded-full border border-divider bg-background/90 px-4 text-[0.72rem] font-semibold tracking-[0.22em] text-foreground backdrop-blur transition-[transform,border-color,background-color,opacity] duration-300 hover:-translate-y-px hover:border-foreground disabled:cursor-wait disabled:opacity-70"
      aria-label={ariaLabel}
      title={labels.label}
      disabled={isTransitioning}
      onClick={() => switchLocale(nextLocale)}
    >
      <span className="relative overflow-hidden">
        <span className="block transition-transform duration-300 group-hover:-translate-y-full">
          {buttonLabel}
        </span>
        <span className="absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          {buttonLabel}
        </span>
      </span>
    </button>
  );
}
