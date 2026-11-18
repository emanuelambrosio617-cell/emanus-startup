import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SafeImage } from '../components/SafeImage';
import { Reveal } from '../components/Reveal';

export function ProjectsPage() {
  const { content, navigate } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const projects = content.projectsSection.items;
  const filterOptions = [
    { key: 'all', label: content.projectsSection.allFilter },
    ...projects.map((p) => ({ key: p.slug, label: p.name })),
  ];

  const visibleProjects =
    selectedFilter === 'all'
      ? projects
      : projects.filter((p) => p.slug === selectedFilter);

  return (
    <div className="bg-white">
      <section className="pt-16 pb-14 sm:pt-24 sm:pb-20 border-b border-slate-200/80 bg-[#F6F7F9]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-[0.06em] text-[#D91414] mb-3">
              {content.projectsSection.kicker}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#0B0D12] text-balance">
              {content.projectsSection.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#5C6470]">
              {content.projectsSection.subtitle}
            </p>
          </div>

          {/* Interactive filter bar */}
          <div className="mt-10 inline-flex flex-wrap items-center gap-1 rounded-xl border border-slate-200 bg-white p-1.5">
            {filterOptions.map((opt) => {
              const active = selectedFilter === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setSelectedFilter(opt.key)}
                  className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#0B0D12] text-white'
                      : 'text-[#5C6470] hover:text-[#0B0D12]'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          {visibleProjects.map((project, idx) => (
            <Reveal key={project.slug} delay={idx * 0.05}>
              <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  <div className="lg:col-span-5 bg-[#F6F7F9] border-b lg:border-b-0 lg:border-r border-slate-200">
                    <SafeImage
                      src={project.image}
                      alt={project.imageAlt}
                      fallbackTitle={project.name}
                      className="h-full w-full aspect-[4/3] lg:aspect-auto object-cover"
                    />
                  </div>
                  <div className="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#5C6470]">
                        <span className="font-mono tabular-nums">{project.index}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.category}</span>
                      </div>
                      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#0B0D12]">
                        {project.name}
                      </h2>
                      <p className="mt-4 text-base leading-relaxed text-[#667085]">
                        {project.shortDescription}
                      </p>

                      <div className="mt-6 pt-6 border-t border-slate-100">
                        <p className="text-xs font-semibold text-[#101828]">
                          {content.projectsSection.highlightsTitle}
                        </p>
                        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-[#667085]">
                          {project.highlights.map((h) => (
                            <li key={h.title} className="flex items-start gap-2">
                              <span
                                aria-hidden="true"
                                className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                                style={{ backgroundColor: project.identity.accentColor }}
                              />
                              <span>{h.title}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                      <span className="text-xs text-[#667085]">
                        {project.identity.tagline}
                      </span>
                      <a
                        href={`/projetos/${project.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/projetos/${project.slug}`);
                        }}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#D91414] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#B80E0E] whitespace-nowrap shrink-0"
                      >
                        <span>{content.projectsSection.ctaLabel}</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
