"use client";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Locale, SiteMessages } from "@/lib/site";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type SiteNavProps = {
  locale: Locale;
  messages: SiteMessages;
};

const navItemIds = [
  "home",
  "capabilities",
  "projects",
  "experience",
  "contact",
] as const;

export default function SiteNav({ locale, messages }: SiteNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<(typeof navItemIds)[number]>("home");
  const prefersReducedMotion = useReducedMotion();
  const navItems = [
    { id: "home", label: messages.nav.home },
    { id: "capabilities", label: messages.nav.capabilities },
    { id: "projects", label: messages.nav.projects },
    { id: "experience", label: messages.nav.experience },
    { id: "contact", label: messages.nav.contact },
  ] as const;

  const fadeInitial = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 8 };
  const fadeAnimate = { opacity: 1, y: 0 };
  const fadeTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: "easeOut" };

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const sections = navItemIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) {
          return;
        }
        const [topEntry] = visible.sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio,
        );
        const nextActiveId = topEntry.target.id;
        if (navItemIds.includes(nextActiveId as (typeof navItemIds)[number])) {
          setActiveId(nextActiveId as (typeof navItemIds)[number]);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <motion.div
        className="fixed right-6 top-6 z-50 md:hidden"
        initial={fadeInitial}
        animate={fadeAnimate}
        transition={fadeTransition}
      >
        <div className="flex items-center gap-3">
          <LanguageSwitcher labels={messages.languageSwitcher} />
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-divider bg-background/90 text-foreground backdrop-blur transition-colors hover:border-foreground"
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen(true)}
          >
            <span className="flex flex-col gap-1.5">
              <span className="h-px w-5 bg-foreground" />
              <span className="h-px w-5 bg-foreground" />
              <span className="h-px w-5 bg-foreground" />
            </span>
          </button>
        </div>
      </motion.div>

      <motion.div
        className="fixed right-10 top-8 z-50 hidden md:block"
        initial={fadeInitial}
        animate={fadeAnimate}
        transition={fadeTransition}
      >
        <LanguageSwitcher labels={messages.languageSwitcher} />
      </motion.div>

      <motion.nav
        aria-label="Primary"
        className="fixed right-10 top-1/2 z-40 hidden -translate-y-1/2 md:flex"
        initial={fadeInitial}
        animate={fadeAnimate}
        transition={fadeTransition}
      >
        <ul className="flex flex-col items-end gap-4 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
            <li key={item.id}>
                  <a
                    href={`/${locale}#${item.id}`}
                    className={`flex items-center gap-3 transition-colors ${
                      isActive ? "text-foreground" : "text-muted"
                    } hover:text-foreground`}
                aria-current={isActive ? "page" : undefined}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isActive
                      ? "bg-gradient-to-br from-accent-blue to-accent-yellow"
                      : "border border-divider"
                  }`}
                />
                <span>{item.label}</span>
              </a>
            </li>
          );
          })}
        </ul>
      </motion.nav>

      {isOpen ? (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
        >
          <div className="flex h-full flex-col px-6 py-8 sm:px-10">
            <div className="flex justify-end">
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-divider bg-background text-foreground transition-colors hover:border-foreground"
                aria-label="Close menu"
                onClick={closeMenu}
              >
                <span className="relative block h-5 w-5">
                  <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 rotate-45 bg-foreground" />
                  <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 -rotate-45 bg-foreground" />
                </span>
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-1 items-center">
              <ul className="flex flex-col gap-6 text-3xl font-semibold tracking-tight text-foreground">
                {navItems.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                  <li key={item.id}>
                    <a
                      href={`/${locale}#${item.id}`}
                      className={`transition-colors ${
                        isActive ? "text-foreground" : "text-muted"
                      } hover:text-foreground`}
                      aria-current={isActive ? "page" : undefined}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </a>
                  </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
