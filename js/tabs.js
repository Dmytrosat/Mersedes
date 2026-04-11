const tabsHandlerElems = document.querySelectorAll('[data-tabs-handler]');
const tabsContentElems = document.querySelectorAll('[data-tabs-field]');
const tabsTitleElems = document.querySelectorAll('[data-tabs-title]'); // заголовки

for (let btn of tabsHandlerElems) {
    btn.addEventListener('click', () => {
        
        // Активный таб
        tabsHandlerElems.forEach(item => item.classList.remove('design-list__item_active'));
        btn.classList.add('design-list__item_active');

        // Контент
        tabsContentElems.forEach(content => {
            if (content.dataset.tabsField === btn.dataset.tabsHandler) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        });

        // Заголовки
        tabsTitleElems.forEach(title => {
            if (title.dataset.tabsTitle === btn.dataset.tabsHandler) {
                title.classList.remove('hidden');
            } else {
                title.classList.add('hidden');
            }
        });
    });
}