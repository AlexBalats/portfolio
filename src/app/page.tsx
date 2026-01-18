import ContactSection from "@/components/ContactSection";
import ExperienceSection from "@/components/ExperienceSection";
import HeroSequence from "@/components/HeroSequence";
import ProjectsSection from "@/components/ProjectsSection";
import RevealOnInteract from "@/components/RevealOnInteract";
import profile from "../../content/profile.json";

export default function Home() {
  const links = profile.links ?? {};

  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSequence profile={profile} />
      <RevealOnInteract>
        <div className="mx-auto w-full max-w-5xl px-6 sm:px-10 md:pl-16 md:pr-10">
          <ProjectsSection projects={profile.projects} />
          <div className="border-t border-divider">
            <ExperienceSection experience={profile.experience} />
          </div>
          <div className="border-t border-divider">
            <ContactSection
              email={links.email}
              location={profile.location}
              availability={profile.availability}
              github={links.github}
              linkedin={links.linkedin}
              subtitle={profile.tagline}
            />
          </div>
        </div>
      </RevealOnInteract>
    </main>
  );
}
