const input = document.querySelector('.input-text');
const addForm = document.querySelector('.add-form');
const tasksList = document.querySelector('.tasks-list');
const deleteBtn = document.querySelector('.deleteAll-btn');
// definimos lista de tareas

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// creamos la funcion para guardar las tareas en el localstorage

const saveLocalStorage = (tasksList) => {
	localStorage.setItem('tasks', JSON.stringify(tasksList));
};

// funcion para tener el html a crear

const createTask = (task) =>
	`<li>${task.name}<img class='delete-btn' src='/829079.png' 
     data-id = ${task.taskId}></li>`;

// crear la logica para renderizar tareas

const renderTasksList = (todoList) => {
	tasksList.innerHTML = todoList.map((task) => createTask(task)).join('');
};

const hideDeleteAll = (taskList) => {
	if (!taskList.length) {
		deleteBtn.classList.add('hidden');
		return;
	}
	deleteBtn.classList.remove('hidden');
};

// funcion para agregar tareas

const addTask = (e) => {
	e.preventDefault();
	const taskName = input.value.trim();
	// console.log(taskName);
	if (!taskName.length) {
		alert('por favor ingresa una tarea');
		return;
	} else if (
		tasks.some((task) => task.name.toLowerCase() === taskName.toLowerCase())
	) {
		alert('ya existe una tarea con ese nombre');
		return;
	}

	tasks = [...tasks, { name: taskName, taskId: tasks.length + 1 }];

	input.value = '';
	renderTasksList(tasks);
	saveLocalStorage(tasks);
	hideDeleteAll(tasks);
};

const removeTask = (e) => {
	if (!e.target.classList.contains('delete-btn')) return;
	const filterId = Number(e.target.dataset.id);
	tasks = tasks.filter((task) => task.taskId !== filterId);
	renderTasksList(tasks);
	saveLocalStorage(tasks);
	hideDeleteAll(tasks);
};

const removeAll = () => {
	tasks = [];
	renderTasksList(tasks);
	saveLocalStorage(tasks);
	hideDeleteAll(tasks);
};

// funcion para iniciar las tareas apretando el boton
const init = () => {
	renderTasksList(tasks);
	addForm.addEventListener('submit', addTask);
	tasksList.addEventListener('click', removeTask);
	deleteBtn.addEventListener('click', removeAll);
	hideDeleteAll(tasks);
};
init();
