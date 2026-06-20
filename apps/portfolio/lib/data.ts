export const personal = {
  name:     'Kasope Abolade',
  alias:    'Karsh',
  title:    'Senior Frontend & AI-Enabled Software Engineer',
  tagline:  'Building scalable SaaS platforms, fintech systems, and AI-powered digital experiences.',
  email:    'aboladekasope@gmail.com',
  phone:    '(+234) 8132332011',
  location: 'Lagos, Nigeria',
  linkedin: 'https://linkedin.com/in/kasopeabolade',
  github:   'https://github.com/karshkodes2',
  gitlab:   'https://gitlab.com/kabolade',
} as const

export const stats = [
  { label: 'Years Experience',    value: 8,  suffix: '+', color: '#2563EB' },
  { label: 'Projects Delivered',  value: 20, suffix: '+', color: '#D4AF37' },
  { label: 'Performance Boost',   value: 75, suffix: '%', color: '#059669' },
  { label: 'Test Coverage',       value: 80, suffix: '%', color: '#7C3AED' },
] as const

export const skills: Record<string, string[]> = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'JavaScript ES6+', 'Redux', 'Zustand', 'Recoil'],
  Mobile:   ['React Native', 'Flutter', 'Riverpod'],
  Backend:  ['Node.js', 'Express.js', 'REST APIs', 'WebSockets'],
  Database: ['MongoDB', 'PostgreSQL', 'Firebase'],
  DevOps:   ['AWS S3/EC2', 'Docker', 'GitLab CI/CD', 'GitHub Actions', 'AppCenter'],
  Testing:  ['Jest', 'React Testing Library', 'Playwright', 'Cypress'],
  AI:       ['AI-Assisted Workflows', 'Agent Orchestration', 'Sub-Agent Systems', 'Automation Pipelines'],
}

export const skillMeta: Record<string, { icon: string; color: string }> = {
  Frontend: { icon: '⚡', color: '#3B82F6' },
  Mobile:   { icon: '📱', color: '#8B5CF6' },
  Backend:  { icon: '🔧', color: '#10B981' },
  Database: { icon: '🗄️', color: '#F59E0B' },
  DevOps:   { icon: '🚀', color: '#EF4444' },
  Testing:  { icon: '🧪', color: '#EC4899' },
  AI:       { icon: '🤖', color: '#D4AF37' },
}

export const experience = [
  {
    company:  'Solab Technologies',
    role:     'Frontend Developer',
    period:   'Jul 2019 – Present',
    location: 'Remote',
    color:    '#2563EB',
    highlights: [
      'Built end-to-end pharmaceutical supply chain including EPCIS 1.2 validation & automated PO matching engine, cutting processing time by 75%',
      'Engineered real-time environmental infraction reporting system for Lagos State, reducing accidents by 20%',
      'Built financial analysis tool with real-time currency exchange, increasing business profitability by 30%',
      'Achieved 80% code coverage with Jest, Playwright & Cypress, reducing bug incidence by 50%',
    ],
  },
  {
    company:  'SystemSpecs Technology',
    role:     'Senior Mobile Engineer',
    period:   'Oct 2021 – Feb 2025',
    location: 'VI, Lagos',
    color:    '#D4AF37',
    highlights: [
      'Developed reusable React Native & Flutter component libraries, reducing future dev time by 40%',
      'Architected wallet infrastructure with Service Aggregation Middleware using microfrontend principles',
      'Enhanced facial detection KYC feature ensuring security and regulatory compliance',
      'Increased user retention by 25% through data-driven UX improvements via analytics integration',
    ],
  },
  {
    company:  'VULTe by Polaris Bank',
    role:     'Frontend Web Developer',
    period:   'Dec 2023 – Feb 2024',
    location: 'Remote',
    color:    '#7C3AED',
    highlights: [
      'Developed AI-powered post-transaction recommendation engine using Next.js, boosting revenue by 10%',
      'Resolved critical production and UI issues, reducing downtime by 30%',
      'Conducted code reviews and security audits, reducing vulnerabilities significantly',
    ],
  },
  {
    company:  'SPOXIO',
    role:     'Frontend Web Developer',
    period:   'Dec 2021 – Sep 2023',
    location: 'Remote',
    color:    '#059669',
    highlights: [
      'Transformed core application interface with React — boosted performance 30%, DAU by 20%',
      'Implemented Redux for complex data flows with seamless backend integration',
      'Developed live-streaming and real-time chat features with Firebase, increasing engagement by 25%',
    ],
  },
  {
    company:  'Access Bank PLC',
    role:     'Graduate Trainee',
    period:   'Aug 2017 – Aug 2019',
    location: 'Lagos, Nigeria',
    color:    '#DC2626',
    highlights: [
      'Collaborated on testing and enhancing banking applications for reliability and security',
      'Led pre-internal audits across six zonal branches, maintaining 5-star ratings',
    ],
  },
]

export const STATIC_PROJECTS = [
  {
    id:          'availablerx',
    title:       'AvailableRX',
    subtitle:    'Medical Supply Chain ERP',
    description: 'End-to-end pharmaceutical supply chain workflow and warehouse management ERP with EPCIS 1.2 validation, SAP integration, and automated PO matching.',
    url:         'https://demo.availablerx.com',
    tags:        ['React', 'TypeScript', 'Node.js', 'SAP', 'EPCIS'],
    color:       '#2563EB',
    emoji:       '💊',
  },
  {
    id:          'pouchii',
    title:       'Pouchii',
    subtitle:    'Fintech Mobile App',
    description: 'Fintech mobile app for digital payments, peer-to-peer transfers, and social financial activities with KYC and wallet infrastructure.',
    url:         'https://pouchii.net/#/products',
    tags:        ['React Native', 'Flutter', 'Firebase', 'Fintech'],
    color:       '#D4AF37',
    emoji:       '💳',
  },
  {
    id:          'kiira',
    title:       'Kiira Health',
    subtitle:    "Women's Health Assistant",
    description: 'Women-centric health assistant to navigate health decisions, find clinicians, and manage appointments — combining AI with healthcare delivery.',
    url:         'https://www.kiira.io',
    tags:        ['React', 'Next.js', 'AI', 'Healthcare'],
    color:       '#EC4899',
    emoji:       '🩺',
  },
  {
    id:          'biwe',
    title:       'BIWE Magazine',
    subtitle:    'Digital Wellness Platform',
    description: 'Digital magazine platform for wellness content, podcasts, community engagement, and coaching with real-time features.',
    url:         'https://biwenetwork.com',
    tags:        ['Flutter', 'Firebase', 'WebSockets'],
    color:       '#7C3AED',
    emoji:       '📱',
  },
]
