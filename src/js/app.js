// Открытие формы добавления задачи
document.querySelectorAll('.open__form').forEach(openFolderButton => {
    openFolderButton.addEventListener('click', () => {
        document.querySelector('.create__task').classList.add('create__task--active');
    });
});

// Закрытие формы добавления задачи
document.querySelector('.create__task').addEventListener('click', event => {
    if (!document.querySelector('.create__task-wrapper').contains(event.target)) {
        if (document.querySelector('.create__task-priorities').classList.contains('create__task-priorities--active')) {
            document.querySelector('.create__task-priorities').classList.remove('create__task-priorities--active');
        } else {
            document.querySelector('.create__task').classList.remove('create__task--active');
        };
    };
});

// Открыть выбор цвета
document.querySelector('.create__task-priority-button').addEventListener('click', () => {
    document.querySelector('.create__task-priorities').classList.add('create__task-priorities--active');
});

// Открыть удаление всех задач
document.querySelector('.header__top-settings').addEventListener('click', () => {
    document.querySelector('.header__top-remove').classList.toggle('header__top-remove--active');
});

// Закрыть удаление всех задач
document.addEventListener('click', event => {
    if(!document.querySelector('.header__top-settings').contains(event.target)) {
        document.querySelector('.header__top-remove').classList.remove('header__top-remove--active');
    };
});