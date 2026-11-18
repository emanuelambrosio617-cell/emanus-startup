import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { SITE_CONTENT, type ContactCategory, type Locale, type SiteContent } from '../data/emanusData';

interface AppContextValue {
  path: string;
  locale: Locale;
  content: SiteContent;
  selectedContactCategory: ContactCategory;
  contactSubjectPreset: string;
  setLocale: (locale: Locale) => void;
  navigate: (to: string, options?: { category?: ContactCategory; subject?: string }) => void;
  setSelectedContactCategory: (category: ContactCategory) => void;
  setContactSubjectPreset: (subject: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function normalizePath(pathname: string): string {
  if (!pathname || pathname === '/') {
    return '/';
  }
  return pathname.replace(/\/+$/, '') || '/';
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState<string>(() => normalizePath(window.location.pathname));
  const [locale, setLocaleState] = useState<Locale>('pt');
  const [selectedContactCategory, setSelectedContactCategory] =
    useState<ContactCategory>('Parcerias');
  const [contactSubjectPreset, setContactSubjectPreset] = useState<string>('');

  useEffect(() => {
    const handlePopState = () => {
      setPath(normalizePath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
  }, []);

  const navigate = useCallback(
    (to: string, options?: { category?: ContactCategory; subject?: string }) => {
      if (options?.category) {
        setSelectedContactCategory(options.category);
      }
      if (options?.subject !== undefined) {
        setContactSubjectPreset(options.subject);
      }

      const [rawPathname, hash] = to.split('#');
      const targetPath = normalizePath(rawPathname || '/');

      if (targetPath !== path) {
        window.history.pushState({}, '', to);
        setPath(targetPath);
      }

      if (hash) {
        requestAnimationFrame(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [path]
  );

  return (
    <AppContext.Provider
      value={{
        path,
        locale,
        content: SITE_CONTENT[locale],
        selectedContactCategory,
        contactSubjectPreset,
        setLocale,
        navigate,
        setSelectedContactCategory,
        setContactSubjectPreset,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used inside AppProvider');
  }
  return ctx;
}
