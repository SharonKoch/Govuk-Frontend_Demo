/**
 * @jest-environment puppeteer
 */

const { goToComponent } = require('../../../../lib/puppeteer-helpers')

const buttonClass = '.govuk-js-hide-this-page-button'

describe('/components/hide-this-page', () => {
  beforeEach(async () => {
    await goToComponent(page, 'hide-this-page')
  })

  it('navigates to the href of the button', async () => {
    const href = await page.evaluate((buttonClass) => document.querySelector(buttonClass).href, buttonClass)

    await Promise.all([
      page.waitForNavigation(),
      page.click(buttonClass)
    ])

    const url = await page.url()
    expect(url).toBe(href)
  })

  it('activates the button functionality when the escape key is pressed 3 times', async () => {
    const href = await page.evaluate((buttonClass) => document.querySelector(buttonClass).href, buttonClass)

    await Promise.all([
      await page.keyboard.press('Escape'),
      await page.keyboard.press('Escape'),
      await page.keyboard.press('Escape'),
      await page.waitForNavigation()
    ])

    const url = await page.url()
    expect(url).toBe(href)
  })
})
