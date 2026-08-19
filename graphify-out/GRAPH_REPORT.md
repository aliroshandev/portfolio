# Graph Report - /Users/aliroshan/Desktop/projects/personal/portfolio  (2026-08-19)

## Corpus Check
- Corpus is ~22,162 words - fits in a single context window. You may not need a graph.

## Summary
- 295 nodes · 429 edges · 15 communities (11 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_app.component.ts|app.component.ts]]
- [[_COMMUNITY_angular.json|angular.json]]
- [[_COMMUNITY_cli|cli]]
- [[_COMMUNITY_booking-config.ts|booking-config.ts]]
- [[_COMMUNITY_BookingService|BookingService]]
- [[_COMMUNITY_dependencies|dependencies]]
- [[_COMMUNITY_const.ts|const.ts]]
- [[_COMMUNITY_build|build]]
- [[_COMMUNITY_BookComponent|BookComponent]]
- [[_COMMUNITY_test|test]]
- [[_COMMUNITY_GoogleCalendarService|GoogleCalendarService]]
- [[_COMMUNITY_legal-notice.component.ts|legal-notice.component.ts]]
- [[_COMMUNITY_set-env.mjs|set-env.mjs]]
- [[_COMMUNITY_server.ts|server.ts]]
- [[_COMMUNITY_ngsw-config.json|ngsw-config.json]]

## God Nodes (most connected - your core abstractions)
1. `BookingService` - 28 edges
2. `BookComponent` - 22 edges
3. `GoogleCalendarService` - 16 edges
4. `options` - 13 edges
5. `SeoService` - 11 edges
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

## Communities (15 total, 4 thin omitted)

### Community 0 - "app.component.ts"
Cohesion: 0.10
Nodes (10): AppComponent, appConfig, config, serverConfig, USER_AGENT, routes, serverRoutes, HeaderComponent (+2 more)

### Community 1 - "angular.json"
Cohesion: 0.07
Nodes (28): newProjectRoot, prefix, projectType, root, schematics, sourceRoot, projects, portfolio (+20 more)

### Community 2 - "cli"
Cohesion: 0.07
Nodes (28): cli, analytics, devDependencies, @angular/build, @angular/cli, @angular/compiler-cli, jasmine-core, karma (+20 more)

### Community 3 - "booking-config.ts"
Cohesion: 0.15
Nodes (17): bookingConfig, EnvironmentInterface, GoogleCredentials, BookingConfig, BookingDetails, BusyBlock, DayAvailability, DurationOption (+9 more)

### Community 5 - "dependencies"
Cohesion: 0.08
Nodes (24): dependencies, @angular/animations, @angular/cdk, @angular/common, @angular/compiler, @angular/core, @angular/forms, @angular/platform-browser (+16 more)

### Community 6 - "const.ts"
Cohesion: 0.13
Nodes (8): experiences, technicalSkills, ExperienceContentInterface, ExperienceInterface, SkillsInterface, ExperienceContent, HomeComponent, ThemeService

### Community 7 - "build"
Cohesion: 0.10
Nodes (22): build, extract-i18n, serve, builder, configurations, defaultConfiguration, development, production (+14 more)

### Community 9 - "test"
Cohesion: 0.15
Nodes (17): test, options, assets, browser, index, inlineStyleLanguage, outputMode, outputPath (+9 more)

### Community 12 - "set-env.mjs"
Cohesion: 0.18
Nodes (7): devOut, envPath, envVars, google, hasLocalEnv, prodOut, root

### Community 13 - "server.ts"
Cohesion: 0.33
Nodes (5): angularApp, app, browserDistFolder, reqHandler, serverDistFolder

### Community 14 - "ngsw-config.json"
Cohesion: 0.50
Nodes (3): assetGroups, index, $schema

## Knowledge Gaps
- **109 isolated node(s):** `$schema`, `version`, `newProjectRoot`, `projectType`, `style` (+104 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cli` connect `cli` to `angular.json`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Why does `portfolio` connect `angular.json` to `build`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **What connects `$schema`, `version`, `newProjectRoot` to the rest of the system?**
  _109 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `app.component.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1032258064516129 - nodes in this community are weakly interconnected._
- **Should `angular.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `cli` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `BookingService` be split into smaller, more focused modules?**
  _Cohesion score 0.13666666666666666 - nodes in this community are weakly interconnected._