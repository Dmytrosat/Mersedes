const burger = document.querySelector('.humburger-menu');
const menuElem = document.querySelector('.menu');

const toggleMenu = () => {
    menuElem.classList.toggle('menu-active');
    burger.classList.toggle('humburger-menu-active');
}

burger.addEventListener('click', () => {
    toggleMenu();
});

// Добавляем закрытие меню при клике на любой пункт/ссылку внутри него
menuElem.addEventListener('click', (event) => {
    // closest('a') сработает, если кликнули на ссылку или любой элемент внутри неё
    if (event.target.closest('a')) {
        menuElem.classList.remove('menu-active');
        burger.classList.remove('humburger-menu-active');
    }
});