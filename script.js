
let taskInput = document.getElementById("todo");
let addTask = document.getElementById("addTask");

// once the user puts values in the input field , the "Add" button will be activated. 
//the user can also press enter to add the task to the list.

taskInput.addEventListener("keypress", function(event) {
    if(taskInput.value != "")  {
        addTask.classList.remove("disabled");
        if(event.key === "Enter") {
            addNewTask(taskInput);
        }
    }
})

// activate the "Add" button once some text is inserted in the text box.
addTask.addEventListener("click", function() {
    if(taskInput.value != "" && !addTask.classList.contains("disabled"))  {
        addNewTask(taskInput);
    }
})

//function to add new task to tht list.
function addNewTask(taskInput) {
    let todoList = document.getElementById("todoList");
        
        let newListItem = document.createElement("li");
        
        let listDiv = document.createElement("div");
        listDiv.classList.add("listItems");

        let newCheckBox = document.createElement("input");
        newCheckBox.type = "checkbox";
        newCheckBox.classList.add("done");

        //checkbox is clicked to mark the task as done.
        newCheckBox.addEventListener("click", ()=> {
            let div = newCheckBox.parentElement;
            let task = div.childNodes.item(1);
            task.classList.toggle("completed");
            updateTaskCount();
        })

        let taskText = document.createElement("span");
        taskText.classList.add("todoText");
        taskText.textContent = taskInput.value;

        let newCloseButton = document.createElement("i");
        newCloseButton.classList.add("fa-regular");
        newCloseButton.classList.add("fa-circle-xmark");

        // close button to remove a task from the list.
        newCloseButton.addEventListener("click", ()=>{
            let div = newCloseButton.parentElement;
            div.remove();
            updateTaskCount();    
        })

        listDiv.appendChild(newCheckBox);
        listDiv.appendChild(taskText);
        listDiv.appendChild(newCloseButton);

        newListItem.appendChild(listDiv);
        todoList.appendChild(newListItem);
        
        updateTaskCount();
        taskInput.value = "";
        addTask.classList.add("disabled");
}

// function to update the task count once new task is added/removed.
function updateTaskCount() {
    let completedTasks = 0;
    let incompleteTasks = 0;
    let tasks = document.getElementsByClassName("todoText");
    for(let task of tasks) {
        if(!task.classList.contains("completed")){
            incompleteTasks++;
        }
        else{
            completedTasks++;
        }
    }
    let tasksLeft = document.getElementById("taskLeft")
    tasksLeft.textContent = "Tasks Left : "+incompleteTasks+"/"+(incompleteTasks+completedTasks);
}

let allTasks = document.getElementById("allTasks");
let completedTasks = document.getElementById("completedTasks");
let incompleteTasks = document.getElementById("incompleteTasks");

// on clicking the "Completed", all completed tasks are displayed and rest are hidden.
completedTasks.addEventListener("click", ()=>{
    let tasks = document.getElementsByClassName("todoText");
    for(let task of tasks) {
        task.parentElement.style.display = "flex";
    }
    for(let task of tasks) {
        if(!task.classList.contains("completed")){
            task.parentElement.style.display = "none";
        }
    }
    allTasks.style.fontWeight = "inherit";
    completedTasks.style.fontWeight = "bold";
    incompleteTasks.style.fontWeight = "inherit";
})

//on clicking the "Incomplete", all incomplete tasks are displayed and rest are hidden.
incompleteTasks.addEventListener("click", ()=>{
    let tasks = document.getElementsByClassName("todoText");
    for(let task of tasks) {
        task.parentElement.style.display = "flex";
    }
    for(let task of tasks) {
        if(task.classList.contains("completed")){
            task.parentElement.style.display = "none";
        }
    }
    allTasks.style.fontWeight = "inherit";
    completedTasks.style.fontWeight = "inherit";
    incompleteTasks.style.fontWeight = "bold";
})

//displayed by default. clicking "All" will displa all tasks completed/incomplete.
allTasks.addEventListener("click", ()=>{
    let tasks = document.getElementsByClassName("todoText");
    for(let task of tasks) {
        task.parentElement.style.display = "flex";
    }
    allTasks.style.fontWeight = "bold";
    incompleteTasks.style.fontWeight = "inherit";
    completedTasks.style.fontWeight = "inherit";
})

//clicking "Complete All" will mark all the tasks as completed.
let completeAll = document.getElementById("completeAll");
completeAll.addEventListener("click", ()=>{
    let tasks = document.getElementsByClassName("todoText");
    for(let task of tasks) {
        if(!task.classList.contains("completed")) {
            task.classList.toggle("completed");
            task.parentElement.childNodes.item(0).checked = true;
        }
    }
    updateTaskCount();
})

//clicking "Clear Completed" all completed tasks will be removed from the list.
let clearAll = document.getElementById("clearAll");
clearAll.addEventListener("click", ()=>{
    let tasks = document.getElementsByClassName("todoText");
    for(let i = 0; i<tasks.length; i++) {
        if(tasks[i].classList.contains("completed")){
            tasks[i].parentElement.remove();
            i=i-1;
        }
    }
    updateTaskCount();
})

updateTaskCount();