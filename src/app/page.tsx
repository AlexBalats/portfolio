import HeroSequence from "@/components/HeroSequence";
import profile from "../../content/profile.json";

export default function Home() {
  return <HeroSequence profile={profile} />;
}
