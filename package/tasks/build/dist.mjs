import { join } from 'path'

import { paths, pkg } from 'govuk-frontend-config'
import { files, scripts, styles, task } from 'govuk-frontend-tasks'
import gulp from 'gulp'

/**
 * Build dist task
 * Prepare dist folder for release
 */
export default gulp.series(
  task.name('clean', () =>
    files.clean('**/*', {
      destPath: paths.dist
    })
  ),

  // Copy GOV.UK Frontend static assets
  task.name('copy:assets', () =>
    files.copy('*/**', {
      srcPath: join(paths.package, 'src/govuk/assets'),
      destPath: join(paths.dist, 'assets')
    })
  ),

  // Compile GOV.UK Frontend JavaScript
  task.name('compile:js', () =>
    scripts.compile('all.mjs', {
      srcPath: join(paths.package, 'src/govuk'),
      destPath: paths.dist,

      filePath (file) {
        return join(file.dir, `${file.name.replace(/^all/, pkg.name)}-${pkg.version}.min.js`)
      }
    })
  ),

  // Compile GOV.UK Frontend Sass
  task.name('compile:scss', () =>
    styles.compile('**/[!_]*.scss', {
      srcPath: join(paths.package, 'src/govuk'),
      destPath: paths.dist,

      filePath (file) {
        return join(file.dir, `${file.name.replace(/^all/, pkg.name)}-${pkg.version}.min.css`)
      }
    })
  ),

  // Update GOV.UK Frontend version
  task.name("file:version 'VERSION.txt'", () =>
    files.version('VERSION.txt', {
      destPath: paths.dist
    })
  )
)
