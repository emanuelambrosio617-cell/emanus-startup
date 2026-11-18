import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Reveal } from '../components/Reveal';

export function AboutPage() {
  const { content, navigate } = useApp();

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="pt-16 pb-14 sm:pt-24 sm:pb-20 border-b border-slate-200/80 bg-[#F6F7F9]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-[0.06em] text-[#D91414] mb-3">
              {content.about.kicker}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#0B0D12] text-balance">
              {content.about.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#5C6470]">
              {content.about.lead}
            </p>
          </div>
        </div>
      </section>

      {/* Origin and Trajectory */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0B0D12]">
                {content.about.originTitle}
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-5 text-base leading-relaxed text-[#5C6470]">
              {content.about.originParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          <div className="mt-16 pt-16 border-t border-slate-200/80">
            <h3 className="font-display text-xl font-semibold text-[#0B0D12]">
              {content.about.trajectoryTitle}
            </h3>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.about.trajectorySteps.map((step, idx) => (
                <Reveal key={step.index} delay={idx * 0.05}>
                  <div className="h-full rounded-2xl border border-slate-200 bg-white p-7">
                    <span className="font-mono text-xs text-[#D91414] tabular-nums">
                      {step.index}
                    </span>
                    <h4 className="mt-3 font-display text-lg font-semibold text-[#0B0D12]">
                      {step.title}
                    </h4>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#5C6470]">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 sm:py-24 bg-[#0B0D12] text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal>
              <div className="h-full rounded-2xl border border-white/15 bg-white/[0.03] p-8 sm:p-10">
                <p className="text-xs font-medium tracking-[0.06em] text-[#F5B800]">
                  {content.about.missionTitle}
                </p>
                <p className="mt-4 font-display text-xl sm:text-2xl font-medium leading-relaxed text-white">
                  {content.about.mission}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="h-full rounded-2xl border border-white/15 bg-white/[0.03] p-8 sm:p-10">
                <p className="text-xs font-medium tracking-[0.06em] text-[#F5B800]">
                  {content.about.visionTitle}
                </p>
                <p className="mt-4 font-display text-xl sm:text-2xl font-medium leading-relaxed text-white">
                  {content.about.vision}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#0B0D12]">
            {content.about.valuesTitle}
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.about.values.map((val, idx) => (
              <Reveal key={val.name} delay={idx * 0.04}>
                <div className="h-full rounded-2xl border border-slate-200/90 bg-[#F6F7F9]/70 p-7">
                  <span className="font-mono text-xs text-[#D91414] tabular-nums">
                    {val.index}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-[#0B0D12]">
                    {val.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#5C6470]">
                    {val.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 pt-10 border-t border-slate-200 flex flex-wrap items-center justify-between gap-6">
            <p className="text-base text-[#5C6470]">
              {content.partnerships.title}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/projetos"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/projetos');
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-[#D91414] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#B80E0E] transition-colors"
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
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-[#0B0D12] hover:bg-[#F6F7F9] transition-colors"
              >
                <span>{content.nav.cta}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
