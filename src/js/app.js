let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

let taskPriority = '';
const tasksList = document.querySelector('.task-list');
const addName = document.querySelector('.create__task-name');

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Открытие формы добавления задачи
document.querySelectorAll('.open__form').forEach(openFolderButton => {
    openFolderButton.addEventListener('click', () => {
        document.querySelector('.create__task').classList.add('create__task--active');

        addName.focus();
    });
});

// Закрытие формы добавления задачи
document.querySelector('.create__task').addEventListener('click', event => {
    if (!document.querySelector('.create__task-wrapper').contains(event.target)) {
        if (document.querySelector('.create__task-priorities').classList.contains('create__task-priorities--active')) {
            document.querySelector('.create__task-priorities').classList.remove('create__task-priorities--active');
        } else {
            document.querySelector('.create__task').classList.remove('create__task--active');
            addName.value = '';
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
    if (!document.querySelector('.header__top-settings').contains(event.target)) {
        document.querySelector('.header__top-remove').classList.remove('header__top-remove--active');
    };
});

// Добавление задачи
document.querySelector('.create__task-add').addEventListener('click', () => {
    if (addName.value.trim().length == 0) return addName.focus();

    createTask();

    addName.value = ''
    addName.focus();
});

// Создание задачи
const createTask = () => {
    tasks.push({
        name: addName.value,
        completed: false,
        priority: taskPriority,
    });

    renderTask();
    updateLocal();
}

// Шаблон задачи
const createTaskTemplate = (item, index) => {
    return `
        <div class="task">
            <div class="task__inner">
                <button class="task__completed">
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.09467 10.784L0.219661 5.98988C-0.0732203 5.70186 -0.0732203 5.23487 0.219661 4.94682L1.2803 3.90377C1.57318 3.61572 2.04808 3.61572 2.34096 3.90377L5.625 7.13326L12.659 0.216014C12.9519 -0.0720048 13.4268 -0.0720048 13.7197 0.216014L14.7803 1.25907C15.0732 1.54709 15.0732 2.01408 14.7803 2.30213L6.15533 10.784C5.86242 11.072 5.38755 11.072 5.09467 10.784Z"
                            fill="#4DD599" />
                    </svg>
                </button>
                <textarea class="task__name" rows="1" readonly>${item.name}</textarea>
                <button class="task__button task__button-edit">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen"
                        class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512">
                        <path fill="currentColor"
                            d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
                        </path>
                    </svg>
                </button>
                <button class="task__button task__button-remove">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash"
                        class="svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512">
                        <path fill="currentColor"
                            d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z">
                        </path>
                    </svg>
                </button>
                <div class="task__priority" id="color-green"></div>
            </div>
            <div class="task__edit">
                <div class="task__edit-wrapper">
                    <div class="task__edit-inner">
                        <h2 class="task__edit-title title">Редактировать задачу</h2>
                        <textarea class="task__edit-name" rows="4" placeholder="Название задачи"></textarea>
                        <button class="task__edit-priority-button">
                            <div class="task__edit-priority-selected" id="color-green"></div>
                            <p class="task__edit-priority-title">Установить приоритет</p>
                        </button>
                        <div class="task__edit-priorities">
                            <h2 class="task__edit-priorities-title">Выберите приоритет</h2>
                            <button class="task__edit-priority priority">
                                <div class="task__edit-priority-selected" id="color-red"></div>
                                <p class="task__edit-priority-title">Высокий</p>
                            </button>
                            <button class="task__edit-priority">
                                <div class="task__edit-priority-selected" id="color-yellow"></div>
                                <p class="task__edit-priority-title">Средний</p>
                            </button>
                            <button class="task__edit-priority">
                                <div class="task__edit-priority-selected" id="color-green"></div>
                                <p class="task__edit-priority-title">Низкий</p>
                            </button>
                            <button class="task__edit-priority task__edit-priority--active">
                                <p class="task__edit-priority-title">Нет приоритета</p>
                            </button>
                        </div>
                        <button class="task__edit-remove">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash"
                                class="svg-inline--fa fa-trash fa-w-14" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor"
                                    d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `
}

// Отображение задач
const renderTask = () => {
    tasksList.innerHTML = '';

    if (tasks.length > 0) {
        tasks.forEach((item, index) => {
            tasksList.innerHTML += createTaskTemplate(item, index);
        });
        document.querySelector('.tasks__none').classList.remove('tasks__none--active');
    } else {
        document.querySelector('.tasks__none').classList.add('tasks__none--active');
    };
}

renderTask();