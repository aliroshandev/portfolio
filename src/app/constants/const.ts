import {ExperienceInterface, HeadingContentInterface, HeadingInterface, LinkInterface, SkillsInterface} from './types';
import {HeadingContent} from '../models/heading-content';
import {ExperienceContent} from '../models/experience-content';

export const Headings: Array<HeadingInterface> = [
  {text: 'About', id: 'about'},
  {text: 'Jobs', id: 'jobs'},
  {text: 'Skills', id: 'skills'},
];

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
];

export const skills: SkillsInterface = {
  languages: [],
  frameworks: [],
  concepts: []
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
      title: 'Senior Frontend Developer',
      content: new HeadingContent(experiences)
    }
  ],
  [
    'skills',
    {
      title: 'Senior Frontend Developer',
      content: new HeadingContent(skills)
    }
  ],
]);

export const contacts: (phoneNumber: string) => Array<LinkInterface> = (phoneNumber: string) => ([
  {
    href: `tel:${phoneNumber}`,
    iconName: 'bootstrapPhone',
    text: 'Call me',
    target: '_blank',
    className: 'btn btn-primary btn-soft',
  },
  {
    href: `sms:${phoneNumber}?body=Hi%20Ali,%20i%20saw%20your%20Portfolio,%20Let%27s%20talk`,
    iconName: 'bootstrapSend',
    text: 'Text me',
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

