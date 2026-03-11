"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion } from "framer-motion";
import {
  isLocale,
  replaceLocaleInPathname,
  sectionIds,
  type Locale,
} from "@/lib/site";
import { usePathname, useRouter } from "next/navigation";

type TransitionPhase = "idle" | "exiting" | "entering";

type LocaleTransitionContextValue = {
  currentLocale: Locale;
  isTransitioning: boolean;
  switchLocale: (locale: Locale) => void;
};

const LocaleTransitionContext = createContext<LocaleTransitionContextValue | null>(
  null,
);

const exitDurationMs = 260;
const enterDurationMs = 480;

function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  return isLocale(segment) ? segment : "en";
}

function getActiveSectionHash() {
  if (typeof window === "undefined") {
    return "";
  }

  if (window.location.hash) {
    return window.location.hash;
  }

  let bestSection: (typeof sectionIds)[number] = sectionIds[0];
  let bestDistance = Number.POSITIVE_INFINITY;

  sectionIds.forEach((id) => {
    const section = document.getElementById(id);
    if (!section) {
      return;
    }

    const distance = Math.abs(section.getBoundingClientRect().top);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestSection = id;
    }
  });

  return `#${bestSection}`;
}

export function useLocaleTransition() {
  const context = useContext(LocaleTransitionContext);

  if (!context) {
    throw new Error("useLocaleTransition must be used within LocaleTransitionShell");
  }

  return context;
}

type LocaleTransitionShellProps = {
  children: ReactNode;
};

export default function LocaleTransitionShell({
  children,
}: LocaleTransitionShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = getLocaleFromPathname(pathname);
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const targetHrefRef = useRef<string | null>(null);
  const enterTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.lang = currentLocale;
  }, [currentLocale]);

  useEffect(() => {
    if (!targetHrefRef.current) {
      return;
    }

    if (!pathname.startsWith(`/${currentLocale}`)) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      setPhase("entering");

      if (enterTimeoutRef.current) {
        window.clearTimeout(enterTimeoutRef.current);
      }

      enterTimeoutRef.current = window.setTimeout(() => {
        setPhase("idle");
        targetHrefRef.current = null;
        enterTimeoutRef.current = null;
      }, enterDurationMs);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      if (enterTimeoutRef.current) {
        window.clearTimeout(enterTimeoutRef.current);
        enterTimeoutRef.current = null;
      }
    };
  }, [currentLocale, pathname]);

  const value = useMemo<LocaleTransitionContextValue>(
    () => ({
      currentLocale,
      isTransitioning: phase !== "idle",
      switchLocale: (locale) => {
        if (locale === currentLocale || phase !== "idle") {
          return;
        }

        const nextPathname = replaceLocaleInPathname(pathname, locale);
        const nextHref = `${nextPathname}${getActiveSectionHash()}`;

        targetHrefRef.current = nextHref;
        setPhase("exiting");

        window.setTimeout(() => {
          startTransition(() => {
            router.push(nextHref, { scroll: false });
          });
        }, exitDurationMs);
      },
    }),
    [currentLocale, pathname, phase, router],
  );

  return (
    <LocaleTransitionContext.Provider value={value}>
      <motion.div
        className={`relative z-10 ${phase === "idle" ? "" : "pointer-events-none"}`}
        initial={false}
        animate={
          phase === "exiting"
            ? { opacity: 0.08 }
            : { opacity: 1 }
        }
        transition={{
          duration: phase === "exiting" ? 0.26 : 0.48,
          ease: phase === "exiting" ? [0.55, 0.08, 0.68, 0.53] : [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-20"
        initial={false}
        animate={
          phase === "idle"
            ? { opacity: 0 }
            : {
                opacity: phase === "exiting" ? 1 : 0.32,
              }
        }
        transition={{
          duration: phase === "exiting" ? 0.24 : 0.42,
          ease: "easeOut",
        }}
        style={{
          background:
            "radial-gradient(680px 420px at 20% 18%, rgba(0, 87, 183, 0.18), transparent 72%), radial-gradient(760px 460px at 82% 82%, rgba(255, 215, 0, 0.18), transparent 70%), linear-gradient(180deg, rgba(251, 250, 247, 0.18), rgba(251, 250, 247, 0.82))",
          backdropFilter: phase === "idle" ? "blur(0px)" : "blur(10px)",
        }}
      />
    </LocaleTransitionContext.Provider>
  );
}
