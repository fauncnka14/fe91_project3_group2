document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('[data-scroll-container]')

  const options = {
    damping: 0.06,
    thumbMinSize: 20,
  }

  const scrollbar = Scrollbar.init(container, options)
})

$(document).ready(function () {
  $('.images__item').mouseenter(function () {
    $(this).find('.images__item-overlay').fadeIn(400)
  })

  $('.images__item').mouseleave(function () {
    $(this).find('.images__item-overlay').fadeOut(400)
  })
})
