import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SafeImage } from '../components/SafeImage';
import { Reveal } from '../components/Reveal';

export function TeamPage() {
  const { content, navigate } = useApp();

  return (
    <div className="bg-white">
      <section className="pt-16 pb-14 sm:pt-24 sm:pb-20 border-b border-slate-200/80 bg-[#F6F7F9]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-[0.06em] text-[#D91414] mb-3">
              {content.team.kicker}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#0B0D12] text-balance">
              {content.team.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#5C6470]">
              {content.team.lead}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {content.team.founders.map((founder, idx) => (
              <Reveal key={founder.id} delay={idx * 0.06}>
                <article className="flex flex-col h-full rounded-2xl border border-slate-200/90 bg-white overflow-hidden">
                  <div className="bg-[#F6F7F9] border-b border-slate-100">
                    <SafeImage
                      src={founder.image}
                      alt={`${founder.name} — ${founder.role}`}
                      fallbackTitle={founder.name}
                      priority={idx === 0}
                      className="aspect-[3/4] w-full object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="text-xs font-medium text-[#D91414]">{founder.role}</p>
                    <h2 className="mt-1 font-display text-2xl font-semibold text-[#0B0D12]">
                      {founder.name}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#5C6470]">
                      {founder.bio}
                    </p>
                    <div className="mt-auto pt-6 border-t border-slate-100">
                      {founder.linkedinUrl ? (
                        <a
                          href={founder.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#D91414] hover:text-[#B80E0E]"
                        >
                          <span>{content.team.linkedinLabel}</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <span className="text-xs text-[#5C6470]">
                          {content.team.linkedinPending}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Partnerships & Collaboration block */}
          <div className="mt-20 rounded-2xl border border-slate-200 bg-[#F6F7F9] p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <p className="text-xs font-medium tracking-[0.06em] text-[#D91414] mb-2">
                  {content.partnerships.kicker}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#0B0D12]">
                  {content.partnerships.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[#5C6470]">
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
                  className="inline-flex items-center gap-2 rounded-lg bg-[#D91414] px-5 py-3 text-sm font-medium text-white hover:bg-[#B80E0E] transition-colors cursor-pointer"
                >
                  <span>{content.partnerships.proposePartnershipCta}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    navigate('/contactos', {
                      category: 'Colaboração',
                      subject: 'Interesse em tornar-me colaborador',
                    })
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-[#101828] hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>{content.partnerships.becomeCollaboratorCta}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
