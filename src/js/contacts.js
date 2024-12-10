const inputFields = document.querySelectorAll('.input-field')

inputFields.forEach(function (input) {
  input.addEventListener('focus', function () {
    input.style.border = '4px solid var(--color-text)' //Изменение границы при фокусе
  })

  input.addEventListener('blur', function () {
    input.style.border = '' //Восстановление стандартной границы после потери фокуса
  })
})
