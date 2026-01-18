"use client";

type CornerSocialsProps = {
  github?: string;
  linkedin?: string;
};

export default function CornerSocials({
  github,
  linkedin,
}: CornerSocialsProps) {
  const hasLinks = Boolean(github || linkedin);

  if (!hasLinks) {
    return null;
  }

  const linkClassName =
    "relative grid h-11 w-11 place-items-center overflow-hidden rounded-xl border border-divider bg-white/70 text-muted backdrop-blur-md transition-[transform,color,border-color] duration-[220ms] ease-out before:absolute before:inset-[-40%] before:rounded-xl before:pointer-events-none before:opacity-0 before:transition-opacity before:duration-[220ms] before:content-[''] before:[background:radial-gradient(90px_70px_at_20%_20%,rgba(80,130,190,0.35),transparent_60%),radial-gradient(100px_80px_at_80%_80%,rgba(255,225,150,0.35),transparent_60%)] after:absolute after:inset-0 after:rounded-xl after:pointer-events-none after:opacity-0 after:transition-opacity after:duration-[220ms] after:content-[''] after:[box-shadow:inset_0_0_0_1px_rgba(80,130,190,0.35),inset_0_0_0_2px_rgba(255,225,150,0.2)] hover:-translate-y-[1px] hover:border-[rgba(80,130,190,0.35)] hover:text-foreground hover:before:opacity-100 hover:after:opacity-100 focus-visible:-translate-y-[1px] focus-visible:border-[rgba(80,130,190,0.35)] focus-visible:text-foreground focus-visible:before:opacity-100 focus-visible:after:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(80,130,190,0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0";

  return (
    <div className="fixed bottom-6 right-6 z-40 grid gap-3" aria-label="Social links">
      {github ? (
        <a
          className={linkClassName}
          href={github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <svg
            aria-hidden="true"
            className="relative z-10 h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.477 2 2 6.486 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.071 1.532 1.035 1.532 1.035.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.094.39-1.988 1.029-2.688-.103-.253-.446-1.27.098-2.647 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.296 2.748-1.026 2.748-1.026.545 1.377.202 2.394.1 2.647.64.7 1.028 1.594 1.028 2.688 0 3.848-2.338 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.481A10.019 10.019 0 0 0 22 12.017C22 6.486 17.523 2 12 2Z" />
          </svg>
        </a>
      ) : null}
      {linkedin ? (
        <a
          className={linkClassName}
          href={linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <svg
            aria-hidden="true"
            className="relative z-10 h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M5.372 3.5c0 1.381-1.12 2.5-2.5 2.5S.372 4.881.372 3.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5ZM.6 8.5h4.5V23H.6V8.5ZM8.6 8.5h4.3v2.05h.06c.6-1.14 2.06-2.34 4.24-2.34 4.54 0 5.38 2.98 5.38 6.86V23h-4.5v-6.54c0-1.56-.03-3.56-2.17-3.56-2.18 0-2.52 1.7-2.52 3.46V23H8.6V8.5Z" />
          </svg>
        </a>
      ) : null}
    </div>
  );
}
