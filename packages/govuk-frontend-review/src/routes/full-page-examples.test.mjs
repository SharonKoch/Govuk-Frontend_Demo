import { load } from 'cheerio'
import { ports } from 'govuk-frontend-config'
import { fetchPath } from 'govuk-frontend-helpers/tests'

const expectedPages = [
  '/full-page-examples/bank-holidays',
  '/full-page-examples/check-your-answers',
  '/full-page-examples/feedback',
  '/full-page-examples/have-you-changed-your-name',
  '/full-page-examples/how-do-you-want-to-sign-in',
  '/full-page-examples/passport-details',
  '/full-page-examples/service-manual-topic',
  '/full-page-examples/start-page',
  '/full-page-examples/update-your-account-details',
  '/full-page-examples/upload-your-photo',
  '/full-page-examples/what-is-your-address',
  '/full-page-examples/what-is-your-nationality',
  '/full-page-examples/what-is-your-postcode',
  '/full-page-examples/what-was-the-last-country-you-visited'
]

describe(`http://localhost:${ports.app}/full-page-examples/`, () => {
  describe.each(expectedPages)('%s', (path) => {
    it('should resolve with a http status code of 200', async () => {
      const { status } = await fetchPath(path, { method: 'HEAD' })
      expect(status).toEqual(200)
    })

    it('should resolve with a ‘Content-Type’ header of "text/html"', async () => {
      const { headers } = await fetchPath(path, { method: 'HEAD' })
      expect(headers.get('content-type')).toContain('text/html')
    })

    it('should prevent search indexing', async () => {
      const { headers } = await fetchPath(path, { method: 'HEAD' })
      expect(headers.get('x-robots-tag')).toEqual('none')
    })
  })

  describe('/full-page-examples/', () => {
    describe('feedback', () => {
      it('should not show errors if submit with no input', async () => {
        const response = await fetchPath('/full-page-examples/feedback')
        const body = await response.text()
        const $ = load(body)

        // Check the page responded correctly
        expect(response.status).toBe(200)
        expect($.html()).toContain('Send your feedback')

        // Check that the error summary is not visible
        const $errorSummary = $('[data-module="govuk-error-summary"]')
        expect($errorSummary.length).toBeFalsy()
      })
      it('should show errors if form is submitted with no input', async () => {
        const response = await fetchPath('/full-page-examples/feedback', {
          method: 'POST'
        })
        const body = await response.text()
        const $ = load(body)

        // Check the page responded correctly
        expect(response.status).toBe(200)
        expect($.html()).toContain('Send your feedback')

        // Check the title has an error
        expect($('title').text()).toContain('Error:')

        // Check that the error summary is visible
        const $errorSummary = $('[data-module="govuk-error-summary"]')
        expect($errorSummary.length).toBeTruthy()
      })
    })

    describe('have-you-changed-your-name', () => {
      it('should not show errors if submit with no input', async () => {
        const response = await fetchPath(
          '/full-page-examples/have-you-changed-your-name'
        )
        const body = await response.text()
        const $ = load(body)

        // Check the page responded correctly
        expect(response.status).toBe(200)
        expect($.html()).toContain('Have you changed your name?')

        // Check that the error summary is not visible
        const $errorSummary = $('[data-module="govuk-error-summary"]')
        expect($errorSummary.length).toBeFalsy()
      })
      it('should show errors if form is submitted with no input', async () => {
        const response = await fetchPath(
          '/full-page-examples/have-you-changed-your-name',
          { method: 'POST' }
        )
        const body = await response.text()
        const $ = load(body)

        // Check the page responded correctly
        expect(response.status).toBe(200)
        expect($.html()).toContain('Have you changed your name?')

        // Check the title has an error
        expect($('title').text()).toContain('Error:')

        // Check that the error summary is visible
        const $errorSummary = $('[data-module="govuk-error-summary"]')
        expect($errorSummary.length).toBeTruthy()
      })
    })

    describe('passport-details', () => {
      it('should not show errors if submit with no input', async () => {
        const response = await fetchPath('/full-page-examples/passport-details')
        const body = await response.text()
        const $ = load(body)

        // Check the page responded correctly
        expect(response.status).toBe(200)
        expect($.html()).toContain('Passport details')

        // Check that the error summary is not visible
        const $errorSummary = $('[data-module="govuk-error-summary"]')
        expect($errorSummary.length).toBeFalsy()
      })
      it('should show errors if form is submitted with no input', async () => {
        const response = await fetchPath(
          '/full-page-examples/passport-details',
          { method: 'POST' }
        )
        const body = await response.text()
        const $ = load(body)

        // Check the page responded correctly
        expect(response.status).toBe(200)
        expect($.html()).toContain('Passport details')

        // Check the title has an error
        expect($('title').text()).toContain('Error:')

        // Check that the error summary is visible
        const $errorSummary = $('[data-module="govuk-error-summary"]')
        expect($errorSummary.length).toBeTruthy()
      })
    })

    describe('update-your-account-details', () => {
      it('should not show errors if submit with no input', async () => {
        const response = await fetchPath(
          '/full-page-examples/update-your-account-details'
        )
        const body = await response.text()
        const $ = load(body)

        // Check the page responded correctly
        expect(response.status).toBe(200)
        expect($.html()).toContain('Update your account details')

        // Check that the error summary is not visible
        const $errorSummary = $('[data-module="govuk-error-summary"]')
        expect($errorSummary.length).toBeFalsy()
      })
      it('should show errors if form is submitted with no input', async () => {
        const response = await fetchPath(
          '/full-page-examples/update-your-account-details',
          { method: 'POST' }
        )
        const body = await response.text()
        const $ = load(body)

        // Check the page responded correctly
        expect(response.status).toBe(200)
        expect($.html()).toContain('Update your account details')

        // Check the title has an error
        expect($('title').text()).toContain('Error:')

        // Check that the error summary is visible
        const $errorSummary = $('[data-module="govuk-error-summary"]')
        expect($errorSummary.length).toBeTruthy()
      })
    })

    describe('upload-your-photo', () => {
      it('should not show errors if submit with no input', async () => {
        const response = await fetchPath(
          '/full-page-examples/upload-your-photo'
        )
        const body = await response.text()
        const $ = load(body)

        // Check the page responded correctly
        expect(response.status).toBe(200)
        expect($.html()).toContain('Upload your photo')

        // Check that the error summary is not visible
        const $errorSummary = $('[data-module="govuk-error-summary"]')
        expect($errorSummary.length).toBeFalsy()
      })
      it('should show errors if form is submitted with no input', async () => {
        const response = await fetchPath(
          '/full-page-examples/upload-your-photo',
          { method: 'POST' }
        )
        const body = await response.text()
        const $ = load(body)

        // Check the page responded correctly
        expect(response.status).toBe(200)
        expect($.html()).toContain('Upload your photo')

        // Check the title has an error
        expect($('title').text()).toContain('Error:')

        // Check that the error summary is visible
        const $errorSummary = $('[data-module="govuk-error-summary"]')
        expect($errorSummary.length).toBeTruthy()
      })
    })

    describe('how-do-you-want-to-sign-in', () => {
      it('should not show errors if submit with no input', async () => {
        const response = await fetchPath(
          '/full-page-examples/how-do-you-want-to-sign-in'
        )
        const body = await response.text()
        const $ = load(body)

        // Check the page responded correctly
        expect(response.status).toBe(200)
        expect($.html()).toContain('How do you want to sign in?')

        // Check that the error summary is not visible
        const $errorSummary = $('[data-module="govuk-error-summary"]')
        expect($errorSummary.length).toBeFalsy()
      })
      it('should show errors if form is submitted with no input', async () => {
        const response = await fetchPath(
          '/full-page-examples/how-do-you-want-to-sign-in',
          { method: 'POST' }
        )
        const body = await response.text()
        const $ = load(body)

        // Check the page responded correctly
        expect(response.status).toBe(200)
        expect($.html()).toContain('How do you want to sign in?')

        // Check the title has an error
        expect($('title').text()).toContain('Error:')

        // Check that the error summary is visible
        const $errorSummary = $('[data-module="govuk-error-summary"]')
        expect($errorSummary.length).toBeTruthy()
      })
    })

    describe('what-is-your-nationality', () => {
      it('should not show errors if submit with no input', async () => {
        const response = await fetchPath(
          '/full-page-examples/what-is-your-nationality'
        )
        const body = await response.text()
        const $ = load(body)

        // Check the page responded correctly
        expect(response.status).toBe(200)
        expect($.html()).toContain('What is your nationality?')

        // Check that the error summary is not visible
        const $errorSummary = $('[data-module="govuk-error-summary"]')
        expect($errorSummary.length).toBeFalsy()
      })
      it('should show errors if form is submitted with no input', async () => {
        const response = await fetchPath(
          '/full-page-examples/what-is-your-nationality',
          { method: 'POST' }
        )
        const body = await response.text()
        const $ = load(body)

        // Check the page responded correctly
        expect(response.status).toBe(200)
        expect($.html()).toContain('What is your nationality?')

        // Check the title has an error
        expect($('title').text()).toContain('Error:')

        // Check that the error summary is visible
        const $errorSummary = $('[data-module="govuk-error-summary"]')
        expect($errorSummary.length).toBeTruthy()
      })
    })

    describe('what-is-your-address', () => {
      it('should not show errors if submit with no input', async () => {
        const response = await fetchPath(
          '/full-page-examples/what-is-your-address'
        )
        const body = await response.text()
        const $ = load(body)

        // Check the page responded correctly
        expect(response.status).toBe(200)
        expect($.html()).toContain('What is your address?')

        // Check that the error summary is not visible
        const $errorSummary = $('[data-module="govuk-error-summary"]')
        expect($errorSummary.length).toBeFalsy()
      })
      it('should show errors if form is submitted with no input', async () => {
        const response = await fetchPath(
          '/full-page-examples/what-is-your-address',
          { method: 'POST' }
        )
        const body = await response.text()
        const $ = load(body)

        // Check the page responded correctly
        expect(response.status).toBe(200)
        expect($.html()).toContain('What is your address?')

        // Check the title has an error
        expect($('title').text()).toContain('Error:')

        // Check that the error summary is visible
        const $errorSummary = $('[data-module="govuk-error-summary"]')
        expect($errorSummary.length).toBeTruthy()
      })
    })

    describe('what-is-your-postcode', () => {
      it('should not show errors if submit with no input', async () => {
        const response = await fetchPath(
          '/full-page-examples/what-is-your-postcode'
        )
        const body = await response.text()
        const $ = load(body)

        // Check the page responded correctly
        expect(response.status).toBe(200)
        expect($.html()).toContain('What is your home postcode?')

        // Check that the error summary is not visible
        const $errorSummary = $('[data-module="govuk-error-summary"]')
        expect($errorSummary.length).toBeFalsy()
      })
      it('should show errors if form is submitted with no input', async () => {
        const response = await fetchPath(
          '/full-page-examples/what-is-your-postcode',
          { method: 'POST' }
        )
        const body = await response.text()
        const $ = load(body)

        // Check the page responded correctly
        expect(response.status).toBe(200)
        expect($.html()).toContain('What is your home postcode?')

        // Check the title has an error
        expect($('title').text()).toContain('Error:')

        // Check that the error summary is visible
        const $errorSummary = $('[data-module="govuk-error-summary"]')
        expect($errorSummary.length).toBeTruthy()
      })
    })

    describe('search', () => {
      it('should show most wanted results by default', async () => {
        const response = await fetchPath('/full-page-examples/search')
        const body = await response.text()
        const $ = load(body)
        // Check the results are correct
        expect($.html()).toContain('482,211 results')
      })
      it('should show sorted results when selected', async () => {
        const response = await fetchPath(
          '/full-page-examples/search?order=updated-newest'
        )
        const body = await response.text()
        const $ = load(body)
        // Check the results are correct
        expect($.html()).toContain('241,128 results')
      })
      it('should show organisation results when selected', async () => {
        const response = await fetchPath(
          '/full-page-examples/search?order=updated-newest&organisation=hmrc'
        )
        const body = await response.text()
        const $ = load(body)
        // Check the results are correct
        expect($.html()).toContain('814,221 results')
      })
    })

    describe('what-was-the-last-country-you-visited', () => {
      it('should not show errors if submit with no input', async () => {
        const response = await fetchPath(
          '/full-page-examples/what-was-the-last-country-you-visited'
        )
        const body = await response.text()
        const $ = load(body)

        // Check the page responded correctly
        expect(response.status).toBe(200)
        expect($.html()).toContain('What was the last country you visited?')

        // Check that the error summary is not visible
        const $errorSummary = $('[data-module="govuk-error-summary"]')
        expect($errorSummary.length).toBeFalsy()
      })
      it('should show errors if form is submitted with no input', async () => {
        const response = await fetchPath(
          '/full-page-examples/what-was-the-last-country-you-visited',
          { method: 'POST' }
        )
        const body = await response.text()
        const $ = load(body)

        // Check the page responded correctly
        expect(response.status).toBe(200)
        expect($.html()).toContain('What was the last country you visited?')

        // Check the title has an error
        expect($('title').text()).toContain('Error:')

        // Check that the error summary is visible
        const $errorSummary = $('[data-module="govuk-error-summary"]')
        expect($errorSummary.length).toBeTruthy()
      })
    })
  })
})
