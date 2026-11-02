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
