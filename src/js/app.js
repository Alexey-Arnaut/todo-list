let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

let taskPriority = '';
const tasksList = document.querySelector('.task-list');
const addName = document.querySelector('.create__form-name');

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Открытие формы добавления задачи
document.querySelectorAll('.open__form').forEach(openFolderButton => {
    openFolderButton.addEventListener('click', () => {
        document.querySelector('.create-wrapper').classList.add('wrap--active');

        addName.focus();
    });
});

// Закрытие формы добавления задачи
document.querySelector('.create-wrapper').addEventListener('click', event => {
    if (!document.querySelector('.create-inner').contains(event.target)) {
        if (document.querySelector('.create__form-priorities').classList.contains('priorities--active')) {
            document.querySelector('.create__form-priorities').classList.remove('priorities--active');
        } else {
            document.querySelector('.create-wrapper').classList.remove('wrap--active');
            addName.value = '';
        };
    };
    if (!document.querySelector('.create__form-button-priorities').contains(event.target)) {
        if (!document.querySelector('.create__form-priorities').contains(event.target)) {
            document.querySelector('.create__form-priorities').classList.remove('priorities--active');
        };
    };
});

// Открыть выбор цвета
document.querySelector('.create__form-button-priorities').addEventListener('click', () => {
    document.querySelector('.create__form-priorities').classList.add('priorities--active');
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
document.querySelector('.create__form-button-add').addEventListener('click', () => {

    if (addName.value.replace(/ +/g, ' ').trim().length == 0) {
        addName.focus();
        addName.classList.add('error');
        document.querySelector('.create__form-button-add').disabled = true;

        setTimeout(() => {
            addName.classList.remove('error');
            document.querySelector('.create__form-button-add').disabled = false;
        }, 500);

        return;
    };

    createTask();

    addName.value = ''
    addName.focus();
});

// Выбор приоритета
const selectedPriority = () => {
    document.querySelectorAll('.create__form-priority').forEach(priority => {
        priority.addEventListener('click', () => {

            document.querySelectorAll('.create__form-priority').forEach(priority => {
                priority.classList.remove('priority--active');
            });

            priority.classList.add('priority--active');

            if (priority.querySelector('.create__form-priority-selected').id == 'color-white') {
                taskPriority = '';
                document.querySelector('.create__form-button-priorities-selected').id = 'color-white';
                document.querySelector('.create__form-button-priorities span').innerHTML = 'Установить приоритет';
            } else {
                taskPriority = priority.querySelector('.create__form-priority-selected').id;
                document.querySelector('.create__form-button-priorities-selected').id = priority.querySelector('.create__form-priority-selected').id;
                document.querySelector('.create__form-button-priorities span').innerHTML = `Приоритет - ${priority.querySelector('span').innerHTML.toLocaleLowerCase()}`;
            };

            document.querySelector('.create__form-priorities').classList.remove('priorities--active');
        });

        document.querySelectorAll('.create__form-priority').forEach(priority => {
            priority.classList.remove('priority--active');
        });

        document.querySelectorAll('.create__form-priority')[document.querySelectorAll('.create__form-priority').length - 1].classList.add('priority--active');

        taskPriority = '';
        document.querySelector('.create__form-button-priorities-selected').id = 'color-white';
        document.querySelector('.create__form-button-priorities span').innerHTML = 'Установить приоритет';
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

// Удаление и выполнение задач по свайпу
let initalPosition = null;
let diff = null;
let diffWidth = '';

const touchStart = (event) => {
    initalPosition = event.touches[0].clientX;
}

const touchMove = (task, event) => {
    const currentPosition = event.touches[0].clientX;
    diff = currentPosition - initalPosition;
    diffWidth = String(diff).split('-').join('');

    if (diff > 50 || diff < -50) {
        if (currentPosition < initalPosition) {
            task.querySelector('.task__inner-bg').style.left = '';
            task.querySelector('.task__inner-bg').style.right = 0;
            task.querySelector('.task__inner-bg').style.background = '#E44F4F';
            task.querySelector('.task__inner-bg').style.borderRadius = '30px 0 0 30px';
            task.querySelector('.task__inner-bg').innerHTML =
                `
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash"
                    class="svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512">
                    <path fill="currentColor"
                        d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z">
                    </path>
                </svg>
                `
        } else {
            task.querySelector('.task__inner-bg').style.left = 0;
            task.querySelector('.task__inner-bg').style.right = '';
            task.querySelector('.task__inner-bg').style.background = '#349eff';
            task.querySelector('.task__inner-bg').style.borderRadius = '0 30px 30px 0';
            task.querySelector('.task__inner-bg').innerHTML =
                `
                <svg width="15" height="11" viewBox="0 0 15 11" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5.09467 10.784L0.219661 5.98988C-0.0732203 5.70186 -0.0732203 5.23487 0.219661 4.94682L1.2803 3.90377C1.57318 3.61572 2.04808 3.61572 2.34096 3.90377L5.625 7.13326L12.659 0.216014C12.9519 -0.0720048 13.4268 -0.0720048 13.7197 0.216014L14.7803 1.25907C15.0732 1.54709 15.0732 2.01408 14.7803 2.30213L6.15533 10.784C5.86242 11.072 5.38755 11.072 5.09467 10.784Z"
                        fill="#4DD599" />
                </svg>
                `
        }

        if (diff > 150 || diff < -150) {
            return
        } else {
            task.querySelector('.task__inner').style.transform = `translate(${diff}px)`;
            task.querySelector('.task__inner-bg').style.width = parseInt(diffWidth) - 15 + 'px';
        };
    } else {
        task.querySelector('.task__inner').style.transform = 'translate(0px)';
        task.querySelector('.task__inner-bg').style.width = 0;
    }
}

const touchEnd = (task) => {
    task.querySelector('.task__inner').style.transform = 'translate(0px)';
    task.querySelector('.task__inner-bg').style.width = 0;

    if (diff >= 150) {
        tasks[task.dataset.index].completed = !tasks[task.dataset.index].completed;
        completedTask(task);

        setTimeout(() => {
            renderTask();
        }, 1000);
    };
    if (diff <= -150) {
        tasks.splice(task.dataset.index, 1);
        task.querySelector('.task__inner').classList.add('task--hide');

        setTimeout(() => {
            renderTask();
        }, 1000);
    };

    updateLocal();

    initalPosition = null;
    diff = null;
}

// Шаблон задачи
const createTaskTemplate = (task, index) => {
    return `
        <div class="task" data-index="${index}">
            <div class="task__inner">
                <div class="task__inner-bg"></div>
                <button class="task__completed">
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.09467 10.784L0.219661 5.98988C-0.0732203 5.70186 -0.0732203 5.23487 0.219661 4.94682L1.2803 3.90377C1.57318 3.61572 2.04808 3.61572 2.34096 3.90377L5.625 7.13326L12.659 0.216014C12.9519 -0.0720048 13.4268 -0.0720048 13.7197 0.216014L14.7803 1.25907C15.0732 1.54709 15.0732 2.01408 14.7803 2.30213L6.15533 10.784C5.86242 11.072 5.38755 11.072 5.09467 10.784Z"
                            fill="#4DD599" />
                    </svg>
                </button>
                <textarea class="task__name" rows="1"
                    readonly>${task.name.replace(/ +/g, ' ').trim()}</textarea>
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
            <div class="task__edit wrap">
                <div class="task__edit-inner inner">
                    <div class="task__edit-container container">
                        <h2 class="task__edit-title title">Редактировать задачу</h2>
                        <div class="task__edit-form form">
                            <textarea class="task__edit-name name" rows="4"
                                placeholder="Название задачи"></textarea>
                            <button class="task__edit-priority-button button-priorities button">
                                <div class="task__edit-priority-selected selected" id="color-white"></div>
                                <span>Установить приоритет</span>
                            </button>
                            <div class="task__edit-priorities priorities">
                                <h2 class="task__edit-priorities-title title">Выберите приоритет</h2>
                                <button class="task__edit-priority priority">
                                    <div class="task__edit-priority-selected selected" id="color-red"></div>
                                    <span>Высокий</span>
                                </button>
                                <button class="task__edit-priority priority">
                                    <div class="task__edit-priority-selected selected" id="color-yellow"></div>
                                    <span>Средний</span>
                                </button>
                                <button class="task__edit-priority priority">
                                    <div class="task__edit-priority-selected selected" id="color-green"></div>
                                    <span>Низкий</span>
                                </button>
                                <button class="task__edit-priority priority">
                                    <div class="task__edit-priority-selected selected" id="color-white"></div>
                                    <span>Нет приоритета</span>
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

        task.querySelector('.task__inner').addEventListener('touchstart', touchStart, {
            passive: true
        });
        task.querySelector('.task__inner').addEventListener('touchmove', (event) => touchMove(task, event), {
            passive: true
        });
        task.querySelector('.task__inner').addEventListener('touchend', () => touchEnd(task));

        if (task.classList.contains('task--completed')) {
            task.querySelector('.task__button-edit').disabled = true;
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
        task.querySelector('.task__edit').classList.add('wrap--active');

        task.querySelector('.task__edit-name').focus();
        task.querySelector('.task__edit-name').value = task.querySelector('.task__name').value;

        if (tasks[task.dataset.index].priority == 'color-red') {
            task.querySelector('.task__edit-priority-button span').innerHTML = 'Приоритет - высокий';
        } else if (tasks[task.dataset.index].priority == 'color-yellow') {
            task.querySelector('.task__edit-priority-button span').innerHTML = 'Приоритет - средний';
        } else if (tasks[task.dataset.index].priority == 'color-green') {
            task.querySelector('.task__edit-priority-button span').innerHTML = 'Приоритет - низкий';
        } else {
            task.querySelector('.task__edit-priority-button span').innerHTML = 'Установить приоритет';
        };

        if (tasks[task.dataset.index].priority == '') {
            task.querySelector('.task__edit-priority-selected').id = 'color-white';
        } else {
            task.querySelector('.task__edit-priority-selected').id = tasks[task.dataset.index].priority;
        };

        changeTaskName(task);
        changeTaskPriority(task);
    });

    task.querySelector('.task__edit').addEventListener('click', event => {
        if (!task.querySelector('.task__edit-inner').contains(event.target)) {
            if (task.querySelector('.task__edit-priorities').classList.contains('priorities--active')) {
                task.querySelector('.task__edit-priorities').classList.remove('priorities--active');
            } else {
                task.querySelector('.task__edit').classList.remove('wrap--active');
            };
        };
        if (!task.querySelector('.task__edit-priority-button').contains(event.target)) {
            if (!task.querySelector('.task__edit-priorities').contains(event.target)) {
                task.querySelector('.task__edit-priorities').classList.remove('priorities--active');
            };
        };
    });
}

// Смена названия задачи
const changeTaskName = (task) => {

    let postName = task.querySelector('.task__edit-name').value;

    task.querySelector('.task__edit-name').addEventListener('change', () => {
        if (task.querySelector('.task__edit-name').value.replace(/ +/g, ' ').trim().length == 0) {
            task.querySelector('.task__edit-name').focus();
            task.querySelector('.task__edit-name').classList.add('error');

            setTimeout(() => {
                task.querySelector('.task__edit-name').classList.remove('error');
                task.querySelector('.task__edit-name').value = postName;
            }, 500);

            return;
        }

        tasks[task.dataset.index].name = task.querySelector('.task__edit-name').value;
        updateLocal();
        task.querySelector('.task__name').value = task.querySelector('.task__edit-name').value.replace(/ +/g, ' ').trim();
    });
}

// Смена приоритета задачи
const changeTaskPriority = (task) => {
    task.querySelector('.task__edit-priority-button').addEventListener('click', () => {
        task.querySelector('.task__edit-priorities').classList.add('priorities--active');

        task.querySelectorAll('.task__edit-priority').forEach(priority => {
            if (tasks[task.dataset.index].priority == priority.querySelector('.task__edit-priority-selected').id) {
                priority.classList.add('priority--active');
            } else if (tasks[task.dataset.index].priority == '') {
                task.querySelectorAll('.task__edit-priority')[task.querySelectorAll('.task__edit-priority').length - 1].classList.add('priority--active');
            } else {
                priority.classList.remove('priority--active');
            };

            priority.addEventListener('click', () => {
                task.querySelectorAll('.task__edit-priority').forEach(priority => {
                    priority.classList.remove('priority--active');
                });
                priority.classList.add('priority--active');

                tasks[task.dataset.index].priority = priority.querySelector('.task__edit-priority-selected').id;

                task.querySelector('.task__priority').id = tasks[task.dataset.index].priority;

                if (priority.querySelector('.task__edit-priority-selected').id == 'color-white') {
                    task.querySelector('.task__edit-priority-selected').id = 'color-white';
                    task.querySelector('.task__priority').id = '';
                    tasks[task.dataset.index].priority = '';
                } else {
                    task.querySelector('.task__edit-priority-selected').id = tasks[task.dataset.index].priority;
                };

                if (priority.querySelector('span').innerHTML.toLocaleLowerCase() == 'нет приоритета') {
                    task.querySelector('.task__edit-priority-button span').innerHTML = 'Установить приоритет';
                } else {
                    task.querySelector('.task__edit-priority-button span').innerHTML = `Приоритет - ${priority.querySelector('span').innerHTML.toLocaleLowerCase()}`;
                };

                task.querySelector('.task__edit-priorities').classList.remove('priorities--active');
                updateLocal();
            });
        });
    });
}

// Удаление задачи
const removeTask = (task) => {
    task.querySelector('.task__button-remove').addEventListener('click', () => {
        task.querySelector('.task__inner').classList.add('task--hide');

        document.querySelectorAll('.task').forEach(task => {
            task.querySelector('.task__button-remove').disabled = true;
        })

        setTimeout(() => {
            tasks.splice([task.dataset.index], 1);
            updateLocal();
            renderTask();

            document.querySelectorAll('.task').forEach(task => {
                task.querySelector('.task__button-remove').disabled = false;
            });
        }, 1000);
    });

    task.querySelector('.task__edit-remove').addEventListener('click', () => {
        tasks.splice(task.dataset.index, 1);
        updateLocal();
        task.querySelector('.task__edit').classList.remove('wrap--active');

        document.querySelectorAll('.task').forEach(task => {
            task.querySelector('.task__button-remove').disabled = true;
        })

        setTimeout(() => {
            task.querySelector('.task__inner').classList.add('task--hide');
        }, 500);

        setTimeout(() => {
            renderTask();

            document.querySelectorAll('.task').forEach(task => {
                task.querySelector('.task__button-remove').disabled = false;
            });
        }, 1500);
    });
}

// Удаление всех задач
document.querySelector('.header__top-remove').addEventListener('click', () => {

    document.querySelector('.modal').classList.add('wrap--active');

    if (tasks.length == 0) {
        document.querySelector('.moda__title').innerHTML = 'У вас еще нет задач.';
        document.querySelector('.moda__buttons').style.display = 'none';

        setTimeout(() => {
            document.querySelector('.modal').classList.remove('wrap--active');
        }, 1000);
    } else {
        document.querySelector('.moda__title').innerHTML = 'Вы уверены, что хотите удалить все задачи?';
        document.querySelector('.moda__buttons').style.display = 'flex';
    };

    document.querySelector('.modal__button-confirm').addEventListener('click', () => {
        document.querySelectorAll('.task').forEach(task => {
            task.querySelector('.task__inner').classList.add('task--hide');
        });

        tasks.splice(0, document.querySelectorAll('.task').length);
        updateLocal();

        setTimeout(() => {
            renderTask();
        }, 1000);

        document.querySelector('.modal').classList.remove('wrap--active');
    });
    document.querySelector('.modal__button-cancel').addEventListener('click', () => {
        document.querySelector('.modal').classList.remove('wrap--active');
    });

    document.querySelector('.modal').addEventListener('click', event => {
        if (!document.querySelector('.modal-inner').contains(event.target)) {
            document.querySelector('.modal').classList.remove('wrap--active');
        };
    });
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