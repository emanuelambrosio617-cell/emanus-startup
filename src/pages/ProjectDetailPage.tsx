import React from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { ProjectSlug } from '../content/emanusData';
import { SafeImage } from '../components/SafeImage';
import { Reveal } from '../components/Reveal';

interface ProjectDetailPageProps {
  slug: ProjectSlug;
}

export function ProjectDetailPage({ slug }: ProjectDetailPageProps) {
  const { content, navigate } = useApp();
  const project = content.projectsSection.items.find((p) => p.slug === slug);

  if (!project) {
    return null;
  }

  const otherProjects = content.projectsSection.items.filter(
    (p) => p.slug !== slug
  );

  return (
    <div style={{ backgroundColor: project.identity.surfaceBg }}>
      {/* Independent Product Hero */}
      <section
        style={{ backgroundColor: project.identity.heroBg }}
        className="text-white pt-12 pb-16 sm:pt-16 sm:pb-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-10 border-b border-white/10">
            <a
              href="/projetos"
              onClick={(e) => {
                e.preventDefault();
                navigate('/projetos');
              }}
              className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{content.projectsSection.backToProjects}</span>
            </a>
            <span className="text-xs font-medium text-slate-300">
              {content.projectsSection.developedBy}
            </span>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="font-mono tabular-nums">{project.index}</span>
                <span aria-hidden="true">·</span>
                <span>{project.category}</span>
              </div>
              <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-tight text-white">
                {project.name}
              </h1>
              <p className="mt-4 text-lg sm:text-xl font-medium text-slate-200 max-w-2xl">
                {project.identity.tagline}
              </p>
              <p className="mt-5 text-base leading-relaxed text-slate-300 max-w-2xl">
                {project.fullPresentation}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() =>
                    navigate('/contactos', {
                      category: 'Parcerias',
                      subject: `Informações sobre o projeto ${project.name}`,
                    })
                  }
                  style={{ backgroundColor: project.identity.accentColor }}
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 cursor-pointer"
                >
                  <span>{content.projectsSection.inquireAboutProject}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex">
              <div className="w-full overflow-hidden rounded-2xl border border-white/15 bg-black/20">
                <SafeImage
                  src={project.image}
                  alt={project.imageAlt}
                  fallbackTitle={project.name}
                  priority
                  className="h-full w-full aspect-[4/3] lg:aspect-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0B0D12]">
                {content.projectsSection.objectivesTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#667085]">
                {project.identity.architectureNote}
              </p>
            </div>

            <div className="lg:col-span-8 space-y-4">
              {project.objectives.map((objective, idx) => (
                <Reveal key={idx} delay={idx * 0.05}>
                  <div
                    style={{ borderColor: project.identity.borderColor }}
                    className="flex items-start gap-4 rounded-2xl border bg-white p-6"
                  >
                    <span
                      style={{
                        backgroundColor: project.identity.accentSoft,
                        color: project.identity.accentColor,
                      }}
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                    >
                      <Check className="h-4 w-4" />
                    </span>
                    <p className="text-base leading-relaxed text-[#101828]">
                      {objective}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights / Capabilities */}
      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="pt-12 border-t" style={{ borderColor: project.identity.borderColor }}>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0B0D12]">
              {content.projectsSection.highlightsTitle}
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.highlights.map((highlight, idx) => (
                <Reveal key={highlight.title} delay={idx * 0.04}>
                  <div
                    style={{ borderColor: project.identity.borderColor }}
                    className="h-full rounded-2xl border bg-white p-7"
                  >
                    <span
                      style={{ color: project.identity.accentColor }}
                      className="font-mono text-xs tabular-nums"
                    >
                      0{idx + 1}.
                    </span>
                    <h3 className="mt-3 font-display text-lg font-semibold text-[#0B0D12]">
                      {highlight.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#667085]">
                      {highlight.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Other independent EMANUS products */}
          <div
            className="mt-20 pt-12 border-t"
            style={{ borderColor: project.identity.borderColor }}
          >
            <div className="flex items-center justify-between gap-4 mb-8">
              <h3 className="font-display text-xl font-semibold text-[#0B0D12]">
                {content.projectsSection.kicker}
              </h3>
              <a
                href="/projetos"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/projetos');
                }}
                className="text-sm font-medium text-[#D91414] hover:text-[#B80E0E]"
              >
                {content.projectsSection.allFilter}
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherProjects.map((other) => (
                <a
                  key={other.slug}
                  href={`/projetos/${other.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/projetos/${other.slug}`);
                  }}
                  style={{ borderColor: project.identity.borderColor }}
                  className="group flex items-center justify-between gap-4 rounded-2xl border bg-white p-6 transition-colors hover:border-slate-300"
                >
                  <div>
                    <p className="text-xs text-[#5C6470]">{other.category}</p>
                    <p className="mt-1 font-display text-lg font-semibold text-[#0B0D12] group-hover:text-[#D91414] transition-colors">
                      {other.name}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[#5C6470] group-hover:text-[#D91414] transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
