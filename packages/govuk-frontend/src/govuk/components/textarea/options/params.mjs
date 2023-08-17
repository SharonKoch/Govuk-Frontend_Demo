/**
 * Nunjucks macro option (or param) configs
 *
 * @satisfies {{ [param: string]: import('@govuk-frontend/lib/components').ComponentOption }}
 */
export const params = {
  id: {
    type: 'string',
    required: true,
    description: 'The ID of the textarea.'
  },
  name: {
    type: 'string',
    required: true,
    description:
      'The name of the textarea, which is submitted with the form data.'
  },
  spellcheck: {
    type: 'boolean',
    required: false,
    description:
      'Optional field to enable or disable the `spellcheck` attribute on the textarea.'
  },
  rows: {
    type: 'string',
    required: false,
    description: 'Optional number of textarea rows (default is 5 rows).'
  },
  value: {
    type: 'string',
    required: false,
    description: 'Optional initial value of the textarea.'
  },
  disabled: {
    type: 'boolean',
    required: false,
    description: 'If `true`, textarea will be disabled.'
  },
  describedBy: {
    type: 'string',
    required: false,
    description:
      'One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive information for screenreader users.'
  },
  label: {
    type: 'object',
    required: true,
    description: 'The label used by the textarea component.',
    isComponent: true
  },
  hint: {
    type: 'object',
    required: false,
    description: 'Can be used to add a hint to the textarea component.',
    isComponent: true
  },
  errorMessage: {
    type: 'object',
    required: false,
    description:
      'Can be used to add an error message to the textarea component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`.',
    isComponent: true
  },
  formGroup: {
    type: 'object',
    required: false,
    description:
      'Additional options for the form group containing the textarea component.',
    params: {
      classes: {
        type: 'string',
        required: false,
        description:
          'Classes to add to the form group (for example to show error state for the whole group).'
      },
      attributes: {
        type: 'object',
        required: false,
        description:
          'HTML attributes (for example data attributes) to add to the form group.'
      },
      beforeInput: {
        type: 'object',
        required: false,
        description:
          'Content to add before the textarea used by the textarea component.',
        params: {
          text: {
            type: 'string',
            required: true,
            description:
              'Text to add before the textarea. If `html` is provided, the `text` option will be ignored.'
          },
          html: {
            type: 'string',
            required: true,
            description:
              'HTML to add before the textarea. If `html` is provided, the `text` option will be ignored.'
          }
        }
      },
      afterInput: {
        type: 'object',
        required: false,
        description:
          'Content to add after the textarea used by the textarea component.',
        params: {
          text: {
            type: 'string',
            required: true,
            description:
              'Text to add after the textarea. If `html` is provided, the `text` option will be ignored.'
          },
          html: {
            type: 'string',
            required: true,
            description:
              'HTML to add after the textarea. If `html` is provided, the `text` option will be ignored.'
          }
        }
      }
    }
  },
  classes: {
    type: 'string',
    required: false,
    description: 'Classes to add to the textarea.'
  },
  autocomplete: {
    type: 'string',
    required: false,
    description:
      'Attribute to [identify input purpose](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html), for example `"street-address"`. See [autofill](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill) for full list of attributes that can be used.'
  },
  attributes: {
    type: 'object',
    required: false,
    description:
      'HTML attributes (for example data attributes) to add to the textarea.'
  }
}
