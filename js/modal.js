// ВАЖНО: querySelectorAll находит ВСЕ кнопки, а не только первую
const modalBtns = document.querySelectorAll('.more');
const modal = document.querySelector('.modal');

// Вешаем обработчик на каждую кнопку "Узнать больше"
modalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });
});

modal.addEventListener('click', (event) => {
    const target = event.target;
    // Закрываем при клике на затемнённый фон или крестик
    if (target.classList.contains('overlay') || target.classList.contains('modal__close')) {
        modal.classList.add('hidden');
    }
});
