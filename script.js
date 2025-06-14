document.addEventListener('DOMContentLoaded', function () {
    // Get DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    //  Load tasks from localStorage on page load
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = don't save again
    }

    // Helper function to retrieve tasks from localStorage
    function getStoredTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    //  Helper function to save updated tasks to localStorage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a task to the list
    function addTask(taskText, save = true) {
        const trimmedText = taskText.trim();

        // Check if input is empty
        if (trimmedText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create list item element
        const listItem = document.createElement('li');
        listItem.textContent = trimmedText;

        // Create Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // Remove task on button click
        removeBtn.onclick = function () {
            taskList.removeChild(listItem);
            let tasks = getStoredTasks();
            tasks = tasks.filter(task => task !== trimmedText);
            saveTasks(tasks);
        };

        // Append button to li, and li to ul
        listItem.appendChild(removeBtn);
        taskList.appendChild(listItem);

        // Save to localStorage if needed
        if (save) {
            const tasks = getStoredTasks();
            tasks.push(trimmedText);
            saveTasks(tasks);
        }

        // Clear input field
        taskInput.value = '';
    }

    //  Add task on button click
    addButton.addEventListener('click', function () {
        addTask(taskInput.value);
    });

    //  Add task on pressing Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    //  Load any saved tasks
    loadTasks();
});

// Wait for the document to fully load
document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Function to add a new task to the list
    function addTask(taskText = null, save = true) {
        // If no taskText passed, get value from input
        if (taskText === null) {
            taskText = taskInput.value.trim();
        }

        // If empty, prompt user and exit
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create list item and remove button
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // Remove task from DOM and Local Storage when clicked
        removeBtn.onclick = function () {
            taskList.removeChild(listItem);
            removeFromLocalStorage(taskText);
        };

        listItem.appendChild(removeBtn);
        taskList.appendChild(listItem);

        // Clear input
        taskInput.value = '';

        // Save to Local Storage if applicable
        if (save) {
            saveToLocalStorage(taskText);
        }
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(task => addTask(task, false));
    }

    // Save a task to Local Storage
    function saveToLocalStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Remove a task from Local Storage
    function removeFromLocalStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Event: Click "Add Task"
    addButton.addEventListener('click', () => addTask());

    // Event: Press "Enter" in input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
