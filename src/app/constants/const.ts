import {ExperienceInterface, HeadingContentInterface, HeadingInterface, LinkInterface, SkillsInterface} from './types';
import {HeadingContent} from '../models/heading-content';
import {ExperienceContent} from '../models/experience-content';

export const Headings: Array<HeadingInterface> = [
  {text: 'About', id: 'about'},
  {text: 'Jobs', id: 'jobs'},
  {text: 'Technical Skills', id: 'skills'},
];

export const SkillsKeyTranslation = new Map<keyof SkillsInterface, string>([
  ['languages', 'Languages'],
  ['frameworks', 'Frameworks & Libraries'],
  ['tools', 'Tools & Platforms'],
  ['concepts', 'Concepts & Techniques'],
]);

export const experiences: Array<ExperienceInterface> = [
  {
    workFromToDate: ['08/2020', '05/2022'],
    companyName: 'Missha (Global E-Commerce Platform)',
    experienceDetails: {
      title: 'Remote Senior Frontend Developer',
      href: 'https://missha-ir.com',
      content: new ExperienceContent([
        'Designed and launched the Persian version of Missha.com’s main store, increasing local traffic by 40%.',
        'Delivered multiple event-based single-pages, driving seasonal campaign success for various clients.',
      ])
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['09/2019', '01/2020'],
    companyName: 'Azki (first insurance issuer application in Iran)',
    experienceDetails: {
      title: 'Junior Frontend Developer',
      href: 'https://shenoto.com',
      content: new ExperienceContent([
        'Improved responsive design for Laravel Blade pages, optimized mobile usability and SEO rankings.',
        'Mentored Junior Frontend team members and guide them with best practices',
      ])
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['09/2018', '03/2020'],
    companyName: 'Shenoto (Persian Podcast Platform)',
    experienceDetails: {
      title: 'Junior Frontend Developer',
      href: 'https://shenoto.com',
      content: new ExperienceContent([
        'Upgraded the website from Angular 3 to 7, improving load times by 15% and boosting SEO scores to 92%.',
        'Implemented PWA optimizations, resulting in 20% growth in returning users.',
        'Implemented wavesurfer.js friendly podcast player.',
      ])
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['08/2017', '11/2017'],
    companyName: 'ITManHa (Software Engineer Platform)',
    experienceDetails: {
      title: 'Junior Frontend Developer',
      href: 'https://itmanha.com',
      content: new ExperienceContent([
        'Engineered frontend solutions for cross-industry software/app projects driving client growth.',
        'Core stack: WordPress, JavaScript, jQuery, HTML5, CSS3 with focus on responsive design.',
      ])
    }
  } as ExperienceInterface,
];

export const skills: SkillsInterface = {
  languages: 'TypeScript, JavaScript (ES6+), HTML5, CSS3, Bash',
  frameworks: 'Angular (v2–v20), React.js, RxJS, Ionic, Tailwind CSS, Bootstrap',
  tools: 'Git, Docker, Nginx, Webpack, Vite, npm, Caddy, Nexus Repository Manager',
  concepts: 'SSR (Server-Side Rendering), SSG (Static Site Generation), Lazy Loading, PWA, Responsive Design, Internationalization (i18n), SEO Optimization, Performance Tuning'
};

export const HeadingContents = new Map<string, HeadingContentInterface>([
  [
    'about',
    {
      title: 'Frontend Engineer',
      content: new HeadingContent('Expert in architecting high-impact web solutions with 7+ years of experience. Delivered 10+ enterprise projects with 100% on-time completion, boosting user engagement by 30%+ and reducing load times by 20% through performance-optimized frameworks (Angular, React). Pioneered reusable component libraries that accelerated development velocity by 30% and cut bundle sizes. Proven leader in mentoring teams, establishing CI/CD pipelines (Docker, Nexus), and implementing SSR/PWA strategies that increased returning users by 20%. Focused on scalable architecture, internationalization, and cross-functional collaboration.')
    }
  ],
  [
    'jobs',
    {
      title: 'Experiences',
      content: new HeadingContent(experiences)
    }
  ],
  [
    'skills',
    {
      title: 'Technical Skills',
      content: new HeadingContent(skills)
    }
  ],
]);

export const contacts: (phoneNumber: string, email: string) => Array<LinkInterface> = (phoneNumber: string) => ([
  {
    href: `tel:${phoneNumber}`,
    iconName: 'bootstrapPhone',
    text: 'Call me',
    target: '_blank',
    className: 'btn btn-primary btn-soft',
  },
  {
    href: `sms:${phoneNumber}?body=Hi%20Ali,%20i%20saw%20your%20Portfolio,%20Let%27s%20talk`,
    iconName: 'bootstrapChatText',
    text: 'Text me',
    target: '_blank',
    className: 'btn btn-primary btn-soft',
  },
  {
    href: `mailto:${phoneNumber}?body=Hi%20Ali,%20i%20saw%20your%20Portfolio,%20Let%27s%20talk`,
    iconName: 'bootstrapSend',
    text: 'Email me',
    target: '_blank',
    className: 'btn btn-primary btn-soft',
  },
  {
    href: `https://github.com/aliroshandev`,
    iconName: 'bootstrapGithub',
    text: 'View Github',
    target: '_blank',
    className: 'btn btn-primary btn-soft',
  },
  {
    href: `https://linkedin.com/in/ali-roshan`,
    iconName: 'bootstrapLinkedin',
    text: 'Connect on Linkedin',
    target: '_blank',
    className: 'btn btn-primary btn-soft',
  },
  {
    href: '/assets/ALI_ROSHAN_CV.pdf',
    iconName: 'bootstrapFilePdf',
    text: 'Download CV',
    target: '_blank',
    className: 'btn btn-primary',
  },
]);

export function typeGuardHeadingContentTypeArrayOfExperience(data: any): data is Array<ExperienceInterface> {
  return Array.isArray(data) && data.length > 0 && data[0].companyName.length > 0;
}

export function typeGuardHeadingContentTypeString(data: any): data is string {
  return typeof data === "string";
}

export function typeGuardHeadingContentTypeSkillsInterface(data: any): data is SkillsInterface {
  return data satisfies SkillsInterface;
}

const test = new HeadingContent();

if (test.isArrayOfExperience()) {
  test.data[0].companyName
}

