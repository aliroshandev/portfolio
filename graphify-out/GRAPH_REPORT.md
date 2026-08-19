# Graph Report - /Users/aliroshan/Desktop/projects/personal/portfolio  (2026-08-19)

## Corpus Check
- 58 files · ~21,775 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 296 nodes · 430 edges · 16 communities (12 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_angular.json|angular.json]]
- [[_COMMUNITY_build|build]]
- [[_COMMUNITY_test|test]]
- [[_COMMUNITY_cli|cli]]
- [[_COMMUNITY_ngsw-config.json|ngsw-config.json]]
- [[_COMMUNITY_package.json|package.json]]
- [[_COMMUNITY_dependencies|dependencies]]
- [[_COMMUNITY_set-env.mjs|set-env.mjs]]
- [[_COMMUNITY_app.component.ts|app.component.ts]]
- [[_COMMUNITY_booking-config.ts|booking-config.ts]]
- [[_COMMUNITY_const.ts|const.ts]]
- [[_COMMUNITY_DayAvailability|DayAvailability]]
- [[_COMMUNITY_legal-notice.component.ts|legal-notice.component.ts]]
- [[_COMMUNITY_BookingService|BookingService]]
- [[_COMMUNITY_GoogleCalendarService|GoogleCalendarService]]
- [[_COMMUNITY_server.ts|server.ts]]

## God Nodes (most connected - your core abstractions)
1. `BookingService` - 28 edges
2. `BookComponent` - 22 edges
3. `GoogleCalendarService` - 16 edges
4. `options` - 13 edges
5. `SeoService` - 11 edges
6. `LayoutService` - 10 edges
7. `schematics` - 9 edges
8. `scripts` - 9 edges
9. `TimeSlot` - 9 edges
10. `ExperienceContent` - 9 edges

## Surprising Connections (you probably didn't know these)
- `cli` ----> `@angular/cli`  [EXTRACTED]
  angular.json → package.json
- `ExperienceContentInterface` ----> `ExperienceContent`  [EXTRACTED]
  src/app/constants/types.d.ts → src/app/models/experience-content.ts
- `BookingConfig` ----> `BookingService`  [EXTRACTED]
  src/app/models/booking.ts → src/app/services/booking.service.ts

## Import Cycles
- None detected.

## Communities (16 total, 4 thin omitted)

### Community 1 - "angular.json"
Cohesion: 0.07
Nodes (28): $schema, version, newProjectRoot, projects, portfolio, projectType, schematics, @schematics/angular:component (+20 more)

### Community 6 - "build"
Cohesion: 0.10
Nodes (22): architect, build, builder, configurations, production, budgets, fileReplacements, outputHashing (+14 more)

### Community 8 - "test"
Cohesion: 0.15
Nodes (17): options, outputPath, index, browser, polyfills, tsConfig, inlineStyleLanguage, assets (+9 more)

### Community 9 - "cli"
Cohesion: 0.12
Nodes (17): cli, analytics, devDependencies, @angular/build, @angular/cli, @angular/compiler-cli, @tailwindcss/typography, @types/express (+9 more)

### Community 15 - "ngsw-config.json"
Cohesion: 0.50
Nodes (3): $schema, index, assetGroups

### Community 11 - "package.json"
Cohesion: 0.15
Nodes (12): name, version, scripts, setenv, prestart, start, prebuild, build (+4 more)

### Community 4 - "dependencies"
Cohesion: 0.08
Nodes (24): dependencies, @angular/animations, @angular/cdk, @angular/common, @angular/compiler, @angular/core, @angular/forms, @angular/platform-browser (+16 more)

### Community 13 - "set-env.mjs"
Cohesion: 0.18
Nodes (7): root, envPath, devOut, prodOut, envVars, google, hasLocalEnv

### Community 0 - "app.component.ts"
Cohesion: 0.10
Nodes (10): AppComponent, USER_AGENT, serverConfig, config, appConfig, serverRoutes, routes, HeaderComponent (+2 more)

### Community 2 - "booking-config.ts"
Cohesion: 0.15
Nodes (16): bookingConfig, GoogleCredentials, EnvironmentInterface, BusyBlock, DurationOption, BookingConfig, BookingDetails, TimeSlot (+8 more)

### Community 5 - "const.ts"
Cohesion: 0.13
Nodes (8): experiences, technicalSkills, ExperienceInterface, ExperienceContentInterface, SkillsInterface, ExperienceContent, HomeComponent, ThemeService

### Community 14 - "server.ts"
Cohesion: 0.33
Nodes (5): serverDistFolder, browserDistFolder, app, angularApp, reqHandler

## Knowledge Gaps
- **110 isolated node(s):** `$schema`, `version`, `newProjectRoot`, `projectType`, `style` (+105 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `cli` to `package.json`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Why does `cli` connect `cli` to `angular.json`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **What connects `$schema`, `version`, `newProjectRoot` to the rest of the system?**
  _110 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `angular.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `build` be split into smaller, more focused modules?**
  _Cohesion score 0.09956709956709957 - nodes in this community are weakly interconnected._
- **Should `cli` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._