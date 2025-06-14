document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // ✅ Explicitly declared loadTasks function
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // false: don't save again
        });
    }

    // ✅ Helper function to get tasks from localStorage
    function getStoredTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    // ✅ Helper function to save tasks to localStorage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // ✅ Main function to add a task to the list
    function addTask(taskText, save = true) {
        const trimmedText = taskText.trim();
        if (trimmedText === '') {
            alert('Please enter a task.');
            return;
        }

        const listItem = document.createElement('li');
        listItem.textContent = trimmedText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        removeBtn.onclick = function () {
            taskList.removeChild(listItem);
            let tasks = getStoredTasks();
            tasks = tasks.filter(task => task !== trimmedText);
            saveTasks(tasks);
        };

        listItem.appendChild(removeBtn);
        taskList.appendChild(listItem);

        if (save) {
            const tasks = getStoredTasks();
            tasks.push(trimmedText);
            saveTasks(tasks);
        }

        taskInput.value = '';
    }

    // ✅ Event listeners for adding tasks
    addButton.addEventListener('click', function () {
        addTask(taskInput.value);
    });

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    // ✅ Call the loadTasks function on page load
    loadTasks();
});
