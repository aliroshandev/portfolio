export interface Project {
  id: string;
  title: string;
  company: string;
  period: string;
  tagline: string;
  description: string;
  techStack: string[];
  architecture?: string;
  challenges: string[];
  solutions: string[];
  links?: {label: string; url: string}[];
}

// Ids must match PROJECT_IDS in app.routes.server.ts and public/sitemap-config.xml.
export const PROJECTS: Project[] = [
  {
    id: 'gamify-platform',
    title: 'Gamify Campaign Platform',
    company: 'Tabin Tech',
    period: '2026 – Present',
    tagline: 'Migrated per-customer game admin panels into one SaaS platform',
    description: 'Gamify lets businesses run marketing campaigns with games such as roulette, jackpot and mystery boxes. Each customer used to get its own game admin panel, published on outside servers. I migrated that frontend into a SaaS platform with two panels: a customer panel for those customers and an admin panel for Tabin Tech. Development took about 3 days, using Claude as a coding agent, my own Angular packages and code generators, and my review of the code.',
    techStack: ['Angular 22', 'TypeScript', 'Bootstrap', 'Custom Angular packages', 'Code generators', 'Claude Code'],
    architecture: `graph TD\n    A[Customer Panel] --> C[Custom Angular Packages]\n    B[Tabin Tech Admin Panel] --> C\n    A --> D[Campaign Wizard and Settings]\n    A --> E[Prizes, Events and Chance Logic]\n    A --> F[SMS, Tickets and Dashboard]\n    C --> G[Gamify SaaS API]`,
    challenges: [
      'A separate admin panel published per customer on outside servers',
      'Many features to carry over, from prizes and chance logic to SMS and themes',
      'A long campaign setup for business users',
      'Moving quickly with an AI coding agent without losing control of the code'
    ],
    solutions: [
      'One customer panel for all customers and one admin panel for the company',
      'Game features organised into separate modules',
      'A step-by-step campaign creation wizard',
      'My own packages and generators for repeated code, and my review of the changes'
    ],
    links: [
      {label: 'Live: gmfy.ir', url: 'https://gmfy.ir'}
    ]
  },
  {
    id: 'kheir-iran',
    title: 'Kheir Iran Charity Platform',
    company: 'Tabin Tech',
    period: '12/2024 – Present',
    tagline: 'Angular admin panel for an enterprise charity platform',
    description: 'Kheir Iran is a platform where charities register and people can search them by province, activity, way of helping and licence status. I work on its Angular admin panel, which manages charity registration requests, benefactors, campaigns, financial support, volunteer opportunities, news, tickets and violation reports.',
    techStack: ['Angular 20', 'TypeScript', 'Angular Signals', 'RxJS', 'Bootstrap', 'Leaflet', 'CKEditor', 'Karma', 'Jasmine'],
    architecture: `graph TD\n    A[Admin Panel] --> B[Charity Registration and Accounts]\n    A --> C[Benefactors and Financial Support]\n    A --> D[Campaigns and Volunteer Opportunities]\n    A --> E[News, Tickets and Violation Reports]\n    B --> F[Platform API]\n    C --> F\n    D --> F\n    E --> F`,
    challenges: [
      'A large admin surface covering charities, benefactors and volunteers',
      'Reviewing charity registration and account change requests',
      'Bringing existing charity lists into the platform',
      'Persian content, Jalali dates and location data'
    ],
    solutions: [
      'Feature modules for each area, behind a lazy-loaded main shell',
      'Dedicated screens for registration and account change requests',
      'Excel import for charities',
      'Right-to-left UI with Jalali date pickers and Leaflet maps'
    ],
    links: [
      {label: 'Live: kheir.ir', url: 'https://kheir.ir'}
    ]
  },
  {
    id: 'filter-app',
    title: 'Filter Quit-Smoking App',
    company: 'Tabin Tech',
    period: '12/2025 – Present',
    tagline: 'Customer app and admin panel for a quit-smoking planner',
    description: 'Filter helps people plan to quit smoking. I developed both its customer app and its admin panel. The customer app covers onboarding, a dashboard, health improvement tracking, audio books, subscriptions and gift cards, and runs as a PWA that is also packaged for Android.',
    techStack: ['Angular 21', 'TypeScript', 'PWA', 'Trusted Web Activity', 'Bootstrap', 'Jalali dates'],
    architecture: `graph TD\n    A[Customer App: PWA and Android] --> B[Onboarding and Dashboard]\n    A --> C[Health Tracking and Audio Books]\n    A --> D[Subscriptions and Gift Cards]\n    E[Admin Panel] --> F[Filter API]\n    A --> F`,
    challenges: [
      'Reaching users on the web and on Android from one codebase',
      'Getting new users into a plan quickly',
      'Offering premium content alongside free features'
    ],
    solutions: [
      'An installable PWA, packaged for Android as a Trusted Web Activity',
      'A guided onboarding flow',
      'Subscription and gift card flows'
    ],
    links: [
      {label: 'Live: filterapps.ir', url: 'https://filterapps.ir'}
    ]
  },
  {
    id: 'tabintech-platform',
    title: 'Tabin Tech Client Applications',
    company: 'Tabin Tech',
    period: '01/2022 – Present',
    tagline: 'Angular applications and shared libraries for Tabin Tech clients',
    description: 'Frontend engineer on client applications including pastil.ir and nam.ir, currently on Angular 22 with TypeScript, RxJS and GraphQL. Built shared Angular libraries (vft-core, vft-auth, vft-table, vft-ui-util) published to a private Nexus registry.',
    techStack: ['Angular 22', 'Angular Signals', 'RxJS', 'GraphQL', 'TypeScript', 'Tailwind CSS', 'Nx', 'Webpack', 'Docker', 'Nexus', 'PWA', 'SSR'],
    architecture: `graph TD\n    A[Angular Client Apps] --> B[vft-core: Shared Services and Models]\n    A --> C[vft-auth: Authentication and Guards]\n    A --> D[vft-table: Data Tables]\n    A --> E[vft-ui-util: UI Utilities]\n    B --> F[Private Nexus Registry]\n    C --> F\n    D --> F\n    E --> F\n    A --> G[GraphQL API]`,
    challenges: [
      'Keeping several client applications consistent',
      'Large bundles slowing the first load',
      'Slow CI builds',
      'Duplicated business logic and UI components'
    ],
    solutions: [
      'Shared vft-* libraries with versioned releases on Nexus',
      'Angular Signals for finer-grained updates',
      'Webpack configuration and code splitting',
      'Schema-driven CRUD and form scaffolding (vft-form-generator)'
    ],
    links: [
      {label: 'Live: pastil.ir', url: 'https://pastil.ir'},
      {label: 'Live: nam.ir', url: 'https://nam.ir'}
    ]
  },
  {
    id: 'rezervno',
    title: 'Rezervno Restaurant Booking',
    company: 'Freelance client',
    period: '08/2026',
    tagline: 'Backend fixes, tests and MVP deployment for a restaurant booking SaaS',
    description: 'Rezervno is a restaurant reservation SaaS with customer, restaurant and platform admin apps on one Next.js API. I was one of several contributors for a paid client. I worked on API routes, database migrations and tests, and on getting the MVP deployed with Docker Compose and Nginx.',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Redis', 'Docker', 'Nginx'],
    architecture: `graph TD\n    A[Customer App] --> D[Next.js API]\n    B[Restaurant Panel] --> D\n    C[Platform Admin Panel] --> D\n    D --> E[PostgreSQL via Prisma]\n    D --> F[Redis]`,
    challenges: [
      'Database schema and migrations out of step with the code',
      'Getting the application to start reliably in Docker',
      'Preparing the MVP for its first deployment'
    ],
    solutions: [
      'Migrations that bring the schema back in line',
      'Fixes to the Docker image, Compose file and health checks',
      'A Docker Compose and Nginx deployment setup'
    ]
  },
  {
    id: 'rou-dar-rou',
    title: 'Rou Dar Rou Marketplace',
    company: 'Freelance client',
    period: '07/2025 – 10/2026',
    tagline: 'From a Next.js property site to an Angular marketplace and admin panel',
    description: 'Rou Dar Rou is a Persian marketplace for real estate, with building materials and services planned. It began as Bvasett, a property listing site I built for a paid client in Next.js and PrimeReact, with ad creation, search filters, subscriptions and OTP login. When the product became Rou Dar Rou, I built its Angular website and an admin panel for accounts, roles, the catalog, geography, verification and audit. Most of the admin panel was built with Claude as a coding agent, with my review.',
    techStack: ['Angular 22', 'Angular Signals', 'Angular Aria', 'Angular CDK', 'Vitest', 'Next.js', 'React', 'PrimeReact', 'TypeScript'],
    architecture: `graph TD\n    A[Bvasett: Next.js Site] -->|became| B[Rou Dar Rou Website: Angular]\n    B --> D[Backend API]\n    C[Admin Panel: Angular] --> D\n    C --> E[Roles, Users and Audit]\n    C --> F[Catalog and Geography]\n    C --> G[Verification]`,
    challenges: [
      'Moving the product from a property site to a marketplace that can grow beyond real estate',
      'Keeping the admin panel in step with the backend API',
      'Accessible interactive widgets in a right-to-left UI'
    ],
    solutions: [
      'Website features split by domain: real estate, materials and services',
      'An API contract generated from the OpenAPI document',
      'Angular Aria widgets and CDK overlays'
    ]
  },
  {
    id: 'agatizer-trading',
    title: 'Agatizer Copy-Trading Dashboard',
    company: 'Agatizer',
    period: '08/2021 – 10/2021',
    tagline: 'Real-time dashboard for a copy-trading platform, fed by WebSocket data',
    description: 'Built the dashboard for a platform where users mirror other traders\' positions. Rendered live WebSocket data with D3.js, and used virtual scrolling and RxJS streams to keep the interface responsive.',
    techStack: ['React', 'Angular', 'TypeScript', 'RxJS', 'WebSocket', 'D3.js', 'Tailwind CSS', 'Docker', 'PWA'],
    architecture: `graph TD\n    A[WebSocket Feed] --> B[RxJS Stream Processing]\n    B --> C[Virtual Scroll Buffer]\n    C --> D[D3.js Charts]\n    D --> E[Dashboard UI]`,
    challenges: [
      'Rendering live data without blocking the UI',
      'Memory growth from unbounded message queues',
      'Keeping WebSocket connections stable across browsers'
    ],
    solutions: [
      'Virtual scrolling for long lists',
      'RxJS buffering and debouncing for backpressure',
      'Reconnection with backoff and a heartbeat'
    ],
    links: []
  },
  {
    id: 'missha-pwa',
    title: 'Missha E-Commerce PWA',
    company: 'Missha',
    period: '10/2020 – 02/2021',
    tagline: 'Localized Persian e-commerce PWA with offline support',
    description: 'Part-time work on the Persian e-commerce storefront: a PWA with Service Workers for offline support, right-to-left layouts and SEO work.',
    techStack: ['Angular', 'Angular Material', 'TypeScript', 'Jest', 'Docker', 'PWA', 'Service Workers', 'SEO', 'Nginx', 'Lighthouse'],
    architecture: `graph TD\n    A[Angular App] --> B[Service Worker]\n    B --> C[Cache Strategies]\n    B --> D[Offline Fallback Pages]\n    A --> E[SEO: Meta Tags and Structured Data]\n    A --> F[Persian RTL Support]\n    A --> G[Lazy Loaded Feature Modules]`,
    challenges: [
      'Persian RTL layout with complex product grids',
      'Indexing Persian content properly',
      'Keeping the shop usable on poor connections'
    ],
    solutions: [
      'RTL-aware components using CSS logical properties',
      'Page-level meta tags and structured data',
      'Service Worker caching with offline fallbacks'
    ],
    links: [
      {label: 'Live Site', url: 'https://missha-ir.com'}
    ]
  },
  {
    id: 'angular-lazy-load',
    title: 'angular-lazy-load-directive (Open Source)',
    company: 'Open Source',
    period: '2025 – Present',
    tagline: 'Signal-based image lazy loading directive for Angular',
    description: 'Published npm package: an image lazy loading directive built on Angular signals and IntersectionObserver, with zoneless support, SSR and hydration support, and retry on failed loads.',
    techStack: ['Angular', 'Angular Signals', 'IntersectionObserver', 'TypeScript', 'npm'],
    architecture: `graph TD\n    A[Lazy Load Directive] --> B[Signal Inputs and Outputs]\n    A --> C[IntersectionObserver]\n    C --> D[Load Image in Viewport]\n    D --> E[Retry on Failure]\n    A --> F[SSR Safe]`,
    challenges: [
      'No IntersectionObserver on the server',
      'Cleaning up observers when elements are removed',
      'Working without Zone.js'
    ],
    solutions: [
      'Browser-only setup so SSR stays safe',
      'Cleanup when the directive is destroyed',
      'Signal-based inputs, outputs and state'
    ],
    links: [
      {label: 'NPM Package', url: 'https://www.npmjs.com/package/angular-lazy-load-directive'},
      {label: 'GitHub', url: 'https://github.com/aliroshandev/angular-lazy-load-directive'},
      {label: 'Demo', url: 'https://angular-lazy-load-demo.netlify.app'}
    ]
  },
  {
    id: 'angular-lifecycles',
    title: 'Angular Lifecycles Guide',
    company: 'Open Source',
    period: '2025 – Present',
    tagline: 'Visual guide to the Angular lifecycle and dependency injection',
    description: 'A free reference site that explains the Angular application lifecycle, lifecycle hooks and dependency injection through Mermaid flowcharts and code examples, for developers who already know Angular. Checked against Angular 22.',
    techStack: ['HTML', 'CSS', 'Mermaid.js', 'Vercel'],
    challenges: [
      'Explaining Angular internals simply',
      'Keeping up with Angular releases'
    ],
    solutions: [
      'Flowcharts of execution order and data flow',
      'Quick-reference cheat sheets'
    ],
    links: [
      {label: 'Live Site', url: 'https://angular-lifecycles.vercel.app'},
      {label: 'GitHub', url: 'https://github.com/aliroshandev/angular-lifecycles'}
    ]
  }
];
