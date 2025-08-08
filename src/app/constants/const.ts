import {ExperienceInterface, HeadingContentInterface, HeadingInterface, LinkInterface, SkillsInterface} from './types';
import {HeadingContent} from '../models/heading-content';
import {ExperienceContent} from '../models/experience-content';

export const Headings: Array<HeadingInterface> = [
  {text: 'About', id: 'about'},
  {text: 'Experiences', id: 'jobs'},
  {text: 'Technical Skills', id: 'technical-skills'},
];

export const SkillsKeyTranslation = new Map<keyof SkillsInterface, string>([
  ['languages', 'Languages'],
  ['frameworks', 'Frameworks & Libraries'],
  ['tools', 'Tools & Platforms'],
  ['concepts', 'Concepts & Techniques'],
]);

export const experiences: Array<ExperienceInterface> = [
  {
    workFromToDate: ['06/2022', 'Present'],
    companyName: 'TabinTech (Technology Solutions Provider - Software Development Company)',
    experienceDetails: {
      title: 'Frontend Chapter Lead',
      href: 'https://tabintech.com',
      content: new ExperienceContent([
        'Managed and delivered 6 outsourced projects, including platforms like pastil.ir, nam.ir, migline24.com, eanjoman.ir and Otanafoods.com, achieving a 25% increase in user engagement.',
        'Developed high-converting landing pages and reporting panels for major clients, including Khanoumi.com and divar.ir, reducing page load times by 20%.',
        'Create in-home Angular libraries deployed on Nexus-Sonatype3 such as (vft-core, vft-animation, vft-auth, …) to Reduce bundle sizes.',
        'Accelerate the project build time by 50% & Increase development time by 30% by creating schemas and base classes to maximize efficiency and drive success.',
        'Mentored and guided front-end developers, Defined and Implemented best practices for front-end development and architecture.'
      ])
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['08/2020', '05/2022'],
    companyName: 'Agatizer (Financial Services - Social Trading Platform)',
    experienceDetails: {
      title: 'Senior Frontend Developer',
      href: 'https://missha-ir.com',
      content: new ExperienceContent([
        'Designed and launched the Persian version of Missha.com’s main store, increasing local traffic by 40%.',
        'Delivered multiple event-based single-pages, driving seasonal campaign success for various clients.',
      ])
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['08/2020', '05/2022'],
    companyName: 'Missha (Global E-Commerce Platform)',
    experienceDetails: {
      title: 'Senior Frontend Developer',
      href: 'https://missha-ir.com',
      content: new ExperienceContent([
        'Designed and launched the Persian version of Missha.com’s main store, increasing local traffic by 40%.',
        'Delivered multiple event-based single-pages, driving seasonal campaign success for various clients.',
      ])
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['09/2020', '01/2021'],
    companyName: 'Tushehbar (Shipping and Maritime Transportation Agency)',
    experienceDetails: {
      title: 'Senior Frontend Developer',
      href: 'https://tushehbar.com',
      content: new ExperienceContent([
        'Spearheaded the development of a scalable Angular 9 front, enhancing internationalization and user satisfaction by 30%',
        'Developed an integrated management assistant system to automate shipping documentation workflows (e.g., bills of lading, customs forms), reducing manual processing time by 40% and minimizing human errors.',
        'Integrated with DevExtreme with customized SaaS application layouts and templates.',
      ])
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['09/2019', '01/2020'],
    companyName: 'eSafar (Online Travel Booking Platform)',
    experienceDetails: {
      title: 'Senior Frontend Developer',
      href: 'https://esafar.com',
      content: new ExperienceContent([
        'Spearheaded the development of a scalable Angular 8 front, enhancing internationalization and user satisfaction by 30%',
        'Implemented PWA optimizations, resulting in 35% growth in returning users.',
      ])
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['09/2019', '01/2020'],
    companyName: 'Azki (First Insurance issuer application in Iran)',
    experienceDetails: {
      title: 'Frontend Developer Consultant',
      href: 'https://azki.com',
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

export const technicalSkills: SkillsInterface = {
  languages: 'TypeScript, JavaScript (ES6+), HTML5, CSS3, Bash',
  frameworks: 'Angular (v2–v20), Next, Vue, RxJS, Ionic, Tailwind CSS, Bootstrap, DevExtreme',
  tools: 'Git, Docker, Nginx, Webpack, Gulp, Vite, npm, Caddy, Nexus Repository Manager',
  concepts: 'SSR (Server-Side Rendering), SSG (Static Site Generation), Lazy Loading, PWA, Responsive Design, Internationalization (i18n), SEO Optimization, Performance Tuning'
};

export const HeadingContents = new Map<string, HeadingContentInterface>([
  [
    'about',
    {
      title: 'Frontend Engineer',
      content: new HeadingContent('Senior Frontend Architect specializing in AI-integrated web applications, with 7+ years leading high-impact projects for HR tech (Agatizer) and logistics automation (Toosheh Bar). Delivered 10+ enterprise solutions boosting user engagement by 30% and reducing latency by 20% through performance-optimized React/Angular architectures. Spearheaded reusable component systems accelerating development velocity by 30% and cutting bundle sizes by 40%. Established CI/CD pipelines (Docker, Nexus) and SSR/PWA strategies that increased returning users by 20%. Proven leader mentoring 8+ engineers in scalable app design, i18n, and cross-platform optimization.')
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
    'technical-skills',
    {
      title: 'Technical Skills',
      content: new HeadingContent(technicalSkills)
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

