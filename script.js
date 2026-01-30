let taskList = document.getElementById("taskList");
let taskInput = document.getElementById("taskInput");
let errorMsg = document.getElementById("error");

// Load tasks from localStorage
window.onload = function () {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => createTask(task.text, task.completed));
};

function addTask() {
    let taskValue = taskInput.value.trim();

    // ✅ Option 1: Empty validation (NO alert)
    if (taskValue === "") {
        errorMsg.textContent = "Please enter a task";
        return;
    } else {
        errorMsg.textContent = "";
    }

    createTask(taskValue, false);
    saveTasks();
    taskInput.value = "";
}

function createTask(text, completed) {
    let li = document.createElement("li");
    li.textContent = text;

    if (completed) {
        li.classList.add("completed");
    }

    // ✅ Option 2: Toggle completed
    li.onclick = function () {
        li.classList.toggle("completed");
        saveTasks();
    };

    let deleteBtn = document.createElement("span");
    deleteBtn.textContent = " X";
    deleteBtn.style.color = "red";
    deleteBtn.style.cursor = "pointer";

    deleteBtn.onclick = function (e) {
        e.stopPropagation();
        li.remove();
        saveTasks();
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// ✅ Option 3: localStorage
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}