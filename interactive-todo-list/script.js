class Task {
    constructor(description){
        this.description = description;
        this.completed = false;
    }

    toggle(){
        this.completed = !this.completed;
    }
}

const tasks = [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.onclick = () => {

    const text = taskInput.value.trim();

    if(text === "") return;

    const task = new Task(text);

    tasks.push(task);

    renderTasks();

    taskInput.value = "";
};

function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach((task,index) => {

        const li = document.createElement("li");

        li.textContent = task.description;

        if(task.completed){
            li.classList.add("completed");
        }

        li.onclick = () => {
            task.toggle();
            renderTasks();
        };

        const delBtn = document.createElement("button");

        delBtn.textContent = "Delete";
        delBtn.className = "delete-btn";

        delBtn.onclick = (e) => {
            e.stopPropagation();
            tasks.splice(index,1);
            renderTasks();
        };

        li.appendChild(delBtn);

        taskList.appendChild(li);
    });
}