# @baubyte/vite-plugin-ci4

> Vite Plugin for CodeIgniter 4 integration. Inspired by Laravel's Vite Plugin.


[![baubyte - vite-plugin-ci4](https://img.shields.io/badge/baubyte-vite_plugin_ci4-blue?style=for-the-badge&logo=github)](https://github.com/baubyte/vite-plugin-ci4 "Go to GitHub repo")
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/baubyte/vite-plugin-ci4?style=for-the-badge&logo=github)
[![GitHub Repo stars](https://img.shields.io/github/stars/baubyte/vite-plugin-ci4?style=for-the-badge&logo=github)](https://github.com/baubyte/vite-plugin-ci4)
[![GitHub forks](https://img.shields.io/github/forks/baubyte/vite-plugin-ci4?style=for-the-badge&logo=github&color=pink)](https://github.com/baubyte/vite-plugin-ci4)
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/baubyte/vite-plugin-ci4/tests.yml?style=for-the-badge&logo=github%20actions)](https://github.com/baubyte/vite-plugin-ci4/actions/workflows/tests.yml)
[![GitHub Release](https://img.shields.io/github/v/release/baubyte/vite-plugin-ci4?sort=date&display_name=release&style=for-the-badge)](https://www.npmjs.com/package/@baubyte/vite-plugin-ci4)
[![NPM Downloads](https://img.shields.io/npm/dy/%40fabithub%2Fvite-plugin-ci4?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/@baubyte/vite-plugin-ci4)
![GitHub License](https://img.shields.io/github/license/fab-it-hub/vite-plugin-ci4?style=for-the-badge&logo=github)


## Introduction

This Vite plugin allows seamless integration of [Vite JS](https://vitejs.dev/) with [CodeIgniter 4](https://codeigniter.com/), providing enhanced development and build processes for your web applications.

## Features

- CodeIgniter 4 support for Vite.
- Streamlined development workflow with Hot Module Replacement (HMR).
- Efficient production builds with automatic asset versioning.
- SSR (Server-Side Rendering) support.
- Full page reload on file changes.
- Inertia.js page component resolver for dynamic page loading.
- Compatible with Vite 7.x and CodeIgniter 4.
- Built with Node.js for maximum compatibility.

## Installation

### From GitHub Release Branch

Install from the `release` branch which contains only the compiled files:

```bash
# NPM
npm install --save-dev baubyte/vite-plugin-ci4#release

# Yarn
yarn add --dev baubyte/vite-plugin-ci4#release

# PNPM
pnpm add -D baubyte/vite-plugin-ci4#release
```

### Install Specific Version

To install a specific version, use the version tag:

```bash
# Install specific version  
npm install --save-dev baubyte/vite-plugin-ci4#v1.3.0
```

> **How it works**: When a version tag is pushed (e.g., `v1.3.0`), GitHub Actions automatically:
> - Runs tests and builds the package
> - Updates the `release` branch with only the compiled `dist/` files, `package.json`, `README.md`, and `LICENSE`
> - Creates a GitHub release
>
> The `release` branch contains ONLY what users need, keeping downloads small and fast.
>
> **Note**: Do NOT install from the `main` branch as it does not include built files.

## Usage

In your Vite configuration file (usually `vite.config.js` or `vite.config.ts`), add the plugin:

```javascript
// vite.config.js
import Ci4Plugin from "@baubyte/vite-plugin-ci4";

export default {
  plugins: [Ci4Plugin("resources/index.js")]
};
```

## Configuration

### Vite Config

You can customize the plugin by passing options during initialization:

```javascript
// vite.config.js
import Ci4Plugin from "@baubyte/vite-plugin-ci4";

export default {
  plugins: [
    Ci4Plugin({
      input: ["resources/index.js", "resources/app.css"],
      refresh: true
      /* other configuration here */
    })
  ]
};
```

### Git Ignore

The `hot` file is created and deleted when the vite dev server is run, making it safe to ignore it. You can change the `hot` file path by updating the config `hotFile` (by default it's `public/hot`) and add the path in the `.gitignore`.

```dockerfile
# @baubyte/vite-plugin-ci4
public/hot
```

## Options

| Configuration        | Type                                                          | Default                    | Description                                                                                                                                       |
| -------------------- | ------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input`              | string / string[]                                             |                            | The path or paths of the entry points to compile.                                                                                                 |
| `publicDirectory`    | string                                                        | "public"                   | Project's public directory.                                                                                                                       |
| `buildDirectory`     | string                                                        | "build"                    | The public subdirectory where compiled assets should be written.                                                                                  |
| `hotFile`            | string                                                        | \`${publicDirectory}/hot\` | The path to the "hot" file.                                                                                                                       |
| `ssr`                | string / string[]                                             |                            | The path of the SSR entry point.                                                                                                                  |
| `ssrOutputDirectory` | string                                                        | "writable/ssr"             | The directory where the SSR bundle should be written.                                                                                             |
| `refresh`            | boolean / string / string[] / RefreshConfig / RefreshConfig[] | false                      | Configuration for performing full page refresh on blade (or other) file changes. [see more](https://github.com/ElMassimo/vite-plugin-full-reload) |
| `transformOnServe`   | (code: string, url: string)=>string                           |                            | Transform the code while serving.                                                                                                                 |

## Inertia.js Page Component Resolver

This plugin includes a resolver function for Inertia.js page components, inspired by Laravel's implementation. This allows you to dynamically resolve page components based on paths.

### Usage

```typescript
// Import the resolver
import { resolvePageComponent } from '@baubyte/vite-plugin-ci4/resolvers';

// Use with Vite's glob import
const pages = import.meta.glob('./Pages/**/*.tsx');

// Resolve a page component
const component = await resolvePageComponent('Home/Index', pages);

// Or with multiple possible paths (fallback support)
const component = await resolvePageComponent(
  ['Auth/Login', 'Login'],
  pages
);
```

### TypeScript Example with Inertia.js

```typescript
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from '@baubyte/vite-plugin-ci4/resolvers';

createInertiaApp({
  resolve: (name) => resolvePageComponent(
    `./Pages/${name}.tsx`,
    import.meta.glob('./Pages/**/*.tsx')
  ),
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
```

### Vue Example

```typescript
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from '@baubyte/vite-plugin-ci4/resolvers';
import { createApp, h } from 'vue';

createInertiaApp({
  resolve: (name) => resolvePageComponent(
    `./Pages/${name}.vue`,
    import.meta.glob('./Pages/**/*.vue')
  ),
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el);
  },
});
```

## Example

### Basic Configuration

```typescript
// vite.config.ts
import type { UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import ci4 from "@baubyte/vite-plugin-ci4";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }): UserConfig => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(), 
      ci4(`${env.VITE_RESOURCES_DIR}/${env.VITE_ENTRY_FILE}`)
    ]
  };
});
```

### Advanced Configuration with SSR

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ci4 from "@baubyte/vite-plugin-ci4";

export default defineConfig({
  plugins: [
    react(),
    ci4({
      input: ["resources/js/app.tsx", "resources/css/app.css"],
      ssr: "resources/js/ssr.tsx",
      refresh: [
        "app/Views/**",
        "modules/**/Views/**",
        "app/Config/Routes.php",
      ],
    }),
  ],
});
```

## Compatibility

- **Vite**: 6.x, 7.x
- **CodeIgniter**: 4.1.5+
- **Node.js**: 18.x, 20.x+

## TODO

- [x] Basic Tests.
- [x] Inertia.js page component resolver
- [x] Updated to Vite 7.x
- [x] Migrated to Node.js with Vitest
- [ ] Better Documentation.
- [ ] Tests for all files & functions.
- [ ] Many More.

## Credits

This plugin is a maintained fork of [@fabithub/vite-plugin-ci4](https://github.com/fab-it-hub/vite-plugin-ci4) originally created by [Krishna Gujjjar](https://github.com/fab-it-hub).

### Changes in this fork:
- Migrated from Bun to Node.js for better compatibility
- Full compatibility with Vite 7.x
- Improved TypeScript definitions and build process
- Refactored Inertia.js helpers to resolvers
- Automated release workflow via GitHub Actions
- Enhanced documentation and examples

Original inspiration from [Laravel's vite-plugin](https://github.com/laravel/vite-plugin) by [Laravel](https://laravel.com/).

## License

Released under [MIT](/LICENSE.md) by [@baubyte](https://github.com/baubyte).

Original work by [@fab-it-hub](https://github.com/fab-it-hub).

---

**Built with Node.js** - This project uses Node.js as the primary runtime for maximum compatibility and maintainability.
