import React from 'react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';

export function Footer() {
  const { content, locale, setLocale, navigate } = useApp();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B0D12] text-white border-t border-white/10">
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#D91414]" />
        <div className="flex-1 bg-[#F5B800]" />
        <div className="flex-1 bg-[#0B0D12]" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand column */}
          <div className="md:col-span-5">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              aria-label="EMANUS"
            >
              <BrandLogo variant="light" />
            </a>
            <p className="mt-4 text-sm font-medium text-slate-200">
              {content.footer.slogan}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
              {content.footer.description}
            </p>
          </div>

          {/* Main navigation */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold tracking-[0.06em] text-slate-300">
              {content.footer.navigationTitle}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                  }}
                  className="hover:text-white transition-colors"
                >
                  {content.nav.home}
                </a>
              </li>
              <li>
                <a
                  href="/sobre"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/sobre');
                  }}
                  className="hover:text-white transition-colors"
                >
                  {content.nav.about}
                </a>
              </li>
              <li>
                <a
                  href="/inovacao"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/inovacao');
                  }}
                  className="hover:text-white transition-colors"
                >
                  {content.nav.innovation}
                </a>
              </li>
              <li>
                <a
                  href="/equipa"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/equipa');
                  }}
                  className="hover:text-white transition-colors"
                >
                  {content.nav.team}
                </a>
              </li>
              <li>
                <a
                  href="/contactos"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/contactos');
                  }}
                  className="hover:text-white transition-colors"
                >
                  {content.nav.cta}
                </a>
              </li>
            </ul>
          </div>

          {/* Independent products */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold tracking-[0.06em] text-slate-300">
              {content.footer.projectsTitle}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              {content.projectsSection.items.map((project) => (
                <li key={project.slug}>
                  <a
                    href={`/projetos/${project.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/projetos/${project.slug}`);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {project.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Institutional info + language switcher */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold tracking-[0.06em] text-slate-300">
              {content.footer.contactTitle}
            </h3>
            <div className="mt-4 space-y-2.5 text-sm text-slate-400">
              <p>{content.footer.location}</p>
              <p>
                <a
                  href={`mailto:${content.footer.emailDisplay}`}
                  className="text-slate-300 hover:text-white transition-colors break-all"
                >
                  {content.footer.emailDisplay}
                </a>
              </p>
              <p>
                <a
                  href={`https://wa.me/${content.footer.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors tabular-nums"
                >
                  WhatsApp: {content.footer.whatsappDisplay}
                </a>
              </p>
              <p>
                <a
                  href="/contactos"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/contactos');
                  }}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {content.nav.cta}
                </a>
              </p>
            </div>

            <div className="mt-6">
              <span className="block text-xs font-medium text-slate-400 mb-2">
                {content.footer.languageLabel}
              </span>
              <div className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 p-1">
                <button
                  type="button"
                  onClick={() => setLocale('pt')}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                    locale === 'pt'
                      ? 'bg-[#D91414] text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  PT
                </button>
                <button
                  type="button"
                  onClick={() => setLocale('en')}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                    locale === 'en'
                      ? 'bg-[#D91414] text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p className="tabular-nums">
            © {currentYear} EMANUS. {content.footer.rights}
          </p>
          <p>{content.footer.slogan}</p>
        </div>
      </div>
    </footer>
  );
}
