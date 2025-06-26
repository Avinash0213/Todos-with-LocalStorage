// Initialize the todos array and populate it from localStorage if available
let todos = JSON.parse(localStorage.getItem('todos')) || [];
const todoInput = document.getElementById('todoInput');
const addTodoButton = document.getElementById('addTodoButton');
const todoList = document.getElementById('todoList');

// Add event listener for adding todo items
addTodoButton.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Function to add a todo item
function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText) {
        todos.push(todoText);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
        todoInput.value = '';
    }
}

// Function to render the todos in the list
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo;
        //button to edit and remove
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        //style the edit button
        editButton.style.backgroundColor = 'bluishviolet';
        editButton.style.color = 'white';
        editButton.style.padding = '5px';
        editButton.style.margin = '5px';
        editButton.style.marginRight='1px'
        editButton.style.border = 'none';
        editButton.style.borderRadius = '5px';
        editButton.classList.add('editButton');
        editButton.addEventListener('click', function () {
            const newTodo = prompt('Edit the todo item', todo);
            if (newTodo) {
                const index = todos.indexOf(todo);
                todos[index] = newTodo;
                localStorage.setItem('todos', JSON.stringify(todos));
                renderTodos();
            }
        });
        li.appendChild(editButton);
        //button to delete
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        //style the delete button
        deleteButton.style.backgroundColor = 'red';
        deleteButton.style.color = 'white';
        deleteButton.style.padding = '5px';
        deleteButton.style.margin = '5px';
        deleteButton.style.border = 'none';
        deleteButton.style.borderRadius = '5px';
        deleteButton.classList.add('deleteButton');
        deleteButton.addEventListener('click', function () {
            todos.splice(todos.indexOf(todo), 1);
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodos();
        });
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

renderTodos();
