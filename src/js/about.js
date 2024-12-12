document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('[data-scroll-container]')

  const options = {
    damping: 0.06,
    thumbMinSize: 20,
  }

  const scrollbar = Scrollbar.init(container, options)
})

document.addEventListener('DOMContentLoaded', function () {
  const swiperContainer = document.querySelector('.swiper-container')

  function initSwiper() {
    if (window.innerWidth <= 1024) {
      if (!swiperContainer.swiper) {
        new Swiper('.swiper-container', {
          loop: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          slidesPerView: 'auto',
          spaceBetween: 80,
          centeredSlides: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          effect: 'coverflow',
          coverflowEffect: {
            rotate: 0,
            stretch: 10,
            depth: 80,
            modifier: 5,
            slideShadows: true,
          },
        })
      }
    } else {
      if (swiperContainer.swiper) {
        swiperContainer.swiper.destroy()
      }
    }
  }

  // Инициализируем Swiper при загрузке
  initSwiper()

  // Отслеживаем изменение ширины экрана
  window.addEventListener('resize', initSwiper)
})
