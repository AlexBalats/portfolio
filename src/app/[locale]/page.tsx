import CapabilitiesSection from "@/components/CapabilitiesSection";
import ContactSection from "@/components/ContactSection";
import ExperienceSection from "@/components/ExperienceSection";
import HeroSequence from "@/components/HeroSequence";
import ProjectsSection from "@/components/ProjectsSection";
import { getMessages, getProfile, isLocale, type Locale } from "@/lib/site";
import { notFound } from "next/navigation";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const activeLocale = locale as Locale;
  const profile = getProfile(activeLocale);
  const messages = getMessages(activeLocale);
  const links = profile.links ?? {};

  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSequence
        locale={activeLocale}
        messages={messages}
        profile={profile}
      />
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-10 md:pl-16 md:pr-10">
        <CapabilitiesSection
          capabilities={profile.capabilities}
          title={messages.sections.capabilities}
        />
        <div className="border-t border-divider">
          <ProjectsSection
            projects={profile.projects}
            title={messages.sections.projects}
            linkLabels={messages.links}
          />
        </div>
        <div className="border-t border-divider">
          <ExperienceSection
            experience={profile.experience}
            title={messages.sections.experience}
          />
        </div>
        <div className="border-t border-divider">
          <ContactSection
            availability={profile.availability}
            availabilityNote={profile.availabilityNote}
            email={links.email}
            github={links.github}
            linkedin={links.linkedin}
            location={profile.location}
            socialLabels={messages.links}
            subtitle={profile.tagline}
            title={messages.sections.contact}
            availabilityHeading={messages.sections.availabilityHeading}
            availabilityLabel={messages.sections.availability}
            locationLabel={messages.sections.location}
          />
        </div>
      </div>
    </main>
  );
}
