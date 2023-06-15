import percySnapshot from '@percy/puppeteer'
import { waitForPercyIdle } from '@percy/sdk-utils'
import { download } from 'govuk-frontend-helpers/jest/browser/download.mjs'
import { goToComponent, goToExample } from 'govuk-frontend-helpers/puppeteer'
import { getComponentFiles, getComponentNames } from 'govuk-frontend-lib/components'
import { filterPath } from 'govuk-frontend-lib/files'
import puppeteer from 'puppeteer'

/**
 * Puppeteer browser launcher
 *
 * @returns {Promise<import('puppeteer').Browser>} Puppeteer browser object
 */
export async function launch () {
  await download()

  // Open browser
  return puppeteer.launch({ headless: 'new' })
}

/**
 * Send screenshots in concurrent batches to Percy
 * for visual regression testing
 *
 * @returns {Promise<void>}
 */
export async function screenshots () {
  const browser = await launch()
  const componentNames = await getComponentNames()
  const exampleNames = ['text-alignment', 'typography']

  // Screenshot components
  for (const componentName of componentNames) {
    await screenshotComponent(await browser.newPage(), componentName)
  }

  // Screenshot examples
  for (const exampleName of exampleNames) {
    await screenshotExample(await browser.newPage(), exampleName)
  }

  // Close browser
  await browser.close()

  // Wait for Percy to finish
  return waitForPercyIdle()
}

/**
 * Send single component screenshots to Percy
 * for visual regression testing
 *
 * @param {import('puppeteer').Page} page - Puppeteer page object
 * @param {string} componentName - Component name
 * @returns {Promise<void>}
 */
export async function screenshotComponent (page, componentName) {
  const componentFiles = await getComponentFiles(componentName)

  // Navigate to component
  await goToComponent(page, componentName)

  // Screenshot preview page (with JavaScript)
  await percySnapshot(page, `js: ${componentName}`)

  // Check for "JavaScript enabled" components
  if (componentFiles.some(filterPath([`**/${componentName}.mjs`]))) {
    await page.setJavaScriptEnabled(false)

    // Screenshot preview page (without JavaScript)
    await page.reload({ waitUntil: 'load' })
    await percySnapshot(page, `no-js: ${componentName}`)
  }

  // Close page
  return page.close()
}

/**
 * Send single example screenshot to Percy
 * for visual regression testing
 *
 * @param {import('puppeteer').Page} page - Puppeteer page object
 * @param {string} exampleName - Component name
 * @returns {Promise<void>}
 */
export async function screenshotExample (page, exampleName) {
  await goToExample(page, exampleName)

  // Dismiss app banner
  await page.setCookie({
    name: 'dismissed-app-banner',
    value: 'yes',
    url: page.url()
  })

  // Screenshot preview page
  await page.reload({ waitUntil: 'load' })
  await percySnapshot(page, `js: ${exampleName} (example)`)

  // Close page
  return page.close()
}
