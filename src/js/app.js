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
    if (!document.querySelector('.create__task-priority-button').contains(event.target)) {
        if (!document.querySelector('.create__task-priorities').contains(event.target)) {
            document.querySelector('.create__task-priorities').classList.remove('create__task-priorities--active');
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

// Выбор приоритета
const selectedPriority = () => {
    document.querySelectorAll('.create__task-priority').forEach(priority => {
        priority.addEventListener('click', () => {

            document.querySelectorAll('.create__task-priority').forEach(priority => {
                priority.classList.remove('create__task-priority--active');
            });

            priority.classList.add('create__task-priority--active');

            if (priority.querySelector('.create__task-priority-selected') == null) {
                taskPriority = '';
                document.querySelector('.create__task-priority-selected').id = 'color-green';
                document.querySelector('.create__task-priority-button .create__task-priority-title').innerHTML = 'Установить приоритет';
            } else {
                taskPriority = priority.querySelector('.create__task-priority-selected').id;
                document.querySelector('.create__task-priority-selected').id = priority.querySelector('.create__task-priority-selected').id;
                document.querySelector('.create__task-priority-button .create__task-priority-title').innerHTML = `Приоритет - ${priority.querySelector('.create__task-priority-title').innerHTML.toLocaleLowerCase()}`;
            };

            document.querySelector('.create__task-priorities').classList.remove('create__task-priorities--active');
        });

        document.querySelectorAll('.create__task-priority').forEach(priority => {
            priority.classList.remove('create__task-priority--active');
        });

        document.querySelectorAll('.create__task-priority')[document.querySelectorAll('.create__task-priority').length - 1].classList.add('create__task-priority--active');

        taskPriority = '';
        document.querySelector('.create__task-priority-selected').id = 'color-green';
        document.querySelector('.create__task-priority-button .create__task-priority-title').innerHTML = 'Установить приоритет';
    });
}

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
const createTaskTemplate = (task, index) => {
    return `
        <div class="task" data-index="${index}">
            <div class="task__inner">
                <button class="task__completed">
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.09467 10.784L0.219661 5.98988C-0.0732203 5.70186 -0.0732203 5.23487 0.219661 4.94682L1.2803 3.90377C1.57318 3.61572 2.04808 3.61572 2.34096 3.90377L5.625 7.13326L12.659 0.216014C12.9519 -0.0720048 13.4268 -0.0720048 13.7197 0.216014L14.7803 1.25907C15.0732 1.54709 15.0732 2.01408 14.7803 2.30213L6.15533 10.784C5.86242 11.072 5.38755 11.072 5.09467 10.784Z"
                            fill="#4DD599" />
                    </svg>
                </button>
                <textarea class="task__name" rows="1" readonly>${task.name.replace(/ +/g, ' ').trim()}</textarea>
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
                <div class="task__priority" id="${task.priority}"></div>
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
                            <button class="task__edit-priority">
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
                            <div class="task__edit-priority-selected" id=""></div>
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
    selectedPriority();

    tasksList.innerHTML = '';

    if (tasks.length > 0) {

        filterTask();

        tasks.forEach((item, index) => {
            tasksList.innerHTML += createTaskTemplate(item, index);
        });
        document.querySelector('.tasks__none').classList.remove('tasks__none--active');
    } else {
        document.querySelector('.tasks__none').classList.add('tasks__none--active');
    };

    document.querySelectorAll('.task').forEach(task => {
        editTask(task);
        removeTask(task);
        completedTask(task);

        if (task.classList.contains('task--completed')) {
            task.querySelector('.task__button-edit').disabled = 'true';
        };
    });

    let allTaskLength = document.querySelectorAll('.task').length;
    let completedTaskLength = document.querySelectorAll('.task--completed').length;

    document.querySelector('.header__bottom-all-task').innerHTML = allTaskLength;
    document.querySelector('.header__bottom-task-completed').innerHTML = completedTaskLength;

    if (isNaN(calcPercent(allTaskLength, completedTaskLength))) {
        document.querySelector('.header__bottom-progress-count').innerHTML = 0;
        document.querySelector('.header__bottom-progress-bar-bg').style.width = 0;
    } else {
        document.querySelector('.header__bottom-progress-count').innerHTML = Math.floor(calcPercent(allTaskLength, completedTaskLength));
        document.querySelector('.header__bottom-progress-bar-bg').style.width = `${calcPercent(allTaskLength, completedTaskLength)}%`;
    };
}

const calcPercent = (num1, num2) => {
    return 100 * num2 / num1;
}

// Редактирование задачи
const editTask = (task) => {
    task.querySelector('.task__button-edit').addEventListener('click', () => {
        task.querySelector('.task__edit').classList.add('task__edit--active');

        task.querySelector('.task__edit-name').focus();
        task.querySelector('.task__edit-name').value = task.querySelector('.task__name').value;

        if (tasks[task.dataset.index].priority == 'color-red') {
            task.querySelector('.task__edit-priority-button .task__edit-priority-title').innerHTML = 'Приоритет - высокий';
        } else if (tasks[task.dataset.index].priority == 'color-yellow') {
            task.querySelector('.task__edit-priority-button .task__edit-priority-title').innerHTML = 'Приоритет - средний';
        } else if (tasks[task.dataset.index].priority == 'color-green') {
            task.querySelector('.task__edit-priority-button .task__edit-priority-title').innerHTML = 'Приоритет - низкий';
        } else {
            task.querySelector('.task__edit-priority-button .task__edit-priority-title').innerHTML = 'Установить приоритет';
        };

        if (tasks[task.dataset.index].priority == '') {
            task.querySelector('.task__edit-priority-selected').id = 'color-green';
        } else {
            task.querySelector('.task__edit-priority-selected').id = tasks[task.dataset.index].priority;
        };

        changeTaskName(task);
        changeTaskPriority(task);
    });

    task.querySelector('.task__edit').addEventListener('click', event => {
        if (!task.querySelector('.task__edit-wrapper').contains(event.target)) {
            if (task.querySelector('.task__edit-priorities').classList.contains('task__edit-priorities--active')) {
                task.querySelector('.task__edit-priorities').classList.remove('task__edit-priorities--active');
            } else {
                task.querySelector('.task__edit').classList.remove('task__edit--active');
            };
        };
        if (!task.querySelector('.task__edit-priority-button').contains(event.target)) {
            if (!task.querySelector('.task__edit-priorities').contains(event.target)) {
                task.querySelector('.task__edit-priorities').classList.remove('task__edit-priorities--active');
            };
        };
    });
}

// Смена названия задачи
const changeTaskName = (task) => {
    task.querySelector('.task__edit-name').addEventListener('change', () => {
        if (task.querySelector('.task__edit-name').value.replace(/ +/g, ' ').trim().length == 0) return task.querySelector('.task__edit-name').focus();

        tasks[task.dataset.index].name = task.querySelector('.task__edit-name').value;
        updateLocal();
        task.querySelector('.task__name').value = task.querySelector('.task__edit-name').value.replace(/ +/g, ' ').trim();
    });
}

// Смена приоритета задачи
const changeTaskPriority = (task) => {
    task.querySelector('.task__edit-priority-button').addEventListener('click', () => {
        task.querySelector('.task__edit-priorities').classList.add('task__edit-priorities--active');

        task.querySelectorAll('.task__edit-priority').forEach(priority => {
            if (priority.querySelector('.task__edit-priority-selected').id == tasks[task.dataset.index].priority) {
                priority.classList.add('task__edit-priority--active');
            } else {
                priority.classList.remove('task__edit-priority--active');
            };

            priority.addEventListener('click', () => {
                task.querySelectorAll('.task__edit-priority').forEach(priority => {
                    priority.classList.remove('task__edit-priority--active');
                });
                priority.classList.add('task__edit-priority--active');

                tasks[task.dataset.index].priority = priority.querySelector('.task__edit-priority-selected').id;
                updateLocal();
                task.querySelector('.task__priority').id = tasks[task.dataset.index].priority;

                if (tasks[task.dataset.index].priority == '') {
                    task.querySelector('.task__edit-priority-selected').id = 'color-green';
                } else {
                    task.querySelector('.task__edit-priority-selected').id = tasks[task.dataset.index].priority;
                };

                if (priority.querySelector('.task__edit-priority-title').innerHTML.toLocaleLowerCase() == 'нет приоритета') {
                    task.querySelector('.task__edit-priority-button .task__edit-priority-title').innerHTML = 'Установить приоритет';
                } else {
                    task.querySelector('.task__edit-priority-button .task__edit-priority-title').innerHTML = `Приоритет - ${priority.querySelector('.task__edit-priority-title').innerHTML.toLocaleLowerCase()}`;
                };

                task.querySelector('.task__edit-priorities').classList.remove('task__edit-priorities--active');
            });
        });
    });
}

// Удаление задачи
const removeTask = (task) => {
    task.querySelector('.task__button-remove').addEventListener('click', () => {
        tasks.splice([task.dataset.index], 1);
        updateLocal();
        renderTask();
    });

    task.querySelector('.task__edit-remove').addEventListener('click', () => {
        tasks.splice(task.dataset.index, 1);
        updateLocal();
        task.querySelector('.task__edit').classList.remove('task__edit--active');

        setTimeout(() => {
            renderTask();
        }, 500);
    });
}

// Удаление всех задач
document.querySelector('.header__top-remove').addEventListener('click', () => {
    tasks.splice(0, document.querySelectorAll('.task').length);
    updateLocal();
    renderTask();
});

// Выполнение задачи
const completedTask = (task) => {
    task.querySelector('.task__completed').addEventListener('click', () => {
        tasks[task.dataset.index].completed = !tasks[task.dataset.index].completed;

        updateLocal();
        renderTask();
    });

    if (tasks[task.dataset.index].completed) {
        task.classList.add('task--completed');
    } else {
        task.classList.remove('task--completed');
    };
}

// Сначала показывать активные задачи
const filterTask = () => {
    const activeTasks = tasks.length && tasks.filter(task => task.completed == false);
    const completedTasks = tasks.length && tasks.filter(task => task.completed == true);
    tasks = [...activeTasks, ...completedTasks];
}

renderTask();