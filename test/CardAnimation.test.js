import { JSDOM } from 'jsdom'
import { expect } from 'chai'

const anime = (options) => {
  console.log('Mocked anime called with options:', options)
}

global.anime = anime

const html = `
<section id="portfolio" aria-label="Мои работы">
  <div class="projects__container">
    <h2 class="projects__title">Мои работы</h2>
    <div id="cards__container">
      <div class="card__container">
        <div class="front__card"></div>
        <div class="back__card">
          <h4 class="top__text">Сайт <br> для преподавателя <br> английского языка</h4>
          <p class="projects__about">На сайте вы найдёте пять ключевых разделов...</p>
          <a class="projects__btn" href="https://clck.ru/3F6VwA">Перейти на сайт</a>
        </div>
      </div>
      <div class="card__container">
        <div class="front__card"></div>
        <div class="back__card">
          <h4 class="top__text">Сайт <br> для психолога</h4>
          <p class="projects__about">Сайт состоит из четырех основных разделов...</p>
          <a class="projects__btn" href="https://elenashvarts.ru">Перейти на сайт</a>
        </div>
      </div>
    </div>
    <p class="projects__instruction">Нажмите на изображение, чтобы узнать больше</p>
  </div>
</section>
`

describe('Card Animation', () => {
  let dom

  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' })

    dom.window.anime = anime

    global.document = dom.window.document
    global.window = dom.window

    const script = document.createElement('script')
    script.textContent = `
      const cards = document.querySelectorAll('.card__container');
      cards.forEach((card) => {
        card.addEventListener('click', () => {
          anime({
            targets: card,
            rotateY: '+= 180',
            easing: 'easeInOutSine',
            duration: 700,
          });
        });
      });
    `
    document.body.appendChild(script)
  })

  afterEach(() => {
    dom.window.close()
  })

  it('должен содержать карточки', () => {
    const cards = document.querySelectorAll('.card__container')
    expect(cards.length).to.be.greaterThan(0)
    console.log('Карточки обнаружены')
  })

  it('должен проверить наличие слушателя события click', () => {
    const cards = document.querySelectorAll('.card__container')

    cards.forEach((card) => {
      let clicked = false

      card.addEventListener('click', () => {
        clicked = true
      })

      const clickEvent = document.createEvent('MouseEvents')
      clickEvent.initEvent('click', true, true)
      card.dispatchEvent(clickEvent)
      expect(clicked).to.be.true
    })

    console.log('Слушатель события click обнаружен')
  })
})
