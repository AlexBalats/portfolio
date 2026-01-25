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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
    <section
      id="projects"
      className="py-20 sm:py-28"
      data-any-hover={hoveredIndex !== null ? "true" : "false"}
    >
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
        <div className="flex flex-col">
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
                  data-open={isOpen ? "true" : "false"}
                  data-hovered={hoveredIndex === index ? "true" : "false"}
                  style={{ ["--fx-delay" as any]: `${-index * 0.8}s` }}
                  onClick={() => toggleProject(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() =>
                    setHoveredIndex((current) =>
                      current === index ? null : current,
                    )
                  }
                  onFocus={() => setHoveredIndex(index)}
                  onBlur={() =>
                    setHoveredIndex((current) =>
                      current === index ? null : current,
                    )
                  }
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
    </section>
  );
}
