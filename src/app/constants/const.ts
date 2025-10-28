import {ExperienceInterface, HeadingContentInterface, HeadingInterface, LinkInterface, SkillsInterface} from './types';
import {HeadingContent} from '../models/heading-content';
import {ExperienceContent} from '../models/experience-content';

export const Headings: Array<HeadingInterface> = [
  {text: 'About', id: 'about'},
  {text: 'Experiences', id: 'experiences'},
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
      title: 'Frontend Engineer',
      href: 'https://tabintech.com',
      content: new ExperienceContent([
        'Managed and delivered 6 outsourced projects, including platforms like pastil.ir, nam.ir, migline24.com, eanjoman.ir and Otanafoods.com, achieving a 25% increase in user engagement.',
        'Developed high-converting landing pages and reporting panels for major clients, including Khanoumi.com and divar.ir, reducing page load times by 20%.',
        'Create in-home Angular libraries deployed on Nexus-Sonatype3 such as (vft-core, vft-animation, vft-auth, …) to Reduce bundle sizes.',
        'Accelerate the project build time by 50% & Increase development time by 30% by creating schemas and base classes to maximize efficiency and drive success.',
        'Mentored and guided front-end developers, Defined and Implemented best practices for front-end development and architecture.'
      ]),
      tags: ['Angular', 'Angular Material', 'Bootstrap', 'Jest', 'Karma', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Responsive Design', 'PWA', 'SEO', 'JSP', 'JSF', 'Spring boot', 'Nexus', 'Docker', 'Git', 'Jira']
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['08/2020', '05/2022'],
    companyName: 'Agatizer (Financial Services - Social Trading Platform)',
    experienceDetails: {
      title: 'Remote Frontend Engineer',
      href: 'https://missha-ir.com',
      content: new ExperienceContent([
        'Designed and launched the Persian version of Missha.com’s main store, increasing local traffic by 40%.',
        'Delivered multiple event-based single-pages, driving seasonal campaign success for various clients.',
      ]),
      tags: ['React', 'Angular', 'Tailwind', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Responsive Design', 'Docker', 'Caddy', 'PWA', 'SEO', 'Git', 'Jira']
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['08/2020', '05/2022'],
    companyName: 'Missha (Global E-Commerce Platform)',
    experienceDetails: {
      title: 'Remote Frontend Engineer',
      href: 'https://missha-ir.com',
      content: new ExperienceContent([
        'Designed and launched the Persian version of Missha.com’s main store, increasing local traffic by 40%.',
        'Delivered multiple event-based single-pages, driving seasonal campaign success for various clients.',
      ]),
      tags: ['Angular', 'Angular Material', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Responsive Design', 'Jest', 'Karma', 'Docker', 'Caddy', 'PWA', 'SEO', 'Git', 'Jira']
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['09/2020', '01/2021'],
    companyName: 'Tushehbar (Shipping and Maritime Transportation Agency)',
    experienceDetails: {
      title: 'Frontend Engineer',
      href: 'https://tushehbar.com',
      content: new ExperienceContent([
        'Spearheaded the development of a scalable Angular 9 front, enhancing internationalization and user satisfaction by 30%',
        'Developed an integrated management assistant system to automate shipping documentation workflows (e.g., bills of lading, customs forms), reducing manual processing time by 40% and minimizing human errors.',
        'Integrated with DevExtreme with customized SaaS application layouts and templates.',
      ]),
      tags: ['React', 'Angular', 'Angular Material', 'Bootstrap', 'DevExtreme', 'Jest', 'Karma', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Responsive Design', 'Docker', 'Caddy', 'PWA', 'SEO', 'Git', 'Jira']
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['09/2019', '01/2020'],
    companyName: 'eSafar (Online Travel Booking Platform)',
    experienceDetails: {
      title: 'Frontend Developer',
      href: 'https://esafar.com',
      content: new ExperienceContent([
        'Spearheaded the development of a scalable Angular 8 front, enhancing internationalization and user satisfaction by 30%',
        'Implemented PWA optimizations, resulting in 35% growth in returning users.',
      ]),
      tags: ['Angular', 'Angular Material', 'Jest', 'Karma', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Responsive Design', 'Docker', 'Nginx', 'PWA', 'SEO', 'Git', 'Jira']
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
      ]),
      tags: ['Laravel', 'Blade', 'HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Responsive Design', 'SEO', 'Git', 'Jira']
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['09/2018', '03/2020'],
    companyName: 'Shenoto (Persian Podcast Platform)',
    experienceDetails: {
      title: 'Frontend Developer',
      href: 'https://shenoto.com',
      content: new ExperienceContent([
        'Upgraded the website from Angular 3 to 7, improving load times by 15% and boosting SEO scores to 92%.',
        'Implemented PWA optimizations, resulting in 20% growth in returning users.',
        'Implemented wavesurfer.js friendly podcast player.',
      ]),
      tags: ['Angular', 'HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Docker', 'PWA', 'SEO', 'Podcast Player', 'wavesurfer.js', 'Git', 'Trello']
    }
  } as ExperienceInterface,
  {
    workFromToDate: ['08/2017', '11/2017'],
    companyName: 'ITManHa (Software Engineer Platform)',
    experienceDetails: {
      title: 'Frontend Developer',
      href: 'https://itmanha.com',
      content: new ExperienceContent([
        'Engineered frontend solutions for cross-industry software/app projects driving client growth.',
        'Core stack: React, WordPress, Headless CMS, JavaScript, jQuery, HTML5, CSS3 with focus on responsive design.',
      ]),
      tags: ['React', 'WordPress', 'Headless CMS', 'JavaScript', 'jQuery', 'HTML5', 'CSS3', 'Responsive Design']
    }
  } as ExperienceInterface,
];

export const technicalSkills: SkillsInterface = {
  languages: 'TypeScript, JavaScript (ES6+), HTML5, CSS3, Bash, PHP, Laravel, TSX, JSX, JSON, XML, YAML, JSP, JSF',
  frameworks: 'Angular (v2–v20), Next, Vue, RxJS, Ionic, Tailwind CSS, Bootstrap, DevExtreme',
  tools: 'Git, Docker, Nginx, Webpack, Gulp, Vite, npm, Caddy, Nexus Repository Manager',
  concepts: 'SSR (Server-Side Rendering), SSG (Static Site Generation), Lazy Loading, PWA, Responsive Design, Internationalization (i18n), SEO Optimization, Performance Tuning'
};

export const HeadingContents = new Map<string, HeadingContentInterface>([
  [
    'about',
    {
      title: 'Frontend Engineer',
      content: new HeadingContent('Frontend Architect with 7+ years spearheading performance-critical web solutions for finance (Agatizer), logistics (Toosheh Bar), and e-commerce (Missha). Delivered 10+ enterprise applications boosting engagement by 30% and slashing latency by 20% through optimized React/Angular architectures. Pioneered reusable component systems accelerating development velocity by 30% and reducing bundle sizes by 40%. Established CI/CD pipelines (Docker, Nexus) and SSR/PWA strategies increasing returning users by 20%. Mentored 8+ engineers in scalable app design and i18n.')
    }
  ],
  [
    'experiences',
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

export const richSnippetJsonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ali Roshanzamir Golafzani",
  "url": "https://aliroshanzamir.info",
  "mainEntityOfPage": "https://aliroshanzamir.info",
  "image": "https://aliroshanzamir.info/assets/profile-light.png",
  "jobTitle": "Frontend Engineer",
  "description": "Frontend Architect with 7+ years spearheading performance-critical web solutions for finance (Agatizer), logistics (Toosheh Bar), and e-commerce (Missha). Delivered 10+ enterprise applications boosting engagement by 30% and slashing latency by 20% through optimized React",
  "sameAs": [
    "https://ir.linkedin.com/in/ali-roshan",
    "https://github.com/aliroshandev"
  ]
};

export const profileRichSnippetJsonSchema = {
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
    "gender": "Male",
    "email": "a76roshanzamir@gmail.com",
    "address": {"@type": "PostalAddress", "addressCountry": "IR", "addressLocality": "Tehran, Tehran Province, Iran"},
    "jobTitle": ["Frontend Engineer", "Angular Specialist", "React Developer", "Next Developer", "Frontend Developer"],
    "knowsLanguage": ["English", "Persian"],
    "awards": [],
    "disambiguatingDescription": "Ali Roshanzamir Golafzani | Frontend Engineer | Bachelor's degree in Computer Engineering",
    "image": {
      "@id": "#profileImage"
    },
    "memberOf": [],
    "name": "Ali Roshanzamir Golafzani",
    "sameAs": [
      "https://ir.linkedin.com/in/ali-roshan",
      "https://github.com/aliroshandev"
    ],
    "url": "https://aliroshanzamir.info",
    "worksFor": [{
      "@type": "Organization",
      "name": "Tabin Tech | تابین تِک",
      "url": "https://tabintech.com",
      "location": "Tehran, Tehran Province, Iran",
      "member": {"@type": "OrganizationRole", "member": {"@id": "#profile"}, "startDate": "2024-12"}
    }],
    "description": "Frontend Architect with 7+ years spearheading performance-critical web solutions for finance (Agatizer), logistics (Toosheh Bar), and e-commerce (Missha). Delivered 10+ enterprise applications boosting engagement by 30% and slashing latency by 20% through optimized React/Angular architectures. Pioneered reusable component systems accelerating development velocity by 30% and reducing bundle sizes by 40%. Established CI/CD pipelines (Docker, Nexus) and SSR/PWA strategies increasing returning users by 20%. Mentored 8+ engineers in scalable app design and i18n.",
    "alumniOf": [{
      "@type": "Organization",
      "name": "eSafar",
      "url": "https://esafar.com",
      "location": "Tehran Province, Iran",
      "member": {"@type": "OrganizationRole", "member": {"@id": "#profile"}, "startDate": "2021-10", "endDate": "2022-01"}
    }, {
      "@type": "Organization",
      "name": "Tushehbar Shipping Agency",
      "url": "https://tushehbar.com",
      "location": "Remote",
      "member": {"@type": "OrganizationRole", "member": {"@id": "#profile"}, "startDate": "2020-11", "endDate": "2021-10"}
    }, {
      "@type": "Organization",
      "name": "MISSHA",
      "url": "https://missha-ir.com",
      "location": "Remote",
      "member": {"@type": "OrganizationRole", "member": {"@id": "#profile"}, "startDate": "2020-10", "endDate": "2021-02"}
    }, {
      "@type": "Organization",
      "name": "eSafar",
      "url": "https://esafar.com",
      "location": "Tehran Province, Iran",
      "member": {"@type": "OrganizationRole", "member": {"@id": "#profile"}, "startDate": "2020-05", "endDate": "2020-08"}
    }, {
      "@type": "Organization",
      "name": "Shenoto - Persian Podcast Platform",
      "url": "https://shenoto.com",
      "location": "Tehran Province, Iran",
      "member": {"@type": "OrganizationRole", "member": {"@id": "#profile"}, "startDate": "2018-09", "endDate": "2020-05"}
    }, {
      "@type": "Organization",
      "name": "EMOZ",
      "url": "https://emoz.biz",
      "location": "Tehran Province, Iran",
      "member": {"@type": "OrganizationRole", "member": {"@id": "#profile"}, "startDate": "2019-01", "endDate": "2019-05"}
    }, {
      "@type": "EducationalOrganization",
      "name": "Azad University South Tehran",
      "member": {"@type": "OrganizationRole", "member": {"@id": "#profile"}, "startDate": "2015", "endDate": "2021"}
    }],
    "skills": [
      "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Bash", "PHP", "Laravel", "TSX", "JSX", "JSON", "XML", "YAML", "JSP", "JSF", "Angular (v2–v20)", "Next", "Vue", "RxJS", "Ionic", "Tailwind CSS", "Bootstrap", "DevExtreme", "Git", "Docker", "Nginx", "Webpack", "Gulp", "Vite", "npm", "Caddy", "Nexus Repository Manager", "SSR (Server-Side Rendering)", "SSG (Static Site Generation)", "Lazy Loading", "PWA", "Responsive Design", "Internationalization (i18n)", "SEO Optimization", "Performance Tuning"
    ]
  }
};

const linkedInSchema = {
  "@context": "http://schema.org",
  "@graph": [{
    "@type": "WebPage",
    "reviewedBy": {"@type": "Person", "name": "Ali Roshanzamir Golafzani"},
    "url": "https://ir.linkedin.com/in/ali-roshan"
  }],
  "@type": "ProfilePage",
  "image": {
    "@type": "ImageObject",
    "contentUrl": "https://media.licdn.com/dms/image/v2/D4E03AQEckEcODginBw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1680185467791?e=2147483647&v=beta&t=R4nP4WkBCTQgNCYBnNKxkpLhMVKz0lAGwOi242DBkqE"
  },
  "mainEntity": {
    "@context": "http://schema.org",
    "@type": "Person",
    "address": {"@type": "PostalAddress", "addressCountry": "IR", "addressLocality": "Tehran, Tehran Province, Iran"},
    "alumniOf": [{
      "@type": "Organization",
      "name": "eSafar.com",
      "url": "https://ir.linkedin.com/company/esafar",
      "member": {"@type": "OrganizationRole", "startDate": "2021-10", "endDate": "2022-01"}
    }, {
      "@type": "Organization",
      "name": "Tushehbar Shipping Agency",
      "url": "https://ir.linkedin.com/company/tushehbar-shipping-agency",
      "member": {"@type": "OrganizationRole", "startDate": "2020-11", "endDate": "2021-10"}
    }, {
      "@type": "Organization",
      "name": "MISSHA",
      "url": "https://www.linkedin.com/company/missha-us-inc",
      "member": {"@type": "OrganizationRole", "startDate": "2020-10", "endDate": "2021-02"}
    }, {
      "@type": "Organization",
      "name": "eSafar.com",
      "url": "https://ir.linkedin.com/company/esafar",
      "location": "Iran",
      "member": {"@type": "OrganizationRole", "startDate": "2020-05", "endDate": "2020-08"}
    }, {
      "@type": "Organization",
      "name": "شنوتو - مرجع پادکست های صوتی",
      "url": "https://ir.linkedin.com/company/%D8%B4%D9%86%D9%88%D8%AA%D9%88---%D9%85%D8%B1%D8%AC%D8%B9-%D9%BE%D8%A7%D8%AF%DA%A9%D8%B3%D8%AA-%D9%87%D8%A7%DB%8C-%D8%B5%D9%88%D8%AA%DB%8C",
      "location": "Tehran Province, Iran",
      "member": {"@type": "OrganizationRole", "startDate": "2018-09", "endDate": "2020-05"}
    }, {
      "@type": "Organization",
      "name": "EMOZ",
      "url": "https://www.linkedin.com/company/emoz",
      "location": "Tehran Province, Iran",
      "member": {"@type": "OrganizationRole", "startDate": "2019-01", "endDate": "2019-05"}
    }, {
      "@type": "EducationalOrganization",
      "name": "Azad University South Tehran",
      "member": {"@type": "OrganizationRole", "startDate": 2015, "endDate": 2021}
    }],
    "awards": [],
    "disambiguatingDescription": "",
    "image": {
      "@type": "ImageObject",
      "contentUrl": "https://media.licdn.com/dms/image/v2/D4E03AQEckEcODginBw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1680185467791?e=2147483647&v=beta&t=R4nP4WkBCTQgNCYBnNKxkpLhMVKz0lAGwOi242DBkqE"
    },
    "jobTitle": ["Frontend Chapter Lead"],
    "knowsLanguage": ["English", "Persian"],
    "memberOf": [],
    "name": "Ali Roshanzamir Golafzani",
    "sameAs": "https://ir.linkedin.com/in/ali-roshan",
    "url": "https://ir.linkedin.com/in/ali-roshan",
    "worksFor": [{
      "@type": "Organization",
      "name": "Tabin Tech | تابین تِک",
      "url": "https://ir.linkedin.com/company/tabintech",
      "location": "Tehran, Tehran Province, Iran",
      "member": {"@type": "OrganizationRole", "startDate": "2024-12"}
    }],
    "interactionStatistic": [{
      "@type": "InteractionCounter",
      "interactionType": "https://schema.org/FollowAction",
      "name": "Follows",
      "userInteractionCount": 594
    }, {
      "@type": "InteractionCounter",
      "interactionType": {"@id": "https://schema.org/BefriendAction", "@type": "BefriendAction"},
      "name": "Connections",
      "userInteractionCount": 596
    }],
    "description": "At Vira Fanavaran Taabin, our collective efforts in frontend development have been geared towards pushing the envelope of web standards. With a Bachelor's degree in Computer Engineering from Azad University South Tehran, my role involves harnessing the power of the Ionic Framework to develop responsive interfaces that cater to users' evolving needs.\u003Cbr\u003E\u003Cbr\u003EIn a landscape where performance and security are paramount, we prioritize optimization and adherence to OWASP guidelines. It's my goal to leverage these competencies to create not just seamless, but also secure user experiences that embody our company's forward-thinking ethos."
  }
}
