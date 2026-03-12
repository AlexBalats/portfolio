import type { CapabilityItem } from "@/lib/site";

type CapabilitiesSectionProps = {
  capabilities?: CapabilityItem[];
  title: string;
};

const accentStyles = [
  "linear-gradient(135deg, rgba(0, 87, 183, 0.16), rgba(0, 87, 183, 0))",
  "linear-gradient(135deg, rgba(241, 200, 75, 0.2), rgba(241, 200, 75, 0))",
  "linear-gradient(135deg, rgba(0, 87, 183, 0.12), rgba(241, 200, 75, 0.08))",
  "linear-gradient(135deg, rgba(241, 200, 75, 0.14), rgba(0, 87, 183, 0.08))",
];

export default function CapabilitiesSection({
  capabilities = [],
  title,
}: CapabilitiesSectionProps) {
  const visibleCapabilities = capabilities.filter((capability) =>
    Boolean(
      capability.title || capability.description || capability.skills?.length,
    ),
  );

  if (visibleCapabilities.length === 0) {
    return null;
  }

  return (
    <section id="capabilities" className="py-20 sm:py-28">
      <div className="flex flex-col gap-10">
        <header className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full opacity-80"
            style={{
              background: "linear-gradient(135deg, #FFD700 0%, #0057B7 100%)",
            }}
          />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {visibleCapabilities.map((capability, index) => (
            <article
              key={capability.title ?? `capability-${index}`}
              className="relative overflow-hidden rounded-[24px] border border-divider bg-surface/80 p-5 sm:p-6"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-90"
                style={{ background: accentStyles[index % accentStyles.length] }}
              />
              <div className="relative z-10 flex h-full flex-col">
                {capability.title ? (
                  <h3 className="text-xl font-semibold tracking-tight">
                    {capability.title}
                  </h3>
                ) : null}
                {capability.description ? (
                  <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                    {capability.description}
                  </p>
                ) : null}
                {capability.skills?.length ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {capability.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-divider bg-background/80 px-3 py-1 text-xs font-medium text-muted backdrop-blur-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
