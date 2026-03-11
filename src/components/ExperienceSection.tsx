"use client";

import type { ExperienceItem } from "@/lib/site";

type ExperienceSectionProps = {
  experience?: ExperienceItem[];
  title: string;
};

export default function ExperienceSection({
  experience = [],
  title,
}: ExperienceSectionProps) {
  const visibleExperience = experience.filter((item) => {
    const hasBullets = Boolean(item.bullets?.length);
    const hasTags = Boolean(item.tags?.length);
    return Boolean(item.role || item.org || item.dates || hasBullets || hasTags);
  });

  if (visibleExperience.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="py-20 sm:py-28">
      <div className="flex flex-col gap-10">
        <header className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full opacity-70"
            style={{ backgroundColor: "#FFD700" }}
          />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
        </header>
        <div className="border-l border-divider pl-6">
          {visibleExperience.map((item, index) => {
            const hasRole = Boolean(item.role);
            const hasOrg = Boolean(item.org);
            const hasDates = Boolean(item.dates);
            const hasBullets = Boolean(item.bullets?.length);
            const hasTags = Boolean(item.tags?.length);

            return (
              <div
                key={`${item.role ?? "role"}-${item.org ?? "org"}-${index}`}
                className="relative pb-10 last:pb-0"
              >
                <span className="absolute -left-[33px] top-2 h-3 w-3 rounded-full border border-divider bg-background" />
                <div className="flex flex-col gap-3">
                  {hasRole || hasOrg ? (
                    <div className="flex flex-wrap items-baseline gap-2">
                      {hasRole ? (
                        <h3 className="text-lg font-semibold tracking-tight">
                          {item.role}
                        </h3>
                      ) : null}
                      {hasOrg ? (
                        <span className="text-sm text-muted">{item.org}</span>
                      ) : null}
                    </div>
                  ) : null}
                  {hasDates ? (
                    <p className="text-sm text-muted">{item.dates}</p>
                  ) : null}
                  {hasBullets ? (
                    <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
                      {item.bullets?.map((bullet, bulletIndex) => (
                        <li key={`${bullet}-${bulletIndex}`}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                  {hasTags ? (
                    <div className="flex flex-wrap gap-2">
                      {item.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-divider px-3 py-1 text-xs font-medium text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
