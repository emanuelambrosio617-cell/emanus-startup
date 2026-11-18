export type Locale = 'pt' | 'en';

export type ContactCategory =
  | 'Parcerias'
  | 'Investimentos'
  | 'Colaboração'
  | 'Informações gerais';

export type ProjectSlug = 'emanus-ia' | 'premier-fit' | 'famebook';

export interface ProjectHighlight {
  title: string;
  description: string;
}

export interface ProjectIdentity {
  heroBg: string;
  surfaceBg: string;
  accentColor: string;
  accentSoft: string;
  borderColor: string;
  tagline: string;
  architectureNote: string;
}

export interface ProjectItem {
  slug: ProjectSlug;
  index: string;
  name: string;
  category: string;
  shortDescription: string;
  fullPresentation: string;
  image: string;
  imageAlt: string;
  objectives: string[];
  highlights: ProjectHighlight[];
  identity: ProjectIdentity;
}

export interface FounderItem {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedinUrl?: string | null;
}

export interface SiteContent {
  nav: {
    home: string;
    about: string;
    projects: string;
    innovation: string;
    team: string;
    cta: string;
    menuOpen: string;
    menuClose: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    imageAlt: string;
  };
  intro: {
    kicker: string;
    title: string;
    paragraphs: string[];
    scopeItems: { label: string; value: string }[];
  };
  areas: {
    kicker: string;
    title: string;
    subtitle: string;
    items: {
      id: 'software' | 'ai' | 'products' | 'innovation';
      index: string;
      title: string;
      description: string;
    }[];
  };
  projectsSection: {
    kicker: string;
    title: string;
    subtitle: string;
    allFilter: string;
    ctaLabel: string;
    backToProjects: string;
    developedBy: string;
    inquireAboutProject: string;
    objectivesTitle: string;
    highlightsTitle: string;
    items: ProjectItem[];
  };
  about: {
    kicker: string;
    title: string;
    lead: string;
    originTitle: string;
    originParagraphs: string[];
    trajectoryTitle: string;
    trajectorySteps: { index: string; title: string; description: string }[];
    missionTitle: string;
    mission: string;
    visionTitle: string;
    vision: string;
    valuesTitle: string;
    values: { index: string; name: string; description: string }[];
  };
  innovation: {
    kicker: string;
    title: string;
    lead: string;
    pillarsTitle: string;
    pillars: { index: string; title: string; description: string }[];
    africaTitle: string;
    africaParagraphs: string[];
  };
  team: {
    kicker: string;
    title: string;
    lead: string;
    linkedinLabel: string;
    linkedinPending: string;
    founders: FounderItem[];
  };
  partnerships: {
    kicker: string;
    title: string;
    description: string;
    proposePartnershipCta: string;
    becomeCollaboratorCta: string;
  };
  contact: {
    kicker: string;
    title: string;
    subtitle: string;
    institutionalNoteTitle: string;
    categoriesLabel: string;
    categories: {
      value: ContactCategory;
      label: string;
      description: string;
    }[];
    form: {
      fullNameLabel: string;
      fullNamePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      organizationLabel: string;
      organizationPlaceholder: string;
      categoryLabel: string;
      subjectLabel: string;
      subjectPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      privacyNotice: string;
      submitButton: string;
      submittingButton: string;
      sendAnother: string;
      successTitle: string;
      referenceLabel: string;
    };
  };
  footer: {
    slogan: string;
    description: string;
    navigationTitle: string;
    projectsTitle: string;
    contactTitle: string;
    location: string;
    emailDisplay: string;
    whatsappDisplay: string;
    whatsappNumber: string;
    languageLabel: string;
    rights: string;
  };
}

export const HERO_IMAGE = '/src/assets/images/hero_emanus_architecture_1794998012103.jpg';

const PT_CONTENT: SiteContent = {
  nav: {
    home: 'Início',
    about: 'Sobre nós',
    projects: 'Projetos',
    innovation: 'Inovação',
    team: 'Equipa',
    cta: 'Fale connosco',
    menuOpen: 'Abrir menu de navegação',
    menuClose: 'Fechar menu de navegação',
  },
  hero: {
    kicker: 'Startup Angolana de Tecnologia e Inovação',
    title: 'Transformando ideias em inovação.',
    subtitle:
      'A EMANUS concebe e desenvolve soluções digitais, inteligência artificial aplicada e produtos de software próprios preparados para responder a desafios reais em Angola, África e no mercado internacional.',
    primaryCta: 'Explorar projetos',
    secondaryCta: 'Fale connosco',
    imageAlt: 'Arquitetura tecnológica e engenharia de plataformas digitais da EMANUS',
  },
  intro: {
    kicker: 'Identidade Institucional',
    title: 'Engenharia de software orientada para impacto real e visão de longo prazo.',
    paragraphs: [
      'A EMANUS nasceu da iniciativa de jovens empreendedores angolanos determinados a utilizar a tecnologia como instrumento direto de transformação económica, social e empresarial.',
      'Combinamos rigor técnico, arquitetura de software moderna e compreensão profunda da realidade africana para transformar conceitos ambiciosos em plataformas digitais independentes, escaláveis e confiáveis.',
    ],
    scopeItems: [
      { label: 'Origem', value: 'Luanda, Angola' },
      { label: 'Atuação', value: 'Angola, África e Global' },
      { label: 'Especialidade', value: 'Software, IA e Plataformas' },
      { label: 'Posicionamento', value: 'Fábrica de Inovação Digital' },
    ],
  },
  areas: {
    kicker: 'Áreas de Atuação',
    title: 'Capacidade técnica multidisciplinar para criar produtos digitais completos.',
    subtitle:
      'Estruturamos cada iniciativa desde a conceção estratégica até à operação em produção, com foco em utilidade prática e escalabilidade.',
    items: [
      {
        id: 'software',
        index: '01',
        title: 'Desenvolvimento de Software',
        description:
          'Arquitetura e engenharia de aplicações web, sistemas empresariais e infraestruturas digitais robustas com elevados padrões de desempenho e segurança.',
      },
      {
        id: 'ai',
        index: '02',
        title: 'Inteligência Artificial',
        description:
          'Aplicação prática de modelos de IA, automação inteligente de processos e sistemas de apoio à decisão adaptados à realidade empresarial africana.',
      },
      {
        id: 'products',
        index: '03',
        title: 'Produtos Tecnológicos Próprios',
        description:
          'Incubação, design e operação de plataformas digitais independentes com marca, proposta de valor e ecossistema próprios.',
      },
      {
        id: 'innovation',
        index: '04',
        title: 'Soluções Digitais e Inovação',
        description:
          'Consultoria tecnológica e desenvolvimento de sistemas à medida para organizações que procuram modernizar operações e criar novas frentes digitais.',
      },
    ],
  },
  projectsSection: {
    kicker: 'Portefólio de Produtos',
    title: 'Projetos e plataformas com identidade independente.',
    subtitle:
      'Cada produto desenvolvido no ecossistema EMANUS responde a um mercado específico com arquitetura própria, experiência dedicada e foco na execução.',
    allFilter: 'Todos os projetos',
    ctaLabel: 'Explorar projeto',
    backToProjects: 'Voltar a projetos',
    developedBy: 'Produto desenvolvido pela EMANUS',
    inquireAboutProject: 'Solicitar informações sobre este projeto',
    objectivesTitle: 'Objetivos e Propósito',
    highlightsTitle: 'Capacidades e Pilares do Produto',
    items: [
      {
        slug: 'emanus-ia',
        index: '01',
        name: 'EMANUS IA',
        category: 'Inteligência Artificial & Automação',
        shortDescription:
          'Plataforma de inteligência artificial orientada para produtividade empresarial, assistência contextual e automatização de fluxos operacionais.',
        fullPresentation:
          'A EMANUS IA materializa a aposta da EMANUS em inteligência artificial aplicada. Concebida para responder às necessidades de equipas, instituições e negócios em crescimento, a plataforma organiza conhecimento, acelera processos de decisão e integra fluxos automatizados com foco em contexto local e língua portuguesa.',
        image: '/src/assets/images/project_emanus_ia_1794998013354.jpg',
        imageAlt: 'Visualização da plataforma EMANUS IA de inteligência artificial',
        objectives: [
          'Democratizar o acesso a ferramentas de inteligência artificial úteis para equipas e PMEs em Angola e África.',
          'Automatizar tarefas operacionais repetitivas, atendimento estruturado e síntese de informação empresarial.',
          'Construir uma arquitetura extensível capaz de integrar dados internos e fluxos de trabalho existentes.',
        ],
        highlights: [
          {
            title: 'Assistência Contextual em Português',
            description:
              'Interação orientada ao contexto linguístico e operacional de empresas e profissionais lusófonos.',
          },
          {
            title: 'Automação de Fluxos de Trabalho',
            description:
              'Orquestração de tarefas, classificação de pedidos e geração estruturada de relatórios operacionais.',
          },
          {
            title: 'Arquitetura Modular e Segura',
            description:
              'Separação rigorosa de dados por organização, controlo de acessos e integração via APIs.',
          },
        ],
        identity: {
          heroBg: '#09111F',
          surfaceBg: '#F4F7FC',
          accentColor: '#155EEF',
          accentSoft: '#E8F0FE',
          borderColor: '#D6E2F5',
          tagline: 'Inteligência artificial aplicada à produtividade e decisão.',
          architectureNote:
            'Desenhado como núcleo inteligente modular para acelerar operações empresariais com fiabilidade e contexto.',
        },
      },
      {
        slug: 'premier-fit',
        index: '02',
        name: 'PREMIER FIT',
        category: 'Saúde, Bem-estar & Tecnologia Desportiva',
        shortDescription:
          'Plataforma digital dedicada ao acompanhamento físico, gestão de treinos e conexão moderna entre praticantes, treinadores e espaços fitness.',
        fullPresentation:
          'O PREMIER FIT representa a incursão da EMANUS na digitalização do setor de saúde ativa e bem-estar. A solução combina planeamento de treino, acompanhamento de evolução e ferramentas de gestão para tornar a rotina desportiva mais estruturada, mensurável e acessível.',
        image: '/src/assets/images/project_premier_fit_1794998014116.jpg',
        imageAlt: 'Interface e conceito digital da plataforma PREMIER FIT',
        objectives: [
          'Estruturar planos de treino e evolução física numa interface intuitiva para uso diário.',
          'Apoiar ginásios, preparadores físicos e estúdios na organização de membros e programas.',
          'Promover consistência e hábitos saudáveis através de acompanhamento digital contínuo.',
        ],
        highlights: [
          {
            title: 'Planos de Treino Estruturados',
            description:
              'Organização clara de rotinas, cargas, séries e objetivos progressivos adaptados a cada perfil.',
          },
          {
            title: 'Acompanhamento de Evolução',
            description:
              'Registo contínuo de desempenho, assiduidade e marcos físicos ao longo do tempo.',
          },
          {
            title: 'Gestão para Espaços e Treinadores',
            description:
              'Ferramentas práticas para acompanhamento de alunos, agendas e programas personalizados.',
          },
        ],
        identity: {
          heroBg: '#0B1612',
          surfaceBg: '#F3F8F5',
          accentColor: '#0E9F6E',
          accentSoft: '#E3F7EF',
          borderColor: '#CDE8DC',
          tagline: 'Disciplina, desempenho e tecnologia ao serviço do bem-estar.',
          architectureNote:
            'Conceção focada em clareza visual, usabilidade móvel rápida e acompanhamento contínuo de progresso.',
        },
      },
      {
        slug: 'famebook',
        index: '03',
        name: 'FAMEBOOK',
        category: 'Rede Social, Criadores & Ecossistema Digital',
        shortDescription:
          'Plataforma social digital desenhada para conectar comunidades, impulsionar criadores de conteúdo e fortalecer a presença digital emergente.',
        fullPresentation:
          'O FAMEBOOK é uma iniciativa digital da EMANUS orientada para a economia criativa e interação comunitária. Criado com foco em identidade própria e descoberta de talento, o produto oferece um ambiente moderno onde criadores, marcas e utilizadores constroem relevância e ligação autêntica.',
        image: '/src/assets/images/project_famebook_1794998014581.jpg',
        imageAlt: 'Conceito visual e ecossistema comunitário da plataforma FAMEBOOK',
        objectives: [
          'Oferecer um espaço digital dinâmico para expressão criativa e construção de comunidades.',
          'Dar visibilidade estruturada a novos talentos, criadores independentes e projetos culturais.',
          'Criar pontes de colaboração entre audiências engajadas e iniciativas comerciais.',
        ],
        highlights: [
          {
            title: 'Perfis e Portefólio de Criadores',
            description:
              'Espaços dedicados para apresentação de identidade, publicações e conquistas digitais.',
          },
          {
            title: 'Descoberta e Interação Comunitária',
            description:
              'Mecanismos fluidos de partilha, acompanhamento e envolvimento em tempo real.',
          },
          {
            title: 'Ecossistema para Marcas e Talentos',
            description:
              'Base tecnológica preparada para parcerias criativas e crescimento sustentável de audiência.',
          },
        ],
        identity: {
          heroBg: '#160E1F',
          surfaceBg: '#F8F5FC',
          accentColor: '#7C3AED',
          accentSoft: '#F0E9FE',
          borderColor: '#DFD4F7',
          tagline: 'Comunidade, expressão digital e visibilidade para novos criadores.',
          architectureNote:
            'Desenvolvido para privilegiar descoberta orgânica, identidade visual expressiva e escalabilidade social.',
        },
      },
    ],
  },
  about: {
    kicker: 'Sobre a EMANUS',
    title: 'Uma startup angolana construída para transformar visão em produtos duradouros.',
    lead: 'Fundada por jovens empreendedores tecnológicos, a EMANUS une engenharia sólida, ambição estratégica e compromisso com o desenvolvimento digital de Angola e de África.',
    originTitle: 'Origem e Propósito',
    originParagraphs: [
      'A EMANUS surgiu da convicção de que o continente africano não deve apenas consumir tecnologia produzida externamente, mas sim conceber, liderar e exportar soluções digitais de alto nível.',
      'A partir de Angola, os fundadores reuniram competências complementares em engenharia de software, produto digital e estratégia empreendedora para estruturar uma empresa tecnológica capaz de criar plataformas próprias e colaborar com parceiros exigentes.',
      'Cada linha de código e cada decisão de produto dentro da EMANUS é orientada por um critério claro: resolver problemas concretos com simplicidade, fiabilidade e visão de futuro.',
    ],
    trajectoryTitle: 'Como Estruturamos o Nosso Trabalho',
    trajectorySteps: [
      {
        index: '01',
        title: 'Identificação de Problemas Reais',
        description:
          'Partimos de necessidades concretas observadas no mercado angolano e africano antes de desenhar qualquer arquitetura técnica.',
      },
      {
        index: '02',
        title: 'Engenharia e Produto Próprio',
        description:
          'Desenvolvemos plataformas com identidade independente, arquitetura limpa e foco na experiência real do utilizador.',
      },
      {
        index: '03',
        title: 'Parcerias e Escala Sustentável',
        description:
          'Abrimos pontes com investidores, empresas e instituições para acelerar a adoção e expandir fronteiras regionais.',
      },
    ],
    missionTitle: 'Missão',
    mission:
      'Conceber e desenvolver soluções digitais, plataformas inteligentes e produtos de software que resolvam problemas reais, gerem oportunidades económicas e elevem a competitividade tecnológica de empresas e pessoas.',
    visionTitle: 'Visão',
    vision:
      'Consolidar a EMANUS como uma referência tecnológica africana reconhecida pela qualidade dos seus produtos digitais, pela capacidade de inovação contínua e pelo impacto positivo nos mercados onde atua.',
    valuesTitle: 'Valores Fundamentais',
    values: [
      {
        index: '01',
        name: 'Rigor e Excelência Técnica',
        description:
          'Compromisso com engenharia bem estruturada, segurança, clareza de design e fiabilidade em cada entrega.',
      },
      {
        index: '02',
        name: 'Inovação com Propósito',
        description:
          'Inovamos não por tendência passageira, mas para simplificar processos e desbloquear valor real para as pessoas.',
      },
      {
        index: '03',
        name: 'Protagonismo Africano',
        description:
          'Acreditamos na capacidade de jovens talentos angolanos e africanos criarem tecnologia de padrão internacional.',
      },
      {
        index: '04',
        name: 'Transparência e Credibilidade',
        description:
          'Construímos relações de longo prazo com parceiros, colaboradores e investidores baseadas na seriedade e na palavra cumprida.',
      },
      {
        index: '05',
        name: 'Agilidade e Aprendizagem',
        description:
          'Evoluímos continuamente os nossos métodos e tecnologias para responder com rapidez às mudanças do mercado.',
      },
      {
        index: '06',
        name: 'Colaboração Estratégica',
        description:
          'Valorizamos o trabalho em equipa e alianças que multiplicam capacidades e criam ecossistemas mais fortes.',
      },
    ],
  },
  innovation: {
    kicker: 'Inovação & Ecossistema',
    title: 'Tecnologia concebida em Angola com ambição continental e padrão global.',
    lead: 'Encaramos a inovação como disciplina contínua: combinar engenharia de software, inteligência artificial e conhecimento local para construir o futuro digital africano.',
    pillarsTitle: 'Pilares da Nossa Abordagem Tecnológica',
    pillars: [
      {
        index: '01',
        title: 'Arquitetura Orientada ao Produto',
        description:
          'Projetamos sistemas modulares, fáceis de manter e preparados para evoluir à medida que o número de utilizadores e integrações cresce.',
      },
      {
        index: '02',
        title: 'Inteligência Artificial Acessível',
        description:
          'Integramos capacidades de IA de forma prática para aumentar a produtividade, automatizar tarefas e melhorar decisões operacionais.',
      },
      {
        index: '03',
        title: 'Design Focado no Utilizador Real',
        description:
          'Interfaces limpas, rápidas e responsivas, otimizadas para diferentes dispositivos, larguras de banda e contextos de utilização.',
      },
    ],
    africaTitle: 'O Ecossistema Tecnológico Africano como Oportunidade',
    africaParagraphs: [
      'África atravessa um momento decisivo de digitalização, impulsionado por uma população jovem conectada e por empresas que necessitam de ferramentas modernas adaptadas às suas realidades operacionais.',
      'A EMANUS posiciona-se na vanguarda deste movimento a partir de Angola, desenvolvendo produtos digitais próprios e parcerias institucionais que fortalecem a soberania tecnológica, formam competências locais e criam pontes com mercados internacionais.',
    ],
  },
  team: {
    kicker: 'Liderança & Fundadores',
    title: 'Os empreendedores por trás da visão EMANUS.',
    lead: 'A EMANUS é liderada pelos seus três fundadores, que alinham direção estratégica, execução tecnológica e desenvolvimento de produto para construir uma empresa sólida e duradoura.',
    linkedinLabel: 'Perfil LinkedIn',
    linkedinPending: 'Equipa Fundadora · EMANUS Angola',
    founders: [
      {
        id: 'emanuel',
        name: 'Emanuel De Jesus',
        role: 'Fundador',
        bio: 'Idealizador e Fundador da EMANUS. Lidera o posicionamento institucional, a visão estratégica de longo prazo e o desenvolvimento de alianças tecnológicas que impulsionam o crescimento da startup.',
        image: '/assets/aistudio/Emanuel_60841c7d.png',
        linkedinUrl: null,
      },
      {
        id: 'daniel',
        name: 'Daniel Taba',
        role: 'Co-fundador',
        bio: 'Co-fundador da EMANUS. Atua na estruturação dos produtos digitais, na coordenação operacional dos projetos e na consolidação de processos orientados para execução e qualidade.',
        image: '/src/assets/images/founder_daniel_1794998014944.jpg',
        linkedinUrl: null,
      },
      {
        id: 'guido',
        name: 'Guido Alfredo',
        role: 'Co-fundador',
        bio: 'Co-fundador da EMANUS. Contribui na arquitetura tecnológica, na pesquisa de inovação aplicada e na evolução contínua das plataformas digitais desenvolvidas pela empresa.',
        image: '/src/assets/images/founder_guido_1794998015611.jpg',
        linkedinUrl: null,
      },
    ],
  },
  partnerships: {
    kicker: 'Parcerias & Oportunidades',
    title: 'Construa o próximo capítulo tecnológico connosco.',
    description:
      'Estamos abertos a parcerias empresariais, diálogo com investidores estratégicos e colaboração com profissionais de talento que partilhem a nossa visão de inovação.',
    proposePartnershipCta: 'Propor parceria',
    becomeCollaboratorCta: 'Tornar-se colaborador',
  },
  contact: {
    kicker: 'Contacto Institucional',
    title: 'Fale connosco.',
    subtitle:
      'Tem uma proposta de parceria, interesse em investir nos nossos produtos ou vontade de colaborar com a equipa EMANUS? Envie a sua mensagem diretamente pelos nossos canais oficiais.',
    institutionalNoteTitle: 'Canais Diretos da EMANUS',
    categoriesLabel: 'Selecione o enquadramento do contacto',
    categories: [
      {
        value: 'Parcerias',
        label: 'Parcerias',
        description: 'Alianças empresariais, integração tecnológica e projetos institucionais.',
      },
      {
        value: 'Investimentos',
        label: 'Investimentos',
        description: 'Conversas com investidores, aceleradoras e fundos estratégicos.',
      },
      {
        value: 'Colaboração',
        label: 'Colaboração',
        description: 'Talento em engenharia, design de produto e colaboração técnica.',
      },
      {
        value: 'Informações gerais',
        label: 'Informações gerais',
        description: 'Questões institucionais, imprensa ou detalhes sobre os projetos.',
      },
    ],
    form: {
      fullNameLabel: 'Nome completo',
      fullNamePlaceholder: 'Ex.: João Manuel',
      emailLabel: 'Email profissional ou pessoal',
      emailPlaceholder: 'nome@empresa.com',
      organizationLabel: 'Empresa / Organização (opcional)',
      organizationPlaceholder: 'Nome da instituição ou projeto',
      categoryLabel: 'Assunto / Categoria',
      subjectLabel: 'Título do assunto',
      subjectPlaceholder: 'Resumo breve do motivo do contacto',
      messageLabel: 'Mensagem',
      messagePlaceholder:
        'Descreva o contexto da sua proposta, projeto ou pedido de informação...',
      privacyNotice:
        'Ao submeter, a mensagem é registada com referência única e preparada para envio ao WhatsApp (+244 940 843 801) e email oficial (emanueldejesus617@gmail.com).',
      submitButton: 'Enviar mensagem',
      submittingButton: 'A registar mensagem...',
      sendAnother: 'Enviar nova mensagem',
      successTitle: 'Mensagem registada com sucesso.',
      referenceLabel: 'Código de referência',
    },
  },
  footer: {
    slogan: 'Transformando ideias em inovação.',
    description:
      'Startup angolana de tecnologia, inovação e desenvolvimento de soluções digitais com atuação em Angola, África e mercado internacional.',
    navigationTitle: 'Institucional',
    projectsTitle: 'Produtos',
    contactTitle: 'Contacto Direto',
    location: 'Luanda, Angola',
    emailDisplay: 'emanueldejesus617@gmail.com',
    whatsappDisplay: '+244 940 843 801',
    whatsappNumber: '244940843801',
    languageLabel: 'Idioma',
    rights: 'Todos os direitos reservados.',
  },
};

const EN_CONTENT: SiteContent = {
  nav: {
    home: 'Home',
    about: 'About Us',
    projects: 'Projects',
    innovation: 'Innovation',
    team: 'Team',
    cta: 'Contact Us',
    menuOpen: 'Open navigation menu',
    menuClose: 'Close navigation menu',
  },
  hero: {
    kicker: 'Angolan Technology & Innovation Startup',
    title: 'Transforming ideas into innovation.',
    subtitle:
      'EMANUS designs and builds digital solutions, applied artificial intelligence, and proprietary software products built to solve real challenges in Angola, Africa, and international markets.',
    primaryCta: 'Explore projects',
    secondaryCta: 'Contact Us',
    imageAlt: 'EMANUS technological architecture and digital platform engineering',
  },
  intro: {
    kicker: 'Institutional Identity',
    title: 'Software engineering driven by real impact and long-term vision.',
    paragraphs: [
      'EMANUS was founded by young Angolan entrepreneurs committed to using technology as a direct catalyst for economic, social, and business transformation.',
      'We combine technical rigor, modern software architecture, and deep understanding of the African context to turn ambitious concepts into independent, scalable, and reliable digital platforms.',
    ],
    scopeItems: [
      { label: 'Origin', value: 'Luanda, Angola' },
      { label: 'Reach', value: 'Angola, Africa & Global' },
      { label: 'Focus', value: 'Software, AI & Platforms' },
      { label: 'Positioning', value: 'Digital Innovation Studio' },
    ],
  },
  areas: {
    kicker: 'Areas of Expertise',
    title: 'Multidisciplinary engineering capability to deliver complete digital products.',
    subtitle:
      'We structure every initiative from strategic conception through production operation, focusing on practical utility and scalability.',
    items: [
      {
        id: 'software',
        index: '01',
        title: 'Software Development',
        description:
          'Architecture and engineering of web applications, enterprise systems, and resilient digital infrastructures with high performance and security standards.',
      },
      {
        id: 'ai',
        index: '02',
        title: 'Artificial Intelligence',
        description:
          'Practical application of AI models, intelligent workflow automation, and decision-support systems tailored to African enterprises.',
      },
      {
        id: 'products',
        index: '03',
        title: 'Proprietary Tech Products',
        description:
          'Incubation, design, and operation of independent digital platforms with dedicated brands, value propositions, and ecosystems.',
      },
      {
        id: 'innovation',
        index: '04',
        title: 'Digital Solutions & Innovation',
        description:
          'Technology consulting and tailored system development for organizations modernizing operations and launching new digital capabilities.',
      },
    ],
  },
  projectsSection: {
    kicker: 'Product Portfolio',
    title: 'Projects and platforms with independent identity.',
    subtitle:
      'Each product developed within the EMANUS ecosystem addresses a specific market with its own architecture, dedicated experience, and disciplined execution.',
    allFilter: 'All projects',
    ctaLabel: 'Explore project',
    backToProjects: 'Back to projects',
    developedBy: 'Product developed by EMANUS',
    inquireAboutProject: 'Request information about this project',
    objectivesTitle: 'Objectives & Purpose',
    highlightsTitle: 'Product Capabilities & Pillars',
    items: [
      {
        slug: 'emanus-ia',
        index: '01',
        name: 'EMANUS IA',
        category: 'Artificial Intelligence & Automation',
        shortDescription:
          'Artificial intelligence platform built for business productivity, contextual assistance, and automated operational workflows.',
        fullPresentation:
          'EMANUS IA embodies EMANUS’s commitment to applied artificial intelligence. Built to serve growing teams, institutions, and businesses, the platform organizes knowledge, speeds up decision-making, and integrates automated workflows tailored to local context and Portuguese-speaking markets.',
        image: '/src/assets/images/project_emanus_ia_1794998013354.jpg',
        imageAlt: 'Visualization of the EMANUS IA artificial intelligence platform',
        objectives: [
          'Expand access to practical AI tools for teams and SMEs across Angola and Africa.',
          'Automate repetitive operational tasks, structured support, and business information synthesis.',
          'Deliver a modular architecture ready to integrate with existing organizational workflows and APIs.',
        ],
        highlights: [
          {
            title: 'Contextual Portuguese Assistance',
            description:
              'Interactions tuned to the linguistic and operational reality of Lusophone organizations.',
          },
          {
            title: 'Workflow Automation',
            description:
              'Task orchestration, request triage, and structured operational reporting.',
          },
          {
            title: 'Modular & Secure Architecture',
            description:
              'Strict tenant data separation, access controls, and clean API integration.',
          },
        ],
        identity: {
          heroBg: '#09111F',
          surfaceBg: '#F4F7FC',
          accentColor: '#155EEF',
          accentSoft: '#E8F0FE',
          borderColor: '#D6E2F5',
          tagline: 'Applied artificial intelligence for productivity and clarity.',
          architectureNote:
            'Engineered as a modular intelligent core to accelerate business operations reliably.',
        },
      },
      {
        slug: 'premier-fit',
        index: '02',
        name: 'PREMIER FIT',
        category: 'Health, Wellness & Sports Tech',
        shortDescription:
          'Digital platform dedicated to physical progress tracking, structured training management, and modern connection between athletes, coaches, and fitness spaces.',
        fullPresentation:
          'PREMIER FIT represents EMANUS’s initiative in digitizing active health and wellness. The platform brings together training planning, progress tracking, and management tools to make athletic routines more structured, measurable, and accessible.',
        image: '/src/assets/images/project_premier_fit_1794998014116.jpg',
        imageAlt: 'Digital concept and interface for PREMIER FIT platform',
        objectives: [
          'Structure training plans and physical progression in a clear, daily-use interface.',
          'Support gyms, personal trainers, and studios in organizing members and programs.',
          'Encourage consistency and healthy routines through continuous digital tracking.',
        ],
        highlights: [
          {
            title: 'Structured Training Plans',
            description:
              'Clear organization of routines, loads, sets, and progressive goals adapted to each user.',
          },
          {
            title: 'Progress Tracking',
            description:
              'Continuous logging of performance, consistency, and physical milestones over time.',
          },
          {
            title: 'Tools for Coaches & Studios',
            description:
              'Practical workflows for client follow-up, scheduling, and customized programs.',
          },
        ],
        identity: {
          heroBg: '#0B1612',
          surfaceBg: '#F3F8F5',
          accentColor: '#0E9F6E',
          accentSoft: '#E3F7EF',
          borderColor: '#CDE8DC',
          tagline: 'Discipline, performance, and technology at the service of well-being.',
          architectureNote:
            'Designed around visual clarity, fast mobile usability, and continuous progress tracking.',
        },
      },
      {
        slug: 'famebook',
        index: '03',
        name: 'FAMEBOOK',
        category: 'Social Platform, Creators & Digital Ecosystem',
        shortDescription:
          'Digital social platform crafted to connect communities, empower content creators, and elevate emerging digital presence.',
        fullPresentation:
          'FAMEBOOK is an EMANUS digital product focused on the creator economy and community interaction. Built with a distinct identity and talent-discovery focus, it provides a modern space where creators, brands, and audiences build authentic reach.',
        image: '/src/assets/images/project_famebook_1794998014581.jpg',
        imageAlt: 'Visual concept and community ecosystem for FAMEBOOK',
        objectives: [
          'Provide a dynamic digital space for creative expression and community building.',
          'Give structured visibility to emerging talents, independent creators, and cultural projects.',
          'Bridge engaged audiences and commercial collaborations.',
        ],
        highlights: [
          {
            title: 'Creator Profiles & Portfolios',
            description:
              'Dedicated spaces to showcase identity, publications, and digital milestones.',
          },
          {
            title: 'Discovery & Community Engagement',
            description:
              'Fluid mechanisms for sharing, following, and real-time interaction.',
          },
          {
            title: 'Brand & Talent Ecosystem',
            description:
              'Technical foundation ready for creative partnerships and sustainable audience growth.',
          },
        ],
        identity: {
          heroBg: '#160E1F',
          surfaceBg: '#F8F5FC',
          accentColor: '#7C3AED',
          accentSoft: '#F0E9FE',
          borderColor: '#DFD4F7',
          tagline: 'Community, digital expression, and visibility for emerging creators.',
          architectureNote:
            'Built to prioritize organic discovery, expressive visual identity, and social scalability.',
        },
      },
    ],
  },
  about: {
    kicker: 'About EMANUS',
    title: 'An Angolan startup built to turn vision into enduring products.',
    lead: 'Founded by young technology entrepreneurs, EMANUS brings together solid engineering, strategic ambition, and commitment to the digital advancement of Angola and Africa.',
    originTitle: 'Origin & Purpose',
    originParagraphs: [
      'EMANUS grew out of the conviction that Africa should not merely consume imported technology, but conceive, lead, and export world-class digital solutions.',
      'From Angola, the founders combined complementary skills in software engineering, digital product design, and entrepreneurial strategy to establish a technology company capable of building proprietary platforms and partnering with ambitious organizations.',
      'Every architectural and product decision at EMANUS follows a clear benchmark: solving concrete problems with simplicity, reliability, and long-term vision.',
    ],
    trajectoryTitle: 'How We Structure Our Work',
    trajectorySteps: [
      {
        index: '01',
        title: 'Real-World Problem Discovery',
        description:
          'We begin with concrete challenges observed in Angolan and African markets before designing technical architectures.',
      },
      {
        index: '02',
        title: 'Engineering & Proprietary Products',
        description:
          'We build platforms with independent identity, clean architecture, and relentless focus on user experience.',
      },
      {
        index: '03',
        title: 'Partnerships & Sustainable Scale',
        description:
          'We collaborate with investors, businesses, and institutions to accelerate adoption and expand regionally.',
      },
    ],
    missionTitle: 'Mission',
    mission:
      'To design and build digital solutions, intelligent platforms, and software products that solve real-world problems, create economic opportunities, and elevate the technological competitiveness of businesses and people.',
    visionTitle: 'Vision',
    vision:
      'To establish EMANUS as an African technology reference recognized for the quality of its digital products, continuous innovation, and lasting positive impact across its markets.',
    valuesTitle: 'Core Values',
    values: [
      {
        index: '01',
        name: 'Technical Rigor & Excellence',
        description:
          'Commitment to well-structured engineering, security, design clarity, and dependability in every release.',
      },
      {
        index: '02',
        name: 'Purpose-Driven Innovation',
        description:
          'We innovate not for fleeting trends, but to simplify processes and unlock real value for people.',
      },
      {
        index: '03',
        name: 'African Technological Leadership',
        description:
          'We believe in the capacity of young Angolan and African talent to engineer technology of international standing.',
      },
      {
        index: '04',
        name: 'Transparency & Credibility',
        description:
          'We build long-term relationships with partners, contributors, and investors grounded in integrity and delivery.',
      },
      {
        index: '05',
        name: 'Agility & Continuous Learning',
        description:
          'We continuously evolve our methods and stack to respond swiftly to changing market needs.',
      },
      {
        index: '06',
        name: 'Strategic Collaboration',
        description:
          'We value teamwork and alliances that multiply capabilities and strengthen the broader ecosystem.',
      },
    ],
  },
  innovation: {
    kicker: 'Innovation & Ecosystem',
    title: 'Technology crafted in Angola with continental ambition and global standards.',
    lead: 'We treat innovation as a disciplined craft: uniting software engineering, artificial intelligence, and local insight to build Africa’s digital future.',
    pillarsTitle: 'Pillars of Our Technical Approach',
    pillars: [
      {
        index: '01',
        title: 'Product-Oriented Architecture',
        description:
          'We engineer modular systems that stay maintainable and scale gracefully as users and integrations expand.',
      },
      {
        index: '02',
        title: 'Practical Artificial Intelligence',
        description:
          'We embed AI capabilities where they measurably improve productivity, automation, and operational decisions.',
      },
      {
        index: '03',
        title: 'User-Centered Design',
        description:
          'Clean, fast, responsive interfaces optimized for real devices, bandwidth conditions, and daily workflows.',
      },
    ],
    africaTitle: 'The African Tech Ecosystem as an Opportunity',
    africaParagraphs: [
      'Africa is experiencing a defining wave of digital adoption, driven by a connected young population and organizations seeking modern software suited to their operational realities.',
      'EMANUS stands at the forefront of this momentum from Angola, developing proprietary products and institutional partnerships that strengthen local technical capacity and connect with international markets.',
    ],
  },
  team: {
    kicker: 'Leadership & Founders',
    title: 'The entrepreneurs behind the EMANUS vision.',
    lead: 'EMANUS is led by its three founders, aligning strategic direction, technological execution, and product development to build a resilient technology company.',
    linkedinLabel: 'LinkedIn Profile',
    linkedinPending: 'Founding Team · EMANUS Angola',
    founders: [
      {
        id: 'emanuel',
        name: 'Emanuel De Jesus',
        role: 'Founder',
        bio: 'Founder of EMANUS. Leads institutional positioning, long-term strategic vision, and technological partnerships driving the startup’s growth.',
        image: '/assets/aistudio/Emanuel_60841c7d.png',
        linkedinUrl: null,
      },
      {
        id: 'daniel',
        name: 'Daniel Taba',
        role: 'Co-founder',
        bio: 'Co-founder of EMANUS. Focuses on structuring digital products, coordinating project operations, and maintaining execution quality.',
        image: '/src/assets/images/founder_daniel_1794998014944.jpg',
        linkedinUrl: null,
      },
      {
        id: 'guido',
        name: 'Guido Alfredo',
        role: 'Co-founder',
        bio: 'Co-founder of EMANUS. Contributes to technological architecture, applied innovation research, and the continuous evolution of EMANUS platforms.',
        image: '/src/assets/images/founder_guido_1794998015611.jpg',
        linkedinUrl: null,
      },
    ],
  },
  partnerships: {
    kicker: 'Partnerships & Opportunities',
    title: 'Build the next technological chapter with us.',
    description:
      'We welcome corporate partnerships, conversations with strategic investors, and collaboration with talented builders who share our vision for innovation.',
    proposePartnershipCta: 'Propose partnership',
    becomeCollaboratorCta: 'Collaborate with us',
  },
  contact: {
    kicker: 'Institutional Contact',
    title: 'Contact us.',
    subtitle:
      'Have a partnership proposal, investment inquiry, or interest in collaborating with the EMANUS team? Reach us directly through our official channels.',
    institutionalNoteTitle: 'EMANUS Direct Channels',
    categoriesLabel: 'Select your contact category',
    categories: [
      {
        value: 'Parcerias',
        label: 'Partnerships',
        description: 'Corporate alliances, technology integration, and institutional projects.',
      },
      {
        value: 'Investimentos',
        label: 'Investments',
        description: 'Discussions with investors, accelerators, and strategic funds.',
      },
      {
        value: 'Colaboração',
        label: 'Collaboration',
        description: 'Engineering talent, product design, and technical collaboration.',
      },
      {
        value: 'Informações gerais',
        label: 'General inquiries',
        description: 'Institutional questions, press, or details about our products.',
      },
    ],
    form: {
      fullNameLabel: 'Full name',
      fullNamePlaceholder: 'e.g., João Manuel',
      emailLabel: 'Work or personal email',
      emailPlaceholder: 'name@company.com',
      organizationLabel: 'Company / Organization (optional)',
      organizationPlaceholder: 'Institution or project name',
      categoryLabel: 'Category',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'Brief summary of your inquiry',
      messageLabel: 'Message',
      messagePlaceholder: 'Describe your proposal, project, or inquiry in detail...',
      privacyNotice:
        'Upon submission, your message is assigned a unique reference ID and prepared for WhatsApp (+244 940 843 801) and official email (emanueldejesus617@gmail.com).',
      submitButton: 'Send message',
      submittingButton: 'Registering message...',
      sendAnother: 'Send another message',
      successTitle: 'Message registered successfully.',
      referenceLabel: 'Reference code',
    },
  },
  footer: {
    slogan: 'Transforming ideas into innovation.',
    description:
      'Angolan technology, innovation, and digital solutions startup serving Angola, Africa, and international markets.',
    navigationTitle: 'Institutional',
    projectsTitle: 'Products',
    contactTitle: 'Direct Contact',
    location: 'Luanda, Angola',
    emailDisplay: 'emanueldejesus617@gmail.com',
    whatsappDisplay: '+244 940 843 801',
    whatsappNumber: '244940843801',
    languageLabel: 'Language',
    rights: 'All rights reserved.',
  },
};

export const SITE_CONTENT: Record<Locale, SiteContent> = {
  pt: PT_CONTENT,
  en: EN_CONTENT,
};
