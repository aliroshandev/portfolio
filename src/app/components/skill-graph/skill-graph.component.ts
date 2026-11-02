import {Component, computed, signal, ChangeDetectionStrategy} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {
  bootstrapGraphUp, bootstrapCodeSlash, bootstrapSpeedometer2,
  bootstrapDatabase, bootstrapCloud, bootstrapTerminal,
  bootstrapDiagram3, bootstrapTrophy, bootstrapStarFill,
  bootstrapLink45deg, bootstrapChevronRight
} from '@ng-icons/bootstrap-icons';


interface SkillCategory {
  name: string;
  icon: string;
  color: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  proficiency: number; // 0-100
  yearsExperience: number;
  projects: string[];
  evidence?: {label: string; url: string};
  description: string;
}

@Component({
  selector: 'app-skill-graph',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './skill-graph.component.html',
  styleUrl: './skill-graph.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  viewProviders: [provideIcons({
    bootstrapGraphUp, bootstrapCodeSlash, bootstrapSpeedometer2,
    bootstrapDatabase, bootstrapCloud, bootstrapTerminal,
    bootstrapDiagram3, bootstrapTrophy, bootstrapStarFill,
    bootstrapLink45deg, bootstrapChevronRight
  })]
})
export class SkillGraphComponent {
  readonly selectedCategory = signal<string | null>(null);
  readonly hoveredSkill = signal<Skill | null>(null);

  protected readonly categories = computed<SkillCategory[]>(() => [
    {
      name: 'Frontend Frameworks',
      icon: 'bootstrapCodeSlash',
      color: '#DD0031',
      skills: [
        {
          name: 'Angular (v5–v22)',
          proficiency: 98,
          yearsExperience: 7,
          projects: ['Tabintech Platform', 'Missha PWA', 'Esafar', 'Shenoto'],
          evidence: {label: 'Angular PR #62361', url: 'https://github.com/angular/angular/pull/62361'},
          description: 'Architected enterprise apps from Angular 5 to 22. Official contributor. Deep expertise in Signals, Zoneless, Standalone components, and migration strategies.'
        },
        {
          name: 'Angular Signals & RxJS',
          proficiency: 95,
          yearsExperience: 4,
          projects: ['vft-core', 'angular-lazy-load-directive', 'Tabintech'],
          evidence: {label: 'angular-lazy-load-directive', url: 'https://www.npmjs.com/package/angular-lazy-load-directive'},
          description: 'Built production libraries using Signals for fine-grained reactivity. Expert in RxJS operators, backpressure handling, and state management patterns.'
        },
        {
          name: 'React / Next.js',
          proficiency: 85,
          yearsExperience: 4,
          projects: ['Agatizer Dashboard', 'Itmanha'],
          description: 'Built high-frequency trading dashboard with React. Familiar with Next.js App Router, Server Components, and performance optimization.'
        },
        {
          name: 'Vue.js',
          proficiency: 70,
          yearsExperience: 1,
          projects: ['Internal tools'],
          description: 'Working knowledge for maintenance and migration tasks.'
        }
      ]
    },
    {
      name: 'Performance & Architecture',
      icon: 'bootstrapSpeedometer2',
      color: '#FF6B35',
      skills: [
        {
          name: 'Core Web Vitals / Lighthouse',
          proficiency: 95,
          yearsExperience: 5,
          projects: ['Missha PWA (95+)', 'Tabintech', 'angular-lazy-load-directive'],
          evidence: {label: 'Lighthouse CI Setup', url: 'https://github.com/aliroshandev'},
          description: 'Consistently achieve 95+ Lighthouse scores. Expert in FCP/LCP/CLS optimization, bundle analysis, and performance budgets.'
        },
        {
          name: 'Bundle Optimization',
          proficiency: 92,
          yearsExperience: 5,
          projects: ['Tabintech (40% reduction)', 'vft-* libraries'],
          description: 'Code splitting, tree shaking, module federation, lazy loading strategies. Reduced enterprise bundles by 40%.'
        },
        {
          name: 'Real-time & Streaming',
          proficiency: 90,
          yearsExperience: 3,
          projects: ['Agatizer (1M msgs/sec)', 'WebSocket Architecture'],
          description: 'High-frequency WebSocket handling, RxJS backpressure, virtual scrolling, D3.js canvas rendering for 1M+ data points.'
        },
        {
          name: 'SSR / SSG / PWA',
          proficiency: 93,
          yearsExperience: 5,
          projects: ['Missha PWA', 'Esafar', 'Tabintech', 'Angular Universal'],
          description: 'Angular Universal SSR, Service Workers, Workbox, offline-first strategies, hydration optimization.'
        }
      ]
    },
    {
      name: 'Backend & APIs',
      icon: 'bootstrapDatabase',
      color: '#3B82F6',
      skills: [
        {
          name: 'GraphQL',
          proficiency: 88,
          yearsExperience: 3,
          projects: ['Tabintech Platform', 'Schema Design'],
          description: 'Schema design, federation, resolvers, DataLoader pattern, caching strategies, subscription handling.'
        },
        {
          name: 'REST APIs & WebSockets',
          proficiency: 92,
          yearsExperience: 7,
          projects: ['All projects', 'Agatizer Trading'],
          description: 'API design, versioning, authentication, rate limiting, WebSocket scaling with Redis pub/sub.'
        },
        {
          name: 'Docker & CI/CD',
          proficiency: 88,
          yearsExperience: 5,
          projects: ['Tabintech (50% build cut)', 'GitHub Actions', 'GitLab CI'],
          description: 'Multi-stage Docker builds, Nexus registry, GitHub Actions/GitLab CI pipelines, caching strategies.'
        },
        {
          name: 'Nginx & Infrastructure',
          proficiency: 80,
          yearsExperience: 4,
          projects: ['Missha', 'Esafar', 'Production Deployments'],
          description: 'Reverse proxy, SSL termination, caching headers, gzip/brotli, load balancing basics.'
        }
      ]
    },
    {
      name: 'Developer Experience & Leadership',
      icon: 'bootstrapTrophy',
      color: '#10B981',
      skills: [
        {
          name: 'Technical Leadership',
          proficiency: 90,
          yearsExperience: 4,
          projects: ['Tabintech (6 engineers)', 'ADR Process', 'Code Review Standards'],
          description: 'Mentored 6+ engineers, established ADR process, reduced bugs 25% via review standards, hiring & onboarding.'
        },
        {
          name: 'Open Source & Tooling',
          proficiency: 92,
          yearsExperience: 3,
          projects: ['angular-lazy-load-directive', 'Angular Lifecycles Guide', 'vft-form-generator'],
          evidence: {label: 'Angular Lifecycles Guide', url: 'https://angular-lifecycles.vercel.app'},
          description: 'Published npm packages, interactive documentation, AI-assisted CRUD scaffolding. 44% FCP improvement via lazy-load directive.'
        },
        {
          name: 'Testing Strategies',
          proficiency: 85,
          yearsExperience: 5,
          projects: ['Jest', 'Cypress', 'Playwright', 'Tabintech'],
          description: 'Unit, integration, E2E testing. Test pyramids, visual regression, CI integration, coverage thresholds.'
        },
        {
          name: 'Design Systems & Accessibility',
          proficiency: 82,
          yearsExperience: 4,
          projects: ['vft-ui-util', 'Angular Material', 'Tailwind', 'WCAG 2.1 AA'],
          description: 'Component library architecture, theming, dark mode, ARIA patterns, keyboard navigation, screen reader testing.'
        }
      ]
    }
  ]);

  protected readonly allSkills = computed(() =>
    this.categories().flatMap(c => c.skills.map(s => ({...s, category: c.name, categoryColor: c.color})))
  );

  protected readonly topSkills = computed(() =>
    [...this.allSkills()].sort((a, b) => b.proficiency - a.proficiency).slice(0, 6)
  );

  selectCategory(name: string | null): void {
    this.selectedCategory.set(name);
  }

  getBarWidth(proficiency: number): string {
    return `${Math.min(100, proficiency)}%`;
  }

  getProficiencyColor(proficiency: number): string {
    if (proficiency >= 90) return '#10B981';
    if (proficiency >= 80) return '#3B82F6';
    if (proficiency >= 70) return '#F59E0B';
    return '#EF4444';
  }
}