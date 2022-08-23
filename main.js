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
     data-id=${task.taskId}/></li>`;

// crear la logica para renderizar tareas

const renderTasksList = (todoList) => {
	tasksList.innerHTML = todoList.map((task) => createTask(task)).join('');
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
};

// funcion para iniciar las tareas apretando el boton
const init = () => {
	renderTasksList(tasks);
	addForm.addEventListener('submit', addTask);
};
init();
