"use client";

import type { ProfileData } from "@/lib/site";
import useTwoSectionDartSnap from "@/hooks/useTwoSectionDartSnap";

type HomeClientProps = {
  profile: ProfileData;
};

export default function HomeClient({ profile }: HomeClientProps) {
  useTwoSectionDartSnap({ topId: "home", bottomId: "projects" });
  void profile;
  return null;
}
