# QwikJS ⚡️

QwikJS is a web development framework that focuses on speed and efficiency, providing developers with tools to create
fast and responsive web applications.

## Features
1. __Fast Performance__: QwikJS is designed to deliver fast performance, meaning web applications built with this framework can load and run quickly for an optimal user experience.
2. __Modular architecture__: It uses a modular architecture that allows developers to organize their code efficiently, making it easier to scale and maintain applications.
3. __Reusable Components__: QwikJS encourages the creation of reusable components, allowing developers to build consistent and easily maintainable user interfaces.
4. __Fast Rendering Techniques__: Implements fast rendering techniques to update the user interface efficiently, ensuring quick response to user interactions.

## Improvements

1. __Integration with modern JavaScript__: QwikJS integrates with the latest JavaScript features, such as promises and async/await, to simplify asynchronous programming and improve code readability.
2. __Code size optimization__: Cares about the size of the generated code, which can help reduce loading times and improve overall application performance.
3. __Startup time improvements__: QwikJS focuses on reducing the time required for a web application to become interactive after it loads, improving user perception of the speed of the application.

## Docs
- [Qwik Docs](https://qwik.builder.io/)
- [Qwik Context](https://qwik.dev/docs/components/context/)
- [Qwik Routes](https://qwik.builder.io/docs/routing/)
- [Qwik GitHub](https://github.com/BuilderIO/qwik)

---

## Project Structure

This project is using Qwik with [QwikCity](https://qwik.builder.io/qwikcity/overview/). QwikCity is just an extra set of tools on top of Qwik to make it easier to build a full site, including directory-based routing, layouts, and more.

Inside your project, you'll see the following directory structure:

```
├── public/
│   └── ...
└── src/
    ├── components/
    │   └── ...
    └── routes/
        └── ...
```

- `src/routes`: Provides the directory-based routing, which can include a hierarchy of `layout.tsx` layout files, and an `index.tsx` file as the page. Additionally, `index.ts` files are endpoints. Please see the [routing docs](https://qwik.builder.io/qwikcity/routing/overview/) for more info.

- `src/components`: Recommended directory for components.

- `public`: Any static assets, like images, can be placed in the public directory. Please see the [Vite public directory](https://vitejs.dev/guide/assets.html#the-public-directory) for more info.

## Config ENV
Rename the file __.env.example__ to __.env__ and change the environment variables

## Add Integrations and deployment

Use the `npm run qwik add` command to add additional integrations. Some examples of integrations includes: Cloudflare, Netlify or Express Server, and the [Static Site Generator (SSG)](https://qwik.builder.io/qwikcity/guides/static-site-generation/).

```shell
npm run qwik add # or `yarn qwik add`
```

## Development

Development mode uses [Vite's development server](https://vitejs.dev/). The `dev` command will server-side render (SSR) the output during development.

```shell
npm start # or `yarn start`
```

> Note: during dev mode, Vite may request a significant number of `.js` files. This does not represent a Qwik production build.

## Preview

The preview command will create a production build of the client modules, a production build of `src/entry.preview.tsx`, and run a local server. The preview server is only for convenience to preview a production build locally and should not be used as a production server.

```shell
npm run preview # or `yarn preview`
```

## Production

The production build will generate client and server modules by running both client and server build commands. The build command will use Typescript to run a type check on the source code.

```shell
npm run build # or `yarn build`
```

## Express Server

This app has a minimal [Express server](https://expressjs.com/) implementation. After running a full build, you can preview the build using the command:

```
npm run serve
```

Then visit [http://localhost:8080/](http://localhost:8080/)
