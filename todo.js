// All Elements Select
const form = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo")
const todoList = document.querySelector(".list-group")
const firstCardBody = document.querySelectorAll(".card-body")[0]
const secondCardBody = document.querySelectorAll(".card-body")[1]
const filter = document.querySelector("#filter")
const clearButton = document.querySelector("#clear-todos")

eventListeners();

function eventListeners(){ // All Event Listeners
    form.addEventListener("submit",addTodo)
    document.addEventListener("DOMContentLoaded",loadAllTodosUI)
    secondCardBody.addEventListener("click",deleteTodo)
    filter.addEventListener("keyup",filterTodos)
    clearButton.addEventListener("click",clearAllTodos)

}

// Delete All Todos By Clicking Button
function clearAllTodos(e){
    if(confirm("Are you sure you want to delete all?")){
        // Todos Remove from UI
        // todoList.innerHTML = ""  ---> This method slow
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild)
        }
        localStorage.removeItem("todos")
        
    }

    

}

// Filter Event
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase()
    const listItems = document.querySelectorAll(".list-group-item")

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase()
        if(text.indexOf(filterValue) === -1){
            // Could not find
            listItem.setAttribute("style","display: none !important")
        }
        else {
            // Could find
            listItem.setAttribute("style","display : block")
        }
    })
}

// Delete Todo By Clicking A Specific Place
function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove()
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
        showAlert("success","Todo delete successfully")
    }
}

// Delete Todo Local Storage
function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage()
    
    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1) // Delete array value
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos))
    
}


// Load All Todos UI
function loadAllTodosUI(){
    let todos = getTodosFromStorage()
    todos.forEach(function(todo){
        addTodoToUI(todo)
    })
}


function addTodo(e){
    const newTodo = todoInput.value.trim()

    
    
    if(newTodo === ""){
        showAlert("danger","Please Enter Todo .....") // Gives a alert message if the entry is empty 
    }
    else {
        addTodoToUI(newTodo)
        addTodoToStorage(newTodo) // Add Todo Local Storage
        showAlert("success","Todo added successfully")
    }
    
   


    e.preventDefault()
}

// Get All The Todos From The Storrage
function getTodosFromStorage(){
    let todos 
    if(localStorage.getItem("todos") === null){
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos
}


// Add Todo To Storage
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage()

    todos.push(newTodo)
    localStorage.setItem("todos",JSON.stringify(todos))
}

// Alert Message
function showAlert(type,message){
    const alert = document.createElement("div")
    
    alert.className = `alert alert-${type}`
    alert.textContent = message

    firstCardBody.appendChild(alert)

    // setTimeout
    setTimeout(function(){
        alert.remove()
    },2000) // After two second removed alert message

    
}


function addTodoToUI(newTodo){ // It will add String value as list item to UI.
    
    // List Item Create
    const listItem = document.createElement("li")
    
    
    // Link Create
    const link = document.createElement("a")
    link.href = "#"
    link.className = "delete-item"
    link.innerHTML = "<i class = 'fa fa-remove'></i>" // Here we have labeled the link with innerHTML.
    

    listItem.classList.add("list-group-item", "d-flex", "justify-content-between");



    // Text Node Add
    listItem.appendChild(document.createTextNode(newTodo))
    listItem.appendChild(link)
    
    // Adding a List Item in The Todo List
    todoList.appendChild(listItem)
    todoInput.value = ""

    
}

