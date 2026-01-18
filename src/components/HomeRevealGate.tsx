"use client";

import { useEffect, useState, type ComponentProps } from "react";
import HeroSequence from "@/components/HeroSequence";

type HomeRevealGateProps = {
  profile: ComponentProps<typeof HeroSequence>["profile"];
};

export default function HomeRevealGate({ profile }: HomeRevealGateProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) {
      return;
    }

    const handleReveal = () => {
      setRevealed(true);
    };

    const options = { passive: true } as const;

    window.addEventListener("wheel", handleReveal, options);
    window.addEventListener("touchstart", handleReveal, options);
    window.addEventListener("pointerdown", handleReveal, options);
    window.addEventListener("keydown", handleReveal);

    return () => {
      window.removeEventListener("wheel", handleReveal);
      window.removeEventListener("touchstart", handleReveal);
      window.removeEventListener("pointerdown", handleReveal);
      window.removeEventListener("keydown", handleReveal);
    };
  }, [revealed]);

  return <HeroSequence profile={profile} revealBelow={revealed} />;
}
