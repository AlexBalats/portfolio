"use client";

import type { ComponentProps } from "react";
import HeroSequence from "@/components/HeroSequence";
import useTwoSectionDartSnap from "@/hooks/useTwoSectionDartSnap";

type HomeClientProps = {
  profile: ComponentProps<typeof HeroSequence>["profile"];
};

export default function HomeClient({ profile }: HomeClientProps) {
  useTwoSectionDartSnap({ topId: "home", bottomId: "projects" });
  return <HeroSequence profile={profile} />;
}
