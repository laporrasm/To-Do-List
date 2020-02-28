let tasks = [];
let taskContainer = document.querySelector(".tasks");
let addTaskButton = document.querySelector(".add-task__button");
let taskText = document.querySelector(".add-task__input");
let placeholder = document.querySelector(".tasks__placeholder");

taskText.focus();

let addTask = function(text) {
	//Creates task, task text and delete button
	let task = document.createElement("div");
	let paragraph = document.createElement("p");
	let deleteButton = document.createElement("span");
	let doneButton = document.createElement("span");

	// Adds classes, the task name and the delete and done icons
	task.classList.add("tasks__task");
	paragraph.classList.add("tasks__name");
	paragraph.innerText = text;
	deleteButton.classList.add("tasks__delete");
	deleteButton.innerHTML = '<i class="fas fa-times-circle"></i>';
	doneButton.classList.add("tasks__done");
	doneButton.innerHTML = '<i class="fas fa-check-circle"></i>';

	//Appends the task text and buttons to the task
	task.appendChild(doneButton);
	task.appendChild(paragraph);
	task.appendChild(deleteButton);
	taskContainer.appendChild(task);

	// Adds the done event
	doneButton.addEventListener("click", function(event) {
		paragraph.classList.toggle("tasks__name--done");
		task.classList.toggle("tasks__task--done");
	});
	
	// Adds the delete event
	deleteButton.addEventListener("click", function(event) {
		if(confirm("Are you sure you want to delete this task?")) {
			this.closest(".tasks").removeChild(this.parentNode);
			tasks.pop(this.parentNode);
			
			if (tasks.length > 0 && !placeholder.classList.contains("tasks__placeholder--no-show")) {
				placeholder.classList.add("tasks__placeholder--no-show");
			}
			else if (tasks.length < 1) {
				placeholder.classList.remove("tasks__placeholder--no-show");
			}
		};
	});

	//Adds the edit event
	paragraph.addEventListener("dblclick", function(event) {
		let input = document.createElement("input");
		input.classList.add("tasks__edit-input");

		input.value = this.innerText;
		
		input.addEventListener("keyup", event => {
			let inputValue = input.value;
			if (event.keyCode === 13 && inputValue != '') {
				this.innerText = inputValue;
				task.replaceChild(this, input);
			}
		})
		task.replaceChild(input, this);
		input.focus();
	});

	// Adds task to tasks array
	tasks.push(task);
	
	if (tasks.length > 0 && !placeholder.classList.contains("tasks__placeholder--no-show")) {
		placeholder.classList.add("tasks__placeholder--no-show");
	}
	else if (tasks.length < 1) {
	  placeholder.classList.remove("tasks__placeholder--no-show");
	}

	// Returns focus to the Add Task input
	taskText.focus();
};

addTaskButton.addEventListener("click", event => {
	let inputValue = taskText.value;
	if (inputValue == '') {
		alert("You should enter a task first.");
		return ;
	}
	addTask(inputValue);
	taskText.value = '';
});

taskText.addEventListener("keyup", event => {
	if (event.keyCode === 13) addTaskButton.click();
});
