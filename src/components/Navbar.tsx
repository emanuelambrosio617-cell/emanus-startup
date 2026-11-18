import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';

export function Navbar() {
  const { path, content, navigate } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [path]);

  const navItems = [
    { label: content.nav.home, to: '/' },
    { label: content.nav.about, to: '/sobre' },
    { label: content.nav.projects, to: '/projetos' },
    { label: content.nav.innovation, to: '/inovacao' },
    { label: content.nav.team, to: '/equipa' },
  ];

  const isActive = (to: string) => {
    if (to === '/') return path === '/';
    return path === to || path.startsWith(`${to}/`);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80'
          : 'bg-white border-b border-slate-100'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand wordmark only */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          className="shrink-0 whitespace-nowrap focus-visible:rounded-md"
          aria-label="EMANUS"
        >
          <BrandLogo variant="dark" />
        </a>

        {/* Zone 2: 5 concise single-line text links */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {navItems.map((item) => {
            const active = isActive(item.to);
            return (
              <a
                key={item.to}
                href={item.to}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.to);
                }}
                aria-current={active ? 'page' : undefined}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  active
                    ? 'text-[#D91414]'
                    : 'text-[#5C6470] hover:text-[#0B0D12]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-[#D91414] transition-transform duration-150 origin-left ${
                    active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + mobile trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/contactos"
            onClick={(e) => {
              e.preventDefault();
              navigate('/contactos');
            }}
            className="hidden md:inline-flex items-center justify-center rounded-lg bg-[#D91414] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#B80E0E] whitespace-nowrap shrink-0"
          >
            {content.nav.cta}
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? content.nav.menuClose : content.nav.menuOpen}
            className="inline-flex md:hidden h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-[#101828] transition-colors hover:bg-[#F5F7FA]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4">
          <nav aria-label="Navegação móvel" className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = isActive(item.to);
              return (
                <a
                  key={item.to}
                  href={item.to}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.to);
                    setMobileOpen(false);
                  }}
                  className={`flex h-11 items-center rounded-lg px-3 text-base font-medium transition-colors ${
                    active
                      ? 'bg-[#FEF2F2] text-[#D91414]'
                      : 'text-[#0B0D12] hover:bg-[#F6F7F9]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="mt-3 pt-3 border-t border-slate-100">
              <a
                href="/contactos"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/contactos');
                  setMobileOpen(false);
                }}
                className="flex h-11 w-full items-center justify-center rounded-lg bg-[#D91414] px-4 text-sm font-medium text-white transition-colors hover:bg-[#B80E0E]"
              >
                {content.nav.cta}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
