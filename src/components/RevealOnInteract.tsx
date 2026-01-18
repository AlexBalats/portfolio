"use client";

import { useEffect, useState, type ReactNode } from "react";

type RevealOnInteractProps = {
  children: ReactNode;
  className?: string;
};

export default function RevealOnInteract({
  children,
  className,
}: RevealOnInteractProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) {
      return;
    }

    const reveal = () => {
      setRevealed(true);
    };

    const options = { passive: true } as const;

    window.addEventListener("pointerdown", reveal, options);
    window.addEventListener("keydown", reveal);
    window.addEventListener("wheel", reveal, options);
    window.addEventListener("touchstart", reveal, options);

    return () => {
      window.removeEventListener("pointerdown", reveal);
      window.removeEventListener("keydown", reveal);
      window.removeEventListener("wheel", reveal);
      window.removeEventListener("touchstart", reveal);
    };
  }, [revealed]);

  const baseClasses =
    "transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none motion-reduce:translate-y-0";
  const hiddenClasses = "opacity-0 translate-y-3 pointer-events-none";
  const visibleClasses = "opacity-100 translate-y-0 pointer-events-auto";

  return (
    <div
      className={`${baseClasses} ${
        revealed ? visibleClasses : hiddenClasses
      } ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
