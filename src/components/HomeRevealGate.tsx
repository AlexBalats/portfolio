"use client";

import type { ProfileData } from "@/lib/site";

type HomeRevealGateProps = {
  profile: ProfileData;
};

export default function HomeRevealGate({ profile }: HomeRevealGateProps) {
  void profile;
  return null;
}
