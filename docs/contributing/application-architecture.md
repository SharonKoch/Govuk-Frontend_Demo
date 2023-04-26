## Application architecture

- `bin/`

  Binary/executable files (i.e. bash scripts) mainly used in the [publishing process](/docs/releasing/publishing.md).

- `dist/` **contains auto-generated files**

  Standalone builds of govuk-frontend. Provides a way to consume govuk-frontend without using npm.

- `docs/`

  Documentation files.

- `packages/`

  - `govuk-frontend-review/`

    [Express](https://github.com/expressjs/express) application to preview components; also referred to as the _review app_.

  - `govuk-frontend/`

    Package published on npm.
    Consume all of govuk-frontend through a single package.

    - `dist/` **contains auto-generated files**

      Builds of govuk-frontend published and exported from the npm package.

    - `src/`

      Source files. See README.md in the src directory for details.

- `shared/`

  Shared packages used by tests, build tools and the [review app](../../packages/govuk-frontend-review).

  - `config/`

    Configuration files for common paths and port numbers.

  - `helpers/`

    [Jest](https://github.com/facebook/jest) and development helpers.

  - `lib/`

    Shared libraries for directory listings, component data, naming conventions.

  - `tasks/`

    See [tasks](tasks.md) for more information about the tasks.
