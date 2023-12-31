const todoInput = document.querySelector(".todoinput")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")



todoButton.addEventListener("click" , addTodo)
todoList.addEventListener("click" , deleteCompletetodo)
filterOption.addEventListener("click" , filtertodo)



function addTodo(event){
    event.preventDefault();
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")


    const newTodo = document.createElement("li")
    newTodo.innerText = todoInput.value

    saveLocaltodo(todoInput.value)
    
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)
    todoInput.value = "";
    

    const completedButton = document.createElement("button")
    completedButton.innerHTML = "<i class='fa fa-check'></i>"
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton)


    const trashButton = document.createElement("button")
    trashButton.innerHTML = "<i class='fa fa-trash'></i>"
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)

    todoList.appendChild(todoDiv)
}

function deleteCompletetodo(event){
    const item = event.target;
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        removeLocalTodo(todo)
        todo.remove();
    }
}



function saveLocaltodo(todo){
    let todos;
    if(localStorage.getItem("todos")  === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos" , JSON.stringify(todos))
}


function removeLocalTodo(todo){
    let todos;
    if(localStorage.getItem("todos")  === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex) , 1)
    localStorage.setItem("todos" , JSON.stringify(todos))
}


function filtertodo(event){
    const todos = todoList.childNodes
    todos.forEach(function(todo)  {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex"
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex"
                }
                else{
                    todo.style.display = "none"
                }
                break
            case "uncompleted":
                if(todo.classList.contains("completed")){
                    todo.style.display = "none"
                }
                else{
                    todo.style.display = "flex"
                }
                break
        }
    })
}