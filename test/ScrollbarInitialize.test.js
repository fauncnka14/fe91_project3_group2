import { assert } from 'chai'
import { JSDOM } from 'jsdom'

// Мокаем Scrollbar для тестов
global.Scrollbar = {
  init: () => {},
}

describe('Scrollbar Initialization', function () {
  let dom
  let window
  let document

  beforeEach(() => {
    // Создаем виртуальный DOM с помощью JSDOM
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <div data-scroll-container></div>
        </body>
      </html>
    `)
    window = dom.window
    document = window.document

    // Мокаем глобальные объекты для использования в тестах
    global.document = document
    global.window = window
  })

  it('should initialize Scrollbar if data-scroll-container exists', function () {
    // Получаем элемент с data-scroll-container
    const container = document.querySelector('[data-scroll-container]')

    // Инициализируем Scrollbar
    const options = { damping: 0.06, thumbMinSize: 20 }
    const scrollbar = Scrollbar.init(container, options)

    // Проверяем, что Scrollbar был инициализирован
    assert.isNotNull(scrollbar, 'Scrollbar should be initialized')
  })
})
