

class Task {
    constructor(description){
        this.description = description;
        this.completed = false;
        this.createdAt = Date.now();
    }

    toggle(){
        this.completed = !this.completed;
    }
}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterSelect = document.getElementById("filter");
const sortSelect = document.getElementById("sort");

addBtn.onclick = () => {

    const text = taskInput.value.trim();
    if(text === "") return;

    const task = new Task(text);

    tasks.push(task);

    saveTasks();
    renderTasks();

    taskInput.value = "";
};

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){

    taskList.innerHTML = "";

    let filtered = [...tasks];


    if(filterSelect.value === "completed"){
        filtered = filtered.filter(t => t.completed);
    }

    if(filterSelect.value === "incomplete"){
        filtered = filtered.filter(t => !t.completed);
    }

  
    if(sortSelect.value === "alphabet"){
        filtered.sort((a,b) => a.description.localeCompare(b.description));
    }

    if(sortSelect.value === "time"){
        filtered.sort((a,b) => a.createdAt - b.createdAt);
    }

    filtered.forEach((task,index) => {

        const li = document.createElement("li");

        const text = document.createElement("span");

        const date = new Date(task.createdAt).toLocaleTimeString();

        text.textContent = `${task.description} (${date})`;

        if(task.completed){
            text.classList.add("completed");
        }

        const btnGroup = document.createElement("div");
        btnGroup.className = "task-buttons";

        
        const doneBtn = document.createElement("button");
        doneBtn.innerHTML = "✔";
        doneBtn.className = "done-btn";

        doneBtn.onclick = () => {
            task.toggle();
            saveTasks();
            renderTasks();
        };

      
        const editBtn = document.createElement("button");
        editBtn.innerHTML = "✏️";

        editBtn.onclick = () => {

            const newText = prompt("Edit task:", task.description);

            if(newText){
                task.description = newText;
                saveTasks();
                renderTasks();
            }
        };

    
        const delBtn = document.createElement("button");
        delBtn.innerHTML = "❌";
        delBtn.className = "delete-btn";

        delBtn.onclick = () => {

            tasks.splice(tasks.indexOf(task),1);

            saveTasks();
            renderTasks();
        };

        btnGroup.appendChild(doneBtn);
        btnGroup.appendChild(editBtn);
        btnGroup.appendChild(delBtn);

        li.appendChild(text);
        li.appendChild(btnGroup);

        taskList.appendChild(li);
    });
}

filterSelect.onchange = renderTasks;
sortSelect.onchange = renderTasks;

renderTasks();


