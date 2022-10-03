![Astro Logo](./logo.svg)


> This repo is for version 6 of `@astrouxds/astro-web-components`. For documentation on v7, see [https://github.com/RocketCommunicationsInc/astro](https://github.com/RocketCommunicationsInc/astro).


![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

The Astro UXDS Web Component and CSS libraries provide a starting point to build in-browser space app experiences and custom applications following today’s web development best practices. The Astro UXDS Web Components are designed to be as platform and implementation-agnostic as possible, easy to implement or extend in existing projects, and generic by default.

## Documentation

**Current documentation**: [astro-components-v6.netlify.app](https://astro-components-v6.netlify.app/)


### Packages

| Project                  | Description                                                                                                                                |                                                      Links                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------: |
| **AstroUXDS**            | The Astro UXDS site for design and developer guidelines.                                                                                   |                                     [`astrouxds.com`](https://astrouxds.com)                                     |
| **Astro Web Components** | [`@astrouxds/astro-web-components`](https://www.npmjs.com/package/@astrouxds/astro-web-components) - Astro Web Components built in Stencil |       [`README.md`](packages/web-components/README.md), [`Storybook`](https://astro-stencil.netlify.app/)        |
| **React**                | [`@astrouxds/react`](https://www.npmjs.com/package/@astrouxds/react) - Astro Web Components wrapped for React use                          |                                     [`README.md`](packages/react/README.md)                                      |
|**Angular** | [`@astrouxds/angular`](https://www.npmjs.com/package/@astrouxds/angular) - Astro Web Components wrapped for Angular use | [`README.md`](packages/angular/README.md) 
| **Starter Kits**         | Starter kits for getting Astro web-components running in React, Svelte, Vue, Angular and HTML/JS                                                | [React](packages/starter-kits/react-starter/README.md), [Svelte](packages/starter-kits/svelte-starter/README.md), [Vue](packages/starter-kits/vue3-starter), [Angular](packages/starter-kits/angular-starter/README.md), [HTML/JS](packages/starter-kits/html-js-starter) |

## Release Strategy

During 2022, Astro will publish minor and patch updates on a bi-weekly basis on Thursday and major updates on a bi-annual cadence. Astro patch/minor releases may include updates to design assets, compliance, components, design tokens and documentation.

For more information, see https://www.astrouxds.com/releases/

## Deprecations

Most of our component's CSS Custom Properties are now deprecated and will be removed in 7.0. Please see our [migration guide](./MIGRATION.md) for more information on how you can prepare for this change.


## Contributing

Interested in submitting a new PR? Check out our [contributing guide](./CONTRIBUTING.md) for more information.
