import { nodeListForEach } from '../../common.mjs'

function HideThisPage ($module) {
  this.$module = $module
  this.escCounter = 0
}

HideThisPage.prototype.exitPage = function (e) {
  var isClickEvent = typeof e !== 'undefined'

  if (isClickEvent) {
    e.preventDefault()
  }

  var target = isClickEvent ? e.target : document.querySelector('.govuk-js-hide-this-page-button')
  window.location.href = target.href
}

HideThisPage.prototype.init = function () {
  // We put the loop here instead of in all.js because we want to have both listeners on the individual buttons for clicks
  // and a single listener for the keyboard shortcut
  nodeListForEach(this.$module, function ($button) {
    $button.querySelector('.govuk-js-hide-this-page-button').addEventListener('click', this.exitPage)
  }.bind(this))

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.keyCode === 27 || e.which === 27) {
      this.escCounter += 1

      if (this.escCounter === 3) {
        this.escCounter = 0
        this.exitPage()
      }

      setTimeout(function () {
        this.escCounter = 0
      }.bind(this), 2000)
    }
  }.bind(this))
}

export default HideThisPage
