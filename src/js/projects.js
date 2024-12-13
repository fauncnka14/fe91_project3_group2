const cards = document.querySelectorAll('.card__container')
cards.forEach((card) => {
  card.addEventListener('click', (e) => {
    anime({
      targets: card,
      rotateY: '+= 180',
      easing: 'easeInOutSine',
      duration: 700,
    })
  })
})
