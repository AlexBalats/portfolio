"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ContactSection from "@/components/ContactSection";
import CornerSocials from "@/components/CornerSocials";
import ExperienceSection from "@/components/ExperienceSection";
import HeroIntro from "@/components/HeroIntro";
import ProjectsSection from "@/components/ProjectsSection";
import SiteNav from "@/components/SiteNav";

type ProfileLinks = {
  email?: string;
  github?: string;
  linkedin?: string;
  cv?: string;
};

type Project = {
  title?: string;
  description?: string;
  tags?: string[];
  links?: {
    github?: string;
    demo?: string;
    writeup?: string;
  };
  highlights?: string[];
};

type ExperienceItem = {
  role?: string;
  org?: string;
  dates?: string;
  bullets?: string[];
  tags?: string[];
};

type ProfileData = {
  name?: string;
  tagline?: string;
  about?: string;
  focus?: string[];
  location?: string;
  availability?: string;
  links?: ProfileLinks;
  projects?: Project[];
  experience?: ExperienceItem[];
};

type HeroSequenceProps = {
  profile: ProfileData;
};

export default function HeroSequence({ profile }: HeroSequenceProps) {
  const prefersReducedMotion = useReducedMotion();
  const [introComplete, setIntroComplete] = useState(prefersReducedMotion);
  const [hasScrolled, setHasScrolled] = useState(false);
  const links = profile.links ?? {};

  useEffect(() => {
    if (prefersReducedMotion) {
      setIntroComplete(true);
    }
  }, [prefersReducedMotion]);

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

  const revealInitial = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 8 };
  const revealAnimate = { opacity: 1, y: 0 };
  const revealTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: "easeOut" };

  const gradientOpacity = prefersReducedMotion || introComplete ? 0 : 0.08;
  const scrollCueVisible = !hasScrolled;
  const scrollCueInitial = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 8 };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {introComplete ? <SiteNav /> : null}
      <CornerSocials github={links.github} linkedin={links.linkedin} />
      <div className="mx-auto flex w-full max-w-5xl flex-col px-6 py-20 sm:px-10 md:pl-16 md:pr-10">
        <div className="flex flex-col">
          <section id="home" className="relative py-20 sm:py-28">
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
            <HeroIntro
              name={profile.name}
              tagline={profile.tagline}
              about={profile.about}
              focus={profile.focus}
              links={links}
              onComplete={() => setIntroComplete(true)}
            />
            <motion.div
              aria-hidden="true"
              className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
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
                Scroll
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
          </section>
          {introComplete ? (
            <>
              <motion.div
                initial={revealInitial}
                animate={revealAnimate}
                transition={revealTransition}
              >
                <ProjectsSection projects={profile.projects} />
              </motion.div>
              <motion.div
                className="border-t border-divider"
                initial={revealInitial}
                animate={revealAnimate}
                transition={revealTransition}
              >
                <ExperienceSection experience={profile.experience} />
              </motion.div>
              <motion.div
                className="border-t border-divider"
                initial={revealInitial}
                animate={revealAnimate}
                transition={revealTransition}
              >
                <ContactSection
                  email={links.email}
                  location={profile.location}
                  availability={profile.availability}
                  github={links.github}
                  linkedin={links.linkedin}
                  subtitle={profile.tagline}
                />
              </motion.div>
            </>
          ) : null}
        </div>
      </div>
    </main>
  );
}
