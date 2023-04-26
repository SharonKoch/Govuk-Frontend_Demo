import { body, validationResult } from 'express-validator'

// To make it easier to use in the view, might be nicer as a Nunjucks function
function getErrors (errorsInstance) {
  if (errorsInstance.isEmpty()) {
    return false
  }
  const errors = errorsInstance.array()
  const formattedErrors = {}
  errors.forEach(error => {
    formattedErrors[error.param] = {
      id: error.param,
      href: '#' + error.param,
      value: error.value,
      text: error.msg
    }
  })
  return formattedErrors
}

/**
 * @param {import('express').Application} app
 */
export default (app) => {
  app.post(
    '/full-page-examples/update-your-account-details',
    [
      body('email')
        .exists()
        .isEmail().withMessage('Enter an email address in the correct format, like name@example.com')
        .not().isEmpty().withMessage('Enter your email address'),
      body('password')
        .exists()
        .not().isEmpty().withMessage('Enter your password')
    ],

    /**
     * @param {import('express').Request} request
     * @param {import('express').Response} response
     * @returns {void}
     */
    (request, response) => {
      const errors = getErrors(validationResult(request))

      if (!errors) {
        return response.render('./full-page-examples/update-your-account-details/confirm')
      }

      response.render('./full-page-examples/update-your-account-details/index', {
        errors,
        errorSummary: Object.values(errors),
        values: request.body // In production this should sanitized.
      })
    }
  )
}
