/*Chart js*/
Chart.register(ChartDataLabels)
function createHorizontalBarChart(canvasId, value, maxValue, gradientColors) {
  const ctx = document.getElementById(canvasId).getContext('2d')
  const gradient = ctx.createLinearGradient(0, 0, 500, 0) // Горизонтальный градиент
  gradient.addColorStop(0, gradientColors[0])
  gradient.addColorStop(1, gradientColors[1])

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [''], // Пустая метка
      datasets: [
        {
          data: [value], // Прогресс
          backgroundColor: gradient, // Градиент
          borderRadius: 15, // Скругление краёв
          barThickness: 30, // Толщина полоски
        },
      ],
    },
    options: {
      responsive: true,
      indexAxis: 'y', // Горизонтальная ориентация
      scales: {
        x: {
          display: false, // Скрыть ось X
          max: maxValue, // Максимум шкалы
          ticks: {
            callback: function (value) {
              return `${value}%` // Добавить % к значениям на оси
            },
          },
        },
        y: {
          display: false, // Скрыть ось Y
        },
      },
      plugins: {
        legend: { display: false }, // Убираем легенду
        tooltip: { enabled: false }, // Убираем подсказки
        datalabels: {
          formatter: (value) => `${value}%`, // Добавление % к числу
          color: '#000000', // Цвет текста
          align: 'center', // Центрирование внутри бара
          anchor: 'center', // Привязка текста к центру
          font: {
            weight: 'bold', // Жирный текст
            size: 13, // Размер шрифта
          },
        },
      },
      animation: {
        duration: 2000, // Время анимации в миллисекундах
        easing: 'linear', // Анимация
      },
    },
    plugins: [ChartDataLabels],
  })
}

// Пример вызова функции для трёх графиков
createHorizontalBarChart('chart1', 95, 100, ['#B89D7C', '#4facfe']) // Первый бар: 95%
createHorizontalBarChart('chart2', 95, 100, ['#B89D7C', '#4facfe']) // Второй бар: 70%
createHorizontalBarChart('chart3', 15, 100, ['#B89D7C', '#4facfe']) // Третий бар: 15%
