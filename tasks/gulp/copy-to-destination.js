const nunjucks = require('nunjucks')
const gulp = require('gulp')
const configPaths = require('../../config/paths.js')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const taskArguments = require('../task-arguments')
const filter = require('gulp-filter')
const { readFile } = require('fs/promises')
const yaml = require('js-yaml')
const path = require('path')
const map = require('map-stream')
const rename = require('gulp-rename')

const scssFiles = filter([configPaths.src + '**/*.scss'], { restore: true })
const yamlFiles = filter([configPaths.components + '**/*.yaml'], { restore: true })

gulp.task('copy-files', () => {
  return gulp.src([
    configPaths.src + '**/*',
    '!**/.DS_Store',
    '!**/*.mjs',
    '!**/*.test.*',
    '!' + configPaths.src + 'README.md', // Don't override the existing README in /package
    '!' + configPaths.components + '**/__snapshots__/**',
    '!' + configPaths.components + '**/__snapshots__/'
  ])
    .pipe(scssFiles)
    .pipe(postcss([
      autoprefixer
    ], { syntax: require('postcss-scss') }))
    .pipe(scssFiles.restore)
    .pipe(yamlFiles)
    .pipe(map(function (file, done) {
      const fixturesFile = generateFixtures(file)
      done(null, fixturesFile)
    }))
    .pipe(rename(path => {
      path.basename = 'fixtures'
      path.extname = '.json'
    }))
    .pipe(yamlFiles)
    .pipe(map(function (file, done) {
      const macroFile = generateMacroOptions(file)
      done(null, macroFile)
    }))
    .pipe(rename(path => {
      path.basename = 'macro-options'
      path.extname = '.json'
    }))
    .pipe(yamlFiles.restore)
    .pipe(gulp.dest(taskArguments.destination + '/govuk/'))
})

function generateFixtures (file) {
  const json = convertYamlToJson(file)
  const componentName = path.dirname(file.path).split(path.sep).slice(-1).toString()
  const componentTemplatePath = path.join(configPaths.components, componentName, 'template.njk')

  if (json) {
    const examplesJson = json.examples

    if (examplesJson) {
      const fixtures = {
        component: componentName,
        fixtures: []
      }

      examplesJson.forEach(function (example) {
        const fixture = {
          name: example.name,
          options: example.data,
          html: nunjucks.render(componentTemplatePath, { params: example.data }).trim(),
          hidden: Boolean(example.hidden)
        }

        fixtures.fixtures.push(fixture)
      })

      file.contents = Buffer.from(JSON.stringify(fixtures, null, 4))
      return file
    } else {
      console.error(file.path + ' is missing "examples" and/or "params"')
    }
  }
}

gulp.task('js:copy-esm', () => {
  return gulp.src([
    `${configPaths.src}**/*.mjs`,
    `${configPaths.src}**/*.js`,
    `!${configPaths.src}**/*.test.*`
  ])
    .pipe(gulp.dest(taskArguments.destination + '/govuk-esm/'))
})

function generateMacroOptions (file) {
  const json = convertYamlToJson(file)
  let paramsJson

  if (json) {
    paramsJson = json.params // We only want the 'params' data from component yaml

    if (paramsJson) {
      file.contents = Buffer.from(JSON.stringify(paramsJson, null, 4))
      return file
    } else {
      console.error(file.path + ' is missing "params"')
    }
  }
}

/**
 * Parse YAML file content as JavaScript
 *
 * @param {import('vinyl')} file - Component data ${component}.yaml
 * @returns {{ examples?: unknown[]; params?: unknown[] }} Component options
 */
async function convertYamlToJson (file) {
  const componentName = path.dirname(file.path).split(path.sep).slice(-1).toString()
  const componentPath = path.join(configPaths.components, componentName, `${componentName}.yaml`)

  try {
    return yaml.load(await readFile(componentPath, 'utf8'), { json: true })
  } catch (e) {
    console.error('ENOENT: no such file or directory: ', componentPath)
  }

  return false
}
