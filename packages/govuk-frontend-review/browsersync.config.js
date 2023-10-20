const { join } = require('path')

const { paths, urls } = require('@govuk-frontend/config')
const { packageTypeToPath } = require('@govuk-frontend/lib/names')

/**
 * Browsersync config
 *
 * @type {import('browser-sync').Options}
 */
module.exports = {
  proxy: urls.app,

  // Prevent browser mirroring
  ghostMode: false,

  // Prevent browser opening
  open: false,

  // Allow for Express.js restart
  reloadDelay: 1000,

  // Files to watch for auto reload
  files: [
    join(paths.app, 'dist/stylesheets/**/*.css'),
    join(paths.app, 'src/views/**/*.njk'),

    packageTypeToPath('govuk-frontend', {
      modulePath: 'govuk-frontend.min.js',
      moduleRoot: paths.app
    }),

    packageTypeToPath('govuk-frontend', {
      modulePath: '**/*.njk',
      moduleRoot: paths.app
    })
  ],
  ignore: ['**/*.test.*'],

  // Browser paths to files being watched
  serveStatic: [
    {
      route: '/javascripts',
      dir: packageTypeToPath('govuk-frontend', {
        modulePath: '/',
        moduleRoot: paths.app
      })
    },
    {
      route: '/stylesheets',
      dir: join(paths.app, 'dist/stylesheets')
    }
  ]
}
