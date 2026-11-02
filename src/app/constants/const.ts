import {ExperienceInterface, SkillsInterface} from './types';
import {ExperienceContent} from '../models/experience-content';

export const experiences: Array<ExperienceInterface> = [
  {
    workFromToDate: ['01/2022', 'Present'],
    companyName: 'Tabin Tech',
    companyDescription: 'Software Services for Online Businesses',
    experienceDetails: {
      title: 'Frontend Engineer - Onsite',
      href: 'https://tabintech.com',
      content: new ExperienceContent([
        'Migrated the frontend of Gamify (gmfy.ir), a gamification campaign platform, from per-customer game admin panels into a SaaS customer panel and company admin panel, in about 3 days of development with Claude as a coding agent, my own packages and generators, and my code review.',
        'Build and maintain Angular applications for clients including pastil.ir and nam.ir, currently on Angular 22 with TypeScript, RxJS and GraphQL.',
        'Built shared Angular libraries (vft-core, vft-auth, vft-table, vft-ui-util) published to a private Nexus registry.',
        'Improved CI build times with caching and custom Webpack configuration.',
        'Mentored engineers through code review.',
      ]),
      tags: ['Angular', 'TypeScript', 'RxJS', 'GraphQL', 'Tailwind CSS', 'Docker', 'Webpack', 'Nx', 'PWA', 'SSR', 'Angular Signals']
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['10/2021', '01/2022'],
    companyName: 'eSafar',
    companyDescription: 'Online Travel Booking Platform',
    experienceDetails: {
      title: 'Frontend Engineer - Part-time',
      href: 'https://esafar.com',
      content: new ExperienceContent([
        'Continued frontend work on the travel-booking platform.',
      ]),
      tags: ['Angular', 'TypeScript', 'PWA', 'i18n']
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['08/2021', '10/2021'],
    companyName: 'Agatizer',
    companyDescription: 'Copy-Trading Platform',
    experienceDetails: {
      title: 'Frontend Engineer - Remote, Contract',
      href: '',
      content: new ExperienceContent([
        'Built a trading dashboard that rendered real-time WebSocket data with D3.js.',
        'Kept the interface responsive with virtual scrolling and RxJS streams.',
      ]),
      tags: ['React', 'Angular', 'Tailwind', 'TypeScript', 'WebSocket', 'D3.js', 'Docker', 'PWA', 'RxJS', 'Virtual Scrolling']
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['11/2020', '10/2021'],
    companyName: 'Tushehbar Shipping Agency',
    companyDescription: 'Shipping & Maritime Transportation',
    experienceDetails: {
      title: 'Frontend Engineer - Part-time',
      href: 'https://tushehbar.com',
      content: new ExperienceContent([
        'Automated logistics workflows and reduced manual data entry with a custom Angular and DevExtreme dashboard.',
      ]),
      tags: ['Angular', 'DevExtreme', 'Bootstrap', 'TypeScript', 'Docker', 'i18n']
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['10/2020', '02/2021'],
    companyName: 'Missha',
    companyDescription: 'Cosmetics E-Commerce',
    experienceDetails: {
      title: 'Frontend Engineer - Part-time',
      href: 'https://missha-ir.com',
      content: new ExperienceContent([
        'Built a localized e-commerce PWA for the Persian market, with SEO and performance work.',
        'Added offline support with Service Workers.',
      ]),
      tags: ['Angular', 'Angular Material', 'TypeScript', 'Jest', 'Docker', 'PWA', 'SEO', 'Service Workers', 'Lighthouse']
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['05/2020', '08/2020'],
    companyName: 'eSafar',
    companyDescription: 'Online Travel Booking Platform',
    experienceDetails: {
      title: 'Frontend Developer - Full-time',
      href: 'https://esafar.com',
      content: new ExperienceContent([
        'Built an Angular travel-booking frontend with i18n and PWA support.',
      ]),
      tags: ['Angular', 'Angular Material', 'TypeScript', 'PWA', 'Nginx', 'Docker', 'i18n']
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['09/2019', '12/2019'],
    companyName: 'Azki',
    companyDescription: 'Online Insurance Comparison Platform',
    experienceDetails: {
      title: 'Frontend Consultant - Part-time',
      href: 'https://azki.com',
      content: new ExperienceContent([
        'Updated Laravel Blade pages as a part-time frontend consultant.',
      ]),
      tags: ['Laravel', 'Blade', 'JavaScript', 'Responsive Design']
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['09/2018', '05/2020'],
    companyName: 'Shenoto',
    companyDescription: 'Podcast, Music and Audiobook Platform',
    experienceDetails: {
      title: 'Frontend Developer - Full-time',
      href: 'https://shenoto.com',
      content: new ExperienceContent([
        'Led the migration to Angular 7, with performance and SEO improvements.',
        'Built a podcast player with wavesurfer.js.',
      ]),
      tags: ['Angular', 'TypeScript', 'PWA', 'Podcast', 'Docker', 'wavesurfer.js', 'SEO']
    }
  } as ExperienceInterface,
];

export const openSourceProjects = [
  {
    name: 'angular-lazy-load-directive',
    description: 'An npm package using Signals and IntersectionObserver for viewport-based image lazy loading.',
    url: 'https://www.npmjs.com/package/angular-lazy-load-directive',
    tags: ['Angular', 'Signals', 'IntersectionObserver', 'Performance', 'npm']
  },
  {
    name: 'Angular Lifecycles Guide',
    description: 'A free visual reference to the Angular lifecycle and dependency injection, built with Mermaid flowcharts.',
    url: 'https://angular-lifecycles.vercel.app',
    tags: ['Angular', 'Mermaid', 'Education']
  },
  {
    name: 'Angular Docs Fix',
    description: 'Merged PR #62361, a one-line fix for a syntax error in an Angular tutorial.',
    url: 'https://github.com/angular/angular/pull/62361',
    tags: ['Angular', 'Docs', 'Open Source']
  }
];

export const education = [
  {
    degree: 'Bachelor of Information Technology',
    institution: 'Islamic Azad University',
    period: '2015–2021'
  }
];

export const technicalSkills: SkillsInterface = {
  languages: 'TypeScript, JavaScript (ES6+), Go, HTML5, CSS3, SCSS, PHP, MQL5, Bash',
  frameworks: 'Angular (v5–v22), Angular Signals, RxJS, NgRx, Angular Material, Angular CDK, React, Next.js, Tailwind CSS, Bootstrap, WordPress',
  tools: 'Git, Docker, PostgreSQL, Nginx, Webpack, Vite, npm, Nx, Jest, Cypress, Playwright, GitHub Actions, GitLab CI, Nexus Repository, Caddy',
  concepts: 'SSR, SSG, PWA, Lazy Loading, i18n, SEO Optimization, Performance Tuning, Core Web Vitals, Lighthouse, Bundle Optimization, Virtual Scrolling, D3.js, GraphQL, WebSockets, REST APIs, Service Workers, CI/CD, Agile/Scrum, Design Systems, Component Architecture, Reusable Libraries'
};

export const aboutText =
  'Software engineer with 8 years of paid experience building web applications for e-commerce, logistics, travel and trading products, mainly in Angular and TypeScript. I also build backend services in Go and PostgreSQL. Author of the angular-lazy-load-directive npm package, with one merged docs fix in the Angular repository.';

const SITE_URL = 'https://aliroshanzamir.info';

export const personSchema = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Ali Roshanzamir Golafzani',
  alternateName: 'Ali Roshanzamir',
  givenName: 'Ali',
  familyName: 'Roshanzamir Golafzani',
  image: {
    '@type': 'ImageObject',
    contentUrl: `${SITE_URL}/assets/profile-light.png`,
  },
  url: `${SITE_URL}/`,
  jobTitle: 'Software Engineer',
  description: aboutText,
  email: 'a76roshanzamir@gmail.com',
  worksFor: {
    '@type': 'Organization',
    name: 'Tabin Tech',
    url: 'https://tabintech.com',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Islamic Azad University',
  },
  sameAs: [
    'https://www.linkedin.com/in/ali-roshan',
    'https://github.com/aliroshandev',
  ],
  knowsAbout: [
    'Angular', 'TypeScript', 'JavaScript', 'RxJS', 'Angular Signals', 'React', 'Next.js',
    'Go', 'PostgreSQL', 'MQL5', 'Docker', 'SSR', 'PWA', 'GraphQL', 'WebSockets', 'WordPress',
  ],
  knowsLanguage: [
    {'@type': 'Language', name: 'English', alternateName: 'en'},
    {'@type': 'Language', name: 'Persian', alternateName: 'fa'},
  ],
};

/** On every page: identifies the site and its owner. */
export const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'Ali Roshanzamir',
      inLanguage: 'en',
      publisher: {'@id': `${SITE_URL}/#person`},
    },
    personSchema,
  ],
};

/** Home page only. Google reads the Person from mainEntity, so it is included in full. */
export const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profilepage`,
  url: `${SITE_URL}/`,
  inLanguage: 'en',
  isPartOf: {'@id': `${SITE_URL}/#website`},
  dateModified: '2026-11-02',
  mainEntity: personSchema,
};
