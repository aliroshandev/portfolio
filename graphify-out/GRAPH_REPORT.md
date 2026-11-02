# Graph Report - portfolio  (2026-08-29)

## Corpus Check
- 46 files · ~27,976 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 340 nodes · 479 edges · 16 communities (13 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `86e9ba2c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_app.component.ts|app.component.ts]]
- [[_COMMUNITY_angular.json|angular.json]]
- [[_COMMUNITY_booking-config.ts|booking-config.ts]]
- [[_COMMUNITY_BookingService|BookingService]]
- [[_COMMUNITY_dependencies|dependencies]]
- [[_COMMUNITY_const.ts|const.ts]]
- [[_COMMUNITY_build|build]]
- [[_COMMUNITY_DayAvailability|DayAvailability]]
- [[_COMMUNITY_test|test]]
- [[_COMMUNITY_cli|cli]]
- [[_COMMUNITY_GoogleCalendarService|GoogleCalendarService]]
- [[_COMMUNITY_package.json|package.json]]
- [[_COMMUNITY_legal-notice.component.ts|legal-notice.component.ts]]
- [[_COMMUNITY_set-env.mjs|set-env.mjs]]
- [[_COMMUNITY_server.ts|server.ts]]
- [[_COMMUNITY_ngsw-config.json|ngsw-config.json]]

## God Nodes (most connected - your core abstractions)
1. `BookingService` - 29 edges
2. `BookComponent` - 22 edges
3. `GoogleCalendarService` - 16 edges
4. `options` - 13 edges
5. `SeoService` - 13 edges
6. `LayoutService` - 10 edges
7. `schematics` - 9 edges
8. `TimeSlot` - 9 edges
9. `ExperienceContent` - 9 edges
10. `scripts` - 8 edges

## Surprising Connections (you probably didn't know these)
- `ExperienceContentInterface` --references--> `ExperienceContent`  [EXTRACTED]
  src/app/constants/types.d.ts → src/app/models/experience-content.ts
- `BookingService` --references--> `BookingConfig`  [EXTRACTED]
  src/app/services/booking.service.ts → src/app/models/booking.ts

## Import Cycles
- None detected.

## Communities (16 total, 3 thin omitted)

### Community 0 - "app.component.ts"
Cohesion: 0.10
Nodes (10): AppComponent, appConfig, config, serverConfig, USER_AGENT, routes, serverRoutes, HeaderComponent (+2 more)

### Community 1 - "angular.json"
Cohesion: 0.07
Nodes (28): newProjectRoot, prefix, projectType, root, schematics, sourceRoot, projects, portfolio (+20 more)

### Community 2 - "booking-config.ts"
Cohesion: 0.07
Nodes (28): cli, analytics, devDependencies, @angular/build, @angular/cli, @angular/compiler-cli, jasmine-core, karma (+20 more)

### Community 3 - "BookingService"
Cohesion: 0.15
Nodes (16): bookingConfig, EnvironmentInterface, GoogleCredentials, BookingConfig, BookingDetails, BusyBlock, DurationOption, StoredBooking (+8 more)

### Community 5 - "const.ts"
Cohesion: 0.08
Nodes (25): dependencies, @angular/animations, @angular/cdk, @angular/common, @angular/compiler, @angular/core, @angular/forms, @angular/platform-browser (+17 more)

### Community 6 - "build"
Cohesion: 0.09
Nodes (13): Skill, SkillCategory, SkillGraphComponent, education, experiences, openSourceProjects, technicalSkills, ExperienceContentInterface (+5 more)

### Community 7 - "DayAvailability"
Cohesion: 0.10
Nodes (22): build, extract-i18n, serve, builder, configurations, defaultConfiguration, development, production (+14 more)

### Community 9 - "cli"
Cohesion: 0.15
Nodes (17): test, options, assets, browser, index, inlineStyleLanguage, outputMode, outputPath (+9 more)

### Community 11 - "package.json"
Cohesion: 0.08
Nodes (22): Booking / Appointment Feature, Configuration, Google credentials (environment injection), How it works, Real Google Calendar data, Route & SEO, Google Calendar Setup (Live Busy Times), "Invitation from an unknown sender" emails (+14 more)

### Community 12 - "legal-notice.component.ts"
Cohesion: 0.18
Nodes (7): devOut, envPath, envVars, google, hasLocalEnv, prodOut, root

### Community 13 - "set-env.mjs"
Cohesion: 0.33
Nodes (5): angularApp, app, browserDistFolder, reqHandler, serverDistFolder

### Community 14 - "server.ts"
Cohesion: 0.50
Nodes (3): assetGroups, index, $schema

### Community 15 - "ngsw-config.json"
Cohesion: 0.12
Nodes (7): LegalNoticeComponent, Project, ProjectDetailComponent, PROJECTS, Project, ProjectsComponent, SeoService

## Knowledge Gaps
- **133 isolated node(s):** `$schema`, `version`, `newProjectRoot`, `projectType`, `style` (+128 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SeoService` connect `ngsw-config.json` to `app.component.ts`, `BookingService`, `build`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `cli` connect `booking-config.ts` to `angular.json`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **What connects `$schema`, `version`, `newProjectRoot` to the rest of the system?**
  _133 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `app.component.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1032258064516129 - nodes in this community are weakly interconnected._
- **Should `angular.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `booking-config.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.12923076923076923 - nodes in this community are weakly interconnected._