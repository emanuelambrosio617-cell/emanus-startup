import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Reveal } from '../components/Reveal';

export function InnovationPage() {
  const { content, navigate } = useApp();

  return (
    <div className="bg-white">
      <section className="bg-[#0B0D12] text-white pt-16 pb-16 sm:pt-24 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-[0.06em] text-[#F5B800] mb-3">
              {content.innovation.kicker}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white text-balance">
              {content.innovation.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              {content.innovation.lead}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-[#F6F7F9] border-b border-slate-200/80">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0B0D12]">
            {content.innovation.pillarsTitle}
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.innovation.pillars.map((pillar, idx) => (
              <Reveal key={pillar.index} delay={idx * 0.05}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-8">
                  <span className="font-mono text-sm text-[#D91414] tabular-nums">
                    {pillar.index}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-[#0B0D12]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[#5C6470]">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-[#0B0D12] text-balance">
                {content.innovation.africaTitle}
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-5 text-base leading-relaxed text-[#5C6470]">
              {content.innovation.africaParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
              <div className="pt-4 flex flex-wrap gap-3">
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
        </div>
      </section>
    </div>
  );
}
