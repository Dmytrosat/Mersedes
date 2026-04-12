// Находим форму по классу
const form = document.querySelector('.form-test-drive');

// https://jsonplaceholder.typicode.com
form.addEventListener('submit', (event) => {
    // ❗ Предотвращаем стандартную отправку формы (перезагрузку страницы)
    event.preventDefault();

    // 🧹 Очищаем предыдущие сообщения об ошибках
    clearErrors();

    // Собираем данные из полей формы
    let data = {};
    let isValid = true; // Флаг валидации

    for (let { name, value, type } of form.elements) {
        // Пропускаем элементы без name и кнопки
        if (!name || type === 'submit' || type === 'button') continue;

        // Удаляем пробелы по краям и проверяем на пустоту
        const trimmedValue = value.trim();

        if (trimmedValue === '') {
            isValid = false;
            showError(name, 'Это поле обязательно для заполнения');
            continue;
        }

        // Дополнительная проверка для email (опционально)
        if (name === 'email' && !isValidEmail(trimmedValue)) {
            isValid = false;
            showError(name, 'Введите корректный email');
            continue;
        }

        // Поле прошло валидацию — добавляем в объект данных
        data[name] = trimmedValue;
    }

    // Если есть ошибки — останавливаем выполнение
    if (!isValid) {
        alert('Пожалуйста, исправьте ошибки в форме');
        return;
    }

    // Отправляем данные на сервер
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Указываем формат данных
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        // Проверяем статус ответа (200 = ОК, 201 = Создано)
        if (response.status === 200 || response.status === 201) {
            return response.json();
        } else {
            throw new Error(response.status);
        }
    })
    .then(data => {
        // Успех: показываем сообщение и очищаем форму
        alert('Данные успешно сохранены!');
        form.reset();
        clearErrors();
    })
    .catch(error => {
        // ❌ Обработка ошибок сети или сервера
        console.error('Ошибка отправки:', error);
        alert('Произошла ошибка, статус: ' + error.message);
    });
});

// 🔧 Вспомогательная функция: показать ошибку у поля
function showError(fieldName, message) {
    const field = form.elements[fieldName];
    if (!field) return;

    // Добавляем визуальный индикатор ошибки
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');

    // Создаём или находим элемент с сообщением
    let errorEl = field.parentNode.querySelector('.error-message');
    if (!errorEl) {
        errorEl = document.createElement('small');
        errorEl.className = 'error-message';
        errorEl.style.color = '#dc3545';
        errorEl.style.fontSize = '0.875rem';
        field.parentNode.appendChild(errorEl);
    }
    errorEl.textContent = message;
}

// 🔧 Вспомогательная функция: очистить все ошибки
function clearErrors() {
    // Убираем классы ошибок и сообщения
    form.querySelectorAll('.error').forEach(el => {
        el.classList.remove('error');
        el.removeAttribute('aria-invalid');
    });
    form.querySelectorAll('.error-message').forEach(el => el.remove());
}

// 🔧 Вспомогательная функция: простая валидация email
function isValidEmail(email) {
    // Базовый паттерн для email (можно усложнить при необходимости)
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}