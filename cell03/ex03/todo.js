function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function saveTasks() {
    let tasks = []; 
    document.querySelectorAll("#ft_list div").forEach(taskDiv => {
        tasks.push(taskDiv.textContent);
    });
    setCookie("tasks", JSON.stringify(tasks), 7);
}

function loadTasks() {
    let savedTasks = getCookie("tasks");
    if (savedTasks) {
        let tasks = JSON.parse(savedTasks);
        tasks.forEach(task => addTask(task));
    }
}

function addTask(task){
    // create task div element
    let taskDiv = document.createElement("div");
    taskDiv.textContent = task;
    // click to remove
    taskDiv.onclick = function() {
        if (confirm("Do you want to remove this task?")){
            taskDiv.remove();
            // saveTask
            saveTasks();
        }
    };
    // add to list
    let list = document.getElementById("ft_list");
    list.insertBefore(taskDiv, list.firstChild); 
}

document.getElementById("newTask").onclick = function() {
    let newTask = prompt("Enter your new task : ");
    if (newTask) {
        addTask(newTask);
        saveTasks();
    }
}

loadTasks();

let tasks = getCookie('tasks');
console.log(tasks);