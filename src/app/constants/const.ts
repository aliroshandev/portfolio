import {ExperienceInterface, SkillsInterface} from './types';
import {ExperienceContent} from '../models/experience-content';

export const experiences: Array<ExperienceInterface> = [
  {
    workFromToDate: ['06/2022', 'Present'],
    companyName: 'TabinTech',
    companyDescription: 'Technology Solutions Provider',
    experienceDetails: {
      title: 'Frontend Engineer - Remote',
      href: 'https://tabintech.com',
      content: new ExperienceContent([
        'Managed and delivered 6 outsourced projects, including pastil.ir, nam.ir, migline24.com, eanjoman.ir and Otanafoods.com, achieving a 25% increase in user engagement.',
        'Developed high-converting landing pages for Khanoumi.com and divar.ir, reducing page load times by 20%.',
        'Created in-house Angular libraries (vft-core, vft-auth, vft-animation) deployed on Nexus, reducing bundle sizes.',
        'Accelerated project build time by 50% by creating schemas and base classes.',
        'Mentored front-end developers and implemented best practices for architecture.'
      ]),
      tags: ['Angular', 'TypeScript', 'RxJS', 'Tailwind CSS', 'Docker', 'Nexus', 'PWA', 'SSR']
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['08/2020', '05/2022'],
    companyName: 'Agatizer',
    companyDescription: 'Financial Services - Social Trading',
    experienceDetails: {
      title: 'Frontend Engineer - Remote',
      href: 'https://missha-ir.com',
      content: new ExperienceContent([
        'Designed and launched the Persian version of Missha.com\'s main store, increasing local traffic by 40%.',
        'Delivered multiple event-based single-pages for seasonal campaign success.',
      ]),
      tags: ['React', 'Angular', 'Tailwind', 'TypeScript', 'Docker', 'PWA', 'SEO']
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['08/2020', '05/2022'],
    companyName: 'Missha',
    companyDescription: 'Global E-Commerce Platform',
    experienceDetails: {
      title: 'Frontend Engineer - Remote',
      href: 'https://missha-ir.com',
      content: new ExperienceContent([
        'Designed and launched the Persian version of Missha.com\'s main store, increasing local traffic by 40%.',
        'Delivered multiple event-based single-pages driving seasonal campaign success.',
      ]),
      tags: ['Angular', 'Angular Material', 'TypeScript', 'Jest', 'Docker', 'PWA']
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['09/2020', '01/2021'],
    companyName: 'Tushehbar',
    companyDescription: 'Shipping & Maritime Transportation',
    experienceDetails: {
      title: 'Frontend Engineer - Remote',
      href: 'https://tushehbar.com',
      content: new ExperienceContent([
        'Spearheaded scalable Angular 9 front-end, enhancing i18n and user satisfaction by 30%.',
        'Built integrated management system automating shipping documentation, reducing manual processing by 40%.',
      ]),
      tags: ['Angular', 'DevExtreme', 'Bootstrap', 'TypeScript', 'Docker']
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['09/2019', '01/2020'],
    companyName: 'eSafar',
    companyDescription: 'Online Travel Booking Platform',
    experienceDetails: {
      title: 'Frontend Engineer - Remote',
      href: 'https://esafar.com',
      content: new ExperienceContent([
        'Spearheaded Angular 8 front-end with i18n, improving user satisfaction by 30%.',
        'Implemented PWA optimizations resulting in 35% growth in returning users.',
      ]),
      tags: ['Angular', 'Angular Material', 'TypeScript', 'PWA', 'Nginx', 'Docker']
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['09/2019', '01/2020'],
    companyName: 'Azki',
    companyDescription: 'Insurance Issuer Application',
    experienceDetails: {
      title: 'Frontend Developer Consultant - Remote',
      href: 'https://azki.com',
      content: new ExperienceContent([
        'Improved responsive design for Laravel Blade pages, optimizing mobile usability and SEO.',
        'Mentored junior front-end team members on best practices.',
      ]),
      tags: ['Laravel', 'Blade', 'JavaScript', 'jQuery', 'SEO']
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['09/2018', '03/2020'],
    companyName: 'Shenoto',
    companyDescription: 'Persian Podcast Platform',
    experienceDetails: {
      title: 'Frontend Engineer - Remote',
      href: 'https://shenoto.com',
      content: new ExperienceContent([
        'Upgraded from Angular 3 to 7, improving load times by 15% and SEO scores to 92%.',
        'Implemented PWA optimizations resulting in 20% returning user growth.',
        'Built wavesurfer.js podcast player.',
      ]),
      tags: ['Angular', 'TypeScript', 'PWA', 'Podcast', 'Docker']
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['08/2017', '11/2017'],
    companyName: 'ITManHa',
    companyDescription: 'Software Engineer Platform',
    experienceDetails: {
      title: 'Frontend Engineer - Remote',
      href: 'https://itmanha.com',
      content: new ExperienceContent([
        'Engineered frontend solutions for cross-industry software projects.',
        'Core stack: React, WordPress, Headless CMS, jQuery.',
      ]),
      tags: ['React', 'WordPress', 'JavaScript', 'jQuery', 'Responsive Design']
    }
  } as ExperienceInterface,
];

export const technicalSkills: SkillsInterface = {
  languages: 'TypeScript, JavaScript (ES6+), HTML5, CSS3, Bash, PHP, TSX, JSX',
  frameworks: 'Angular (v2–v20), Next.js, Vue, RxJS, Ionic, Tailwind CSS, Bootstrap',
  tools: 'Git, Docker, Nginx, Webpack, Vite, npm, Caddy, Nexus Repository',
  concepts: 'SSR, SSG, PWA, Lazy Loading, i18n, SEO Optimization, Performance Tuning, CI/CD'
};

export const aboutText =
  'Frontend Architect with 7+ years building performance-critical web solutions for finance, logistics, and e-commerce. ' +
  'Delivered 10+ enterprise applications boosting engagement by 30% and reducing latency by 20% through optimized React/Angular architectures. ' +
  'Pioneered reusable component systems accelerating development by 30% and cutting bundle sizes by 40%. ' +
  'Established CI/CD pipelines (Docker, Nexus) and SSR/PWA strategies increasing returning users by 20%. Mentored 8+ engineers.';

export const richSnippetJsonSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "image": {
    "@id": "#profileImage",
    "@type": "ImageObject",
    "contentUrl": "https://aliroshanzamir.info/assets/profile-light.png"
  },
  "mainEntity": {
    "@id": "#profile",
    "@type": "Person",
    "name": "Ali Roshanzamir Golafzani",
    "givenName": "Ali",
    "familyName": "Roshanzamir Golafzani",
    "url": "https://aliroshanzamir.info/",
    "jobTitle": "Frontend Engineer",
    "description": aboutText,
    "birthDate": "1997-08-15",
    "gender": "Male",
    "email": "a76roshanzamir@gmail.com",
    "telephone": "+989031751739",
    "sameAs": [
      "https://ir.linkedin.com/in/ali-roshan",
      "https://github.com/aliroshandev"
    ],
    "knowsAbout": [
      "TypeScript", "JavaScript", "Angular", "React", "Next.js", "HTML5", "CSS3",
      "Docker", "SEO Optimization", "Performance Tuning", "RxJS", "Tailwind CSS",
      "SSR", "SSG", "PWA", "Lazy Loading", "i18n"
    ],
    "knowsLanguage": [
      {"@type": "Language", "name": "English"},
      {"@type": "Language", "name": "Persian"}
    ]
  }
};
