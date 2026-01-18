"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type ProjectLinkSet = {
  github?: string;
  demo?: string;
  writeup?: string;
};

type Project = {
  title?: string;
  description?: string;
  tags?: string[];
  links?: ProjectLinkSet;
  highlights?: string[];
};

type ProjectsSectionProps = {
  projects?: Project[];
};

const linkLabels: Array<{ key: keyof ProjectLinkSet; label: string }> = [
  { key: "github", label: "GitHub" },
  { key: "demo", label: "Demo" },
  { key: "writeup", label: "Writeup" },
];

export default function ProjectsSection({ projects = [] }: ProjectsSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const rowVariants = prefersReducedMotion
    ? {
        rest: { y: 0, boxShadow: "0 0 0 rgba(0,0,0,0)" },
        active: { y: 0, boxShadow: "0 2px 10px rgba(17,17,17,0.06)" },
      }
    : {
        rest: { y: 0, boxShadow: "0 0 0 rgba(0,0,0,0)" },
        active: { y: -1, boxShadow: "0 4px 14px rgba(17,17,17,0.08)" },
      };

  const toggleProject = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  const visibleProjects = projects.filter((project) => {
    const hasLinks = Boolean(
      project.links?.github || project.links?.demo || project.links?.writeup,
    );
    return Boolean(
      project.title ||
        project.description ||
        project.tags?.length ||
        project.highlights?.length ||
        hasLinks,
    );
  });

  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="flex flex-col gap-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full opacity-70"
              style={{ backgroundColor: "#0057B7" }}
            />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Projects
            </h2>
          </div>
        </header>
        <div className="flex flex-col divide-y divide-divider">
          {visibleProjects.map((project, index) => {
            const isOpen = openIndex === index;
            const panelId = `project-panel-${index}`;
            const buttonId = `project-trigger-${index}`;
            const hasTags = Boolean(project.tags?.length);
            const hasHighlights = Boolean(project.highlights?.length);
            const hasLinks = Boolean(
              project.links?.github ||
                project.links?.demo ||
                project.links?.writeup,
            );

            return (
              <div key={project.title ?? `project-${index}`} className="py-6">
                <motion.button
                  type="button"
                  className="project-card group relative w-full overflow-hidden rounded-[20px] border border-divider px-5 py-3 text-left focus-visible:outline-none"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  data-active={isOpen ? "true" : undefined}
                  onClick={() => toggleProject(index)}
                  variants={rowVariants}
                  initial="rest"
                  animate={isOpen ? "active" : "rest"}
                  whileHover="active"
                  whileFocus="active"
                >
                  <span aria-hidden="true" className="project-base" />
                  <span aria-hidden="true" className="project-visuals">
                    <span className="project-glow" />
                    <span className="project-edge project-edge-top" />
                    <span className="project-edge project-edge-bottom" />
                  </span>
                  <div className="relative z-10 flex items-start justify-between gap-6">
                    <div className="flex-1 space-y-2">
                      {project.title ? (
                        <h3 className="text-xl font-semibold tracking-tight transition-colors duration-200 group-hover:underline">
                          {project.title}
                        </h3>
                      ) : null}
                      {project.description ? (
                        <p className="text-base text-muted">
                          {project.description}
                        </p>
                      ) : null}
                    </div>
                    <span
                      className={`mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full border border-divider text-base text-muted transition-transform duration-200 ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                    >
                      +
                    </span>
                  </div>
                  {hasTags ? (
                    <div className="relative z-10 mt-4 flex flex-wrap gap-2">
                      {project.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-divider px-3 py-1 text-xs font-medium text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </motion.button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pt-4">
                    {hasHighlights ? (
                      <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
                        {project.highlights?.map((highlight, highlightIndex) => (
                          <li key={`${highlight}-${highlightIndex}`}>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {hasLinks ? (
                      <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium text-foreground">
                        {linkLabels.map((link) =>
                          project.links?.[link.key] ? (
                            <a
                              key={link.key}
                              href={project.links[link.key]}
                              className="inline-flex items-center gap-2 underline-offset-4 transition hover:underline"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {link.label}
                            </a>
                          ) : null,
                        )}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx global>{`
        .project-card {
          isolation: isolate;
          --glow-opacity: 0.12;
          --glow-blur: 8px;
          --edge-opacity: 0.12;
          --blob-bg:
            radial-gradient(400px 220px at 15% 15%, rgba(80, 130, 190, 0.35), rgba(80, 130, 190, 0) 60%),
            radial-gradient(420px 240px at 85% 85%, rgba(255, 225, 150, 0.35), rgba(255, 225, 150, 0) 60%);
        }

        .project-card:where(:hover, :focus-visible),
        .project-card[data-active="true"] {
          --glow-opacity: 0.35;
          --glow-blur: 12px;
          --edge-opacity: 0.3;
        }

        .project-base {
          position: absolute;
          inset: 0;
          z-index: 0;
          border-radius: inherit;
          background: rgba(255, 255, 255, 0.9);
        }

        .project-visuals {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          border-radius: inherit;
          display: block;
          background: var(--blob-bg);
          background-repeat: no-repeat;
          background-size: 140% 140%;
          animation: projectGlowDrift 6s ease-in-out infinite;
        }

        .project-glow {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          display: block;
          opacity: var(--glow-opacity);
          filter: blur(var(--glow-blur));
          transition: opacity 0.2s ease, filter 0.2s ease;
          background: inherit;
          background-repeat: inherit;
          background-size: inherit;
          background-position: inherit;
        }

        .project-edge {
          position: absolute;
          inset: 0;
          display: block;
          opacity: var(--edge-opacity);
          background: inherit;
          background-repeat: inherit;
          background-size: inherit;
          background-position: inherit;
        }

        .project-edge-top { clip-path: inset(0 0 calc(100% - 2px) 0); }
        .project-edge-bottom { clip-path: inset(calc(100% - 2px) 0 0 0); }

        @keyframes projectGlowDrift {
          0%, 100% { background-position: 0% 0%, 100% 100%; }
          50%      { background-position: 20% 0%, 80% 100%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .project-visuals { animation: none; }
        }
      `}</style>
    </section>
  );
}
