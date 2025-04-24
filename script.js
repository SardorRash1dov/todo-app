const Input = document.querySelector("input");
const Task = document.querySelector(".task");
const Button = document.querySelector("#button");

window.onload = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(t => createTask(t.text, t.checked));
};

function createTask(text, checked = false) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("tasks");

    taskDiv.innerHTML = `
        <input type="checkbox" class="check" ${checked ? "checked" : ""}>
        <span>${text}</span>
        <img src="delete.png" alt="delete" class="delete">
    `;

    const checkbox = taskDiv.querySelector(".check");
    const deleteBtn = taskDiv.querySelector(".delete");

    checkbox.onchange = () => updateCheckboxInStorage(text, checkbox.checked);

    deleteBtn.onclick = () => {
        taskDiv.remove();
        removeFromLocalStorage(text);
    };

    Task.appendChild(taskDiv);
}

function addToLocalStorage(text, checked = false) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, checked });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeFromLocalStorage(text) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t.text !== text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCheckboxInStorage(text, checked) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(t => t.text === text ? { ...t, checked } : t);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

Button.addEventListener("click", () => {
    const value = Input.value.trim();

    if (value === "") {
        alert("please Enter a Task");
        return;
    }

    createTask(value);
    addToLocalStorage(value);
    Input.value = "";
});