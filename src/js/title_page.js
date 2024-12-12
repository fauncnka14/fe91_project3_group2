window.addEventListener('load', (event) => {
  new cursoreffects.fairyDustCursor({
    colors: ['#00000', '#ffffff', '#0000ff'],
  })
})

// Добавление библиотеки и создание текущей даты

document.addEventListener('DOMContentLoaded', () => {
  const currentDate = new Date()
  const formattedDate = dateFns.format(currentDate, 'dd-MM-yyyy HH:mm:ss')
  console.log(`Текущая дата и время: ${formattedDate}`)

  const currentTime = document.getElementById('current-time')
  currentTime.textContent = ` ${formattedDate}`
})
// Создание переключателя темы
class ThemeSwithcer {
  selectors = {
    switchThemeButton: '[data-js-theme-switcher]',
  }
  themes = {
    dark: 'dark',
    light: 'light',
  }
  stateClasses = {
    isDarkTheme: 'is-dark-theme',
  }

  storageKey = 'them'

  constructor() {
    this.switchThemeButtonElement = document.querySelector(
      this.selectors.switchThemeButton
    )
    this.setInitialTheme()
    this.bindEvents()
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
  onClick = () => {
    localStorage.setItem(
      this.storageKey,
      this.isDarkThemeCached ? this.themes.light : this.themes.dark
    )
    document.documentElement.classList.toggle(this.stateClasses.isDarkTheme)
  }

  bindEvents() {
    this.switchThemeButtonElement.addEventListener('click', this.onClick)
  }
}
new ThemeSwithcer()
// Создание печатающего текста
document.addEventListener('DOMContentLoaded', () => {
  const options = {
    strings: [
      'Готова к новым вызовам!',
      'Всегда открыта для интересных проектов!',
    ],
    typeSpeed: 40,
    backSpeed: 25,
    loop: true,
  }

  new Typed('#typed-text', options)
})
// Запрос к JSONserver мои достижения
document.addEventListener('DOMContentLoaded', () => {
  const achievementsTitle = document.getElementById('achievementsTitle')
  const achievementsGrid = document.getElementById('achievementsGrid')
  const achievementsBtn = document.getElementById('achievementsBtn')
  let isAchievementsVisible = false
  achievementsBtn.addEventListener('click', toggleAchievements)
  function toggleAchievements() {
    if (isAchievementsVisible) {
      achievementsGrid.innerHTML = ''
      achievementsTitle.innerHTML = ''
      isAchievementsVisible = false
      achievementsBtn.textContent = 'Показать достижения '
    } else {
      fetch('http://localhost:3000/achievements')
        .then((response) => {
          return response.json()
        })

        .then((data) => {
          achievementsGrid.innerHTML = ''
          data.forEach((achievement) => {
            achievementsTitle.innerHTML = 'Мои личные достижения '
            const card = document.createElement('div')
            card.classList.add('achievement-card')
            card.innerHTML = `
          <h3 class = "achievement-card__title">${achievement.title}</h3>
          <p class="achievement-card__description">${achievement.description}</p>
          <span class="achievement-card__date">${achievement.date}</span>
          `
            achievementsGrid.appendChild(card)
          })
          isAchievementsVisible = true
          achievementsBtn.textContent = ' Скрыть достижения'
        })
        .catch((error) => {
          console.log('Ошибка загрузки данных:', error)
        })
    }
  }
})
// Получаем элементы бургера и навигации
const burgerMenu = document.querySelector('.burger-menu')
const nav = document.querySelector('.header__nav')

// Обработчик для переключения классов при клике на бургер-меню
burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('open') // Добавляем анимацию бургер-меню
  nav.classList.toggle('open') // Показываем или скрываем меню
})
