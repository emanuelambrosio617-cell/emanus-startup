import React, { useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { InnovationPage } from './pages/InnovationPage';
import { TeamPage } from './pages/TeamPage';
import { ContactPage } from './pages/ContactPage';

function PageMetaSync() {
  const { path, content } = useApp();

  useEffect(() => {
    let title = 'EMANUS — Transformando ideias em inovação';
    let description = content.hero.subtitle;

    if (path === '/sobre') {
      title = `${content.nav.about} | EMANUS`;
      description = content.about.lead;
    } else if (path === '/projetos') {
      title = `${content.nav.projects} | EMANUS`;
      description = content.projectsSection.subtitle;
    } else if (path.startsWith('/projetos/')) {
      const slug = path.replace('/projetos/', '');
      const project = content.projectsSection.items.find((p) => p.slug === slug);
      if (project) {
        title = `${project.name} — ${project.category} | EMANUS`;
        description = project.shortDescription;
      }
    } else if (path === '/inovacao') {
      title = `${content.nav.innovation} | EMANUS`;
      description = content.innovation.lead;
    } else if (path === '/equipa') {
      title = `${content.nav.team} | EMANUS`;
      description = content.team.lead;
    } else if (path === '/contactos') {
      title = `${content.nav.cta} | EMANUS`;
      description = content.contact.subtitle;
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [path, content]);

  return null;
}

function RouterView() {
  const { path } = useApp();

  if (path === '/sobre') return <AboutPage />;
  if (path === '/projetos') return <ProjectsPage />;
  if (path === '/projetos/emanus-ia') return <ProjectDetailPage slug="emanus-ia" />;
  if (path === '/projetos/premier-fit') return <ProjectDetailPage slug="premier-fit" />;
  if (path === '/projetos/famebook') return <ProjectDetailPage slug="famebook" />;
  if (path === '/inovacao') return <InnovationPage />;
  if (path === '/equipa') return <TeamPage />;
  if (path === '/contactos') return <ContactPage />;

  return <HomePage />;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AppProvider>
        <PageMetaSync />
        <div className="flex min-h-screen flex-col bg-white text-[#101828]">
          <Navbar />
          <main className="flex-1">
            <RouterView />
          </main>
          <Footer />
        </div>
      </AppProvider>
    </MotionConfig>
  );
}
