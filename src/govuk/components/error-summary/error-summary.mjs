import { mergeConfigs } from '../../common/index.mjs'
import { normaliseDataset } from '../../common/normalise-dataset.mjs'
import '../../vendor/polyfills/Element/prototype/closest.mjs'
import '../../vendor/polyfills/Event.mjs' // addEventListener, event.target normalization and DOMContentLoaded
import '../../vendor/polyfills/Function/prototype/bind.mjs'

/**
 * JavaScript enhancements for the ErrorSummary
 *
 * Takes focus on initialisation for accessible announcement, unless disabled in configuration.
 *
 * @class
 * @param {Element} $module - HTML element to use for error summary
 * @param {ErrorSummaryConfig} [config] - Error summary config
 * @this {ErrorSummary}
 */
function ErrorSummary ($module, config) {
  if (!($module instanceof HTMLElement)) {
    // Return instance for method chaining
    // using `new ErrorSummary($module).init()`
    return this
  }

  this.$module = $module

  var defaultConfig = {
    disableAutoFocus: false
  }

  /** @type {ErrorSummaryConfig} */
  this.config = mergeConfigs(
    defaultConfig,
    config || {},
    normaliseDataset($module.dataset)
  )
}

/**
 * Initialise component
 *
 * @returns {ErrorSummary} Error summary component
 */
ErrorSummary.prototype.init = function () {
  // Check that required elements are present
  if (!this.$module) {
    return this
  }

  var $module = this.$module

  this.setFocus()
  $module.addEventListener('click', this.handleClick.bind(this))

  // Return instance for assignment
  // `var myErrorSummary = new ErrorSummary($module).init()`
  return this
}

/**
 * Focus the error summary
 */
ErrorSummary.prototype.setFocus = function () {
  var $module = this.$module

  if (this.config.disableAutoFocus) {
    return
  }

  // Set tabindex to -1 to make the element programmatically focusable, but
  // remove it on blur as the error summary doesn't need to be focused again.
  $module.setAttribute('tabindex', '-1')

  $module.addEventListener('blur', function () {
    $module.removeAttribute('tabindex')
  })

  $module.focus()
}

/**
 * Click event handler
 *
 * @param {MouseEvent} event - Click event
 */
ErrorSummary.prototype.handleClick = function (event) {
  var $target = event.target
  if (this.focusTarget($target)) {
    event.preventDefault()
  }
}

/**
 * Focus the target element
 *
 * By default, the browser will scroll the target into view. Because our labels
 * or legends appear above the input, this means the user will be presented with
 * an input without any context, as the label or legend will be off the top of
 * the screen.
 *
 * Manually handling the click event, scrolling the question into view and then
 * focussing the element solves this.
 *
 * This also results in the label and/or legend being announced correctly in
 * NVDA (as tested in 2018.3.2) - without this only the field type is announced
 * (e.g. "Edit, has autocomplete").
 *
 * @param {EventTarget} $target - Event target
 * @returns {boolean} True if the target was able to be focussed
 */
ErrorSummary.prototype.focusTarget = function ($target) {
  // If the element that was clicked was not a link, return early
  if (!($target instanceof HTMLAnchorElement)) {
    return false
  }

  var inputId = this.getFragmentFromUrl($target.href)
  if (!inputId) {
    return false
  }

  var $input = document.getElementById(inputId)
  if (!$input) {
    return false
  }

  var $legendOrLabel = this.getAssociatedLegendOrLabel($input)
  if (!$legendOrLabel) {
    return false
  }

  // Scroll the legend or label into view *before* calling focus on the input to
  // avoid extra scrolling in browsers that don't support `preventScroll` (which
  // at time of writing is most of them...)
  $legendOrLabel.scrollIntoView()
  $input.focus({ preventScroll: true })

  return true
}

/**
 * Get fragment from URL
 *
 * Extract the fragment (everything after the hash) from a URL, but not including
 * the hash.
 *
 * @param {string} url - URL
 * @returns {string | undefined} Fragment from URL, without the hash
 */
ErrorSummary.prototype.getFragmentFromUrl = function (url) {
  var fragment

  // Split URL at hash
  var parts = url.split('#')

  // Check for hash fragment
  if (parts.length > 1) {
    fragment = parts.pop()
  }

  return fragment
}

/**
 * Get associated legend or label
 *
 * Returns the first element that exists from this list:
 *
 * - The `<legend>` associated with the closest `<fieldset>` ancestor, as long
 *   as the top of it is no more than half a viewport height away from the
 *   bottom of the input
 * - The first `<label>` that is associated with the input using for="inputId"
 * - The closest parent `<label>`
 *
 * @param {Element} $input - The input
 * @returns {Element | null} Associated legend or label, or null if no associated
 *   legend or label can be found
 */
ErrorSummary.prototype.getAssociatedLegendOrLabel = function ($input) {
  var $fieldset = $input.closest('fieldset')

  if ($fieldset) {
    var $legends = $fieldset.getElementsByTagName('legend')

    if ($legends.length) {
      var $candidateLegend = $legends[0]

      // If the input type is radio or checkbox, always use the legend if there
      // is one.
      if ($input instanceof HTMLInputElement && ($input.type === 'checkbox' || $input.type === 'radio')) {
        return $candidateLegend
      }

      // For other input types, only scroll to the fieldset’s legend (instead of
      // the label associated with the input) if the input would end up in the
      // top half of the screen.
      //
      // This should avoid situations where the input either ends up off the
      // screen, or obscured by a software keyboard.
      var legendTop = $candidateLegend.getBoundingClientRect().top
      var inputRect = $input.getBoundingClientRect()

      // If the browser doesn't support Element.getBoundingClientRect().height
      // or window.innerHeight (like IE8), bail and just link to the label.
      if (inputRect.height && window.innerHeight) {
        var inputBottom = inputRect.top + inputRect.height

        if (inputBottom - legendTop < window.innerHeight / 2) {
          return $candidateLegend
        }
      }
    }
  }

  return document.querySelector("label[for='" + $input.getAttribute('id') + "']") ||
    $input.closest('label')
}

export default ErrorSummary

/**
 * Error summary config
 *
 * @typedef {object} ErrorSummaryConfig
 * @property {boolean} [disableAutoFocus = false] -
 *  If set to `true` the error summary will not be focussed when the page loads.
 */
