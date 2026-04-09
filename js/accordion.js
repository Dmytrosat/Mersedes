const lists = document.querySelectorAll('.feature-sub');
const btns = document.querySelectorAll('.feature__link');

btns.forEach((btnItem, index) => {
    btnItem.addEventListener('click', () => {
        // 1. Проверяем, был ли уже активен нажатый элемент до клика
        const isAlreadyActive = btnItem.classList.contains('feature__link_active');

        // 2. Сбрасываем состояние всех элементов аккордеона:
        //    убираем активный класс у всех кнопок и скрываем все списки
        btns.forEach(btn => btn.classList.remove('feature__link_active'));
        lists.forEach(list => list.classList.add('hidden'));

        // 3. Если элемент НЕ был активен, открываем его
        if (!isAlreadyActive) {
            btnItem.classList.add('feature__link_active');
            lists[index].classList.remove('hidden');
        }
        // Если элемент УЖЕ был активен, код выше уже скрыл список и убрал подсветку.
        // Таким образом, повторный клик успешно закрывает аккордеон.
    });
});