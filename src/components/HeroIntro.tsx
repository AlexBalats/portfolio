"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

type HeroLinks = {
  email?: string;
  github?: string;
  linkedin?: string;
  cv?: string;
};

type HeroIntroProps = {
  name?: string;
  tagline?: string;
  about?: string;
  focus?: string[];
  links: HeroLinks;
  onComplete?: () => void;
};

const timings = {
  initialsHold: 0.22,
  initialsFade: 0.12,
  nameDelay: 0.22,
  underlineBlueDelay: 0.52,
  underlineYellowDelay: 0.64,
  taglineDelay: 0.76,
  buttonsDelay: 0.88,
};
const sequenceDurationMs = 1000;

const nameRevealSpring = {
  type: "spring",
  stiffness: 140,
  damping: 24,
  mass: 0.7,
  bounce: 0,
};

const underlineSpring = {
  type: "spring",
  stiffness: 200,
  damping: 24,
  mass: 0.6,
  bounce: 0,
};

const hoverSpring = {
  type: "spring",
  stiffness: 260,
  damping: 20,
  mass: 0.6,
  bounce: 0,
};

const fadeUpSpring = {
  type: "spring",
  stiffness: 160,
  damping: 20,
  mass: 0.7,
  bounce: 0,
};

const maskVariants = {
  initial: { clipPath: "inset(-12px 100% -12px 0)" },
  reveal: { clipPath: "inset(-12px 0% -12px 0)" },
  hover: { clipPath: "inset(-12px 0% -12px 0)" },
};

const liftVariants = {
  initial: { y: 0 },
  reveal: { y: 0 },
  hover: { y: -2 },
};

const waveSpring = {
  stiffness: 300,
  damping: 25,
  mass: 0.6,
};

const maxLift = 10;
const influenceRadius = 110;
const sigma = influenceRadius / 2;

type WaveLetterProps = {
  char: string;
  index: number;
  mouseX: MotionValue<number>;
  centersRef: MutableRefObject<number[]>;
  registerRef: (element: HTMLSpanElement | null) => void;
};

function WaveLetter({
  char,
  index,
  mouseX,
  centersRef,
  registerRef,
}: WaveLetterProps) {
  const lift = useTransform(mouseX, (value) => {
    const centerX = centersRef.current[index] ?? 0;
    const distance = Math.abs(centerX - value);
    const liftValue =
      maxLift * Math.exp(-(distance * distance) / (2 * sigma * sigma));
    const clamped = Math.min(maxLift, Math.max(0, liftValue));
    return -clamped;
  });
  const y = useSpring(lift, waveSpring);

  return (
    <motion.span
      ref={registerRef}
      aria-hidden="true"
      className="inline-block"
      style={{ y }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

const getInitials = (name: string) => {
  const parts = name.split(" ").filter(Boolean);
  const letters = parts
    .map((part) => part[0].toUpperCase())
    .slice(0, 2)
    .join("");
  if (!letters) {
    return "";
  }
  return letters;
};

export default function HeroIntro({
  name,
  tagline,
  about,
  focus,
  links,
  onComplete,
}: HeroIntroProps) {
  const prefersReducedMotion = useReducedMotion();
  const showName = Boolean(name);
  const sequenceEnabled = showName && !prefersReducedMotion;
  const initials = name ? getInitials(name) : "";
  const hasAbout = Boolean(about);
  const hasFocus = Boolean(focus?.length);
  const showAbout = hasAbout;
  const aboutDelay = timings.buttonsDelay + 0.08;
  const waveEnabled = showName && !prefersReducedMotion;
  const mouseX = useMotionValue(-1000);
  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const charRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const centersRef = useRef<number[]>([]);
  const characters = name ? name.split("") : [];

  const initialState = prefersReducedMotion ? "reveal" : "initial";
  const hoverState = prefersReducedMotion ? undefined : "hover";

  const fadeUpInitial = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 8 };
  const fadeUpAnimate = { opacity: 1, y: 0 };

  const underlineBlueVariants = {
    initial: { scaleX: 0 },
    reveal: {
      scaleX: 1,
      transition: {
        ...underlineSpring,
        delay: sequenceEnabled ? timings.underlineBlueDelay : 0,
      },
    },
    hover: {
      scaleX: 1.5,
      transition: hoverSpring,
    },
  };

  const underlineYellowVariants = {
    initial: { scaleX: 0 },
    reveal: {
      scaleX: 1,
      transition: {
        ...underlineSpring,
        delay: sequenceEnabled ? timings.underlineYellowDelay : 0,
      },
    },
    hover: {
      scaleX: 1.5,
      transition: hoverSpring,
    },
  };

  useEffect(() => {
    if (!onComplete) {
      return;
    }

    if (!sequenceEnabled) {
      onComplete();
      return;
    }

    const timeoutId = window.setTimeout(() => {
      onComplete();
    }, sequenceDurationMs);

    return () => window.clearTimeout(timeoutId);
  }, [onComplete, sequenceEnabled]);

  useEffect(() => {
    if (!waveEnabled) {
      return;
    }

    const measureCenters = () => {
      if (!wrapperRef.current) {
        return;
      }
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      centersRef.current = charRefs.current.map((span) => {
        if (!span) {
          return 0;
        }
        const rect = span.getBoundingClientRect();
        return rect.left - wrapperRect.left + rect.width / 2;
      });
    };

    const rafId = window.requestAnimationFrame(measureCenters);
    window.addEventListener("resize", measureCenters);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", measureCenters);
    };
  }, [waveEnabled, name]);

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="max-w-3xl">
        {showName ? (
          <h1 className="text-4xl font-bold tracking-tight leading-[1.05] sm:text-6xl">
            <motion.span
              className="group relative inline-block pb-5"
              initial={initialState}
              animate="reveal"
              whileHover={hoverState}
            >
              {sequenceEnabled && initials ? (
                <motion.span
                  className="absolute left-0 top-0 text-muted"
                  aria-hidden="true"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{
                    delay: timings.initialsHold,
                    duration: timings.initialsFade,
                    ease: "easeOut",
                  }}
                >
                  {initials}
                </motion.span>
              ) : null}
              <motion.span
                className="relative z-10 inline-block overflow-visible"
                variants={maskVariants}
                transition={{
                  ...nameRevealSpring,
                  delay: sequenceEnabled ? timings.nameDelay : 0,
                }}
              >
                <motion.span
                  ref={wrapperRef}
                  className="inline-flex whitespace-pre overflow-visible"
                  variants={liftVariants}
                  transition={hoverSpring}
                  role="text"
                  aria-label={name}
                  onMouseMove={
                    waveEnabled
                      ? (event) => {
                          if (!wrapperRef.current) {
                            return;
                          }
                          const rect =
                            wrapperRef.current.getBoundingClientRect();
                          mouseX.set(event.clientX - rect.left);
                        }
                      : undefined
                  }
                  onMouseLeave={
                    waveEnabled
                      ? () => {
                          mouseX.set(-1000);
                        }
                      : undefined
                  }
                >
                  {waveEnabled
                    ? characters.map((char, index) => (
                        <WaveLetter
                          key={`${char}-${index}`}
                          char={char}
                          index={index}
                          mouseX={mouseX}
                          centersRef={centersRef}
                          registerRef={(element) => {
                            charRefs.current[index] = element;
                          }}
                        />
                      ))
                    : name}
                </motion.span>
              </motion.span>
              <motion.span
                className="pointer-events-none absolute left-0 bottom-[8px] h-[6px] w-[65%] origin-left"
                style={{ backgroundColor: "#0057B7" }}
                variants={underlineBlueVariants}
              />
              <motion.span
                className="pointer-events-none absolute left-0 bottom-0 h-[6px] w-[65%] origin-left"
                style={{ backgroundColor: "#FFD700" }}
                variants={underlineYellowVariants}
              />
            </motion.span>
          </h1>
        ) : null}
        {tagline ? (
          <motion.p
            className="mt-3 text-lg leading-relaxed text-muted sm:text-xl"
            initial={fadeUpInitial}
            animate={fadeUpAnimate}
            transition={{
              ...fadeUpSpring,
              delay: sequenceEnabled ? timings.taglineDelay : 0,
            }}
          >
            {tagline}
          </motion.p>
        ) : null}
      </div>
      {showAbout ? (
        <motion.div
          className="max-w-2xl space-y-4 text-sm text-muted sm:text-base"
          initial={fadeUpInitial}
          animate={fadeUpAnimate}
          transition={{
            ...fadeUpSpring,
            delay: sequenceEnabled ? aboutDelay : 0,
          }}
        >
          <p className="leading-relaxed">{about}</p>
          {hasFocus ? (
            <div className="flex flex-wrap gap-2">
              {focus?.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-divider px-3 py-1 text-xs font-medium text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </motion.div>
      ) : null}
    </div>
  );
}
