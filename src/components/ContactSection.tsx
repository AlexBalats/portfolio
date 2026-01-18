"use client";

type ContactSectionProps = {
  email?: string;
  location?: string;
  availability?: string;
  github?: string;
  linkedin?: string;
  subtitle?: string;
};

export default function ContactSection({
  email,
  location,
  availability,
  github,
  linkedin,
  subtitle,
}: ContactSectionProps) {
  const hasSecondary = Boolean(location || availability);
  const hasSocial = Boolean(github || linkedin);

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="flex flex-col gap-10">
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full opacity-70"
              style={{
                background:
                  "linear-gradient(90deg, #0057B7 0% 50%, #FFD700 50% 100%)",
              }}
            />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Contact.
            </h2>
          </div>
          {subtitle ? (
            <p className="text-sm text-muted sm:text-base">{subtitle}</p>
          ) : null}
        </header>
        <div className="flex flex-col gap-6 sm:max-w-md">
          {email ? (
            <a
              className="group inline-flex items-center gap-3 text-lg font-semibold"
              href={`mailto:${email}`}
            >
              <span>{email}</span>
              <span className="text-muted transition-transform duration-200 group-hover:translate-x-1">
                -&gt;
              </span>
            </a>
          ) : null}
          {hasSocial ? (
            <div className="flex flex-wrap gap-4 text-sm font-medium text-foreground">
              {github ? (
                <a
                  className="transition hover:underline"
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              ) : null}
              {linkedin ? (
                <a
                  className="transition hover:underline"
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
        {hasSecondary ? (
          <div className="mt-8 w-full max-w-none">
            <div className="grid gap-3 text-sm text-muted">
              {location ? (
                <div className="grid w-full grid-cols-[1fr_auto] items-center gap-8 border-b border-divider py-4">
                  <span>Location</span>
                  <span className="justify-self-end text-right text-foreground">
                    {location}
                  </span>
                </div>
              ) : null}
              {availability ? (
                <div className="grid w-full grid-cols-[1fr_auto] items-center gap-8 border-b border-divider py-4">
                  <span>Availability</span>
                  <span className="justify-self-end text-right text-foreground">
                    {availability}
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
