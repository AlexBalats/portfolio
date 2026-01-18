"use client";

import { motion } from "framer-motion";

type HeroNameProps = {
  name: string;
};

const nameTransition = {
  type: "spring",
  stiffness: 260,
  damping: 22,
  mass: 0.6,
};

const underlineTransition = {
  type: "spring",
  stiffness: 220,
  damping: 18,
  mass: 0.6,
};

export default function HeroName({ name }: HeroNameProps) {
  return (
    <motion.span
      className="group relative inline-block pb-5"
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      <motion.span
        className="relative z-10 inline-block"
        variants={{
          rest: { y: 0 },
          hover: { y: -2 },
        }}
        transition={nameTransition}
      >
        {name}
      </motion.span>
      <motion.span
        className="pointer-events-none absolute left-0 bottom-[8px] h-[6px] w-[65%] origin-left bg-accent-blue"
        variants={{
          rest: { scaleX: 1 },
          hover: { scaleX: 1.5 },
        }}
        transition={underlineTransition}
      />
      <motion.span
        className="pointer-events-none absolute left-0 bottom-0 h-[6px] w-[65%] origin-left bg-accent-yellow"
        variants={{
          rest: { scaleX: 1 },
          hover: { scaleX: 1.5 },
        }}
        transition={underlineTransition}
      />
    </motion.span>
  );
}
