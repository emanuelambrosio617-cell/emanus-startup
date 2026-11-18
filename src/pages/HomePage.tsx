import React from 'react';
import { ArrowRight, Code2, Cpu, Layers, Compass, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HERO_IMAGE } from '../data/emanusData';
import { SafeImage } from '../components/SafeImage';
import { Reveal } from '../components/Reveal';
import { ContactSection } from '../components/ContactSection';

const AREA_ICONS = {
  software: Code2,
  ai: Cpu,
  products: Layers,
  innovation: Compass,
};

export function HomePage() {
  const { content, navigate } = useApp();

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-white pt-12 pb-16 sm:pt-20 sm:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-[#F6F7F9]/90 to-transparent"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex items-center gap-1" aria-hidden="true">
                  <span className="h-[3px] w-4 rounded-full bg-[#D91414]" />
                  <span className="h-[3px] w-4 rounded-full bg-[#F5B800]" />
                  <span className="h-[3px] w-4 rounded-full bg-[#0B0D12]" />
                </span>
                <p className="text-xs font-medium tracking-[0.04em] text-[#5C6470]">
                  {content.hero.kicker}
                </p>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.35rem] font-semibold tracking-tight leading-[1.08] text-[#0B0D12] text-balance">
                {content.hero.title}
              </h1>
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#5C6470] max-w-xl">
                {content.hero.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="/projetos"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/projetos');
                  }}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#D91414] px-6 py-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#B80E0E] whitespace-nowrap shrink-0"
                >
                  <span>{content.hero.primaryCta}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/contactos"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/contactos');
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-[#0B0D12] transition-colors duration-150 hover:bg-[#F6F7F9] whitespace-nowrap shrink-0"
                >
                  <span>{content.hero.secondaryCta}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 flex">
              <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-[#0B0D12]">
                <SafeImage
                  src={HERO_IMAGE}
                  alt={content.hero.imageAlt}
                  fallbackTitle="EMANUS"
                  priority
                  className="h-full w-full aspect-[16/9] lg:aspect-auto object-cover grayscale contrast-[1.08]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 flex"
                >
                  <div className="flex-1 bg-[#D91414]" />
                  <div className="flex-1 bg-[#F5B800]" />
                  <div className="flex-1 bg-[#0B0D12]" />
                </div>
              </div>
            </div>
          </div>

          {/* 4-column institutional grounding strip */}
          <div className="mt-14 pt-8 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {content.intro.scopeItems.map((item) => (
              <div key={item.label}>
                <p className="text-xs font-medium text-[#5C6470]">{item.label}</p>
                <p className="mt-1 font-display text-sm font-semibold text-[#0B0D12]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. PRESENTATION SECTION */}
      <section className="bg-[#F6F7F9] py-20 sm:py-24 border-y border-slate-200/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 items-start">
              <div className="lg:col-span-5">
                <p className="text-xs font-medium tracking-[0.06em] text-[#D91414] mb-3">
                  {content.intro.kicker}
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#0B0D12] text-balance">
                  {content.intro.title}
                </h2>
              </div>
              <div className="lg:col-span-7 space-y-5 text-base leading-relaxed text-[#5C6470]">
                {content.intro.paragraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
                <div className="pt-2">
                  <a
                    href="/sobre"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/sobre');
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#D91414] hover:text-[#B80E0E] transition-colors"
                  >
                    <span>{content.nav.about}</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. AREAS OF EXPERTISE */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-[0.06em] text-[#D91414] mb-3">
                {content.areas.kicker}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#0B0D12] text-balance">
                {content.areas.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#5C6470]">
                {content.areas.subtitle}
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.areas.items.map((area, idx) => {
              const Icon = AREA_ICONS[area.id];
              return (
                <Reveal key={area.id} delay={idx * 0.05}>
                  <div className="h-full rounded-2xl border border-slate-200/90 bg-white p-7 sm:p-8 transition-colors duration-150 hover:border-slate-300">
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#FEF2F2] text-[#D91414]">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <span className="font-mono text-xs text-[#5C6470] tabular-nums">
                        {area.index}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-xl font-semibold text-[#0B0D12]">
                      {area.title}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#5C6470]">
                      {area.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS */}
      <section className="bg-[#F6F7F9] py-20 sm:py-24 border-t border-slate-200/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-xs font-medium tracking-[0.06em] text-[#D91414] mb-3">
                  {content.projectsSection.kicker}
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#0B0D12] text-balance">
                  {content.projectsSection.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#5C6470]">
                  {content.projectsSection.subtitle}
                </p>
              </div>
              <a
                href="/projetos"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/projetos');
                }}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#D91414] hover:text-[#B80E0E] whitespace-nowrap shrink-0"
              >
                <span>{content.projectsSection.allFilter}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {content.projectsSection.items.map((project, idx) => (
              <Reveal key={project.slug} delay={idx * 0.06}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white transition-transform duration-200 hover:-translate-y-0.5">
                  <div className="overflow-hidden bg-[#F6F7F9] border-b border-slate-100">
                    <SafeImage
                      src={project.image}
                      alt={project.imageAlt}
                      fallbackTitle={project.name}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex items-center gap-2 text-xs text-[#5C6470]">
                      <span className="font-mono tabular-nums">{project.index}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.category}</span>
                    </div>
                    <h3 className="mt-2.5 font-display text-2xl font-semibold tracking-tight text-[#0B0D12]">
                      {project.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#5C6470]">
                      {project.shortDescription}
                    </p>

                    <ul className="mt-5 pt-5 border-t border-slate-100 space-y-1.5 text-xs text-[#101828]">
                      {project.highlights.slice(0, 3).map((item) => (
                        <li key={item.title} className="flex items-start gap-2">
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-1 w-1 rounded-full shrink-0"
                            style={{ backgroundColor: project.identity.accentColor }}
                          />
                          <span>{item.title}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-6">
                      <a
                        href={`/projetos/${project.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/projetos/${project.slug}`);
                        }}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#D91414] hover:text-[#B80E0E] transition-colors"
                      >
                        <span>{content.projectsSection.ctaLabel}</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INNOVATION PILLARS */}
      <section className="bg-[#0B0D12] text-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-xs font-medium tracking-[0.06em] text-[#F5B800] mb-3">
                {content.innovation.kicker}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-white text-balance">
                {content.innovation.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300 max-w-2xl">
                {content.innovation.lead}
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.innovation.pillars.map((pillar, idx) => (
              <Reveal key={pillar.index} delay={idx * 0.06}>
                <div className="h-full rounded-2xl border border-white/15 bg-white/[0.03] p-7">
                  <span className="font-mono text-sm text-[#F5B800] tabular-nums">
                    {pillar.index}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10">
            <a
              href="/inovacao"
              onClick={(e) => {
                e.preventDefault();
                navigate('/inovacao');
              }}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#F5B800] hover:text-white transition-colors"
            >
              <span>{content.innovation.africaTitle}</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 6. FOUNDERS */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-xs font-medium tracking-[0.06em] text-[#D91414] mb-3">
                  {content.team.kicker}
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#0B0D12] text-balance">
                  {content.team.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#5C6470]">
                  {content.team.lead}
                </p>
              </div>
              <a
                href="/equipa"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/equipa');
                }}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#D91414] hover:text-[#B80E0E] whitespace-nowrap shrink-0"
              >
                <span>{content.nav.team}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.team.founders.map((founder, idx) => (
              <Reveal key={founder.id} delay={idx * 0.06}>
                <article className="flex flex-col h-full">
                  <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-[#F6F7F9]">
                    <SafeImage
                      src={founder.image}
                      alt={`${founder.name} — ${founder.role}`}
                      fallbackTitle={founder.name}
                      className="aspect-[3/4] w-full object-cover object-top"
                    />
                  </div>
                  <div className="mt-5">
                    <p className="text-xs font-medium text-[#D91414]">{founder.role}</p>
                    <h3 className="mt-1 font-display text-xl font-semibold text-[#0B0D12]">
                      {founder.name}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#5C6470]">
                      {founder.bio}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PARTNERSHIPS & COLLABORATION */}
      <section className="bg-white pb-20 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-2xl border border-slate-200 bg-[#F6F7F9] p-8 sm:p-12 lg:p-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <p className="text-xs font-medium tracking-[0.06em] text-[#D91414] mb-3">
                    {content.partnerships.kicker}
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0B0D12] text-balance">
                    {content.partnerships.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-[#5C6470]">
                    {content.partnerships.description}
                  </p>
                </div>
                <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3.5">
                  <button
                    type="button"
                    onClick={() =>
                      navigate('/contactos', {
                        category: 'Parcerias',
                        subject: 'Proposta de parceria institucional',
                      })
                    }
                    className="inline-flex items-center gap-2 rounded-lg bg-[#D91414] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#B80E0E] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>{content.partnerships.proposePartnershipCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      navigate('/contactos', {
                        category: 'Colaboração',
                        subject: 'Interesse em colaborar com a EMANUS',
                      })
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-[#0B0D12] transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>{content.partnerships.becomeCollaboratorCta}</span>
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. CONTACT */}
      <ContactSection compact />
    </div>
  );
}
