const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");
const countValue = document.querySelector(".count-value");

let taskcount = 0;

const displaycount = () => {
    let uncheckedTasks = listcontainer.querySelectorAll("li:not(.checked)").length;
    countValue.innerText = uncheckedTasks;
}

const addTask = () => {
    if (inputbox.value === '') {
        alert("YOU MUST WRITE SOMETHING!");
    } else {
        let li = document.createElement("li");
        li.className = "flex justify-between items-center bg-gray-100 p-3 rounded-md";
        li.innerHTML = inputbox.value;
        listcontainer.appendChild(li);

        let span = document.createElement("span");
        span.className = "text-red-500 cursor-pointer";
        span.innerHTML = "\u00d7"; // '×' symbol
        li.appendChild(span);

        taskcount++;
        displaycount();
    }
    inputbox.value = "";
    savedata();
}

listcontainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        if (e.target.classList.contains("checked")) {
            alert("Task is completed!");
        }
        displaycount();
        savedata();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        displaycount();
        savedata();
    }
}, false);

const savedata = () => {
    localStorage.setItem("data", listcontainer.innerHTML);
}

const showtask = () => {
    listcontainer.innerHTML = localStorage.getItem("data") || "";
    taskcount = listcontainer.getElementsByTagName("li").length;
    displaycount();
}

showtask();
