# monorepo-test

## Project Goals

- Create a Web Components library that wraps third-party React components and use it in an Angular app.
- Explore and test the following 3 approaches: 
    - [Lit](https://lit.dev/)
    - [`react-to-web-component (R2WC)`](https://github.com/bitovi/react-to-web-component)
    - [Stencil.js](https://stenciljs.com/)

## Project Overview
The project is a monorepo ([Yarn workspace](https://yarnpkg.com/features/workspaces)), containing the following packages:


| Package | Description |
|---|---|
| [`angular-app`](packages/angular-app/README.md) | Test Angular application that consumes the Web Component libraries |
| [`lit-library`](packages/lit-library/README.md) | Library built using Lit + Vite |
| [`r2wc-library`](packages/r2wc-library/README.md) | Library built using R2WC + Vite |
| [`stencil-library`](packages/stencil-library/README.md) | Library built using Stencil.js |

Each implementation of the library exposes two Web Components:
| Web Component | React library | Description |
|---|---|---|
| `<diff-view>` | [@git-diff-view/react](https://github.com/MrWangJustToDo/git-diff-view) | A Diff View component, just like Github |
| `<hex-color-picker>` | [react-colorful](https://github.com/omgovich/react-colorful) | A simple color picker |

## Getting Started

### Prerequisites

- Node.js
- Yarn

### Install

From the repo root:

```bash
yarn install
```

### Build

Build all libraries:

```bash
yarn build:libraries
```

Or build a specific one:

```bash
yarn build:lit-library
yarn build:r2wc-library
yarn build:stencil-library
```
### Import
Comment or uncomment the import lines depending on which library you want to test (the default one is the Lit implementation):

![main](assets/main.png)

![diff-view.component](assets/diff-view.component.png)

![hex-color-picker](assets/hex-color-picker.component.png)

### Start

Run the Angular test app:

```bash
yarn start:angular-app
```

## Final Thoughts
**NOTE**: refer to the README of each package for the analysis performed on each library:
- [`lit-library`](packages/lit-library/README.md)
- [`r2wc-library`](packages/r2wc-library/README.md)
- [`stencil-library`](packages/stencil-library/README.md)

<br>

All three libraries successfully demonstrate how to wrap React components as Web Components and integrate them into an Angular app. Each approach has its own strengths and limitations:

- **Lit** offers a great balance between flexibility, control, and bundle optimization. Its lifecycle hooks provide explicit control over React mounting, and Vite enables shared chunking and advanced customization. This makes Lit a solid choice for building modular and performance-oriented Web Components.

- **R2WC** stands out for its simplicity: very little boilerplate is required, making it ideal for quick prototypes or simple components. However, the lack of lifecycle visibility and limited interoperability with frameworks like Angular (especially for event handlers) can be a drawback for complex scenarios.

- **Stencil** is the most “framework-like” of the three, and provides a rich TypeScript-first API similar to Angular. However, in my tests, its lazy-loading capabilities were ineffective in splitting the bundle, leading to a larger final size.

Despite their differences, all libraries successfully delivered working Web Components. **Personally, I find Lit to be the most balanced and scalable solution**, thanks to its clear structure, small runtime, and compatibility with modern bundlers like Vite.

## Comparison Table
| Feature / Criteria | **Lit** | **R2WC** | **Stencil** |
|---|---|---|---|
| **Complexity** | Medium | Low | Medium |
| **Boilerplate Required** | Yes (manual mount/render) | No (automatic) | Yes (manual mount/render) |
| **Lifecycle Control** | ✅ Full (via `firstUpdated`, etc.) | ❌ None | ✅ Full (via `componentDidLoad`, etc.) |
| **Shadow DOM Support** | ✅ Toggle via `createRenderRoot` | ✅ Via `shadow` option | ✅ Via `@Component({ shadow })` |
| **Angular Compatibility** | ✅ Excellent | ⚠️ Limited for event handlers | ✅ Excellent |
| **Bundle Optimization** | ✅ Excellent (shared chunks via Vite) | ✅ Good (shared chunks via Vite) | ❌ Poor (no chunk splitting) |
| **React Runtime Splitting** | ✅ Yes  | ✅ Yes | ❌ No |
| **Learning Curve** | Medium | Low | Medium |
| **Lazy Loading** | ❌ No | ❌ No | ⚠️ Ineffective |
| **Bundle Size** | ✅ Small | ✅ Small | ❌ Larger (~380 kB) |
