# PRD: TypeScript Migration - Keira MVC Framework

## Introduction

Transform Keira from a JavaScript browser-side MVC framework into a fully-typed TypeScript library. This migration includes removing webpack/grunt build dependencies, implementing a proper TypeScript compilation pipeline, adding comprehensive tests with Vitest, and creating developer documentation.

The project consists of approximately 1,360 lines of JavaScript across 20+ files, including core MVC components (Controller, View, Form), UI components (Modal, Dropdown, Loading), input handlers (Text, Select, Radio, Textarea, Hidden, Date), and a validation system.

## Goals

- Convert all JavaScript source files to TypeScript with strict type checking
- Remove webpack and grunt dependencies entirely
- Replace build system with `tsc` (TypeScript compiler) for direct ESM output
- Implement comprehensive test suite using Vitest (no `any` types allowed)
- Structure as a proper npm library with ESM exports
- Create documentation in `/docs` folder with usage examples
- Maintain backward compatibility with existing API surface
- Achieve 100% type coverage with zero `any` types

## User Stories

### US-001: TypeScript Project Configuration
**Description:** As a developer, I need proper TypeScript configuration so the project compiles with strict type checking.

**Acceptance Criteria:**
- [ ] `tsconfig.json` created with `strict: true`, `noImplicitAny: true`, `strictNullChecks: true`
- [ ] Module resolution set to `NodeNext` for ESM compatibility
- [ ] Output directory configured as `dist/`
- [ ] Declaration files (`.d.ts`) generation enabled
- [ ] Source maps enabled for debugging
- [ ] `package.json` updated with `types` field pointing to declaration files
- [ ] Typecheck passes with zero errors

### US-002: Remove Webpack and Grunt Dependencies
**Description:** As a maintainer, I need webpack and grunt removed so the build process is simpler and faster.

**Acceptance Criteria:**
- [ ] `webpack.config.js` deleted
- [ ] `Gruntfile.js` deleted
- [ ] `webpack`, `grunt`, `grunt-webpack` removed from `package.json` devDependencies
- [ ] `@babel/core`, `@babel/preset-env` removed from devDependencies
- [ ] Build script in `package.json` changed from `grunt` to `tsc`
- [ ] `npm run build` executes successfully with `tsc`

### US-003: Convert Core MVC Classes to TypeScript
**Description:** As a developer, I need the core Controller, View, and Form classes typed so they provide proper IntelliSense.

**Acceptance Criteria:**
- [ ] `src/controller.ts` - Class with typed `error(e: unknown): void` method
- [ ] `src/view.ts` - Class with typed constructor `(C: Controller)`, `container: Element`, typed methods `make(): Promise<void>`, `render(): Promise<Element>`, `remove(): void`, `toString(): string`
- [ ] `src/form.ts` - Class with typed `elements: InputBase[]`, `validators: Validator[]`, typed methods `add(element: InputBase): void`, `get_values(): Record<string, unknown>`, `is_valid(extra_context?: unknown): Promise<boolean>`
- [ ] Global `ce` function properly typed with overloads for tag name, className, and attributes
- [ ] Zero `any` types in core classes
- [ ] Typecheck passes

### US-004: Convert Input Components to TypeScript
**Description:** As a developer, I need all input components typed so they enforce correct usage.

**Acceptance Criteria:**
- [ ] `src/input/base.ts` - Abstract base class with typed properties `name: string`, `value: unknown`, `validators: Validator[]`, `editable: boolean`
- [ ] `src/input/text.ts` - Extends Base, typed `make_input(name: string): HTMLInputElement`
- [ ] `src/input/select.ts` - Extends Base, typed `list: Array<[string, string]>`, `onchange(object: InputSelect, value: string): void`
- [ ] `src/input/radio.ts` - Extends Base, typed `list: Array<[string, string, string?]>`
- [ ] `src/input/radio_button.ts` - Extends Base, proper typing
- [ ] `src/input/textarea.ts` - Extends Base, typed `rows(length: number): void`, `maxlength(length: number): void`
- [ ] `src/input/hidden.ts` - Extends Base, proper typing
- [ ] `src/input/date.ts` - Extends Base, typed `format: string | null`, `get_format(): string`
- [ ] `src/input.ts` - Re-exports all input types with proper type declarations
- [ ] Zero `any` types in input components
- [ ] Typecheck passes

### US-005: Convert Modal Components to TypeScript
**Description:** As a developer, I need Modal and related components typed for proper DOM manipulation.

**Acceptance Criteria:**
- [ ] `src/modal.ts` - Class extending View with typed properties `titleText: string | null`, `header: Element | null`, `body: Element | null`, `footer: Element | null`, `backdropClose: boolean`
- [ ] Typed methods `set_title(title: string): void`, `show(): void`, `hide(): void`, `remove(): void`
- [ ] Static methods `set_document(doc: Document): void`, `get_document(): Document` properly typed
- [ ] `src/modal/index.ts` - Exports typed `Alert` class
- [ ] `src/modal/alert.ts` - Class extending Modal with typed `message: string`, `set_message(msg: string): void`
- [ ] Zero `any` types in modal components
- [ ] Typecheck passes

### US-006: Convert Dropdown Component to TypeScript
**Description:** As a developer, I need Dropdown component typed for proper button and menu handling.

**Acceptance Criteria:**
- [ ] `src/dropdown.ts` - Class extending View with typed properties `_button: Element | null`, `_itens: Element[]`, `menu: Element | null`, `menu_show: boolean`
- [ ] Typed methods `set_button(button: Element): void`, `set_label(label: string): void`, `toggle(): void`, `show(): void`, `hide(): void`
- [ ] `make_button(text?: string, cls?: string): HTMLButtonElement` properly typed
- [ ] `make_item(label?: string): HTMLButtonElement` properly typed
- [ ] Zero `any` types
- [ ] Typecheck passes

### US-007: Convert Event System to TypeScript
**Description:** As a developer, I need the Event emitter typed for type-safe event handling.

**Acceptance Criteria:**
- [ ] `src/event.ts` - Singleton class with typed `listeners: Record<string, Array<(data: unknown) => Promise<unknown>>>`
- [ ] Typed methods `emit(name: string, data?: unknown): Promise<unknown[]>`, `on(name: string, func: (data: unknown) => Promise<unknown>): void`
- [ ] `remove(name: string, func: Function): void`, `remove_all(name: string): void` properly typed
- [ ] Zero `any` types
- [ ] Typecheck passes

### US-008: Convert Back Navigation System to TypeScript
**Description:** As a developer, I need the back navigation system typed for proper callback handling.

**Acceptance Criteria:**
- [ ] `src/back.ts` - Singleton class with typed `list: Record<number, () => unknown>`, `default: (() => unknown) | null`
- [ ] Constants typed as `readonly` properties: `MENU: 8`, `OVERRIDE: 6`, `MODAL: 4`, `DIALOG: 3`
- [ ] Typed methods `add(priority: number, cb: () => unknown): void`, `remove(priority: number): void`, `back(): unknown`
- [ ] Zero `any` types
- [ ] Typecheck passes

### US-009: Convert Validator System to TypeScript
**Description:** As a developer, I need validators typed for proper validation contracts.

**Acceptance Criteria:**
- [ ] `src/validator/base.ts` - Abstract class with typed `error_message: string`, abstract method `is_valid(value: unknown, extra?: unknown): Promise<boolean>`
- [ ] `src/validator/not_null.ts` - Extends Base, implements `is_valid` returning `Promise<boolean>`
- [ ] `src/validator/index.ts` - Exports typed validator classes
- [ ] Form validator integration properly typed with generics if applicable
- [ ] Zero `any` types
- [ ] Typecheck passes

### US-010: Convert Utility Modules to TypeScript
**Description:** As a developer, I need utility functions typed for proper return types.

**Acceptance Criteria:**
- [ ] `src/tools.ts` - Functions with explicit return types: `makeId(length: number): string`, `ellipsisText(el: HTMLElement): void`, `uuid(): string`
- [ ] `src/code.ts` - Object with typed string constants: `TIMEOUT: string`, `INVALID_FORM: string`, `DISCONNECTED: string`
- [ ] `index.ts` - Main export file with proper type re-exports
- [ ] Zero `any` types
- [ ] Typecheck passes

### US-011: Convert Loading Component to TypeScript
**Description:** As a developer, I need the Loading component typed for proper DOM manipulation.

**Acceptance Criteria:**
- [ ] `src/component/loading.ts` - Class extending View with typed `container: Element`
- [ ] Fix bug: `this.container.container(span)` should be `this.container.append(span)`
- [ ] `make(): Promise<void>` properly typed
- [ ] Zero `any` types
- [ ] Typecheck passes

### US-012: Setup Vitest Testing Framework
**Description:** As a developer, I need Vitest configured so I can write and run tests.

**Acceptance Criteria:**
- [ ] `vitest.config.ts` created with jsdom environment for browser APIs
- [ ] Vitest, @vitest/coverage-v8, jsdom installed as devDependencies
- [ ] `package.json` test script updated to `vitest`
- [ ] `package.json` includes `test:coverage` script running `vitest --coverage`
- [ ] TypeScript configured to allow test files (`.test.ts` or `.spec.ts`)
- [ ] Test command runs successfully

### US-013: Write Tests for Core Classes
**Description:** As a developer, I need tests for Controller, View, and Form so changes don't break core functionality.

**Acceptance Criteria:**
- [ ] `tests/controller.test.ts` - Tests for error handling
- [ ] `tests/view.test.ts` - Tests for `ce` function, View rendering, container management
- [ ] `tests/form.test.ts` - Tests for element addition, validation, value get/set
- [ ] All tests use strict typing (no `any`)
- [ ] Tests cover edge cases and error conditions
- [ ] All tests pass with `npm test`

### US-014: Write Tests for Input Components
**Description:** As a developer, I need tests for all input types so validation and value handling works correctly.

**Acceptance Criteria:**
- [ ] `tests/input/base.test.ts` - Tests for base input functionality, validation, error display
- [ ] `tests/input/text.test.ts` - Tests for text input creation and value handling
- [ ] `tests/input/select.test.ts` - Tests for option addition, selection, onchange callback
- [ ] `tests/input/radio.test.ts` - Tests for radio button group behavior
- [ ] `tests/input/textarea.test.ts` - Tests for rows/maxlength configuration
- [ ] `tests/input/hidden.test.ts` - Tests for hidden input value handling
- [ ] `tests/input/date.test.ts` - Tests for date format detection
- [ ] All tests use strict typing
- [ ] All tests pass

### US-015: Write Tests for Modal and Dropdown
**Description:** As a developer, I need tests for UI components so modal/dialog behavior is reliable.

**Acceptance Criteria:**
- [ ] `tests/modal.test.ts` - Tests for modal open/close, backdrop behavior, title/body/footer rendering
- [ ] `tests/modal/alert.test.ts` - Tests for alert message display and OK button
- [ ] `tests/dropdown.test.ts` - Tests for dropdown toggle, item addition, show/hide behavior
- [ ] Tests mock DOM environment properly
- [ ] All tests use strict typing
- [ ] All tests pass

### US-016: Write Tests for Event and Back Systems
**Description:** As a developer, I need tests for event emitter and back navigation so they work reliably.

**Acceptance Criteria:**
- [ ] `tests/event.test.ts` - Tests for emit/on/remove, multiple listeners, promise handling
- [ ] `tests/back.test.ts` - Tests for priority-based callback execution, override, default handling
- [ ] All tests use strict typing
- [ ] All tests pass

### US-017: Write Tests for Validators
**Description:** As a developer, I need tests for validators so form validation is reliable.

**Acceptance Criteria:**
- [ ] `tests/validator/base.test.ts` - Tests for base validator interface
- [ ] `tests/validator/not_null.test.ts` - Tests for null/empty validation
- [ ] Tests cover edge cases (empty string, null, undefined, whitespace)
- [ ] All tests use strict typing
- [ ] All tests pass

### US-018: Write Tests for Utilities
**Description:** As a developer, I need tests for utility functions so they produce consistent results.

**Acceptance Criteria:**
- [ ] `tests/tools.test.ts` - Tests for `makeId`, `uuid`, `ellipsisText`
- [ ] `tests/code.test.ts` - Tests for code constants existence
- [ ] Tests verify output types and formats
- [ ] All tests use strict typing
- [ ] All tests pass

### US-019: Configure Library Package Exports
**Description:** As a library consumer, I need proper ESM exports so I can import Keira correctly.

**Acceptance Criteria:**
- [ ] `package.json` has `"type": "module"` for ESM
- [ ] `package.json` has `"main": "dist/index.js"` for ESM entry
- [ ] `package.json` has `"types": "dist/index.d.ts"` for TypeScript types
- [ ] `package.json` has `"exports"` field with proper subpath exports
- [ ] `package.json` has `"files"` field listing `dist/` for npm publish
- [ ] All exports resolve correctly with `npm pack --dry-run`

### US-020: Create Documentation Structure
**Description:** As a developer using Keira, I need documentation so I can understand how to use the library.

**Acceptance Criteria:**
- [ ] `/docs` directory created
- [ ] `/docs/README.md` - Main documentation index
- [ ] `/docs/installation.md` - Installation and setup instructions
- [ ] `/docs/quickstart.md` - Quick start guide with basic examples
- [ ] `/docs/api/` - API reference documentation files

### US-021: Document Core API
**Description:** As a developer, I need API documentation for Controller, View, and Form.

**Acceptance Criteria:**
- [ ] `/docs/api/controller.md` - Controller class documentation with examples
- [ ] `/docs/api/view.md` - View class and `ce` function documentation
- [ ] `/docs/api/form.md` - Form class, validation, value handling documentation
- [ ] Each doc includes import statements, usage examples, method signatures
- [ ] Examples are typed TypeScript code

### US-022: Document Input Components API
**Description:** As a developer, I need API documentation for all input types.

**Acceptance Criteria:**
- [ ] `/docs/api/inputs.md` - Documentation for all input types (Text, Select, Radio, RadioButton, Textarea, Hidden, Date)
- [ ] Each input type has usage example showing construction and configuration
- [ ] Common methods (set_value, get_value, set_label, validators) documented
- [ ] Examples are typed TypeScript code

### US-023: Document Modal and Dropdown API
**Description:** As a developer, I need API documentation for Modal and Dropdown components.

**Acceptance Criteria:**
- [ ] `/docs/api/modal.md` - Modal class, Alert usage, configuration options
- [ ] `/docs/api/dropdown.md` - Dropdown class, button creation, item management
- [ ] Examples show complete usage patterns
- [ ] Examples are typed TypeScript code

### US-024: Document Event and Back System API
**Description:** As a developer, I need API documentation for Event and Back systems.

**Acceptance Criteria:**
- [ ] `/docs/api/event.md` - Event emitter usage, subscribe/emit patterns
- [ ] `/docs/api/back.md` - Back navigation, priority system, override usage
- [ ] Examples show real-world usage scenarios
- [ ] Examples are typed TypeScript code

### US-025: Document Validator API
**Description:** As a developer, I need API documentation for validators.

**Acceptance Criteria:**
- [ ] `/docs/api/validators.md` - Validator system, creating custom validators, built-in validators
- [ ] Examples show validator composition and form integration
- [ ] Examples are typed TypeScript code

### US-026: Create Migration Guide
**Description:** As an existing Keira user, I need a migration guide so I can upgrade from JavaScript to TypeScript version.

**Acceptance Criteria:**
- [ ] `/docs/migration.md` - Migration guide from v1.0.0 (JS) to v2.0.0 (TS)
- [ ] Breaking changes clearly documented
- [ ] Import path changes documented
- [ ] Common migration patterns with before/after examples
- [ ] TypeScript-specific tips for new users

### US-027: Add README with Quick Start
**Description:** As a new user, I need a clear README so I can quickly understand what Keira is and how to start.

**Acceptance Criteria:**
- [ ] Root `README.md` created (or updated if exists)
- [ ] Project description and purpose
- [ ] Installation command
- [ ] Quick start code example (typed TypeScript)
- [ ] Link to full documentation in `/docs`
- [ ] Badges for npm version, tests, license

### US-028: Verify Zero `any` Types
**Description:** As a code quality reviewer, I need confirmation that no `any` types exist in the codebase.

**Acceptance Criteria:**
- [ ] `grep -r ": any" src/` returns zero results
- [ ] `grep -r "as any" src/` returns zero results
- [ ] `grep -r "<any>" src/` returns zero results
- [ ] `grep -r ": any" tests/` returns zero results
- [ ] ESLint rule `@typescript-eslint/no-explicit-any` configured and passing
- [ ] All unknown types properly typed as `unknown` with type guards where needed

### US-029: Final Build and Test Verification
**Description:** As a release manager, I need confirmation that build and all tests pass before release.

**Acceptance Criteria:**
- [ ] `npm run build` completes successfully
- [ ] `dist/` directory contains all compiled `.js` files
- [ ] `dist/` directory contains all `.d.ts` declaration files
- [ ] `npm test` runs all tests with zero failures
- [ ] `npm run test:coverage` shows acceptable coverage (>80%)
- [ ] `tsc --noEmit` passes with zero errors
- [ ] No console errors in built output

## Functional Requirements

- FR-1: All source files must be converted from `.js` to `.ts`
- FR-2: TypeScript strict mode must be enabled with zero `any` types
- FR-3: Build system must use `tsc` only (no webpack, no grunt, no babel)
- FR-4: Output must be pure ESM modules in `dist/` directory
- FR-5: Declaration files (`.d.ts`) must be generated for all modules
- FR-6: Vitest must be used for all tests with jsdom environment
- FR-7: All existing functionality must be preserved (backward compatible API)
- FR-8: Documentation must be in Markdown format in `/docs` directory
- FR-9: Bug in `src/component/loading.ts` line 11 must be fixed (`container` → `append`)
- FR-10: Bug in `src/modal.ts` line 73 (`style.fontSiza` → `style.fontSize`) must be fixed

## Non-Goals (Out of Scope)

- No new features or components beyond existing functionality
- No migration to other frameworks (React, Vue, etc.)
- No server-side rendering support
- No IE11 or legacy browser support (target modern browsers with ESM)
- No bundling for browser (library is ESM, consumers bundle as needed)
- No automatic migration tools for consumers
- No API documentation generator (Typedoc) - manual docs only

## Design Considerations

- Preserve existing class hierarchy and inheritance patterns
- Maintain existing method names and signatures where possible
- Use TypeScript's type system to improve API discoverability
- Keep file structure similar to existing layout for easier migration
- DOM types from lib.dom.d.ts should be used for browser APIs

## Technical Considerations

- TypeScript 5.x recommended for latest features
- Target ES2020+ for modern browser support
- Use `unknown` instead of `any` for truly dynamic values
- Leverage TypeScript's utility types (Partial, Pick, Omit, Record) where beneficial
- Use generics for reusable components if type safety improves
- jsdom required for testing browser APIs in Node environment

## Success Metrics

- Zero TypeScript compilation errors
- Zero `any` types in source code
- All existing tests pass (once written)
- Build time under 5 seconds
- Documentation covers all public APIs
- No breaking changes to public API surface (semantic versioning: major bump to 2.0.0 for TS migration)

## Open Questions

1. Should we add ESLint with TypeScript rules for ongoing code quality?
2. Should we add Prettier for consistent formatting?
3. Should we set up CI/CD pipeline configuration (GitHub Actions)?
4. Should we add a CHANGELOG.md for tracking changes?
5. What minimum TypeScript version should be specified in peerDependencies?
