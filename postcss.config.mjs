import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import cssnanoPresetDefault from 'cssnano-preset-default'
import { pkg } from 'govuk-frontend-config'
import { isDev } from 'govuk-frontend-tasks/helpers/task-arguments.mjs'
import { minimatch } from 'minimatch'
import postcss from 'postcss'
import pseudoclasses from 'postcss-pseudo-classes'
import scss from 'postcss-scss'
import unmq from 'postcss-unmq'
import unopacity from 'postcss-unopacity'
import unrgba from 'postcss-unrgba'

/**
 * PostCSS config
 *
 * @type {import('postcss-load-config').ConfigFn}
 */
export default ({ from = '', to = '', env = 'production' }) => {
  /** @type {import('postcss-load-config').Config} */
  const config = {
    plugins: [],
    syntax: postcss
  }

  // Browserslist IE8 environment
  if (from.includes('-ie8')) {
    env = 'oldie'
  }

  // Sass syntax support
  if (to.endsWith('.scss')) {
    config.syntax = scss
  }

  // Add vendor prefixes
  config.plugins.push(autoprefixer({ env }))

  // Add review app auto-generated 'companion' classes for each pseudo-class
  // For example ':hover' and ':focus' classes to simulate form label states
  if (minimatch(from, '**/packages/govuk-frontend-review/src/stylesheets/*')) {
    config.plugins.push(pseudoclasses({
      allCombinations: true,
      restrictTo: [
        ':link',
        ':visited',
        ':hover',
        ':active',
        ':focus'
      ]
    }))
  }

  // Transpile CSS for Internet Explorer
  if (env === 'oldie') {
    config.plugins.push(
      unmq(),
      unopacity({ browsers: 'ie 8' }),
      unrgba({ filter: true })
    )
  }

  // Add GOV.UK Frontend release version
  if (!isDev) {
    config.plugins.push({
      postcssPlugin: 'govuk-frontend-version',
      Declaration: {
        // Find CSS declaration for version, update value
        // https://github.com/postcss/postcss/blob/main/docs/writing-a-plugin.md
        // https://postcss.org/api/#declaration
        '--govuk-frontend-version': (decl) => {
          decl.value = `"${pkg.version}"`
        }
      }
    })
  }

  // Always minify CSS
  if (config.syntax !== scss) {
    config.plugins.push(cssnano({
      preset: [cssnanoPresetDefault, {
        // Sorted CSS is smaller when gzipped, but we sort using Stylelint
        // https://cssnano.co/docs/optimisations/cssdeclarationsorter/
        cssDeclarationSorter: false
      }]
    }))
  }

  return config
}
