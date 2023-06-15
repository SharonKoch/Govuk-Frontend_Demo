import { basename, dirname, join } from 'path'

import { getListing, getYaml } from 'govuk-frontend-lib/files'
import nunjucks from 'nunjucks'

import { files } from './index.mjs'

/**
 * Generate fixtures.json from component data
 *
 * @param {AssetEntry[0]} pattern - Path to ${componentName}.yaml
 * @param {Pick<AssetEntry[1], "srcPath" | "destPath">} options - Asset options
 */
export async function generateFixtures (pattern, { srcPath, destPath }) {
  const componentDataPaths = await getListing(pattern, {
    cwd: srcPath
  })

  // Loop component data paths
  const fixtures = componentDataPaths.map(async (componentDataPath) => {
    const fixture = await generateFixture(componentDataPath, { srcPath })

    // Write to destination
    await files.write(componentDataPath, {
      destPath,

      // Rename to fixtures.json
      filePath ({ dir }) {
        return join(dir, 'fixtures.json')
      },

      // Add fixtures as JSON (formatted)
      async fileContents () {
        return JSON.stringify(fixture, null, 4)
      }
    })
  })

  await Promise.all(fixtures)
}

/**
 * Generate macro-options.json from component data
 *
 * @param {AssetEntry[0]} pattern - Path to ${componentName}.yaml
 * @param {Pick<AssetEntry[1], "srcPath" | "destPath">} options - Asset options
 */
export async function generateMacroOptions (pattern, { srcPath, destPath }) {
  const componentDataPaths = await getListing(pattern, {
    cwd: srcPath
  })

  // Loop component data paths
  const macroOptions = componentDataPaths.map(async (componentDataPath) => {
    const macroOption = await generateMacroOption(componentDataPath, { srcPath })

    // Write to destination
    await files.write(componentDataPath, {
      destPath,

      // Rename to 'macro-options.json'
      filePath ({ dir }) {
        return join(dir, 'macro-options.json')
      },

      // Add macro options as JSON (formatted)
      async fileContents () {
        return JSON.stringify(macroOption, null, 4)
      }
    })
  })

  await Promise.all(macroOptions)
}

/**
 * Component fixtures YAML to JSON
 *
 * @param {string} componentDataPath - Path to ${componentName}.yaml
 * @param {Pick<AssetEntry[1], "srcPath">} options - Asset options
 * @returns {Promise<{ component: string; fixtures: { [key: string]: unknown }[] }>} Component fixtures object
 */
async function generateFixture (componentDataPath, options) {
  /** @type {ComponentData} */
  const json = await getYaml(join(options.srcPath, componentDataPath))

  if (!json?.examples) {
    throw new Error(`${componentDataPath} is missing "examples"`)
  }

  // Nunjucks template
  const template = join(options.srcPath, dirname(componentDataPath), 'template.njk')
  const componentName = basename(dirname(componentDataPath))

  // Loop examples
  const examples = json.examples.map(async (example) => {
    const context = { params: example.data }

    return {
      name: example.name,
      options: example.data,
      hidden: Boolean(example.hidden),

      // Wait for render to complete
      /** @type {string} */
      html: await new Promise((resolve, reject) => {
        return nunjucks.render(template, context, (error, result) => {
          return error ? reject(error) : resolve(result?.trim() ?? '')
        })
      })
    }
  })

  return {
    component: componentName,
    fixtures: await Promise.all(examples)
  }
}

/**
 * Macro options YAML to JSON
 *
 * @param {string} componentDataPath - Path to ${componentName}.yaml
 * @param {Pick<AssetEntry[1], "srcPath">} options - Asset options
 * @returns {Promise<ComponentOption[] | undefined>} Component macro options
 */
async function generateMacroOption (componentDataPath, options) {
  /** @type {ComponentData} */
  const json = await getYaml(join(options.srcPath, componentDataPath))

  if (!json?.params) {
    throw new Error(`${componentDataPath} is missing "params"`)
  }

  return json.params
}

/**
 * @typedef {import('./assets.mjs').AssetEntry} AssetEntry
 * @typedef {import('govuk-frontend-lib/components').ComponentData} ComponentData
 * @typedef {import('govuk-frontend-lib/components').ComponentOption} ComponentOption
 */
