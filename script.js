// Run the logic after the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select necessary DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Get and trim the task input
        const taskText = taskInput.value.trim();

        // If input is empty, alert and return
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create the list item and set its text
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create the remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
 

        // Set up the click event to remove the task
        removeBtn.onclick = function () {
            taskList.removeChild(listItem);
        };

        // Add the remove button to the list item
        listItem.appendChild(removeBtn);

        // Add the list item to the task list
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = '';
    }

    // Event listener for Add Task button
    addButton.addEventListener('click', addTask);

    // Event listener for Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
