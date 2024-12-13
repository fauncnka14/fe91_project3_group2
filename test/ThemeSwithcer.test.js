// jsdom предоставляет эмуляцию DOM в Node.js.
import { assert } from 'chai'
import { JSDOM } from 'jsdom'

// Определяем мок для localStorage и создаем симуляцию
const mockStorage = {
  store: {},
  getItem: function (key) {
    return this.store[key] || null
  },
  setItem: function (key, value) {
    this.store[key] = value
  },
  removeItem: function (key) {
    delete this.store[key]
  },
  clear: function () {
    this.store = {}
  },
}

class ThemeSwithcer {
  themes = {
    dark: 'dark',
    light: 'light',
  }
  stateClasses = {
    isDarkTheme: 'is-dark-theme',
  }
  storageKey = 'theme'

  constructor() {
    this.setInitialTheme()
  }

  get isDarkThemeCached() {
    return localStorage.getItem(this.storageKey) === this.themes.dark
  }

  setInitialTheme() {
    document.documentElement.classList.toggle(
      this.stateClasses.isDarkTheme,
      this.isDarkThemeCached
    )
  }

  onClick() {
    const newTheme = this.isDarkThemeCached
      ? this.themes.light
      : this.themes.dark
    localStorage.setItem(this.storageKey, newTheme)
    document.documentElement.classList.toggle(this.stateClasses.isDarkTheme)
  }
}

describe('ThemeSwithcer', () => {
  let themeSwitcher

  //   готовит тестовую среду для каждого теста, создавая нужные моки и очищая состояние.
  beforeEach(() => {
    // Эмуляция DOM
    // рисуем стандартный  doctype для HTML
    const dom = new JSDOM(
      `<!DOCTYPE html><html><head></head><body><div id="root"></div></body></html>`
    )
    global.document = dom.window.document
    global.window = dom.window

    // Мокаем localStorage
    global.localStorage = mockStorage

    // Очистка перед каждым тестом
    localStorage.clear()
    document.documentElement.className = ''

    // После очистки состояния и мока localStorage создаётся новый экземпляр класса ThemeSwithcer. Это объект, который будет тестироваться.
    themeSwitcher = new ThemeSwithcer()
  })

  it('должен переключить тему на "dark"', () => {
    themeSwitcher.onClick()
    assert.equal(localStorage.getItem('theme'), 'dark')
    assert.isTrue(document.documentElement.classList.contains('is-dark-theme'))
  })

  it('должен переключить тему на "light", если была "dark"', () => {
    localStorage.setItem('theme', 'dark')
    themeSwitcher.setInitialTheme()
    themeSwitcher.onClick()
    assert.equal(localStorage.getItem('theme'), 'light')
    assert.isFalse(document.documentElement.classList.contains('is-dark-theme'))
  })
})
