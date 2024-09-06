// Select DOM elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load todos from local storage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        createTodoElement(todo, index);
    });
}

// Create and add a todo element to the list
function createTodoElement(todo, index) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${todo.text}</span>
        <div>
            <button onclick="editTodo(${index})">Edit</button>
            <button onclick="deleteTodo(${index})">Delete</button>
        </div>
    `;
    todoList.appendChild(li);
}

// Add a new todo
function addTodo() {
    const text = todoInput.value.trim();
    if (text === '') return;
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push({ text });
    localStorage.setItem('todos', JSON.stringify(todos));
    createTodoElement({ text }, todos.length - 1);
    todoInput.value = '';
}

// Edit a todo
function editTodo(index) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const newText = prompt('Edit todo:', todos[index].text);
    if (newText !== null) {
        todos[index].text = newText.trim();
        localStorage.setItem('todos', JSON.stringify(todos));
        loadTodos();
    }
}

// Delete a todo
function deleteTodo(index) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    loadTodos();
}

// Event listeners
addBtn.addEventListener('click', addTodo);
document.addEventListener('DOMContentLoaded', loadTodos);
