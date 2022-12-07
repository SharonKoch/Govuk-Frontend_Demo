import '../../vendor/polyfills/Element/prototype/classList.mjs'
import '../../vendor/polyfills/Event.mjs'
import '../../vendor/polyfills/Function/prototype/bind.mjs'

/**
 * Header component
 *
 * @class
 * @param {Element} $module - HTML element to use for header
 */
function Header ($module) {
  if (!($module instanceof HTMLElement)) {
    // Return instance for method chaining
    // using `new Header($module).init()`
    return this
  }

  this.$module = $module
  this.$menuButton = $module.querySelector('.govuk-js-header-toggle')
  this.$menu = this.$menuButton && $module.querySelector(
    '#' + this.$menuButton.getAttribute('aria-controls')
  )

  // Save the opened/closed state for the nav in memory so that we can
  // accurately maintain state when the screen is changed from small to
  // big and back to small
  this.menuIsOpen = false

  // A global const for storing a matchMedia instance which we'll use to
  // detect when a screen size change happens. We set this later during the
  // init function and rely on it being null if the feature isn't available
  // to initially apply hidden attributes
  this.mql = null
}

/**
 * Initialise component
 *
 * Check for the presence of the header, menu and menu button – if any are
 * missing then there's nothing to do so return early.
 * Feature sniff for and apply a matchMedia for desktop which will
 * trigger a state sync if the browser viewport moves between states. If
 * matchMedia isn't available, hide the menu button and present the "no js"
 * version of the menu to the user.
 *
 * @returns {Header} Header component
 */
Header.prototype.init = function () {
  // Check that required elements are present
  if (!this.$module || !this.$menuButton || !this.$menu) {
    return this
  }

  if ('matchMedia' in window) {
    // Set the matchMedia to the govuk-frontend desktop breakpoint
    this.mql = window.matchMedia('(min-width: 48.0625em)')

    var listenerMethod = 'addEventListener' in this.mql
      ? 'addEventListener'
      : 'addListener'

    // addListener is a deprecated function, however addEventListener
    // isn't supported by IE or Safari. We therefore add this in as
    // a fallback for those browsers
    this.mql[listenerMethod]('change', this.syncState.bind(this))

    this.syncState()
    this.$menuButton.addEventListener('click', this.handleMenuButtonClick.bind(this))
  } else {
    this.$menuButton.setAttribute('hidden', '')
  }

  // Return instance for assignment
  // `var myHeader = new Header($module).init()`
  return this
}

/**
 * Sync menu state
 *
 * Uses the global variable menuIsOpen to correctly set the accessible and
 * visual states of the menu and the menu button.
 * Additionally will force the menu to be visible and the menu button to be
 * hidden if the matchMedia is triggered to desktop.
 */
Header.prototype.syncState = function () {
  if (this.mql.matches) {
    this.$menu.removeAttribute('hidden')
    this.$menuButton.setAttribute('hidden', '')
  } else {
    this.$menuButton.removeAttribute('hidden')
    this.$menuButton.setAttribute('aria-expanded', this.menuIsOpen.toString())

    if (this.menuIsOpen) {
      this.$menu.removeAttribute('hidden')
    } else {
      this.$menu.setAttribute('hidden', '')
    }
  }
}

/**
 * Handle menu button click
 *
 * When the menu button is clicked, change the visibility of the menu and then
 * sync the accessibility state and menu button state
 */
Header.prototype.handleMenuButtonClick = function () {
  this.menuIsOpen = !this.menuIsOpen
  this.syncState()
}

export default Header
