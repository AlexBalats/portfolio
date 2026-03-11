"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import CornerSocials from "@/components/CornerSocials";
import HeroIntro from "@/components/HeroIntro";
import SiteNav from "@/components/SiteNav";
import type { Locale, ProfileData, SiteMessages } from "@/lib/site";

type HeroSequenceProps = {
  locale: Locale;
  messages: SiteMessages;
  profile: ProfileData;
};

export default function HeroSequence({
  locale,
  messages,
  profile,
}: HeroSequenceProps) {
  const prefersReducedMotion = useReducedMotion();
  const [introFinished, setIntroFinished] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const links = profile.links ?? {};
  const introComplete = prefersReducedMotion || introFinished;

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(() => {
        setHasScrolled(window.scrollY > 40);
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const gradientOpacity = prefersReducedMotion || introComplete ? 0 : 0.08;
  const scrollCueVisible = !hasScrolled;
  const scrollCueInitial = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 8 };

  return (
    <>
      {introComplete ? <SiteNav locale={locale} messages={messages} /> : null}
      <CornerSocials github={links.github} linkedin={links.linkedin} />
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-10 md:pl-16 md:pr-10">
        <section
          id="home"
          className="relative min-h-screen overflow-hidden pt-24 pb-32 sm:pt-32 sm:pb-40 flex items-center"
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[260px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            initial={{ opacity: gradientOpacity }}
            animate={{ opacity: gradientOpacity }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.35, ease: "easeOut" }
            }
            style={{
              background:
                "radial-gradient(circle, #0057B7 0%, #FFD700 55%, transparent 70%)",
            }}
          />
          <div className="relative flex w-full items-center self-stretch">
            <HeroIntro
              name={profile.name}
              tagline={profile.tagline}
              about={profile.about}
              focus={profile.focus}
              onComplete={() => setIntroFinished(true)}
            />
            <motion.div
              aria-hidden="true"
              className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
              initial={scrollCueInitial}
              animate={{
                opacity: scrollCueVisible ? 1 : 0,
                y: scrollCueVisible ? 0 : 8,
              }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.3, ease: "easeOut" }
              }
            >
              <span className="text-[0.65rem] font-semibold tracking-[0.2em] text-muted">
                {messages.hero.scroll}
              </span>
              <motion.span
                className="block h-8 w-px bg-divider"
                animate={
                  prefersReducedMotion || !scrollCueVisible
                    ? { opacity: 0.6, scaleY: 1 }
                    : { opacity: [0.4, 0.9, 0.4], scaleY: [0.8, 1.1, 0.8] }
                }
                transition={
                  prefersReducedMotion || !scrollCueVisible
                    ? { duration: 0 }
                    : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
                }
              />
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
