console.log("hello word");

let todos = [];

function addTodo() {
  // get input values
  const todoInput = document.getElementById("todo-input");
  const todoDate = document.getElementById("todo-date");

  // validate input
  if (validateInput(todoInput.value, todoDate.value)) {
    // tmbahkan todonya ke dalam list
    let todo = { task: todoInput.value, date: todoDate.value, done: false };
    todos.push(todo);

    // render the update todo list
    renderTodo();
  }
}

function renderTodo() {
  // get the todo list container
  const todoList = document.getElementById("todo-list");

  // clear existing list
  todoList.innerHTML = "";

  let filteredTodos = todos;

  // filter
  if (currentFilter === "done") {
    filteredTodos = todos.filter((todo) => todo.done);
  } else if (currentFilter === "pending") {
    filteredTodos = todos.filter((todo) => !todo.done);
  }

  if (todos.length === 0) {
    todoList.innerHTML = `<tr><td colspan="4" style="text-align:center;">No task found</td></tr>`;
    return;
  }
  filteredTodos.forEach((todo, index) => {
    const row = document.createElement("tr");

    row.innerHTML = ` 
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td>${todo.done ? "✅ Done" : "⏳ Pending"}</td>
      <td>
        <button onclick="toggleStatus(${index})">✔</button>
        <button onclick="deleteTodo(${index})">🗑</button>
      </td>
    `;

    todoList.appendChild(row);
  });
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodo();
}

function deleteAllTodo() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    todos = [];
    renderTodo();
  }
}

function toggleStatus(index) {
  todos[index].done = !todos[index].done;
  renderTodo();
}

let currentFilter = "all";

function filterTodo() {
  const filterselect = document.getElementById("filter-select");
  currentFilter = filterselect.value;
  renderTodo();
}

//validate input fields
function validateInput(todo, date) {
  if (todo === "" || date === "") {
    alert("Please fill in all fields");
    return false;
  }
  return true;
}
