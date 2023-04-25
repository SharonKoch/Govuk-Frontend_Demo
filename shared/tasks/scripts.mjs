import { join, parse } from 'path'

import { pkg } from 'govuk-frontend-config'
import { getListing } from 'govuk-frontend-lib/files'
import { componentPathToModuleName } from 'govuk-frontend-lib/names'
import PluginError from 'plugin-error'
import { rollup } from 'rollup'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import { minify } from 'terser'

import { isDev } from './helpers/task-arguments.mjs'
import { assets } from './index.mjs'

/**
 * Compile JavaScript task
 *
 * @param {string} pattern - Minimatch pattern
 * @param {AssetEntry[1]} [options] - Asset options
 * @returns {Promise<void>}
 */
export async function compile (pattern, options) {
  const modulePaths = await getListing(options.srcPath, pattern)

  try {
    const compileTasks = modulePaths
      .map((modulePath) => compileJavaScript([modulePath, options]))

    await Promise.all(compileTasks)
  } catch (cause) {
    throw new PluginError('compile:js', cause)
  }
}

/**
 * Compile JavaScript helper
 *
 * @param {AssetEntry} assetEntry - Asset entry
 */
export async function compileJavaScript ([modulePath, { srcPath, destPath, filePath }]) {
  const moduleSrcPath = join(srcPath, modulePath)
  const moduleDestPath = join(destPath, filePath ? filePath(parse(modulePath)) : modulePath)

  // Rollup plugins
  const plugins = [resolve()]

  if (!isDev) {
    // Add GOV.UK Frontend release version
    plugins.push(replace({
      include: join(srcPath, 'common/govuk-frontend-version.mjs'),
      values: { development: pkg.version }
    }))
  }

  // Option 1: Rollup bundle set (multiple files)
  // - Module imports are preserved, not concatenated
  if (moduleDestPath.endsWith('.mjs')) {
    const bundle = await rollup({ input: [moduleSrcPath], plugins, experimentalPreserveModules: true })

    // Compile JavaScript to ES modules
    await bundle.write({
      dir: destPath,
      format: 'es',
      sourcemap: true
    })

    return
  }

  // Option 1: Rollup bundle (single file)
  // - Universal Module Definition (UMD) bundle
  const bundle = await rollup({ input: moduleSrcPath, plugins })

  // Compile JavaScript to output format
  const bundled = await bundle[moduleDestPath.endsWith('.min.js') ? 'generate' : 'write']({
    file: moduleDestPath,
    sourcemapFile: moduleDestPath,
    sourcemap: true,

    // Universal Module Definition (UMD)
    // for browser + Node.js compatibility
    format: 'umd',

    // Legacy mode is required for IE8 support
    legacy: true,

    // Used to set the `window` global for 'iife' and 'umd' bundles
    // Components are given unique names (e.g GOVUKFrontend.Accordion)
    amd: { id: componentPathToModuleName(modulePath) },
    name: componentPathToModuleName(modulePath)
  })

  // Minify bundle
  if (moduleDestPath.endsWith('.min.js')) {
    const minified = await minifyJavaScript(modulePath, bundled)

    // Write to files
    await assets.write(moduleDestPath, minified)
  }
}

/**
 * Minify JavaScript helper
 *
 * @param {string} modulePath - Relative path to module
 * @param {import('rollup').OutputChunk} result - Generated bundle
 * @returns {Promise<import('terser').MinifyOutput>} Minifier result
 */
export function minifyJavaScript (modulePath, result) {
  const minified = minify({ [modulePath]: result.code }, {
    format: { comments: false },

    // Include source maps
    sourceMap: {
      content: result.map.toString(),
      filename: result.map.file,
      url: `${result.map.file}.map`,
      includeSources: true
    },

    // Compatibility workarounds
    ecma: 5,
    ie8: true,
    safari10: true
  })

  return minified
}

/**
 * @typedef {import('./assets.mjs').AssetEntry} AssetEntry
 * @typedef {import('./assets.mjs').AssetOutput} AssetOutput
 */
