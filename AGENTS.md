# Agent Development Guidelines

Essential information for AI agents working in `@fabithub/vite-plugin-ci4` - a TypeScript Vite plugin for CodeIgniter 4 integration.

**Runtime**: Node.js v18+/v20+ | **Module**: ES Module | **Language**: TypeScript (strict) | **Tools**: Biome + ESLint + Vitest

## Build, Test & Lint Commands

```bash
# Core commands
npm install                    # Install dependencies
npm run lint                   # ESLint validation
npm test                       # Run all tests with Vitest
npm run build                  # Full build pipeline
npm run typecheck              # Type check

# Format code
npm run format                 # Format with Biome
npm run format:check           # Check and fix with Biome

# Running single tests
npm test -- tests/utils/string.test.ts                    # Specific file
npm test -- --testNamePattern "handles missing"           # By pattern
```

**CI/CD Order**: lint → test → build

## Code Style

### Formatting (Biome)
- **TypeScript**: Tabs (width 4), 100 chars, single quotes, ASI semicolons, no trailing commas, always arrow parens
- **JSON**: 2 spaces

### Import Order
1. Type imports from external packages
2. Regular imports from external packages  
3. Internal imports using path aliases (alphabetically)
4. Type imports from local files

```typescript
import type { Plugin } from 'vite'
import { ci4 } from '@plugins/ci4'
import type { PluginConfig } from './types'
```

### Path Aliases (ALWAYS use)
```typescript
@config/*    → ./src/config/*
@handlers/*  → ./src/handlers/*
@plugins/*   → ./src/plugins/*
@resolvers/* → ./src/resolvers/*
@utils/*     → ./src/utils/*
```

### TypeScript Rules
- **Strict mode enabled**: No implicit any, no unused vars/params
- Use `import type` for types
- Prefer type aliases for unions/primitives, interfaces for objects
- Template literals for string types: `type DevServerUrl = \`${HTTP_PROTOCOLS}://${string}:${number}\``

### Naming Conventions
- **Files**: Private/internal prefix `_` (`_handleDevServer.ts`), public no prefix (`server.ts`), tests suffix `.test.ts`
- **Functions**: Public `camelCase`, private `_camelCase`
- **Types**: `PascalCase` 
- **Constants**: `camelCase` or `SCREAMING_SNAKE_CASE` for enums

```typescript
export const resolvePluginConfig = (config: PluginConfig) => {...}  // Public
export const _resolveAliases = (config: UserConfig) => {...}        // Private
export interface PluginConfig {...}                                  // Type
export enum Errors { MissingConfiguration, InvalidInput }            // Enum
```

## Project Structure

```
src/
├── config/       # Constants (constant.ts, http.ts)
├── handlers/     # Server & process handlers (_*.ts internal, server.ts public)
├── plugins/      # Vite plugins (ci4.ts, fullReload.ts)
├── resolvers/    # Config resolvers + page component resolver
│   ├── _*.ts     # Internal resolvers
│   ├── config.ts # Main config resolver
│   └── pageComponent.ts  # Inertia.js page resolver
├── types/        # All type definitions (index.ts)
├── utils/        # Utilities (errors.ts, io.ts, string.ts, uri.ts, version.ts)
└── index.ts      # Entry point

tests/            # Mirrors src/ structure
```

## Testing (Vitest)

```typescript
import { describe, expect, it } from 'vitest'

describe('feature name', () => {
	it('describes expected behavior', () => {
		expect(result).toBe('expected')
	})
})
```

**Custom matchers available**: `toBeTrue()`, `toBeFalse()`, `toBeString()`, `toBeFunction()`

**Best Practices**: One test file per source, descriptive names, test errors with `expect(() => fn()).toThrow()`, use setup file for custom matchers

## Error Handling

**ALWAYS use centralized errors**:
```typescript
import { errorMessage, Errors } from '@utils/errors'
throw new Error(errorMessage(Errors.MissingConfiguration))  // Good
// throw new Error('Missing configuration')  // Bad - never hardcode
```

**Error types**: `MissingConfiguration`, `MissingInput`, `InvalidInput`, `InvalidBaseUrl`, etc. (see `src/utils/errors.ts`)

## Common Patterns

**Functional approach**: Pure functions over classes
**Config resolution**: Break into discrete resolvers (`_resolveAliases`, `_resolveInputs`, etc.)
**Path operations**: Use `@utils/string` (`joinPaths`, `normalizePath`) and `@utils/uri` (`buildDevServerUrl`)
**I/O operations**: All file operations use Node.js `fs/promises` API

## Critical Rules

1. Never use `any` (Biome enforces `noExplicitAny`)
2. No unused variables (enforced by TS + Biome)
3. Prefix internal APIs with underscore
4. Use path aliases, never relative imports cross-directory
5. Centralize types in `src/types/index.ts`
6. Write tests for new features/fixes
7. No namespaces (use ES modules)
8. Prefer `as const` for constant literals
9. All I/O operations must use Node.js APIs (no Bun)

## Git Commit Scopes

`deps`, `src`, `docs`, `build`, `utils`, `config`, `handlers`, `resolvers`, `template`

## Key Dependencies

**Prod**: `vite` ^6.0.0 || ^7.0.0 (peer), `picocolors` ^1.1.1, `semver` ^7.7.3, `vite-plugin-full-reload` ^1.2.0
**Dev**: `@biomejs/biome` ^2.3.13, `typescript` ^5.9.3, `vitest` ^3.2.3, `esbuild` ^0.25.2

## Vite 7.x Compatibility

This plugin is compatible with Vite 7.x. Key changes from previous versions:
- Updated peer dependency to support both Vite 6.x and 7.x
- All imports use `vite` module directly
- Plugin API fully compatible with latest Vite changes

## Page Component Resolver

The plugin includes `resolvePageComponent` in `src/resolvers/pageComponent.ts` for dynamic page resolution:

```typescript
import { resolvePageComponent } from '@fabithub/vite-plugin-ci4/resolvers'

const component = await resolvePageComponent('Home/Index', import.meta.glob('./Pages/**/*.tsx'))
```

---

**Core values**: Type safety, functional patterns, clean organization, comprehensive testing, Node.js-first approach for Vite + CodeIgniter 4.
