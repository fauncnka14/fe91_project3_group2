const inputFields = document.querySelectorAll('.input-field')

inputFields.forEach(function (input) {
  input.addEventListener('focus', function () {
    input.style.border = '4px solid var(--color-text)' //Изменение границы при фокусе
  })

  input.addEventListener('blur', function () {
    input.style.border = '' //Восстановление стандартной границы после потери фокуса
  })
})

const form = document.forms.contactForm
const nameInput = form.elements.name
const emailInput = form.elements.email
const messageInput = form.elements.message
const nameError = document.getElementById('nameError')
const emailError = document.getElementById('emailError')
const messageError = document.getElementById('inputError')
try {
  form.addEventListener('submit', function (evt) {
    evt.preventDefault()
    let hasError = false

    // Очистка предыдущих сообщений об ошибках
    nameError.style.display = 'none'
    emailError.style.display = 'none'
    messageError.style.display = 'none'

    if (nameInput.value === '') {
      nameError.textContent = 'Введите имя пользователя.'
      nameError.style.display = 'block'
      hasError = true
    }

    if (validateEmail(emailInput.value) === false) {
      emailError.textContent = 'Введите корректный email.'
      emailError.style.display = 'block'
      hasError = true
    }

    if (messageInput.value === '') {
      messageError.textContent = 'напишите, о чем вы бы хотели узнать?'
      messageError.style.display = 'block'
      hasError = true
    }

    if (hasError === false) {
      alert('Форма успешно отправлена!')
      form.reset()
    }
  })
} catch (err) {
  console.log('error not expected')
}

function validateEmail(email) {
  let regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}
